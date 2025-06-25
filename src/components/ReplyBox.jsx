import { useRef } from "react";
import { IoSend } from "react-icons/io5";

const ReplyBox = ({ open, isReplying, postReply}) => {
    const sendRef = useRef(null);
    const handleReply = async e => {
        e.preventDefault();

        const text = e.target.reply.value;

        await postReply({text});
    }

    const handleChange = (e) => {
      if (e.target.value.length === 0) {
        sendRef.current.disabled = true;
      } else {
        sendRef.current.disabled = false;
      }
    };
    return (
      <div className={`mt-3 ${open? 'block': 'hidden'}`}>
        <form onSubmit={handleReply}>
          <div className="flex justify-between">
            <input
              className="input rounded-r-none"
              type="text"
              name="reply"
              placeholder="Leave a comment"
              onChange={handleChange}
            />
            <button
              type="submit"
              ref={sendRef}
              disabled={isReplying || true}
              className="btn rounded-l-none"
            >
              Reply <IoSend />
            </button>
          </div>
        </form>
      </div>
    );
};

export default ReplyBox;