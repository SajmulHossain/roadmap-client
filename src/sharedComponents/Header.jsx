import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import Logout from "../components/Logout";

const Header = () => {
    const {user} = useAuth();
    const [open, setOpen] = useState(false);

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
      <header className="bg-black text-white py-3">
        <section className="section py-0 my-0 flex justify-between">
          <div className="flex flex-row-reverse gap-4 items-center">
            <h3>Roadmap App</h3>
            <button
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
            <div className="flex items-center gap-6">
              <p>Welcome {user?.name}</p> <Logout />
            </div>
          )}

          <ul
            className={`absolute top-12 bg-black h-full px-10 z-50 py-6 ${
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