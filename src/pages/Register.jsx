import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";

import FormContainer from "../components/FormContainer";
import Button from "../components/Button";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading, error }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      } else if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      } else if (!name || !email || !password || !confirmPassword) {
        toast.error("fill the required fields");
        return;
      }

      const res = await register({
        name,
        phone,
        address,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials(res));
      navigate("/profile");
      toast.success("Registration successful");
    } catch (err) {
      const message =
        err?.data?.message || err?.error || "Something went wrong";
      console.error(message);
      toast.error(`Registration Error: ${message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh]">
      <FormContainer title={"Register"}>
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

          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="*Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="*Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </Button>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-500 transition"
              >
                Login
              </Link>
            </p>
          </div>
        </Form>
      </FormContainer>
    </div>
  );
};

export default Register;
