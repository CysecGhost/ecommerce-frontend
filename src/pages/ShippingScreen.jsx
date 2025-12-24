import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../slices/cartSlice";

import FormContainer from "../components/FormContainer";
import Button from "../components/Button";
import { toast } from "react-toastify";

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!address || !city || !postalCode || !country) {
        toast.error("fill the required fields");
        return;
      }
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
      navigate("/payment");
    } catch (err) {
      const message =
        err?.data?.message || err?.error || "Something went wrong";
      console.error(message);
      toast.error(`Error: ${message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh]">
      <FormContainer title={"Shipping"}>
        <Form
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col gap-4"
        >
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
              type="text"
              id="city"
              name="city"
              placeholder="City"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              placeholder="Postal Code"
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <Button type="submit">Continue</Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default ShippingScreen;
