import React, { useState, useEffect } from "react";
import Product from "../../components/Product";
// import firebase from "firebase/compat/app";
import { useSelector, useDispatch } from "react-redux";
import { getProductsList } from "../../redux/Product/product.actions";

const ProductList = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.productsList);
  const { products, loading } = productsList;

  useEffect(() => {
    dispatch(getProductsList("1-hdd"));
  }, [dispatch]);
  console.log("pp: ", products);

  return (
    <div className="flex items-center justify-center bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full space-y-8">
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
          Products
        </h2>
        {loading ? (
          <div class="flex items-center justify-center ">
            <div class="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {products.map((item, index) => {
              return (
                <Product
                  id={item.id}
                  key={index}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  desc={item.desc}
                  category={item.category}
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
