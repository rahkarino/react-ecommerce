import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { addComma } from "../../helper";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/Basket/basket.actions";

const Product = () => {
  const location = useLocation();
  const { id, name, price, desc, image } = location?.state;
  const dispatch = useDispatch();
  const history = useHistory();
  const mapState = ({ user }) => ({
    currentUser: user.currentUser,
  });
  useEffect(() => {
    document.title = `${name} | ReactLand`;
  }, []);
  const { currentUser } = useSelector(mapState);
  const addToCartHandler = () => {
    if (currentUser === null) {
      history.push("/login");
      toast.warning("Please Login");
    } else {
      dispatch(addToCart({ id, name, price, image }));
      history.push(`/basket`);
    }
  };

  return (
    <section class="max-w-7xl mx-auto relative py-12 bg-blueGray-50">
      <div class="items-center flex flex-wrap">
        <div class="w-full md:w-4/12 ml-auto mr-auto">
          <img alt={name} class="max-w-full rounded-lg shadow-lg" src={image} />
        </div>
        <div class="w-full md:w-5/12 ml-auto mr-auto">
          <div class="md:pr-12">
            <div class="text-pink-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300 mt-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <h3 class="text-3xl font-semibold">{name}</h3>
            <p class="mt-4 text-lg leading-relaxed text-blueGray-500">{desc}</p>
            <p className="text-4xl py-4 leading-5 font-bold text-indigo-600">
              {addComma(price)} T
            </p>
            <button
              onClick={addToCartHandler}
              className="flex items-center mt-4 w-full px-6 py-2 justify-center rounded bg-green-500 text-white hover:bg-green-600 transition-all duration-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Add to cart
            </button>
            <Link
              to="/products"
              className="flex items-center mt-4 w-full px-6 py-2 justify-center rounded bg-gray-200 text-gray-700 hover:bg-gray-100 transition-all duration-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to shop
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
