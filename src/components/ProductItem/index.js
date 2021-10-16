import React from "react";
import { addComma } from "../../helper";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/Basket/basket.actions";

const ProductItem = (props) => {
  const { name, image, desc, price, id } = props;
  const mapState = ({ user }) => ({
    currentUser: user.currentUser,
  });
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();

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
    <div className="flex p-6 gap-3 rounded text-right flex-row-reverse shadow-md hover:shadow-lg transition-shadow duration-500">
      <div className="w-28">
        <img src={image} alt={name} className="rounded-lg" />
      </div>
      <div className="flex-grow">
        <h1 className="w-full flex-none font-semibold mb-2.5">{name}</h1>
        <div className="text-2xl leading-5 font-bold text-indigo-600">
          {addComma(price)} تومان
        </div>
        <p className="text-sm text-gray-500 mt-4">{desc}</p>
      </div>
      <div className="flex flex-col justify-center w-40">
        <button
          onClick={addToCartHandler}
          className="flex whitespace-nowrap items-center w-full px-6 py-2 justify-center rounded bg-green-500 text-white hover:bg-green-600 transition-all duration-500"
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
          to={{
            pathname: `/product/${name}`,
            state: {
              id,
              name,
              price,
              desc,
              image,
            },
          }}
          className="flex-none whitespace-nowrap flex items-center px-6 py-2 mt-2  justify-center rounded bg-gray-200 text-gray-700 hover:bg-gray-100 transition-all duration-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
