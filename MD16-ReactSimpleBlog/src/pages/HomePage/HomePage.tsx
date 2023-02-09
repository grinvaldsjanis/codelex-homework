import React from "react";
import style from "./HomePage.module.scss";
import HomeImage from "../../assets/images/home-image.jpg";
import SideBar from "../../components/SideBar";

interface Props {}

const HomePage: React.FC<Props> = () => {
  return (
    <div className="wrapper">
      <div>
        <h1>The Flying Grinch Blog site</h1>
      </div>
      <SideBar />
    </div>
  );
};

export default HomePage;
