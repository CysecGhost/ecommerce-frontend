import { useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import MobileNav from "./components/MobileNav.jsx";
import Footer from "./components/Footer.jsx";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation();

  const hideFooter = ["/login", "/register"];
  const shouldHideFooter = hideFooter.includes(location.pathname);
  return (
    <div className="min-h-screen text-white bg-gray-900 font-[Inter]">
      <Header />
      <MobileNav />
      <Outlet />
      {!shouldHideFooter && <Footer />}
      <ToastContainer />
    </div>
  );
};

export default App;
