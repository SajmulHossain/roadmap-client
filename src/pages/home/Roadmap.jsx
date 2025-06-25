import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import toast from "react-hot-toast";
import { MdHowToVote } from "react-icons/md";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaCommentAlt } from "react-icons/fa";

const Roadmap = ({ roadmap }) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const btnRef = useRef(null);

  const { title, category, description, status, upvotes, _id } = roadmap || {};

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["vote", user.email],
    mutationFn: async () => {
      const { data } = await axiosSecure.post(`/roadmaps/vote/${_id}`, {
        email: user.email,
      });
      toast.success(data?.message);
      btnRef.current.disabled = true;
      queryClient.invalidateQueries({ queryKey: ["roadmaps"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });
  const handleVote = async () => {
    await mutateAsync();
  };

  const isVoted = upvotes.find((vote) => vote.user === user?.email);

  return (
    <Link
      to={`/roadmap/${_id}`}
      className="rounded-md border p-4 flex flex-col justify-between"
    >
      <h3 className="font-bold text-2xl mb-4">{title}</h3>
      {description && <p className="mb-3">{description}</p>}

      <div className="flex items-center justify-between">
        <p className="flex items-center gap-4">
          <span className="bg-sec w-6 h-6 rounded-full flex-center">
            {upvotes.length}
          </span>
          <button ref={btnRef} disabled={!!isVoted} onClick={handleVote}>
            {isPending ? <Loading /> : <MdHowToVote size={30} />}
          </button>
        </p>

        <button className="hidden lg:block">
          <FaCommentAlt size={28} className="text-main" />
        </button>

        <div className="flex gap-1 lg:gap-4 items-center">
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
    </Link>
  );
};

export default Roadmap;
