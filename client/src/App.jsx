import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
const Navbar = lazy(() => import("./components/navbar/Navbar"));
import Footer from "./components/footer/Footer";
import SingleProduct from "./pages/singleProduct/SingleProduct";
const Cart = lazy(() => import("./pages/cart/Cart"));
import Wishlist from "./pages/wishlist/WishList";
import Checkout from "./pages/checkout/Checkout";
import Login from "./pages/account/Login";
import Loader from "./components/loader";
import ErrorPage from "./pages/errorPage/ErrorPage";

const Layout = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="firstLoader">
            <Loader />
          </div>
        }
      >
        <Navbar />
        <Outlet />
        <Footer />
      </Suspense>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
