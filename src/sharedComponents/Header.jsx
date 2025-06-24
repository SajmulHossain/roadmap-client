import { NavLink } from "react-router";

const Header = () => {
    return (
        <header className="bg-black text-white flex justify-between py-3 section my-0">
            <h3>Roadmap App</h3>

            <nav>
                <ul className="flex gap-8">
                    <li><NavLink to='/' className={({isActive}) => isActive ? 'text-main': ''}>Home</NavLink></li>
                    <li><NavLink to='/auth/login' className={({isActive}) => isActive ? 'text-main': ''}>Login</NavLink></li>
                    <li>
                        <NavLink to='/auth/sign-up' className={({isActive}) => isActive ? 'text-main': ''}>Sign Up</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;