import { useNavigate } from "react-router";

const NotFound = () => {
    const navigate = useNavigate();
    return (
      <section className="flex items-center justify-center min-h-screen">
        <div className="border border-main p-8 rounded-2xl">
          <h2 className="text-center font-bold text-7xl">404</h2>
          <h4 className="font-bold text-4xl">Route Not Found</h4>

          <div className="flex gap-2 mt-4 justify-center">
            <button onClick={() => navigate("/")} className="btn border-none bg-main text-white">
              Go Home
            </button>
            <button onClick={() => navigate(-1)} className="btn bg-sec border-none">
              Go Back
            </button>
          </div>
        </div>
      </section>
    );
};

export default NotFound;