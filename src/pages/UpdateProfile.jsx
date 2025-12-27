import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";

import FormContainer from "../components/FormContainer";
import Button from "../components/Button";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState(userInfo?.name || "");
  const [phone, setPhone] = useState(userInfo?.phone || "");
  const [address, setAddress] = useState(userInfo?.address || "");
  const [email, setEmail] = useState(userInfo?.email || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        name === userInfo?.name &&
        email === userInfo?.email &&
        phone === userInfo?.phone &&
        address === userInfo?.address
      ) {
        toast.error("Nothing to update!");
        return;
      }

      const res = await updateProfile({
        name,
        phone,
        address,
        email,
      }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Profile updated");
      navigate("/profile");
    } catch (err) {
      const message =
        err?.data?.message || err?.error || "Something went wrong";
      console.error(message);
      toast.error(`Registration Error: ${message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh]">
      <FormContainer title={"Update Profile"}>
        <Form
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col gap-4"
        >
          <div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="*Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="*Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default UpdateProfile;
