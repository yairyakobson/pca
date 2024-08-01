import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useRegUserMutation } from "../redux/services/authApi";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const { name, email, password } = data

  const navigate = useNavigate();
  
  const { isAuthenticated } = useSelector((state) => state.user);
  const [regUser, { error, isLoading }] = useRegUserMutation();

  const dataHandler = (e) =>{
    setData({ ...data, [e.target.name]: e.target.value });
  }

  useEffect(() =>{
    if(isAuthenticated){
      toast.error("You Are Already Logged In.");
      navigate("/");
    }
    if(error){
      toast.error(error?.data?.message);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isAuthenticated]);

  const handleRegister = (e) =>{
    e.preventDefault();
    const data = { name, email, password }
    regUser(data).then(({ data }) =>{
      if(data){
        toast.success("Welcome New User");
        navigate("/");
      }
    });
  }

  return(
    <form onSubmit={handleRegister} className="flex items-center justify-center h-[40rem]">
      <div className="w-full max-w-md p-6 bg-white shadow-2xl rounded-lg space-y-6">
      <h1 className="mt-4 text-center text-2xl font-bold text-gray-900">Register</h1>

      <section className="mb-4">
        <label className="block mb-2">Username</label>
        <input className="w-full p-2 border rounded-lg"
        type="text"
        name="name"
        value={name}
        onChange={dataHandler}
        required/>
      </section>

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

      <button type="submit" className={`btn btn-md bg-green-600 text-white rounded-lg ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}>Sign Up</button> 
      <div className="py-4">
        <p className="text-center">
          Already have an account? <Link to="/login" className="underline">Login</Link>
        </p>
      </div>
      </div>
    </form>
  );
};

export default Register;