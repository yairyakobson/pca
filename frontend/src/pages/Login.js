import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { useLogUserMutation } from "../redux/services/authApi";

const Login = () =>{
  const [data, setData] = useState({
    email: "",
    password: ""
 });
 const { email, password } = data

 const navigate = useNavigate();

 const { isAuthenticated, user } = useSelector((state) => state.user);
 const [logUser, { error, isLoading }] = useLogUserMutation();

 const dataHandler=({ currentTarget: input }) =>{
   setData({ ...data, [input.name]: input.value });
 }

 useEffect(() =>{
  if(isAuthenticated){
    toast.success(`Welcome Back ${user.name}`);
    navigate("/");
  }
  if(error){
    toast.error(error?.data?.message)
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [error, isAuthenticated]);

 const handleLogin = (e) =>{
   e.preventDefault();
   logUser({ email, password });
 }

  return(
    <form onSubmit={handleLogin} className="flex items-center justify-center h-[40rem]">
      <div className="w-full max-w-md p-6 bg-white shadow-2xl rounded-lg space-y-6">
      <h1 className="mt-4 text-center text-2xl font-bold text-gray-900">Login</h1>

      <section className="mb-4">
        <label className="block mb-2">Email</label>
        <input className="w-full p-2 border rounded-lg"
        type="text"
        name="email"
        value={email}
        onChange={dataHandler}
        required/>
      </section>
      
      <section className="mb-4">
        <label className="block mb-2">Password</label>
        <input className="w-full p-2 border rounded-lg"
        type="password"
        name="password"
        value={password}
        onChange={dataHandler}
        required/>
      </section>

      <button type="submit" className={`btn btn-md bg-green-600 text-white rounded-lg ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}>Login</button> 
      <p className="text-center">
        Don't have an account? <Link to="/register" className="underline">Create one</Link>
      </p>
      </div>
    </form>
  );
}

export default Login;