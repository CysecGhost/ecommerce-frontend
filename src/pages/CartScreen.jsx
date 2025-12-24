import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import Button from "../components/Button";
import Footer from "../components/Footer";

const CartScreen = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <section className="h-[60vh]">
      {/* Flex Container */}
      <div className="max-w-[1200px] md:mx-auto py-2 md:py-12">
        {/* Heading */}
        {cartItems.length > 0 && (
          <h2 className="text-2xl text-center font-[Montserrat] font-bold mb-4 md:text-4xl">
            Your Cart ({cartItems.reduce((a, x) => a + x.qty, 0)} items)
          </h2>
        )}

        {cartItems.length === 0 ? (
          <div className="w-full flex flex-col justify-end items-center py-4 space-x-0 space-y-6 mb-70">
            <p className="mt-4 text-lg">No items in your cart</p>
            <Link to={"/"} className="w-1/3">
              <Button width={"w-full"}>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center space-y-6 space-x-0 md:gap-6 md:items-start md:flex-row">
            <div className="flex-1 w-full">
              {cartItems.map((item) => (
                <div className="relative space-y-4" key={item._id}>
                  <div className="flex justify-between items-center space-x-6 space-y-0 border-b-2 border-b-gray-800 shadow-md p-4 rounded">
                    <div className="flex justify-between items-center gap-3">
                      <div>
                        <Link to={`/products/${item._id}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-25 h-40 md:w-30 md:h-40 object-cover rounded"
                          />
                        </Link>
                      </div>
                      <div className="flex flex-col justify-start items-start space-y-1 md:space-y-3">
                        <Link
                          className="hover:text-blue-400"
                          to={`/products/${item._id}`}
                        >
                          {item.name}
                        </Link>
                        <p>${item.price}</p>
                        <p>Color: {item.color}</p>
                        <div className="flex md:hidden">
                          {item.countInStock > 0 && (
                            <div className="flex items-center gap-3">
                              <label className="font-semibold">Qty:</label>
                              <select
                                value={item.qty}
                                onChange={(e) =>
                                  dispatch(
                                    addToCart({
                                      ...item,
                                      qty: Number(e.target.value),
                                      mode: "replace",
                                    })
                                  )
                                }
                                className="border p-2 rounded border-gray-800 shadow-md bg-gray-900"
                              >
                                {[...Array(item.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex md:absolute md:top-5 md:right-10">
                      {item.countInStock > 0 && (
                        <div className="flex items-center gap-3">
                          <label className="font-semibold">Qty:</label>
                          <select
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart({
                                  ...item,
                                  qty: Number(e.target.value),
                                  mode: "replace",
                                })
                              )
                            }
                            className="border p-2 rounded border-gray-800 shadow-md bg-gray-900"
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => removeItem(item._id)}
                      className="cursor-pointer absolute top-6 right-3"
                    >
                      <svg
                        width="20"
                        height="26"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.64702 3.72727C6.64702 3.00396 6.91745 2.31026 7.39883 1.7988C7.88021 1.28734 8.53309 1 9.21386 1C9.89463 1 10.5475 1.28734 11.0289 1.7988C11.5103 2.31026 11.7807 3.00396 11.7807 3.72727M6.64702 3.72727H1M6.64702 3.72727H11.7807M11.7807 3.72727H17M16.0588 3.72727L14.6063 16.1025C14.5196 16.9002 14.16 17.6362 13.5958 18.1704C13.0317 18.7047 12.3023 18.9999 11.5466 19H6.88111C6.12539 18.9999 5.39605 18.7047 4.83188 18.1704C4.26772 17.6362 3.90809 16.9002 3.82143 16.1025L1.94118 3.72727M7.16039 8.09091V14.6364M11.2673 14.6364V8.09091"
                          stroke="#FFFFFF"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full md:w-1/4 flex flex-col space-y-4 border-b border-gray-800 shadow-lg rounded p-4">
              <div className="flex flex-col space-y-4 bg-gray-800 p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold pb-4 border-b">
                  Order Summary
                </h2>
                <p className="text-sm">
                  Items: {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </p>
                <p className="text-sm">
                  Total: $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </p>
              </div>
              <Link to={"/shipping"}>
                <Button width={"w-full"}>Checkout</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </section>
  );
};

export default CartScreen;
