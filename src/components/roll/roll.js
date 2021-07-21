import Card from "../card/card";
import ProductsList from "../comp/product.json";
import "./roll.css";
import { useEffect, useState } from "react";
import { useAuctions } from "../../hooks/useAuctions";

const Roll = ({ title }) => {
  const url = "http://localhost:5001/auctions";
  const [auctions, setAuctions] = useState(undefined);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        let auctionUser = data;
        setAuctions(auctionUser);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetch(url);
  }, []);

  const { auctions } = useAuctions("60e7f052df5a6d070e1ad960");
  return (
    <div className="main_roll">
      <h3>{title}</h3>

      <div className="card_roll">
        {auctions &&
          auctions
            .slice(0, 4)
            .map((auction) => (
              <Card
                img={auction.productId?.images[0]}
                name={auction.productId?.name}
                rating={auction.productId?.owner.rating}
                initprice={auction.startingPrice}
                id={auction._id}
                nameUser={auction.productId.owner.name}
                usersFavs={auction.productId.userFavs}
              />
            ))}
      </div>
    </div>
  );
};

export default Roll;
