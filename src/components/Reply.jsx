import { formatDistanceToNowStrict } from "date-fns";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Reply = ({ reply, setOpen, isDisabled }) => {
  const {user} = useAuth();
  const { author, text, createdAt } = reply || {};

  return (
    <div className="flex gap-4 relative">
      <div>
        <FaRegUserCircle size={30} />
      </div>
      <div className="w-full">
        <div className="w-full bg-main/20 p-3 rounded-2xl">
          <h3 className="font-semibold text-sm">{author?.name}</h3>
          <p className="text-sm mt-1">{text}</p>
        </div>
        <div className="ml-4 flex gap-4 items-center text-xs mt-1 text-gray-600">
          <p>{formatDistanceToNowStrict(new Date(createdAt))} ago</p>

          <button
            disabled={isDisabled}
            className={`${isDisabled ? "line-through" : ""}`}
            onClick={() => setOpen((open) => !open)}
          >
            Reply
          </button>
        </div>
      </div>

      {user?._id === author._id && (
        <>
          <button className="absolute top-4 right-3">
            <BsThreeDotsVertical />
          </button>
        </>
      )}
    </div>
  );
};

export default Reply;
