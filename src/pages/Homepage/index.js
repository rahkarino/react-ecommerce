import React from "react";
import Directory from "../../components/Directory";
import "./styles.scss";

const Homepage = (props) => {
  return (
    <section className="home-page">
      <div className="container">
        <Directory />
      </div>
    </section>
  );
};

export default Homepage;
