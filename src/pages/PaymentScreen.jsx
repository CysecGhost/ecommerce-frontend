import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";

import FormContainer from "../components/FormContainer";
import Button from "../components/Button";
import { toast } from "react-toastify";

const PaymentScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(savePaymentMethod(paymentMethod));
      navigate("/place-order");
    } catch (err) {
      const message =
        err?.data?.message || err?.error || "Something went wrong";
      console.error(message);
      toast.error(`Error: ${message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh]">
      <FormContainer title={"Payment"}>
        <Form
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col gap-4"
        >
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="paypal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="cod"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="cod">Cash on Delivery</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="stripe"
              name="paymentMethod"
              value="Stripe"
              checked={paymentMethod === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="stripe">Stripe</label>
          </div>

          <Button type="submit">Continue</Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default PaymentScreen;
