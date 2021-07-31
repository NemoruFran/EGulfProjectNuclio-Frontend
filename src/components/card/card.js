import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import React, { useState } from "react";
import Heart from "../../assets/heart.png";
import Star from "../../assets/star.png";
import HeartRed from "../../assets/heartRed.png";
import ProductPage from "../../pages/productpage/productpage";
import("./card.css");

const Card = ({ img, name, rating, initprice, id, nameUser }) => {
  const history = useHistory();
  const url = "/product/" + id;
  const [condition, setCondition] = useState(true);

  return (
    <Router>
      <div className="container">
        <Link to={url} onClick={() => history.push("/productpage/" + id)}>
          <img src={img} className="cardImage" alt="" />
        </Link>
        <div className="banner">
          <span className="name_card">{name?.slice(0, 14)}</span>
          <p className="nameUser_card">{nameUser}</p>

          <p className="banner_price">{initprice}</p>
          <p className="rating_card">{rating}</p>

          <div onClick={() => setCondition(!condition)}>
            <img className="star_icon" src={Star} alt="star" />
            <img
              className="heart_icon"
              src={condition ? Heart : HeartRed}
              alt="icon-heart"
            />
          </div>
        </div>
      </div>
    </Router>
  );
};
export default Card;
