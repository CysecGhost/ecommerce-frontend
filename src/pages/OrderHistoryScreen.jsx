import Button from "../components/Button.jsx";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../slices/orderApiSlice.js";

const OrderHistoryScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading orders</p>;

  return (
    <>
      <section className="hidden md:block container mx-auto h-screen">
        <div className="text-2xl md:text-3xl font-[Montserrat] text-center py-8">
          <h1>Order History</h1>
        </div>
        <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-gray-800 rounded-lg border-b-2 border-b-gray-900">
          <div>
            <h2>Id</h2>
          </div>
          <div>
            <h2>Items</h2>
          </div>
          <div>
            <h2>Date</h2>
          </div>
          <div>
            <h2>Total</h2>
          </div>
        </div>

        {orders?.map((order) => {
          return (
            <div
              key={order._id}
              className="grid grid-cols-4 gap-4 px-4 py-2 rounded-lg border-b-2 border-gray-800"
            >
              <div className="text-sm flex flex-col justify-center items-start space-y-6 pt-4">
                <Link
                  to={`/orders/${order._id}`}
                  className="hover:text-blue-400"
                >
                  {order._id}
                </Link>
              </div>
              <div className="text-sm flex flex-col justify-center items-start space-y-6 pt-4">
                <p>{order.orderItems.length}</p>
              </div>
              <div className="text-sm flex flex-col justify-center items-start space-y-6 pt-4">
                <p>{order.createdAt}</p>
              </div>
              <div className="text-sm flex flex-col justify-center items-start space-y-6 pt-4">
                <p>${order.totalPrice}</p>
              </div>
            </div>
          );
        })}
      </section>
      {/* Mobile View */}
      <section className="md:hidden px-2">
        <div className="flex flex-col justify-center">
          <div className="text-2xl md:text-3xl font-[Montserrat] text-center py-8">
            <h1>Order History</h1>
          </div>
          <div className="flex justify-center items-center gap-6">
            <div className="bg-blue-950 px-6 py-2 rounded-full">
              Orders: {orders?.length}
            </div>
            <div className="bg-blue-950 px-6 py-2 rounded-full">
              Products:{" "}
              {orders?.reduce((acc, order) => acc + order.orderItems.length, 0)}
            </div>
          </div>

          {orders?.map((order) => {
            return (
              <div className="flex flex-col justify-center items-start py-2 rounded-lg border-b-2 border-gray-800">
                <div className="w-full flex justify-between px-2 py-2 rounded-lg">
                  <div className="w-70">
                    {order.orderItems.map((item) => {
                      return (
                        <div className="flex flex-row justify-center items-start">
                          <div className="w-30">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full mt-2 rounded-md"
                            />
                          </div>
                          <div className="w-full h-full flex flex-col gap-1 px-2 pt-1">
                            <p className="text-md">{item.name}</p>
                            <p className="text-sm text-gray-300">
                              ID: {order._id.slice(0, 8)}
                            </p>
                            <p className="text-sm text-gray-300">
                              {order.createdAt.slice(0, 10)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-col justify-between items-center pt-4">
                    <p className="text-md">${order.totalPrice}</p>
                    <Link
                      to={`/orders/${order._id}`}
                      className="text-sm text-gray-300 font-semibold hover:text-gray-200"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default OrderHistoryScreen;
