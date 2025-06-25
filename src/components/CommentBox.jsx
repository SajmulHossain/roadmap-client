import { formatDistanceToNowStrict } from "date-fns";
import { useState } from "react";
import ReplyBox from "./ReplyBox";
import { FaRegUserCircle } from "react-icons/fa";
import Reply from "./Reply";

const CommentBox = ({ comment }) => {
    const [open, setOpen] = useState(false);

    const { author, createdAt, text, replies } = comment || {};
  return (
    <div className="flex gap-4">
      <div>
        <FaRegUserCircle size={40} />
      </div>
      <div className="w-full">
        <div className="w-full bg-main/20 p-3 rounded-2xl">
          <h3 className="font-semibold">{author?.name}</h3>
          <p className="text-base mt-1">
            {text}
          </p>
        </div>
        <div className="ml-4 flex gap-4 items-center text-sm mt-1 text-gray-600">
          <p>{formatDistanceToNowStrict(new Date(createdAt))} ago</p>

          <button onClick={() => setOpen(!open)}>Reply</button>
        </div>

        <div>{replies.map(reply => <Reply key={reply.createdAt || reply.updatedAt} reply={reply} setOpen={setOpen} />)}</div>

        <ReplyBox open={open} />
      </div>
    </div>
  );
};

export default CommentBox;
