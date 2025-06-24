import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";

const Header = () => {
    const {user} = useAuth();
    const [open, setOpen] = useState(false);

    const links = (
      <>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-main" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/auth/login"
            className={({ isActive }) => (isActive ? "text-main" : "")}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/auth/sign-up"
            className={({ isActive }) => (isActive ? "text-main" : "")}
          >
            Sign Up
          </NavLink>
        </li>
      </>
    );
    return (
      <header className="bg-black text-white flex justify-between py-3 section my-0">
        <div className="flex flex-row-reverse gap-4 items-center">
          <h3>Roadmap App</h3>
          <button className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
            <FaBarsStaggered />
          </button>
        </div>

        <nav>
          <ul className="hidden gap-8 md:flex">{links}</ul>
        </nav>

        {user && <p>Welcome {user?.name}</p>}

        <ul className={`absolute top-12 bg-black h-full px-10 z-50 py-6 ${open ? 'left-0' : 'right-full'} transition-all duration-200 ease-in`}>
            {
                links
            }
        </ul>
      </header>
    );
};

export default Header;