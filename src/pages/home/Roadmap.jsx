import { MdHowToVote } from "react-icons/md";

const Roadmap = ({ roadmap }) => {
  const { title, category, description, status, upvotes } = roadmap || {};
  return (
    <div className="rounded-md border p-4 flex flex-col justify-between">
      <h3 className="font-bold text-2xl mb-4">{title}</h3>
      {description && <p className="mb-3">{description}</p>}

      <div className="flex items-center justify-between">
        <p className="flex items-center gap-4">
          <button>
            <MdHowToVote size={30} />
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
