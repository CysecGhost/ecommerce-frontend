import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileQuery } from "../slices/userApiSlice";
import { useLogoutMutation } from "../slices/userApiSlice";
import { setCredentials, logout } from "../slices/authSlice";

import Button from "../components/Button";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: profile, isLoading, error } = useGetProfileQuery();
  const [logoutMutation] = useLogoutMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (profile) {
      dispatch(setCredentials(profile));
    }
  }, [dispatch, profile]);

  const handleLogout = async () => {
    try {
      await logoutMutation();
    } catch (err) {
      const message =
        err?.data?.message || err?.error || "Something went wrong";
      console.error(message);
      toast.error(`Logout Error: ${message}`);
    } finally {
      dispatch(logout());
      navigate("/login");
      toast.success("Logout successful");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading profile</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className=" bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-3xl font-[Montserrat] font-bold md:text-4xl mb-12">
          Profile
        </h1>

        <p className="mb-2">
          <span className="font-semibold">Name:</span> {userInfo?.name}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Email:</span> {userInfo?.email}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Phone:</span> {userInfo?.phone}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Address:</span> {userInfo?.address}
        </p>

        <div className="mt-12 flex justify-between space-x-4">
          <Button onClick={() => navigate("/update-profile")}>
            Edit Profile
          </Button>
          <Button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
