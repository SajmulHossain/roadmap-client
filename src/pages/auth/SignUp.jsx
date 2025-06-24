import { Link, Navigate, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const SignUp = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const navigate = useNavigate();
    const { mutateAsync, isPending } = useMutation({
      mutationKey: ["login"],
      mutationFn: async (body) => {
        const { data } = await axiosSecure.post("/auth/sign-up", body);
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
        const name = form.name.value;
    
        const body = {
          password,
          email,
          name
        };

        try {
          const data = await mutateAsync(body);
          toast.success(data?.message);
          navigate('/');
        } catch (error) {
          toast.error(error?.response?.data?.message || "Something Went Wrong");
        }
    }
    return (
      <section className="min-h-screen w-full bg-cover bg-center bg-[url(./assets/signUpBg.jpg)]">
        <div className="flex justify-center items-center min-h-screen">
          <form
            onSubmit={handleSubmit}
            className="border p-8 py-10 rounded-md backdrop-blur-lg bg-white/30 w-full max-w-lg text-black"
          >
            <h3 className="font-bold text-xl">Create Account to Roadmap app!</h3>
            <div className="flex flex-col gap-4 mt-6">
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Name"
              />
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
              Create Account
            </button>
            <hr />
            <p className="mt-2 text-sm">
              Already have an account?{" "}
              <Link className="hover:underline" to="/auth/sign-up">Login</Link>
            </p>
          </form>
        </div>
      </section>
    );
};

export default SignUp;