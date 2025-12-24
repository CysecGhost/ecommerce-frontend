import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Keyboard from "../assets/Homepage-keyboard-2.jpg";
import Headphones from "../assets/Homepage-Headphones-4.jpg";
import Watch from "../assets/Homepage-Smartwatch-2.jpg";
import Headphones2 from "../assets/Homepage-Headphones-video-1.mp4";

const slides = [Keyboard, Headphones, Watch];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const isThrottled = useRef(false);

  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [current]);

  const handleWheel = (e) => {
    if (isThrottled.current) return;
    isThrottled.current = true;

    if (e.deltaY > 0) {
      nextSlide();
    } else {
      prevSlide();
    }

    setTimeout(() => {
      isThrottled.current = false;
    }, 800);
  };

  return (
    <section
      onWheel={handleWheel}
      className="relative h-[70vh] md:h-[80vh] w-full"
    >
      {/* Carousel or Slides */}
      {slides.map((img, index) => (
        <div
          key={index}
          className={`hidden md:flex absolute inset-0 bg-black/50 w-full h-[95%] overflow-hidden transition-opacity duration-700 border-b-2 border-b-gray-950 ${
            index === current
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={img}
            alt={`Slide ${index}`}
            className="h-full w-full object-center md:object-cover"
          />
          {/* Overlay */}
          <div className="hidden absolute top-1/3 left-20 md:flex flex-col justify-center items-center">
            <h1 className="text-3xl font-[Montserrat] font-bold mb-4 ml-4 md:text-5xl">
              {index === 0
                ? "Elevate Your Setup"
                : index === 1
                ? "Hear The Future"
                : index === 2
                ? "Stay Connected"
                : ""}
            </h1>
            <Link to={"/products"} className="">
              <Button width={"w-full"}>Shop Now</Button>
            </Link>
          </div>
        </div>
      ))}

      {/* Carousel or Slides sm */}
      <div className="flex md:hidden absolute inset-0 bg-black/50 w-full h-[95%] overflow-hidden transition-opacity duration-700 border-b-2 border-b-gray-900">
        <Link to={"/products"}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src={Headphones2} type="video/mp4" />
          </video>
        </Link>
      </div>

      {/* Dots */}
      <div className="hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 md:flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              index === current
                ? "bg-blue-500"
                : "bg-gray-500 hover:bg-gray-700"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
