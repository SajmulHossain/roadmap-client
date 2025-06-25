import { formatDistanceToNowStrict } from "date-fns";
import { useState } from "react";
import ReplyBox from "./ReplyBox";
import { FaRegUserCircle } from "react-icons/fa";
import Reply from "./Reply";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const CommentBox = ({ comment }) => {
  const [open, setOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Something went wrong while replying"
      );
    },
  });
  return (
    <div className="flex gap-4">
      <div>
        <FaRegUserCircle size={40} />
      </div>
      <div className="w-full">
        <div className="w-full bg-main/20 p-3 rounded-2xl">
          <h3 className="font-semibold">{author?.name}</h3>
          <p className="text-base mt-1">{text}</p>
        </div>
        <div className="ml-4 flex gap-4 items-center text-sm mt-1 text-gray-600">
          <p>{formatDistanceToNowStrict(new Date(createdAt))} ago</p>

          <button onClick={() => setOpen(!open)}>Reply</button>
        </div>

        <div className="mt-6 flex flex-col gap-3 ml-3">
          {replies.map((reply) => (
            <Reply
              key={reply.createdAt || reply.updatedAt}
              reply={reply}
              setOpen={setOpen}
            />
          ))}
        </div>

        <ReplyBox open={open} reply={{postReply, isReplying}} />
      </div>
    </div>
  );
};

export default CommentBox;
