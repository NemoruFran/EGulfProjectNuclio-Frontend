import BidButton from "../bidbutton/bidButton";
import TitleProduct from "../titleproduct/titleProduct";
import "./productSheet.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { API_ROOT } from "../../utils/apiHost/apiHost";

const ProductSheet = ({ title, description, initprice, iduser, rating }) => {
  const { id } = useParams();
  const history = useHistory();
  const [bidDisplayed, setBidDisplayed] = useState(initprice);
  const [bidCounter, setBidCounter] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const onSubmit = (dataOnSubmit) => {
    if (localStorage.getItem("token")) {
      const bidAmount = dataOnSubmit.bids;
      const body = { bidAmount };
      const localStorageToken = localStorage.getItem("token");
      fetch(`${API_ROOT}auctions/${id}/currentAuction/bid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageToken}`,
        },
        body: JSON.stringify(body),
      }).then(() => {
        fetch(`${API_ROOT}auctions/${id}/currentAuction`)
          .then((response) => response.json())
          .then((data) => handleData(data))
          .catch((err) => console.log(err));
      });
    } else {
      history.push("/login");
    }
  };

  useEffect(() => {
    fetch(`${API_ROOT}auctions/${id}/currentAuction`)
      .then((response) => response.json())
      .then((data) => handleData(data))
      .catch((err) => console.log(err));
  }, []);

  const handleData = (data) => {
    const bidsArray = data.bids;
    if (bidsArray.length) {
      const lastBid = bidsArray[bidsArray.length - 1]?.bidAmount;
      setBidDisplayed(lastBid);
      setBidCounter(bidsArray.length);
    }
  };

  return (
    <div className="productContainerGeneral">
      <div className="productSheetContainer">
        <TitleProduct title={title} />
        <hr className="productSheetSeparator"></hr>
        <div className="descriptionSheetContainer">
          <h2 className="descriptionTitle">Description</h2>
          <p className="descriptionProductSheet">{description}</p>
          <h3 className="descriptionShipping">Envío y condiciones</h3>
          <h3 className="descriptionShipping">
            Prioritario UE <h3 className="price">18€</h3>
          </h3>
        </div>
      </div>
      <div className="businessContainer">
        <div className="bildsContainer">
          <div className="businessContainerInside">
            <p className="priceActuality">{bidDisplayed} EUR </p>
            <p className="bidActuality">{bidCounter} Pujas</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="inputBid"
                type="number"
                step="0.01"
                min={bidDisplayed + 0.01}
                max="99999999"
                placeholder="Introduce tu puja"
                {...register("bids", {
                  validate: {
                    noNumber: (value) => (value ? true : ""),
                    moreThanBidDisplayed: (value) =>
                      parseFloat(value) > bidDisplayed
                        ? true
                        : "La puja debe superar el precio actual",
                    lessThanNumber: (value) =>
                      parseFloat(value) < 100000000
                        ? true
                        : "La puja no puede ser tan alta",
                  },
                })}
              />
              {errors.bids && (
                <p className="errorParagraph">{errors.bids.message}</p>
              )}
              <input className="bidButtonProduct" type="submit" value="PUJAR" />
            </form>
          </div>
        </div>
        <div className="sellerContainer">
          <div className="businessContainerInside">
            <TitleProduct title="Información del vendedor" />
            <p className="userActuality">{iduser}</p>
            <p className="ratingUser">( {rating}%)</p>
            <div className="linkContainer">
              <p className="linkOther">Ver otros artículos</p>
              <p className="linkOther">Guardar como favorito</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductSheet;
