import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`}>
      <div className="md:px-4 px-2 py-6 flex flex-col justify-center items-start space-y-2 space-x-0 shadow-lg border-b-2 border-b-gray-900 rounded-lg transition duration-500 ease-in-out transform md:hover:scale-110">
        <div className="w-full h-full overflow-hidden ">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full"
          />
        </div>

        <div className="w-60 flex flex-col justify-center items-start space-y-1 space-x-0">
          <p className="text-gray-400 text-sm">{product.category}</p>
          <h3 className="text-md">{product.name}</h3>
          <p className="text-gray-400 pt-2">${product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
