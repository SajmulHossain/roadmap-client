import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import Logout from "../components/Logout";

const Header = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const navRef = useRef(null);

  const handleClick = (e) => {
    if (
      !(
        btnRef.current?.contains(e.target) || navRef.current?.contains(e.target)
      )
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const links = (
    <>
      <li>
        <NavLink
          onClick={() => setOpen(false)}
          to="/"
          className={({ isActive }) => (isActive ? "text-sec" : "")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => setOpen(false)}
          to="/auth/login"
          className={({ isActive }) => (isActive ? "text-sec" : "")}
        >
          Login
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => setOpen(false)}
          to="/auth/sign-up"
          className={({ isActive }) => (isActive ? "text-sec" : "")}
        >
          Sign Up
        </NavLink>
      </li>
    </>
  );
  return (
    <header className="bg-black text-white py-3 sticky top-0">
      <section className="section py-0 my-0 flex justify-between">
        <div className="flex flex-row-reverse gap-1 sm:gap-4 items-center">
          <h3>Roadmap App</h3>
          <button
            ref={btnRef}
            className="md:hidden cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <FaBarsStaggered />
          </button>
        </div>

        <nav>
          <ul className="hidden gap-8 md:flex">{links}</ul>
        </nav>

        {user && (
          <div className="flex items-center gap-2 sm:gap-6">
            <p className="line-clamp-1">{user?.name}</p> <Logout />
          </div>
        )}

        <ul
          ref={navRef}
          className={`absolute top-12 bg-black h-screen px-10 z-50 py-6 ${
            open ? "left-0" : "right-full"
          } transition duration-200 ease-in`}
        >
          {links}
        </ul>
      </section>
    </header>
  );
};

export default Header;
