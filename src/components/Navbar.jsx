import { Link, NavLink } from "react-router-dom";


const Navbar = () => {
    const navlinks = <>
      <li><NavLink to='/'>Home</NavLink></li>
      {/* <li><NavLink to='/about'>About</NavLink></li> */}
     
    </>
    return (
        <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content text-black bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                {navlinks}
            </ul>
          </div>
          <a className="btn btn-ghost text-4xl font-bold">Product</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
          {navlinks}
          </ul>
        </div>
        <div className="navbar-end">
          <Link to='/' className="btn btn-outline bg-[#F8B90C] btn-[#262626] rounded-full text-xl font-bold">Login</Link>
          {/* <a className="btn">Contact</a> */}
        </div>
      </div>
    );
};

export default Navbar;