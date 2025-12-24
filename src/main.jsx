import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import store from "./store.js";
import { Provider } from "react-redux";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import App from "./App.jsx";
import HomeScreen from "./pages/HomeScreen.jsx";

// Users
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";

// Products
import ProductsScreen from "./pages/ProductsScreen.jsx";
import TrendingScreen from "./pages/TrendingScreen.jsx";
import BestSellersScreen from "./pages/BestSellersScreen.jsx";
import FeaturedScreen from "./pages/FeaturedScreen.jsx";
import ProductScreen from "./pages/ProductScreen.jsx";

// Cart
import CartScreen from "./pages/CartScreen.jsx";
import ShippingScreen from "./pages/ShippingScreen.jsx";
import PaymentScreen from "./pages/PaymentScreen.jsx";
import PlaceOrderScreen from "./pages/PlaceOrderScreen.jsx";
import OrderScreen from "./pages/OrderScreen.jsx";
import OrderHistoryScreen from "./pages/OrderHistoryScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Users Routes */}
      <Route index path="/" element={<HomeScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Products Routes */}
      <Route path="/products" element={<ProductsScreen />} />
      <Route path="/trending" element={<TrendingScreen />} />
      <Route path="/best-sellers" element={<BestSellersScreen />} />
      <Route path="/featured" element={<FeaturedScreen />} />
      <Route path="/products/:id" element={<ProductScreen />} />

      {/* Cart */}
      <Route path="/cart" element={<CartScreen />} />

      {/* Protected routes */}
      <Route element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/place-order" element={<PlaceOrderScreen />} />
        <Route path="/orders/:id" element={<OrderScreen />} />
        <Route path="/order-history" element={<OrderHistoryScreen />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
