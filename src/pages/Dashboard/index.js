import React from "react";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

export default function Dashboard() {
  const { currentUser } = useSelector(mapState);
  return (
    <section className="dashboard">
      <div className="container">
        <div className="user-form">
          <h3>Welcome to user panel</h3>
          <hr />
          <p>
            <b>Name: </b>
            {currentUser.displayName}
          </p>
          <p>
            <b>Email: </b>
            {currentUser.email}
          </p>
        </div>
      </div>
    </section>
  );
}
