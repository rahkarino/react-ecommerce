import React, { useEffect } from "react";
import Logo from "../../assets/reactland-logo.png";

const About = () => {
  useEffect(() => {
    document.title = "About us | ReactLand";
  }, []);
  return (
    <div className="flex items-center justify-center bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          About ReactLand
        </h2>
        <div class="bg-red-600 pt-1 px-2 bg-gradient-to-b from-gray-400 to-gray-500 rounded-xl shadow-lg">
          <div class="flex justify-center">
            <div class="flex justify-center p-4 bg-gray-400 ring-2 ring-gray-300 rounded-lg shadow-xl w-32">
              <img className="h-8 w-auto sm:h-10" src={Logo} alt="reactland" />
            </div>
          </div>
          <div class="p-4 text-center">
            <p class="text-white font-semibold">ReactLand.ir</p>
            <p class="text-gray-200 mt-2">
              Welcome to ReactLand Web Application. In order to add products to
              shopping cart, you need to signin. In case you don't have user
              account, you can signup easily.
              <br />
              You are also able to signin to your gmail account (login with
              Google).
              <br />
              For handling frontend, I used ReactJS library and for backend,
              Firebase is used. Application's UI is implemented by TailwindCSS.
              <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
