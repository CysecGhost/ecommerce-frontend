import { useGetFeaturedQuery } from "../slices/productApiSlice";
import ProductCard from "../components/ProductCard";

const FeaturedScreen = () => {
  const { data: products, isLoading, error } = useGetFeaturedQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading featured products</p>;

  return (
    <section className="relative px-2 py-2 border-b-2 border-b-gray-900">
      {/* Flex Container */}
      <div className="flex flex-col">
        {/* Heading and Subtext */}
        <div className="flex flex-col justify-center items-center space-y-4">
          <h2 className="text-3xl font-[Montserrat] font-bold md:text-4xl">
            Featured
          </h2>
          <p className="hidden md:flex text-gray-400">
            Discover our curated selection of products that we think you'll
            love.
          </p>
        </div>

        {/* Flex Container */}
        <div className="container mx-auto w-full flex flex-col justify-center items-center space-y-6 relative mt-2 overflow-hidden">
          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedScreen;
