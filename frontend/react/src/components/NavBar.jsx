import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import appState from "../data/AppState";
import cartEmitter, {
  getCartCount,
} from "../pages/Cart/application/cart_event";

function NavBar() {
  const [drawerVisible, setdrawerVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 z-[2] h-[8vh] w-[100%] bg-white  flex px-2 md lg:px-10  items-center shadow-md "
      >
        {/* <h1>LOGO</h1> */}
        <img className="h-20  py-2 object-contain" src={logo} alt="" />
        <div className="flex flex-1"></div>

        <NavBarItem text="Home" route="/home" />
        <NavBarItem text="About" route="/about" />
        <NavBarItem text="Shop" route="/shop" />

        {/* Desktop Icons */}
        <div className="hidden md:flex">
          <i
            onClick={() => navigate("/search")}
            className="cursor-pointer p-2 mx-5 lg:hidden fa-solid text-2xl fa-magnifying-glass hover:bg-green-100 "
          ></i>
        </div>

        <div className="hidden md:flex">
          <i
            onClick={() => navigate("/profile")}
            className="hidden md:block cursor-pointer p-2 mx-5 lg:hidden fa-solid text-2xl fa-user hover:bg-green-100  "
          ></i>
        </div>

        <CartNotifier />
        {/* ! Mobile Layout */}

        <div
          onClick={() => {
            setdrawerVisible(!drawerVisible);
          }}
          className="visible md:hidden mr-2 h-[100%] w-[20%] flex justify-end items-center"
        >
          <i
            className={`fa-solid ${!drawerVisible ? "fa-bars" : "fa-close"} `}
          ></i>
        </div>
      </motion.header>
      {drawerVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed top-[8vh] z-[1] visible md:hidden w-[100%] flex flex-col"
        >
          <MobileNavBarItem text="Home" route="/home" />
          <MobileNavBarItem text="Shop" route="/shop" />
          <MobileNavBarItem text="Search" route="/search" />
          <MobileNavBarItem text="Profile" route="/profile" />
          {appState.isCustomer() && (
            <MobileNavBarItem text="Cart" route="/cart" />
          )}
          <MobileNavBarItem text="About" route="/about" />
        </motion.div>
      )}
    </>
  );
}

function MobileNavBarItem({ text = "NavItem", route = "/" }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(route);
      }}
      className="bg-green-100 py-3 px-2 border-b border-green-200"
    >
      <h1 className="text-green-800">{text}</h1>
    </div>
  );
}

function NavBarItem({ text = "NavItem", route = "/" }) {
  var navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(route)}
      className="hidden lg:flex md:flex items-center text-center h-[100%] px-5 mx-5 hover:bg-green-100 hover:text-green-800 "
    >
      <h1 className="text-lg ">{text}</h1>
    </div>
  );
}


const MobileNavBar = () => {
  return <div>MobileNavBar</div>;
};

const CartNotifier = () => {
  const navigate = useNavigate();
  let [cartCount, setCartCount] = useState(0);
  if (!appState.isCustomer()) return;

  useEffect(() => {
    console.log("Adding Listener...");
    setCartCount(getCartCount());

    const listener = (count) => {
      console.log("Cart Counter notified: ", count);
      setCartCount(count);
    };

    cartEmitter.on("cartUpdate", listener);

    return () => {
      cartEmitter.off("cartUpdate", listener);
    };
  });

  return (
    <div className="hidden md:flex relative" onClick={() => navigate("/cart")}>
      <i className="cursor-pointer p-2 mx-5 lg:hidden fa-solid text-2xl fa-cart-shopping hover:bg-green-100  "></i>
      {cartCount > 0 && (
        <span className="bg-red-600 text-white rounded-full w-[20px] h-[20px] text-center text-sm absolute right-0 top-0">
          {cartCount}
        </span>
      )}
    </div>
  );
};

export default NavBar;
