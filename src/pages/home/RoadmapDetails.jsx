import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaCommentAlt, FaRegUserCircle } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { MdHowToVote } from "react-icons/md";
import { useParams } from "react-router";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CommentBox from "../../components/CommentBox";

const RoadmapDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const btnRef = useRef(null);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(JSON.parse(localStorage.getItem("isOpen")));
  const sendRef = useRef(null);

  const { mutateAsync: postComment, isPending: isCommenting } = useMutation({
    mutationKey: ["comments"],
    mutationFn: async (body) => {
      await axiosSecure.post("/comments", body);
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error) => {
      toast.error(
        error?.response.data.message || "Something went wrong while commenting"
      );
    },
  });

  const { data: comments = [], isLoading: commentComing } = useQuery({
    queryKey: ["comments"],
    enabled: !!open,
    queryFn: async () => {
      const { data } = await axiosSecure(`/comments/${id}`);
      return data.data || [];
    },
  });

  const { data: roadmap = {}, isLoading } = useQuery({
    queryKey: ["roadmap", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/roadmaps/${id}`);
      return data.data || {};
    },
  });

  const {
    title,
    description,
    status,
    category,
    upvotes = [],
    _id = [],
  } = roadmap || {};

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["vote", user?.email],
    mutationFn: async () => {
      const { data } = await axiosSecure.post(`/roadmaps/vote/${_id}`, {
        email: user?.email,
      });
      toast.success(data?.message);
      btnRef.current.disabled = true;
      queryClient.invalidateQueries({ queryKey: ["roadmap"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });

  const handleVote = async () => {
    await mutateAsync();
  };

  const isVoted = upvotes.find((vote) => vote.user === user?.email);

  if (isLoading) {
    return (
      <div className="min-h-screen flex-center">
        <Loading />
      </div>
    );
  }


  const handleComment = async (e) => {
    e.preventDefault();

    const text = e.target.comment.value;

    const data = {
      text,
      author: user._id,
      roadmap: id,
    };

    await postComment(data);
  };

  const handleChange = (e) => {
    if (e.target.value.length === 0) {
      sendRef.current.disabled = true;
    } else {
      sendRef.current.disabled = false;
    }
  };

  return (
    <section className="section">
      <div className="max-w-2xl mx-auto border p-6 rounded-md">
        <h3 className="font-semibold">{title}</h3>
        {description && <p className="mt-4">{description}</p>}

        <div className="flex items-center justify-between mt-4">
          <p className="flex items-center gap-4">
            <span className="bg-sec w-6 h-6 rounded-full flex-center">
              {upvotes.length}
            </span>
            <button ref={btnRef} disabled={!!isVoted} onClick={handleVote}>
              {isPending ? <Loading /> : <MdHowToVote size={30} />}
            </button>
          </p>

          <button
            title="Click to open or close comments"
            onClick={() => {
              setOpen(!open);
              localStorage.setItem("isOpen", !open);
            }}
          >
            <FaCommentAlt size={28} className="text-main" />
          </button>

          <div className="flex gap-4 items-center">
            <p className="capitalize bg-main w-fit px-3 py-0.5 text-white rounded-full">
              {category}
            </p>
            <p
              className={`capitalize ${
                status === "planned"
                  ? "bg-red-600"
                  : status === "in_progress"
                  ? "bg-blue-700"
                  : "bg-sec"
              } w-fit px-3 py-0.5 text-white rounded-full`}
            >
              {status === "in_progress" ? "In Progress" : status}
            </p>
          </div>
        </div>

        {/* comment section */}
        <hr className="my-6" />
        <div>
          <form onSubmit={handleComment}>
            <div className="flex justify-between">
              <input
                className="input rounded-r-none"
                type="text"
                name="comment"
                placeholder="Leave a comment"
                onChange={handleChange}
              />
              <button
                type="submit"
                ref={sendRef}
                disabled={isCommenting || true}
                className="btn rounded-l-none"
              >
                Send <IoSend />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        className={`max-w-2xl mx-auto overflow-hidden border rounded-md mt-4 ${
          open ? "h-fit block" : "h-0 hidden"
        }`}
      >
        <div className="p-6">
          <h2 className="font-bold text-2xl">
            Comments: {comments.length || 0}
          </h2>
          <hr className="my-3" />

          {commentComing ? (
            <div className="flex-center">
              <Loading />
            </div>
          ) : comments.length === 0 ? (
            <p>No comments here...</p>
          ) : (
            <div className="flex flex-col gap-6">
              {comments.map((comment) => (
                <CommentBox key={comment._id} comment={comment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RoadmapDetails;
