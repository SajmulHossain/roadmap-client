import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Roadmap from "./Roadmap";


const Roadmaps = () => {
  const axiosSecure = useAxiosSecure();
    const { data:roadmaps = [], isLoading } = useQuery({
      queryKey: ["roadmaps"],
      queryFn: async () => {
          const { data } = await axiosSecure("/roadmaps");
          return data.data || [];
      },
    });

    console.log(roadmaps);
    return (
        <section>
            {
              roadmaps.map(roadmap => <Roadmap key={roadmap._id} roadmap={roadmap} />)
            }
        </section>
    );
};

export default Roadmaps;