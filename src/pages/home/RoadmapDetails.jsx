import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";

const RoadmapDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: roadmap = {}, isLoading } = useQuery({
    queryKey: ["roadmap", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/roadmaps/${id}`);
      return data.data || {};
    },
  });

  const { title, description, status, category, upvotes}  = roadmap || {};

  if (isLoading) {
    return (
      <div className="min-h-screen flex-center">
        <Loading />
      </div>
    );
  }

  return (
    <section className="section">
      <div className="max-w-2xl mx-auto border p-6 rounded-md">
        <h3 className="font-semibold">{title}</h3>

      </div>
    </section>
  );
};

export default RoadmapDetails;
