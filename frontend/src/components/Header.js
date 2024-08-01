import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { useLazyLogoutUserQuery } from "../redux/services/authApi";

const Header = () =>{
  const { user } = useSelector((state) => state.user);
  const [logoutUser] = useLazyLogoutUserQuery();

  async function handleLogout(e){
    e.preventDefault();
    await logoutUser(user);
    window.location.replace("/");
  }

  return(
    <div className="navbar bg-green-500 p-3">
      <div className="flex-1">
        <Link to="/" className="text-xl">
        <h1 className="mb-1 text-4xl font-bold
        sm:text-xl sm:mt-2
        md:mt-1">Plant Care Automation</h1>
        </Link>
      </div>
      {user && (
        <div className="dropdown dropdown-end p-2.5">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="w-10 rounded-full justify-center">
            <h1 className="grid-area-[1/1/3/2] flex justify-center items-center uppercase
            bg-black font-sans text-2xl font-bold text-white
            h-12 w-12 rounded-full justify-self-center
            self-center">{user.name[0]}</h1>
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content
          bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/profile/my_profile" className="text-2xl mb-4">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="btn btn-md bg-red-500 text-white rounded-lg">Logout</button>
            </li>
          </ul>
        </div>
      )}
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 mt-1">
        <Link to="/register"
        className="btn btn-ghost text-[1.2rem]
        sm:text-[1rem] sm:mt-[0.3rem]
        md:text-[1.2rem] md:mt-[0.3rem]"
        hidden={user}>Register</Link>
        </ul>
        <ul>
        <Link to="/login"
        className="btn btn-ghost text-[1.2rem] mt-1
        sm:text-[1rem] sm:mt-2.5
        md:text-[1.2rem] md:mt-[0.55rem]"
        hidden={user}>Login</Link>
        </ul>
      </div>
    </div>
  )
}

export default Header;