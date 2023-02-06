import { Link } from "react-router-dom";
import style from "./Header.module.scss";
import RickLogo from "../../assets/images/rnm.svg";

function Header() {
  return (
    <>
      <header className="section section--header">
        <div className="wrapper">
        <div className={style.content}>
        <img src={RickLogo} alt="logo" />
          <nav>
            <ul className={style.menu}>
              <li>
                <Link to={`/`}>Home</Link>
              </li>
              <li>
                <Link to={`/episodes`}>Episodes</Link>
              </li>
              <li>
                <Link to={`/characters`}>Characters</Link>
              </li>
              <li>
                <Link to={`/about`}>About</Link>
              </li>
            </ul>
          </nav>
        </div>
        </div>
      </header>
    </>
  );
}

export default Header;
