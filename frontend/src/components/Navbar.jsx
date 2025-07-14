import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

export default function Navbar() {
  const handleThemeChange = (theme) => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contactus">Contact Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Themes
                </summary>
                <ul className="p-2 z-50">
                  <li><button onClick={() => handleThemeChange("light")}>Light</button></li>
                  <li><button onClick={() => handleThemeChange("bumblebee")}>Bumblebee</button></li>
                  <li><button onClick={() => handleThemeChange("cupcake")}>Cupcake</button></li>
                  <li><button onClick={() => handleThemeChange("forest")}>Forest</button></li>
                  <li><button onClick={() => handleThemeChange("dark")}>Dark</button></li>
                  <li><button onClick={() => handleThemeChange("synthwave")}>Synthwave</button></li>
                </ul>
              </details>
            </li>
          </ul>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">Career Forage</Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/services">Services</Link></li>
        </ul>
      </div>

      <div className="navbar-end">
        {/* Theme selector - shown on desktop */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Themes
                </summary>
                <ul className="p-2 z-50">
                  <li><button onClick={() => handleThemeChange("light")}>Light</button></li>
                  <li><button onClick={() => handleThemeChange("bumblebee")}>Bumblebee</button></li>
                  <li><button onClick={() => handleThemeChange("cupcake")}>Cupcake</button></li>
                  <li><button onClick={() => handleThemeChange("forest")}>Forest</button></li>
                  <li><button onClick={() => handleThemeChange("dark")}>Dark</button></li>
                  <li><button onClick={() => handleThemeChange("synthwave")}>Synthwave</button></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        {/* User button or sign-in */}
        <div className="dropdown dropdown-end">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <button 
              onClick={openSignIn} 
              className="bg-primary text-white px-5 py-2 rounded-full hover:bg-primary-focus transition-colors"
            >
              Create Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}