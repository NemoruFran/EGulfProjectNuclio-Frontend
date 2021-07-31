import "./footer.css";
import Logo from "../logo/logo";
import InstagramLogo from "./../../assets/instagram.svg";
import FacebookLogo from "./../../assets/facebook.svg";
import TwitterLogo from "./../../assets/twitter.svg";
import YouTubeLogo from "./../../assets/youtube.svg";

const Footer = () => {
  return (
    <footer>
      <hr />
      <div className="logoContainer">
        <Logo />
      </div>

      <ul className="nav-links">
        <li>
          <a href="#">Comprar</a>
        </li>
        <li>
          <a href="#">Vender</a>
        </li>
        <li>
          <a href="#">Contactar con eGulf</a>
        </li>
        <li>
          <a href="#">Acerca de eGulf</a>
        </li>
        <li>
          <a href="#">Politica de Privacidad</a>
        </li>
      </ul>
      <hr />
      <div className="copyright-social-container">
        <p>&copy; 2020 Landify UI Kit. All rights reserved</p>
        <ul className="social">
          <li>
            <a href="#">
              <img
                src={InstagramLogo}
                className="instagram-logo"
                alt="Instagram Logo"
              />
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src={FacebookLogo}
                className="facebook-logo"
                alt="Facebook Logo"
              />
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src={TwitterLogo}
                className="twitter-logo"
                alt="Twitter Logo"
              />
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src={YouTubeLogo}
                className="youtube-logo"
                alt="YouTube Logo"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
