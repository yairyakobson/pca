import { useSelector } from "react-redux";
import { format } from "date-fns";

const Profile = () =>{
  const { user } = useSelector((state) => state.user);
  let currentDate = format(new Date(user.date), "MMMM do yyyy");

  return(
    <div>
      <div className="my-8 mx-auto">
        <h2 className="text-5xl text-center font-bold">{`${user.name}'s Sidebar`}</h2>
      </div>
      <div className="justify-around">
        <div>
          <h4 className="text-2xl text-center font-bold">Username:</h4>
          <p className="text-base text-center mt-2">{user.name}</p>

          <h4 className="text-2xl text-center font-bold mt-4">Email Address:</h4>
          <p className="text-base text-center mt-2">{user.email}</p>

          <h4 className="text-2xl text-center font-bold mt-4">Joined:</h4>
          <p className="text-base text-center mt-2
          md:mb-8">{currentDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;