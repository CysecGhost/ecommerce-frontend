import Hero from "../components/Hero";
import Featured from "../components/Featured";
import SaleBanner from "../components/SaleBanner";
import BestSellers from "../components/BestSellers";

const HomeScreen = () => {
  return (
    <div>
      <Hero />
      <Featured />
      <SaleBanner />
      <BestSellers />
    </div>
  );
};

export default HomeScreen;
