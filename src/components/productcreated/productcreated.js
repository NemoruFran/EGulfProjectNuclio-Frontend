import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./productcreated.css";
import Card from "../card/card";
import { API_ROOT } from "../../utils/apiHost/apiHost";

const ProductCreated = () => {
  const url = `${API_ROOT}users/me/productcreatedpage`;
  const [auctionByUser, setAuctionByUser] = useState(false);
  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        let AuctionUser = data;
        setAuctionByUser(AuctionUser);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [acumulador, setAcumulador] = useState(0);
  let ventas = 0;
  let vendido = 0;
  let productVendidos = [];
  let productEnVenta = [];

  return (
    <div>
      <div>
        {auctionByUser &&
          auctionByUser.map((auction) => {
            if (new Date(auction.endingDateTime) < new Date()) {
              ventas = ventas + auction.startingPrice;
              productVendidos.push(auction);
            } else {
              productEnVenta.push(auction);
            }
          })}
        <h1 className="titulo_box">Mis articulos en venta</h1>
        <div className="box">
          <p className="titulo_inside_box">
            {productEnVenta.length}
            <span className="next_titulo_inside">anuncios</span>
            {productVendidos.length}
            <span className="next_titulo_inside2">vendido</span>
            <span className="titulo_ganancias">{ventas}€</span>
            <Link to="/productformpage">
              <button className="sell_button">
                PONER UN ARTÍCULO EN VENTA
              </button>
            </Link>
            <p className="titulo_ganados">ganados</p>
          </p>
        </div>
        <div className="products_activos">
          <h1 className="titulo_activos">Activos</h1>
          <div className="roll">
            {auctionByUser &&
              productEnVenta.map((venta) => (
                <Card
                  img={venta.productId.images[0]}
                  name={venta.productId.name}
                  nameUser={venta.productId.owner.name}
                  rating={venta.productId.owner.rating}
                  initprice={venta.startingPrice}
                  id={venta._id}
                />
              ))}
          </div>
        </div>
        <div className="products_vendidos">
          <h1 className="titulo_venta">Ventas</h1>
          <div className="roll">
            {auctionByUser &&
              productVendidos.map((vendido) => (
                <Card
                  img={vendido.productId.images[0]}
                  name={vendido.productId.name}
                  nameUser={vendido.productId.owner.name}
                  rating={vendido.productId.owner.rating}
                  initprice={vendido.startingPrice}
                  id={vendido._id}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCreated;
