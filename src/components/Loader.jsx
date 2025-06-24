import { FaRoad } from "react-icons/fa";

const Loader = () => {
    return (
      <div className="min-h-screen w-full flex justify-center items-center animate-bounce">
        <FaRoad className="animate-pulse" size={30} />
        <p className="ml-1 text-lg">Loading <span>...</span></p>
      </div>
    );
};

export default Loader;