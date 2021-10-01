import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsDetail } from "../../redux/Product/product.actions";

const Product = ({ match }) => {
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const { product, loading } = productDetail;

  useEffect(() => {
    dispatch(getProductsDetail(match.params.id));
  }, []);

  return (
    <section class="max-w-7xl mx-auto relative py-12 bg-blueGray-50">
      <div class="items-center flex flex-wrap">
        <div class="w-full md:w-4/12 ml-auto mr-auto">
          <img
            alt="..."
            class="max-w-full rounded-lg shadow-lg"
            src="/HDD/02.jpg"
          />
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
            <h3 class="text-3xl font-semibold">A growing company</h3>
            <p class="mt-4 text-lg leading-relaxed text-blueGray-500">
              The extension comes with three pre-built pages to help you get
              started faster. You can change the text and images and you're good
              to go.
            </p>
            <ul class="list-none mt-6">
              <li class="py-2">
                <div class="flex items-center">
                  <div>
                    <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                      <i class="fas fa-fingerprint"></i>
                    </span>
                  </div>
                  <div>
                    <h4 class="text-blueGray-500">
                      Carefully crafted components
                    </h4>
                  </div>
                </div>
              </li>
              <li class="py-2">
                <div class="flex items-center">
                  <div>
                    <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                      <i class="fab fa-html5"></i>
                    </span>
                  </div>
                  <div>
                    <h4 class="text-blueGray-500">Amazing page examples</h4>
                  </div>
                </div>
              </li>
              <li class="py-2">
                <div class="flex items-center">
                  <div>
                    <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                      <i class="far fa-paper-plane"></i>
                    </span>
                  </div>
                  <div>
                    <h4 class="text-blueGray-500">Dynamic components</h4>
                  </div>
                </div>
              </li>
            </ul>
            <button className="flex items-center mt-4 w-full px-6 py-2 justify-center rounded bg-green-500 text-white hover:bg-green-600 transition-all duration-500">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
