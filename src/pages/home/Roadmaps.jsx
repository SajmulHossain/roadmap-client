import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Roadmaps = () => {
  const axiosSecure = useAxiosSecure();
    const { data = [], isLoading } = useQuery({
      queryKey: ["roadmaps"],
      queryFn: async () => {
          const { data } = await axiosSecure("/roadmaps");
          return data || [];
      },
    });
    return (
        <section>
            
        </section>
    );
};

export default Roadmaps;