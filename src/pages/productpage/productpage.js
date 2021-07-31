import BreadCrumber from "../../components/breadcrumber/breadcrumber";
import "./productpage.css";
import ProductGallery from "../../components/productGallery/productGallery";
import ProductsList from "../../components/comp/product.json";
import ProductSheet from "../../components/productsheet/productSheet";
import Roll from "../../components/roll/roll";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API_ROOT } from "../../utils/apiHost/apiHost";

const ProductPage = () => {
  const { id } = useParams();
  const [auction, setauction] = useState();
  const history = useHistory();

  useEffect(() => {
    fetch(`${API_ROOT}auctions/${id}`)
      .then((response) => {
        if (response.status != 200) {
          throw "Auction couldn't be found. Check the id!";
        }
        return response.json();
      })
      .then((json) => setauction(json))
      .catch((error) => {
        console.log(error);
        history.push("/");
      });
  }, [id]);
  console.log(auction);
  return (
    <div>
      <div className="productContainer">
        <BreadCrumber />
        {
          <ProductGallery /> /*//TODO: URLimages={product.images} para pasar las imagenes desde productGallery */
        }
        {auction && (
          <ProductSheet
            title={auction.productId.name}
            description={auction.productId.description}
            initprice={auction.startingPrice}
            iduser={auction.productId.owner.name}
            rating={ProductsList[5].rating} //TODO: cuando exista el rating de user, añadirlo aquí (y popular en back)
          />
        )}
        <div className="rollproductContainer">
          <Roll title="Artículos similares" />
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
