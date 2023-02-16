import { Link } from "react-router-dom";
import style from "./Footer.module.scss";
import { useTranslation } from 'react-i18next';
import LanguageSelector from "../LanguageSelector/LanguageSelector";

const Footer = function () {
  const { t } = useTranslation();

  return (
    <header className="section section--header">
      <div className="wrapper">
        <div className={style.content}>
        <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Footer;

