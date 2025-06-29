import { formatDistanceToNowStrict } from "date-fns";
import { useEffect, useRef, useState } from "react";
import ReplyBox from "./ReplyBox";
import { FaRegUserCircle } from "react-icons/fa";
import Reply from "./Reply";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { BsThreeDotsVertical } from "react-icons/bs";
import Loading from "./Loading";
import EditBox from "./EditBox";

const CommentBox = ({ comment }) => {
  const [open, setOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [openOpt, setOpenOpt] = useState(false);
  const optBtnRef = useRef(null);
  const optRef = useRef(null);
  const [edit, setEdit] = useState(false);

  const { author, createdAt, text, replies, _id } = comment || {};

  // * post reply
  const { mutateAsync: postReply, isReplying } = useMutation({
    mutationKey: ["reply", _id],
    mutationFn: async (body) => {
      await axiosSecure.patch(`/comments/reply/${_id}`, {
        ...body,
        author: user?._id,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["comments"] });
      setOpen(false);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Something went wrong while replying"
      );
    },
  });

  // * comment delete
  const { mutateAsync: deleteComment, isPending: isDeleting } = useMutation({
    mutationKey: ["comment"],
    mutationFn: async () => {
      const { data } = await axiosSecure.delete(`/comments/${_id}`);
      if (data.success) {
        toast.success("Comment Deleted Successfully");
        queryClient.invalidateQueries({ queryKey: ["comments"] });
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while deleting comment."
      );
    },
  });

  // * edit comment
  const { mutateAsync: editComment, isPending: isEditing } = useMutation({
    mutationKey: ["Comment", _id],
    mutationFn: async (body) => {
      const { data } = await axiosSecure.patch(`/comments/${_id}`, body);
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["comment", _id] });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const handleClick = (e) => {
    if (
      !(
        optBtnRef.current?.contains(e.target) ||
        optRef.current?.contains(e.target)
      )
    ) {
      setOpenOpt(false);
    }
  };

  useEffect(() => {
    if (openOpt) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [openOpt]);
  return (
    <div className="flex gap-4 border p-2 md:p-3 rounded-md">
      <div>
        <FaRegUserCircle size={40} />
      </div>
      <div className="w-full relative">
        {edit ? (
          <>
            <EditBox open={edit} setOpen={setEdit} data={[editComment, isEditing]} text={text} />
            <button
              className="text-xs text-main hover:underline"
              onClick={() => setEdit(!edit)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <div className="w-full bg-main/20 p-3 rounded-2xl">
              <h3 className="font-semibold">{author?.name}</h3>
              <p className="text-base mt-1">{text}</p>
            </div>
            <div className="ml-4 flex gap-4 items-center text-sm mt-1 text-gray-600">
              <p>{formatDistanceToNowStrict(new Date(createdAt))} ago</p>

              <button
                disabled={replies.length >= 3}
                onClick={() => setOpen(!open)}
                className={`${replies.length >= 3 ? "line-through" : ""}`}
              >
                Reply
              </button>
            </div>
          </>
        )}

        <div
          className={`${
            replies?.length > 0 ? "mt-4 flex" : "mt-0 hidden"
          } flex-col gap-3 md:ml-3`}
        >
          {replies.map((reply) => (
            <Reply
              key={reply.createdAt || reply.updatedAt}
              reply={reply}
              setOpen={setOpen}
              open={open}
              isDisabled={replies.length >= 3}
            />
          ))}
        </div>

        <ReplyBox open={open} setOpen={setOpen} reply={{ postReply, isReplying }} />
        {user?._id === author?._id && (
          <>
            <button
              onClick={() => setOpenOpt(!openOpt)}
              className="absolute top-4 right-3"
              ref={optBtnRef}
            >
              <BsThreeDotsVertical />
            </button>
            {openOpt && (
              <div
                ref={optRef}
                className={`absolute top-2 w-32 right-8 space-y-2 bg-main p-2 rounded-md`}
              >
                <button
                  onClick={() => setEdit(!edit)}
                  className="btn w-full border-none bg-sec"
                >
                  Edit
                </button>
                <button
                  disabled={isDeleting}
                  onClick={deleteComment}
                  className="btn w-full border-none bg-amber-600"
                >
                  {isDeleting ? <Loading /> : "Delete"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
