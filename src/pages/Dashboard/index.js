import React from "react";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

export default function Dashboard() {
  const { currentUser } = useSelector(mapState);
  return (
    <div className="flex items-center justify-center bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            User panel
          </h2>
          <ul className="list-disc">
            <li>
              <b>Name: </b>
              {currentUser?.displayName}
            </li>
            <li>
              <b>Email: </b>
              {currentUser?.email}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
