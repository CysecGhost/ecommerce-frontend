import { useParams } from "react-router-dom";
import { useGetOrderQuery } from "../slices/orderApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error } = useGetOrderQuery(orderId);

  if (isLoading) return <p className="text-center py-10 text-lg">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 py-10 text-lg">
        {error?.data?.message || "Something went wrong"}
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 tracking-tight">
        Order{" "}
        <span className="text-blue-600 text-2xl md:text-4xl">{order._id}</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Shipping */}
          <div className="p-6 rounded-xl shadow-sm bg-gray-800">
            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
            <p>
              <strong>Name:</strong> {order.user.name}
            </p>
            <p>
              <strong>Email:</strong> {order.user.email}
            </p>
            <p className="mt-2">
              <strong>Address:</strong> {order.shippingAddress.address},{" "}
              {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>

            <div className="mt-4">
              {order.isDelivered ? (
                <p className="text-sm bg-green-100 text-green-700 font-medium px-3 py-1 rounded-md inline-block">
                  Delivered on {order.deliveredAt}
                </p>
              ) : (
                <p className="text-sm bg-red-100 text-red-600 font-medium px-3 py-1 rounded-md inline-block">
                  Not Delivered
                </p>
              )}
            </div>
          </div>

          {/* Payment */}
          <div className="p-6 rounded-xl shadow-sm bg-gray-800">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <p className="capitalize">{order.paymentMethod}</p>

            <div className="mt-4">
              {order.isPaid ? (
                <p className="text-sm bg-green-100 text-green-700 font-medium px-3 py-1 rounded-md inline-block">
                  Paid on {order.paidAt}
                </p>
              ) : (
                <p className="text-sm bg-red-100 text-red-600 font-medium px-3 py-1 rounded-md inline-block">
                  Not Paid
                </p>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="p-6 rounded-xl shadow-sm bg-gray-800">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>

            {order.orderItems.length === 0 ? (
              <p>No items</p>
            ) : (
              <div className="space-y-4">
                {order.orderItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col justify-between items-start space-y-4 border-b pb-3 last:border-b-0"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      <p>{item.name}</p>
                    </div>

                    <p className="font-medium">
                      {item.qty} × ${item.price} ={" "}
                      <strong>${(item.qty * item.price).toFixed(2)}</strong>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN - Summary */}
        <div className="p-6 rounded-xl shadow-sm bg-gray-800 h-fit">
          <h2 className="text-2xl font-bold pb-4 border-b">Order Summary</h2>

          <div className="space-y-3 py-4">
            <div className="flex justify-between">
              <p>Items</p>
              <p className="font-semibold">${order.itemsPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p className="font-semibold">${order.shippingPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Tax</p>
              <p className="font-semibold">${order.taxPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-3">
              <p>Total</p>
              <p>${order.totalPrice.toFixed(2)}</p>
            </div>
          </div>

          {!order.isPaid && order.paymentMethod !== "COD" && (
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Pay Now
            </button>
          )}

          {order.paymentMethod === "COD" && (
            <p className="text-sm text-gray-300 text-center pt-3">
              Cash on Delivery — Pay when product arrives
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
