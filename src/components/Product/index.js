import React from "react";
import { addComma } from "../../helper";

const Product = (props) => {
  const { name, image, desc, price, category } = props;
  return (
    <div className="flex p-6 rounded shadow-md hover:shadow-lg transition-shadow duration-500">
      <div className="w-28">
        <img src={image} alt="" className="rounded-lg" />
      </div>
      <div className="flex-auto pl-2">
        <div className="flex flex-wrap items-baseline">
          <h1 className="w-full flex-none font-semibold mb-2.5">{name}</h1>
          <div className="text-2xl leading-5 font-bold text-indigo-600">
            {addComma(price)} T
          </div>
          {/* <div className="text-sm font-medium text-gray-400 ml-3">In stock</div> */}
        </div>
        <p className="text-sm text-gray-500 mt-4">{desc}</p>
      </div>
      <div className="flex flex-col justify-center">
        <button className="flex items-center w-full px-6 py-2 justify-center rounded bg-green-500 text-white hover:bg-green-600 transition-all duration-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>{" "}
          Add to cart
        </button>
        <button
          className="flex-none flex items-center px-6 py-2 mt-2  justify-center rounded bg-gray-200 text-gray-700 hover:bg-gray-100 transition-all duration-500"
          type="button"
          aria-label="like"
        >
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="h-5 w-5 mr-2"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            />
          </svg>
          Add to favorite
        </button>
      </div>
    </div>
  );
};

export default Product;
