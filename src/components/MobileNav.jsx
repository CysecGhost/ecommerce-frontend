import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineClose,
} from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi";

const MobileNav = () => {
  const navigate = useNavigate();

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [keyword, setKeyword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword("");
      setShowSearch(false);
      navigate(`/search?keyword=${keyword}`);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 shadow-md border-t border-gray-900 z-50 md:hidden">
      {/* Search Bar */}
      <div
        className={`h-[90vh] fixed bottom-0 left-0 right-0 transform transition-transform duration-300 ease-in-out ${
          showSearch ? "translate-y-0" : "translate-y-full"
        } bg-gray-900 rounded-t-2xl shadow-lg`}
      >
        {/* Search */}
        <div className="w-full px-6 py-4 space-y-4 text-white">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold">Search</h3>
            <button onClick={() => setShowSearch(false)}>
              <AiOutlineClose size={20} />
            </button>
          </div>
          <form onSubmit={submitHandler} className="px-2 py-2">
            <div className="flex justify-between items-center space-x-6 border-b border-b-gray-800">
              <input
                type="text"
                className="w-full px-2 py-2  rounded-lg outline-none"
                placeholder="Search..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button type="submit" className="cursor-pointer">
                <AiOutlineSearch size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Menu */}
      <div
        className={`h-[90vh] fixed bottom-0 left-0 right-0 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } bg-gray-900 rounded-t-2xl shadow-lg`}
      >
        {/* Menu content */}
        <div className="w-full px-6 py-4 space-y-4 text-white">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Menu</h3>
            <button onClick={() => setIsOpen(false)}>
              <AiOutlineClose size={20} />
            </button>
          </div>
          <ul className="space-y-2">
            <Link to="/">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700"
              >
                Home
              </button>
            </Link>
            <Link to="/products">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700"
              >
                Products
              </button>
            </Link>
            <Link to="/trending">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700"
              >
                Trending
              </button>
            </Link>
            <Link to="/best-sellers">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700"
              >
                Best Sellers
              </button>
            </Link>
            <Link to={"/featured"}>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700"
              >
                Featured
              </button>
            </Link>
          </ul>
        </div>
      </div>

      {/* Account */}
      {userInfo && (
        <div
          className={`h-[90vh] fixed bottom-0 left-0 right-0 transform transition-transform duration-300 ease-in-out ${
            isAccountOpen ? "translate-y-0" : "translate-y-full"
          } bg-gray-900 rounded-t-2xl shadow-lg`}
        >
          {/* Account content */}
          <div className="w-full px-6 py-4 space-y-4 text-white">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">Account</h3>
              <button onClick={() => setIsAccountOpen(false)}>
                <AiOutlineClose size={20} />
              </button>
            </div>
            <ul className="space-y-2">
              <Link to={userInfo ? "/profile" : "/login"}>
                <button
                  onClick={() => setIsAccountOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700"
                >
                  {userInfo ? "Profile" : "Login"}
                </button>
              </Link>
              <Link to="/order-history">
                <button
                  onClick={() => setIsAccountOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700"
                >
                  Order History
                </button>
              </Link>
              <Link to="/cart">
                <button
                  onClick={() => setIsAccountOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700"
                >
                  Cart
                </button>
              </Link>
              <Link to="/logout">
                <button
                  onClick={() => setIsAccountOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700"
                >
                  Logout
                </button>
              </Link>
            </ul>
          </div>
        </div>
      )}

      <ul className="flex justify-between text-center py-4 px-4">
        <li className="">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col items-center text-sm"
          >
            <HiOutlineMenu size={20} />
            Menu
          </button>
        </li>
        <li className="">
          <button className="flex flex-col items-center text-sm">
            <AiOutlineSearch
              onClick={() => setShowSearch(!showSearch)}
              type="submit"
              className="cursor-pointer"
              size={20}
            />
            Search
          </button>
        </li>
        <li className="">
          <Link to="/" className="flex flex-col items-center text-sm">
            <AiOutlineHome size={20} />
            Home
          </Link>
        </li>
        <li className="">
          <Link to="/cart" className="flex flex-col items-center text-sm">
            <BsBag size={20} />
            Cart
          </Link>
        </li>

        <li className="">
          {userInfo ? (
            <div className="flex flex-col items-center text-sm">
              <AiOutlineUser
                type="text"
                className="cursor-pointer"
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                size={24}
              />
              Account
            </div>
          ) : (
            <Link
              to={userInfo ? "/profile" : "/login"}
              className="flex flex-col items-center text-sm"
            >
              <AiOutlineUser size={20} />
              Account
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default MobileNav;
