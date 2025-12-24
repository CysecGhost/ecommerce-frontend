import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../slices/productApiSlice";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "../components/Button";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const { id } = useParams();
  const { data: product, isLoading, error } = useGetSingleProductQuery(id);

  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = () => {
    try {
      dispatch(addToCart({ ...product, qty: Number(qty), mode: "increment" }));
      toast.success("Product added to cart");
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading featured products</p>;

  return (
    <section className="relative py-2 px-2 border-b-2 border-b-gray-900">
      {/* Flex Container */}
      <div className="flex flex-col space-y-6 space-x-0">
        {/* Product */}
        <div className="flex flex-col space-y-6 space-x-0 py-12 md:flex-row md:space-y-0 md:space-x-6">
          {/* Image */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-4 space-x-0">
            <img src={product.image} alt={product.name} className="" />
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/3 flex flex-col justify-start items-start space-y-4 space-x-0">
            {/* Info */}
            <div>
              <p className="text-gray-400 text-sm">{product.category}</p>
              <h3 className="text-md font-semibold">{product.name}</h3>
              <p className="text-gray-400 pt-2">${product.price}</p>
              <p className="text-gray-400 pt-2">{product.stock}</p>
            </div>

            {product.countInStock > 0 && (
              <div className="flex items-center gap-3">
                <label className="font-semibold">Qty:</label>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="border p-2 rounded border-gray-800 shadow-md bg-gray-900"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Cart Button */}
            <div className="w-full flex flex-col justify-center items-start space-y-4 space-x-0">
              <Button
                width={"w-full"}
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                {product.countInStock === 0 ? "Out of Stock" : "Add To Cart"}
              </Button>
            </div>

            {/* Details */}
            <div className="w-full flex flex-col justify-between items-center mt-4 py-4 border-y-2 border-y-gray-800">
              <div
                onClick={() =>
                  document
                    .getElementById("details")
                    .classList.toggle("max-h-96")
                }
                className="w-full flex justify-between items-center cursor-pointer"
              >
                <p className="font-bold text-2xl">Details</p>
                <span className="font-bold text-2xl">+</span>
              </div>
              <div
                id="details"
                className="w-full max-h-0 flex flex-col justify-center items-start transition-all duration-700 ease-in-out overflow-hidden"
              >
                <p className="text-gray-400 text-sm">{product.category}</p>
                <div className="w-full flex flex-col justify-center items-start px-4 py-2 space-y-2 space-x-0">
                  <div className="flex flex-row items-center space-x-2">
                    <h3 className="text-sm font-semibold">Brand: </h3>
                    <p className="text-gray-400 text-sm">{product.brand}</p>
                  </div>
                  <div className="flex flex-row items-center space-x-2">
                    <h3 className="text-sm font-semibold">Color: </h3>
                    <p className="text-gray-400 text-sm">{product.color}</p>
                  </div>
                  <div className="flex flex-row items-center space-x-2">
                    <h3 className="text-sm font-semibold">Warranty: </h3>
                    <p className="text-gray-400 text-sm">{product.warranty}</p>
                  </div>
                  <div className="flex flex-row items-center space-x-2">
                    <h3 className="text-sm font-semibold">Description: </h3>
                    <p className="text-gray-400 text-sm">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductScreen;
