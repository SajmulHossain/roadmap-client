import { formatDistanceToNowStrict } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Reply = ({ reply, setOpen, isDisabled, open }) => {
  const { user } = useAuth();
  const { author, text, createdAt } = reply || {};
  const optBtnRef = useRef(null);
  const optRef = useRef(null);
  const [openOpt, setOpenOpt] = useState(false);

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
            <>
            <div
              ref={optRef}
              className={`absolute top-2 right-8 space-y-2 bg-main p-2 rounded-md`}
            >
              <button onClick={() => setOpen(!open)} className="btn w-full border-none bg-sec">Edit</button>
              <button className="btn w-full border-none bg-amber-600">
                Delete
              </button>
            </div>
              </>
          )}
        </>
      )}
    </div>
  );
};

export default Reply;
