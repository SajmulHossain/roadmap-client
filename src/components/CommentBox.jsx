import { formatDistanceToNowStrict } from "date-fns";
import { useState } from "react";
import ReplyBox from "./ReplyBox";
import { FaRegUserCircle } from "react-icons/fa";
import Reply from "./Reply";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { BsThreeDotsVertical } from "react-icons/bs";

const CommentBox = ({ comment }) => {
  const [open, setOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [openOpt, setOpenOpt] = useState(false);

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
    onSuccess:async () => {
     await queryClient.invalidateQueries({ queryKey: ["comments"] });
      setOpen(false);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Something went wrong while replying"
      );
    },
  });
  return (
    <div className="flex gap-4 border p-2 md:p-3 rounded-md">
      <div>
        <FaRegUserCircle size={40} />
      </div>
      <div className="w-full relative">
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

        <div className="flex mt-4 flex-col gap-3 md:ml-3">
          {replies.map((reply) => (
            <Reply
              key={reply.createdAt || reply.updatedAt}
              reply={reply}
              setOpen={setOpen}
              isDisabled={replies.length >= 3}
            />
          ))}
        </div>

        <ReplyBox open={open} reply={{ postReply, isReplying }} />
        {user?._id === author?._id && (
          <>
            <button
              onClick={() => setOpenOpt(!openOpt)}
              className="absolute top-4 right-3"
            >
              <BsThreeDotsVertical />
            </button>
            {openOpt && (
              <div
                className={`absolute top-2 right-8 space-y-2 bg-main p-2 rounded-md`}
              >
                <button className="btn w-full border-none bg-sec">Edit</button>
                <button className="btn w-full border-none bg-amber-600">
                  Delete
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
