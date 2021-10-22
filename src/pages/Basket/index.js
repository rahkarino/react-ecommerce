import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementCartItem,
  decrementCartItem,
  removeFromCart,
} from "../../redux/Basket/basket.actions";
import { addComma } from "../../helper";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Basket = () => {
  const history = useHistory();
  const basket = useSelector((state) => state.basket);
  const { cartItems } = basket;
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Shopping Cart | ReactLand";
  }, []);

  const mapState = ({ user }) => ({
    currentUser: user.currentUser,
  });

  const { currentUser } = useSelector(mapState);

  const checkoutHandler = () => {
    if (currentUser === null) {
      history.push("/login");
      toast.warning("Please Login");
    } else toast.success("Success checkout");
  };

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const incrementHandler = (id) => {
    dispatch(incrementCartItem(id));
  };

  const decrementHandler = (id) => {
    dispatch(decrementCartItem(id));
  };

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">
              {cartItems && cartItems.length} Items
            </h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
              Quantity
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
              Price
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
              Total
            </h3>
          </div>
          {cartItems.length <= 0 ? (
            <h2 className="text-red-700">Your shopping cart is empty</h2>
          ) : (
            cartItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center border-b-2 border-gray-50 hover:bg-gray-100 transition-all -mx-8 px-6 py-5"
                >
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img className="h-24" src={item.image} alt="" />
                    </div>
                    <div className="flex flex-col justify-around ml-4 flex-grow">
                      <span className="font-bold text-sm">{item.name}</span>
                      <button
                        onClick={() => removeHandler(item.id)}
                        className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                      >
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <button onClick={() => decrementHandler(item.id)}>
                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>

                    <input
                      className="mx-2 border text-center w-8"
                      type="text"
                      value={item.count}
                    />

                    <button onClick={() => incrementHandler(item.id)}>
                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    {addComma(item.price)} T
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    {addComma(item.price * item.count)} T
                  </span>
                </div>
              );
            })
          )}

          <Link
            to="/products"
            className="flex font-semibold text-indigo-600 text-sm mt-10"
          >
            <svg
              className="fill-current mr-2 text-indigo-600 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Items {cartItems && cartItems.length}
            </span>
            <span className="font-semibold text-sm">
              {addComma(
                cartItems.reduce(
                  (acc, item) => acc + item.price * item.count,
                  0
                )
              )}{" "}
              T
            </span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">
              Shipping
            </label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping: 100,000 T</option>
            </select>
          </div>
          <div className="py-10">
            <label
              htmlFor="promo"
              className="font-semibold inline-block mb-3 text-sm uppercase"
            >
              Promo Code
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full"
            />
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
            Apply
          </button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost:</span>
              <span>
                {addComma(
                  cartItems.reduce(
                    (acc, item) => acc + item.price * item.count,
                    0
                  ) + (cartItems.length > 0 ? 100000 : 0)
                )}{" "}
                Toman
              </span>
            </div>
            <button
              onClick={checkoutHandler}
              className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
