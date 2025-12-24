import { useGetTrendingQuery } from "../slices/productApiSlice";
import ProductCard from "../components/ProductCard";

const TrendingScreen = () => {
  const { data: products, isLoading, error } = useGetTrendingQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading trending products</p>;

  return (
    <section className="relative py-12 border-b-2 border-b-gray-900">
      {/* Flex Container */}
      <div className="flex flex-col space-y-6 space-x-0">
        {/* Heading and Subtext */}
        <div className="flex flex-col justify-center items-center space-y-4 space-x-0">
          <h2 className="text-3xl font-[Montserrat] font-bold md:text-4xl">
            Products
          </h2>
          <p className="text-gray-400">
            Check out our trending products and see what's popular among our
            customers.
          </p>
        </div>

        {/* Flex Container */}
        <div className="container mx-auto w-full flex flex-col justify-center items-center space-y-6 space-x-0 relative mt-6 overflow-hidden">
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingScreen;
