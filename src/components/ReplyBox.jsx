import { useRef } from "react";
import { IoSend } from "react-icons/io5";
import Loading from "./Loading";

const ReplyBox = ({ open, setOpen, reply, edit }) => {
  const sendRef = useRef(null);
  const { postReply, isReplying } = reply || {};

  const handleReply = async (e) => {
    e.preventDefault();

    const text = e.target.reply.value;

    await postReply({ text });
    e.target.reset();
  };

  const handleChange = (e) => {
    if (e.target.value.length === 0) {
      sendRef.current.disabled = true;
    } else {
      sendRef.current.disabled = false;
    }
  };
  return (
    <div className={`${edit ? "mt-16" : "mt-3"} ${
        open || edit ? "block" : "hidden"
      }`}
    >
      <form onSubmit={handleReply}>
        <div className="flex justify-between">
          <input
            className="input rounded-r-none"
            type="text"
            name="reply"
            placeholder={edit ? "Edit" : "Reply"}
            onChange={handleChange}
            defaultValue={reply?.value}
          />
          <button
            type="submit"
            ref={sendRef}
            disabled={isReplying || true}
            className="btn rounded-l-none"
          >
            Reply {isReplying ? <Loading /> : <IoSend />}
          </button>
        </div>
      </form>

      <button onClick={() => setOpen(false)} className="text-xs hover:underline text-main">Cancel</button>
    </div>
  );
};

export default ReplyBox;
