import { useGetFeaturedQuery } from "../slices/productApiSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import ProductCard from "./ProductCard";

const Featured = () => {
  const { data: products, isLoading, error } = useGetFeaturedQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading featured products</p>;

  return (
    <section className="relative py-8 border-b-2 border-b-gray-900">
      {/* Flex Container */}
      <div className="flex flex-col space-y-6 space-x-0">
        {/* Heading and Subtext */}
        <div className="flex flex-col justify-center items-center space-y-4 space-x-0">
          <h2 className="text-3xl font-[Montserrat] font-bold md:text-4xl">
            Top Picks for You
          </h2>
          <p className="hidden text-gray-400 md:block">
            We've handpicked the gadgets we know you'll love. Explore what's
            trending now.
          </p>
        </div>

        {/* Products Grid */}
        <div className="relative mt-6">
          {/* Cards Container */}
          <div className="max-w-[1800px] w-full mx-auto relative">
            <div className="md:px-16 px-4">
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={0}
                slidesPerView={6}
                loop={true}
                navigation={{
                  nextEl: ".next-btn",
                  prevEl: ".prev-btn",
                }}
                autoplay={{
                  delay: 3000, // 3 seconds between slides
                  disableOnInteraction: false, // keeps autoplay running after user clicks
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 2, // 👈 mobile
                  },
                  640: {
                    slidesPerView: 3, // 👈 sm screens
                  },
                  1024: {
                    slidesPerView: 6, // 👈 lg screens
                  },
                }}
              >
                {products.map((p) => (
                  <SwiperSlide key={p.id}>
                    <ProductCard product={p} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* ===== CUSTOM ARROWS ===== */}
            <button className="prev-btn hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button className="next-btn hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
