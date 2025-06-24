import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";

const Login = () => {
  const { setUser, user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { state } = useLocation();


  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (body) => {
      const { data } = await axiosSecure.post("/auth/login", body);
      return data;
    },
  });

  
  if (user) {
    return <Navigate to="/" replace={true} />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const password = form.password.value;
    const email = form.email.value;

    const body = {
      password,
      email,
    };

    try {
      const data = await mutateAsync(body);
      toast.success(data?.message);
      setUser(data.data);
      navigate(state || "/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    }
  };
  return (
    <section className="min-h-screen w-full bg-cover bg-center bg-[url(./assets/loginBg.jpg)]">
      <div className="section my-0 py-0">
        <div className="flex justify-center items-center min-h-screen">
          <form
            onSubmit={handleSubmit}
            className="border p-8 py-10 rounded-md backdrop-blur-lg bg-white/30 w-full max-w-lg text-white"
          >
            <h3 className="font-bold text-xl">Login to Roadmap app!</h3>
            <div className="flex flex-col gap-4 mt-6">
              <input
                className="input"
                type="text"
                name="email"
                placeholder="Email"
              />
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Password"
              />
              <hr />
            </div>
            <button
              disabled={isPending}
              className="btn my-4 w-full"
              type="submit"
            >
              Login {isPending && <Loading />}
            </button>
            <hr />
            <p className="mt-2 text-sm">
              Don't have an account?{" "}
              <Link className="hover:underline" to="/auth/sign-up">
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
