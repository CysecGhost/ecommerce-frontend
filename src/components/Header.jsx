import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { BsBag } from "react-icons/bs";

import logo from "../assets/logo4.png";

const Header = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?keyword=${keyword}`);
      setKeyword("");
    }
  };
  return (
    <header className="sticky top-0 z-50 bg-gray-900 backdrop-blur-md shadow-sm border-b-2 border-b-gray-900">
      <div className="flex items-center justify-center md:justify-between px-4 py-1 ">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="h-14 w-auto" />
        </Link>

        {/* Center Nav */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex space-x-6 items-center text-gray-200"
        >
          <NavLink to="/" className="font-bold hover:text-blue-400 transition">
            Home
          </NavLink>
          <NavLink
            to="/products"
            className="font-bold hover:text-blue-400 transition"
          >
            Products
          </NavLink>
          <NavLink
            to="/trending"
            className="font-bold hover:text-blue-400 transition"
          >
            Trending
          </NavLink>
          <NavLink
            to="/best-sellers"
            className="font-bold hover:text-blue-400 transition"
          >
            Best Sellers
          </NavLink>
          <NavLink
            to="/featured"
            className="font-bold hover:text-blue-400 transition"
          >
            Featured
          </NavLink>
        </nav>

        {/* Auth Buttons */}
        <nav
          aria-label="Auth Navigation"
          className="hidden md:flex items-center gap-6"
        >
          <span className="flex items-center gap-2">
            {showSearch && (
              <form onSubmit={submitHandler}>
                <input
                  type="text"
                  placeholder="Search"
                  style={{ WebkitUserDrag: "none", userDrag: "none" }}
                  draggable="false"
                  className="bg-gray-800 px-3 py-1 rounded-full outline-none"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </form>
            )}
            <AiOutlineSearch
              type="text"
              className="cursor-pointer"
              onClick={() => setShowSearch(!showSearch)}
              size={24}
            />
          </span>
          <div className="relative p-4">
            {isOpen && (
              <div className="w-40 flex flex-col justify-center items-start absolute top-full right-0 bg-gray-800 p-4 rounded-md">
                <Link
                  to={userInfo ? "/profile" : "/login"}
                  className="w-full hover:bg-gray-700 rounded-sm px-2 py-2"
                >
                  {userInfo ? userInfo.name : "Login"}
                </Link>
                <Link
                  to={"/order-history"}
                  className="w-full hover:bg-gray-700 rounded-sm px-2 py-2"
                >
                  Order History
                </Link>
                <Link
                  to={"/cart"}
                  className="w-full hover:bg-gray-700 rounded-sm px-2 py-2"
                >
                  Cart
                </Link>
                <Link
                  to={"/logout"}
                  className="w-full hover:bg-gray-700 rounded-sm px-2 py-2"
                >
                  Logout
                </Link>
              </div>
            )}
            <AiOutlineUser
              type="text"
              className="cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              size={24}
            />
          </div>

          <Link to="/cart" className="relative">
            <BsBag size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
