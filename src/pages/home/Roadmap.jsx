import { MdHowToVote } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import { useRef } from "react";

const Roadmap = ({ roadmap }) => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const btnRef = useRef();


  const { title, category, description, status, upvotes,_id } = roadmap || {};

  const {mutateAsync, isPending} = useMutation({
    mutationKey: ['vote', user.email],
    mutationFn: async() => {
      const { data } = await axiosSecure.post(`/roadmaps/vote/${_id}`, {
        email: user.email,
      });
      toast.success(data?.message);
      btnRef.current.disabled = true;
    },
    onError: err => {
      toast.error(err.response.data.message || 'Something went wrong')
    }
  })
  const handleVote = async () =>  {
    await mutateAsync();
  }
  const isVoted= upvotes.find(vote => vote.user === user?.email);

  return (
    <div className="rounded-md border p-4 flex flex-col justify-between">
      <h3 className="font-bold text-2xl mb-4">{title}</h3>
      {description && <p className="mb-3">{description}</p>}

      <div className="flex items-center justify-between">
        <p className="flex items-center gap-4">
          <button ref={btnRef} disabled={!!isVoted} onClick={handleVote}>
            {
              isPending ? <Loading /> : <MdHowToVote size={30} />
            }
          </button>
          <span className="bg-sec w-6 h-6 rounded-full flex-center">{upvotes.length}</span>
        </p>
        <div className="flex gap-4 items-center">
          <p className="capitalize bg-main w-fit px-3 py-0.5 text-white rounded-full">
            {category}
          </p>
          <p
            className={`capitalize bg-${
              status === "planned"
                ? "amber-700"
                : status === "in_progress"
                ? "blue-700"
                : "sec"
            } w-fit px-3 py-0.5 text-white rounded-full`}
          >
            {status === "in_progress" ? "In Progress" : status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
