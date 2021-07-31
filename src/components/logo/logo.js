import "./logo.css";
import Imagen from "../../assets/logoimage.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <div className="_logoContainer">
        <img src={Imagen} alt="eGulf" />
      </div>
    </Link>
  );
};

export default Logo;
