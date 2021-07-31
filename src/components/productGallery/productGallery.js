import "./productGallery.css";
import ProductsList from "../comp/product.json";
import GalleryImage from "../galleryimage/galleryImage";
import { useState } from "react";

const ProductGallery = () => {
  const [images, setImages] = useState(ProductsList[5].img);
  return (
    <div className="galleryContainer">
      <div className="imgMasterContainer">
        <img
          classname="principalImage"
          alt="producto"
          src={ProductsList[5].img[0]}
        ></img>
      </div>
      <div classname="mosaicImage">
        <div className="rowContainerOne">
          {images.slice(0, 2).map((img) => (
            <GalleryImage img={img} />
          ))}
        </div>
        <div className="rowContainerTwo">
          {images.slice(2, 4).map((img) => (
            <GalleryImage img={img} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProductGallery;
