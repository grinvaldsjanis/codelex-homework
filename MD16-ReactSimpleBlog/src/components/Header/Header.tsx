import { Link } from "react-router-dom";
import style from "./Header.module.scss";
import GrinchLogo from "../../assets/images/grinch_logo.svg";

const HeaderBar = function () {
  return (
    <header className="section section--header">
      <div className="wrapper">
        <div className={style.content}>
          <img className={style.logo} src={GrinchLogo} alt="logo" />
          <div className={style.titleLeft}>
          <h2 className={style.title}>The Flying Grinch</h2>
          </div>
          <nav>
            <ul className={style.menu}>
              <li>
                <h4>
                  <Link to={`/`}>Home</Link>
                </h4>
              </li>
              <li>
                <h4>
                  <Link to={`/blog`}>Blog</Link>
                </h4>
              </li>
              <li>
                <h4>
                  <Link to={`/about`}>About</Link>
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