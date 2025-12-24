import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productApiSlice";
import ProductCard from "../components/ProductCard";

const ProductsScreen = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "newest";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 12;
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");

  const minPrice = minPriceParam !== null ? Number(minPriceParam) : undefined;

  const maxPrice = maxPriceParam !== null ? Number(maxPriceParam) : undefined;

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    category,
    sort,
    page,
    limit,
    minPrice,
    maxPrice,
  });

  const products = data?.products || [];
  const pages = data?.pages || 1;
  const priceRange = data?.priceRange;

  const categories = [
    "Electronics",
    "Computer",
    "Wearables",
    "Storage",
    "Gaming",
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  const sliderMin = minPrice ?? priceRange?.min;
  const sliderMax = maxPrice ?? priceRange?.max;

  return (
    <section className="relative px-2 py-2 border-b-2 border-b-gray-900">
      {/* Flex Container */}
      <div className="flex flex-col space-y-2 space-x-0">
        {/* Heading and Subtext */}
        <div className="flex flex-col justify-center items-center space-y-4 space-x-0">
          <h2 className="hidden md:block text-3xl font-[Montserrat] font-bold md:text-4xl">
            Products
          </h2>
          <p className="hidden text-gray-400 md:block">
            Explore our wide range of products and accessories for your needs at
            the best prices and quality.
          </p>
        </div>

        {/* Flex Container */}
        <div className=" w-full flex flex-col justify-center items-center space-y-2 space-x-0 relative mt-6">
          <div
            className={`relative w-full flex flex-row justify-center md:justify-start items-center space-y-0 space-x-2 py-2 bg-gray-900 ${
              isSticky ? "sticky inset-20 z-50 shadow-lg" : ""
            }`}
          >
            <div className="relative inline-block">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative text-left w-48 md:w-60 pl-3 pr-8 py-1 rounded-xl border-2 border-gray-500 shadow-sm bg-gray-900 cursor-pointer"
              >
                <span>Filter by</span>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  ▼
                </span>
              </button>

              {isOpen && (
                <div
                  className={`fixed bottom-0 left-0 right-0 md:absolute md:top-full md:left-0 md:h-screen md:w-60 h-[70vh] w-full px-2 bg-gray-900 transform transition duration-500 ease-in-out ${
                    isOpen
                      ? "md:translate-x-0 translate-y-0"
                      : "md:translate-x-full translate-y-full"
                  }`}
                >
                  <div className="flex flex-col justify-between items-center mt-4 py-4 border-b-2 border-gray-800">
                    <div
                      onClick={() =>
                        document
                          .getElementById("cat-dropdown")
                          .classList.toggle("max-h-96")
                      }
                      className="w-full flex justify-between items-center cursor-pointer mt-6"
                    >
                      <p className="text-md">Category</p>
                      <span className="text-sm">⌄</span>
                    </div>
                    <div
                      id="cat-dropdown"
                      className="w-full max-h-0 flex flex-col justify-center items-start transition-all duration-700 ease-in-out overflow-hidden"
                    >
                      {categories.map((cat, index) => (
                        <label
                          key={index}
                          className="flex flex-row justify-start items-center space-y-0 space-x-2 py-2 pl-2"
                        >
                          <input
                            type="checkbox"
                            name="category"
                            value={cat}
                            checked={category.split(",").includes(cat)}
                            onClick={() => {
                              const params = new URLSearchParams(searchParams);
                              const current =
                                params.get("category")?.split(",") || [];

                              let updated;
                              if (current.includes(cat)) {
                                updated = current.filter((c) => c !== cat);
                              } else {
                                updated = [...current, cat];
                              }

                              if (updated.length > 0) {
                                params.set("category", updated.join(","));
                              } else {
                                params.delete("category");
                              }

                              params.set("page", 1);
                              setSearchParams(params);
                            }}
                            className="text-sm cursor-pointer"
                          ></input>
                          <span>{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="flex flex-col justify-between items-center mt-4 py-4 border-b-2 border-gray-800">
                    <div
                      onClick={() =>
                        document
                          .getElementById("pr-dropdown")
                          .classList.toggle("max-h-96")
                      }
                      className="w-full flex justify-between items-center cursor-pointer mt-6"
                    >
                      <p className="text-md">Price Range</p>
                      <span className="text-sm">⌄</span>
                    </div>
                    <div
                      id="pr-dropdown"
                      className="w-full max-h-0 flex flex-col justify-center items-start space-y-4 mt-4 transition-all duration-700 ease-in-out overflow-hidden"
                    >
                      <input
                        type="range"
                        name="minPrice"
                        min={priceRange.min}
                        max={priceRange.max}
                        value={sliderMin}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value > sliderMax) return;

                          const params = new URLSearchParams(searchParams);
                          params.set("minPrice", value);
                          params.set("page", 1);
                          setSearchParams(params);
                        }}
                      />

                      <input
                        type="range"
                        name="maxPrice"
                        min={priceRange.min}
                        max={priceRange.max}
                        value={sliderMax}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value < sliderMin) return;

                          const params = new URLSearchParams(searchParams);
                          params.set("maxPrice", value);
                          params.set("page", 1);
                          setSearchParams(params);
                        }}
                      />
                      {minPrice !== null && (
                        <p>
                          ${minPrice} - ${maxPrice}
                        </p>
                      )}
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.delete("minPrice");
                          params.delete("maxPrice");
                          params.set("page", 1);
                          setSearchParams(params);
                        }}
                        className="px-3 py-1 rounded bg-gray-700 text-white"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative inline-block">
              <select
                value={sort}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams);
                  params.set("sort", e.target.value);
                  params.set("page", 1);
                  setSearchParams(params);
                }}
                className="appearance-none pl-3 pr-8 py-1 rounded-xl border-2 border-gray-500 shadow-sm bg-gray-900 cursor-pointer text-left"
              >
                <option value="newest">Newest</option>
                <option value="recommended">Recommended</option>
                <option value="top_sellers">Top Sellers</option>
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
              </select>
              {/* Custom arrow */}
              <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                ▼
              </span>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 mb-4">
            {products.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">
                No products found
              </p>
            ) : (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(pages).keys()].map((x) => (
              <button
                key={x + 1}
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.set("page", x + 1);
                  setSearchParams(params);
                }}
                className={`px-3 py-1 rounded-full cursor-pointer hover:scale-90 ${
                  page === x + 1 ? "bg-gray-200 text-black" : ""
                }`}
              >
                {x + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsScreen;
