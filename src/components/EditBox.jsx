import { useRef } from "react";
import { IoSend } from "react-icons/io5";
import Loading from "./Loading";

const EditBox = ({ open,setOpen, data, text}) => {
  const sendRef = useRef(null);
  const [post, isPending] = data || {};

  const handleEdit = async (e) => {
    e.preventDefault();

    const text = e.target.edit.value;

    await post({ text });
    e.target.reset();
    setOpen(false);
  };

  const handleChange = (e) => {
    if (e.target.value.length === 0 || e.target.value === text) {
      sendRef.current.disabled = true;
    } else {
      sendRef.current.disabled = false;
    }
  };
  return (
    <div className={`${open ? "block mt-16" : "hidden"}`}>
      <form onSubmit={handleEdit}>
        <div className="flex justify-between">
          <input
            className="input rounded-r-none"
            type="text"
            name="edit"
            placeholder="Edit"
            onChange={handleChange}
            defaultValue={text || ''}
          />
          <button
            type="submit"
            ref={sendRef}
            disabled={isPending || true}
            className="btn rounded-l-none"
          >
            Done {isPending ? <Loading /> : <IoSend />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBox;
