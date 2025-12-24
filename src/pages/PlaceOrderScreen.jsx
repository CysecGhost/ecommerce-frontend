import { useEffect } from "react";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { clearCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 15;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!paymentMethod) {
      navigate("/payment");
    } else if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [paymentMethod, shippingAddress, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap();

      dispatch(clearCart());
      navigate(`/orders/${res._id}`);
    } catch (err) {
      alert(err?.data?.message || "Order failed");
    }
  };

  return (
    <section className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Place Order</h2>

      {/* Order Items Summary */}
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="border-b p-2 flex justify-between">
              <Link
                to={`/products/${item._id}`}
                className="hover:text-blue-400 transition"
              >
                {item.name}
              </Link>
              <p>
                {item.qty} x ${item.price}
              </p>
            </div>
          ))}

          <div className="bg-gray-800 rounded-md p-4 space-y-2">
            <p>Items: ${itemsPrice.toFixed(2)}</p>
            <p>Shipping: ${shippingPrice.toFixed(2)}</p>
            <p>Tax: ${taxPrice.toFixed(2)}</p>
            <p className="font-bold text-lg">Total: ${totalPrice}</p>
          </div>

          <Button
            width="w-full"
            onClick={placeOrderHandler}
            disabled={isLoading}
          >
            {isLoading ? "Placing Order..." : "Place Order"}
          </Button>
        </>
      )}
    </section>
  );
};

export default PlaceOrderScreen;
