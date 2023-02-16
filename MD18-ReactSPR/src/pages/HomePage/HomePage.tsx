import React from "react";
import style from "./HomePage.module.scss";
import HomeImage from "../../assets/images/home-image.jpg";
import { useTranslation } from 'react-i18next';


interface Props {}

const HomePage: React.FC<Props> = () => {
  const {t} = useTranslation();


  return (
    <div className="wrapper">
      <div className={style.splashScreen}>
        <h2 className={style.pageTitle}>{t('title')}</h2>
      </div>
    </div>
  );
};

export default HomePage;
