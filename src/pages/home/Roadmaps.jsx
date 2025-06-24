import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Roadmap from "./Roadmap";


const Roadmaps = () => {
  const axiosSecure = useAxiosSecure();
    const { data:roadmaps = [...Array(9)], isLoading } = useQuery({
      queryKey: ["roadmaps"],
      queryFn: async () => {
          const { data } = await axiosSecure("/roadmaps");
          return data.data || [];
      },
    });

    
    return (
      <section className="section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? 
            roadmaps.map((_, idx) => <div key={idx} className="skeleton"></div>)
          : roadmaps.map((roadmap) => (
              <Roadmap key={roadmap._id} roadmap={roadmap} />
            ))}
      </section>
    );
};

export default Roadmaps;