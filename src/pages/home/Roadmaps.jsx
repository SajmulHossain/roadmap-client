import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const Roadmaps = () => {
    const { data = [], isLoading } = useQuery({
      queryKey: ["roadmaps"],
      queryFn: async () => {
        const { data } = await axios("http://localhost:3000/api/roadmaps");
        return data || [];
      },
    });
    return (
        <section>
            
        </section>
    );
};

export default Roadmaps;