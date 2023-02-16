import { Link } from "react-router-dom";
import style from "./Header.module.scss";
import { useTranslation } from 'react-i18next';

const HeaderBar = function () {
  const { t } = useTranslation();

  return (
    <header className="section section--header">
      <div className="wrapper">
        <div className={style.content}>
          <nav>
            <ul className={style.menu}>
              <li key="menu_home">
                <h4>
                  <Link to={`/`}>{t('home')}</Link>
                </h4>
              </li>
              <li key="menu_game">
                <h4>
                  <Link to={`/game`}>{t('game')}</Link>
                </h4>
              </li>
              <li key="menu_about">
                <h4>
                  <Link to={`/about`}>{t('results')}</Link>
                </h4>
              </li>
            </ul>
          </nav>
        </div>
        
      </div>
    </header>
  );
};

export default HeaderBar;

