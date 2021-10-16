import React from "react";
import Logo from "../../assets/reactland-logo.png";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/utils";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/User/user.actions";
import { toast } from "react-toastify";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Header = (props) => {
  const { currentUser } = useSelector(mapState);
  const basket = useSelector((state) => state.basket);
  const { cartItems } = basket;
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="relative bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <header className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <img className="h-8 w-auto sm:h-10" src={Logo} alt="" />
            </Link>
          </div>

          <ul className="hidden md:flex space-x-10">
            <li>
              <Link
                to="/products"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                About
              </Link>
            </li>
          </ul>
          <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
            {currentUser ? (
              <>
                <Link
                  to="/basket"
                  className="relative whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  <span class="absolute bottom-4 right-8 items-center justify-center px-2 py-1 mr-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {cartItems.length}
                  </span>
                  Basket
                </Link>

                <Link
                  to="/dashboard"
                  className="whitespace-nowrap ml-8 text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  My Account
                </Link>

                <span
                  onClick={() => {
                    toast.warning("Logged out successfully");
                    auth.signOut();
                    dispatch(setCurrentUser(null));
                    history.push("/login");
                  }}
                  style={{ cursor: "pointer" }}
                  className="ml-8 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Logout
                </span>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </header>
      </div>
    </div>
    // <header>
    //   <div className="container">
    //     <div className="logo">
    //       <Link to="/">
    //         <img src={Logo} alt="logo" />
    //       </Link>
    //     </div>
    //     <div className="links">
    //       <ul>
    //         {currentUser ? (
    //           <>
    //             <li>
    //               <Link to="/dashboard">My Account</Link>
    //             </li>
    //             <li>
    //               <span
    //                 onClick={() => {
    //                   toast.warning("Logged out successfully");
    //                   auth.signOut();
    //                   dispatch(setCurrentUser(null));
    //                   history.push("/login");
    //                 }}
    //                 style={{ cursor: "pointer" }}
    //               >
    //                 Logout
    //               </span>
    //             </li>
    //           </>
    //         ) : (
    //           <>
    //             <li>
    //               <Link to="/register" className="btn btn--primary">Register</Link>
    //             </li>
    //             <li>
    //               <Link to="/login" className="btn btn--secondary">Login</Link>
    //             </li>
    //           </>
    //         )}
    //       </ul>
    //     </div>
    //   </div>
    // </header>
  );
};

export default Header;
