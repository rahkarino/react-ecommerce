import React, { useState, useEffect } from "react";
import ProductItem from "../../components/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductsListByCategory,
  getCategoriesList,
  getProductsListAll,
} from "../../redux/Product/product.actions";

const ProductList = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.productsList);
  const categoriesList = useSelector((state) => state.categoriesList);
  const { products, loading } = productsList;
  const { categories, loading: catLoading } = categoriesList;
  useEffect(() => {
    document.title = "Products | ReactLand";
  }, []);
  useEffect(() => {
    dispatch(getCategoriesList);
    dispatch(getProductsListAll);
  }, [dispatch]);

  const handleCategoryBtn = (category) => {
    dispatch(getProductsListByCategory(category));
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full space-y-8">
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
          Products
        </h2>
        {catLoading ? (
          <div className="flex items-center justify-center ">
            <div className="w-6 h-6 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex justify-center gap-5">
            <button
              onClick={() => dispatch(getProductsListAll)}
              className="px-4 py-2 rounded-md text-sm font-medium border focus:outline-none focus:ring transition text-indigo-600 border-purple-600 hover:text-white hover:bg-indigo-600 active:bg-indigo-700 focus:ring-purple-300"
            >
              All
            </button>
            {categories &&
              categories.map((item, index) => {
                return (
                  <button
                    onClick={() => handleCategoryBtn(item.id)}
                    key={index}
                    className="px-4 py-2 rounded-md text-sm font-medium border focus:outline-none focus:ring transition text-indigo-600 border-purple-600 hover:text-white hover:bg-indigo-600 active:bg-indigo-700 focus:ring-purple-300"
                  >
                    {item.name}
                  </button>
                );
              })}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center ">
            <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {products.map((item, index) => {
              return (
                <ProductItem
                  id={item.id}
                  key={index}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  desc={item.desc}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
