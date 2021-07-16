import Card from "../card/card";
import ProductsList from "../comp/product.json";
import "./roll.css";
import { useEffect, useState } from "react";
import { useAuctions } from "../../hooks/useAuctions";

const Roll = ({ title }) => {
  const { auctions } = useAuctions();

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
                id={auction.productId?._id}
                nameUser={auction.productId?.owner.name}
              />
            ))}
      </div>
    </div>
  );
};

export default Roll;
