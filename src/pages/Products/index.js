import React, { useState, useEffect } from "react";
import Product from "../../components/Product";
import firebase from "firebase/compat/app";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const db = firebase.firestore();
    return (
      db
        .collection("categories")
        .doc("1-hdd")
        .collection("products")
        // .where("price", ">", "500000")
        .onSnapshot((snapshot) => {
          const productsData = [];
          snapshot.forEach((doc) =>
            productsData.push({ ...doc.data(), id: doc.id })
          );
          setProducts(productsData);
        })
    );
  }, []);
  console.log("p:: ", products);

  const productss = [
    {
      id: 1,
      name: "HDD-1",
      desc: "test...",
      image: "/HDD/01.jpg",
      category: "HDD",
      price: "750000",
    },
    {
      id: 2,
      name: "HDD-2",
      desc: "test2...",
      image: "/HDD/02.jpg",
      category: "HDD",
      price: "450000",
    },
    {
      id: 3,
      name: "HDD-3",
      desc: "test3...",
      image: "/HDD/03.jpg",
      category: "HDD",
      price: "950000",
    },
    {
      id: 4,
      name: "HDD-4",
      desc: "test4...",
      image: "/HDD/04.jpg",
      category: "HDD",
      price: "250000",
    },
  ];
  return (
    <div className="flex items-center justify-center bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full space-y-8">
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
          Products
        </h2>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {productss.map((item, index) => {
            return (
              <Product
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
      </div>
    </div>
  );
};

export default Products;
