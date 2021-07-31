import React, { useRef, useState } from "react";
import "./buttonproductform.css";
import Bin from "../../assets/bin.png";

const ButtonProductForm = ({ getImage }) => {
  const imageSelectorRef = useRef();
  const [uploadimage, setuploadimage] = useState([]);

  const [isDelete, setIsDelete] = useState();

  const handleBin = () => {
    setuploadimage("");
  };

  const handleClick = () => {
    imageSelectorRef.current.click();
  };

  const handleChange = (event) => {
    const reader = new FileReader();
    reader.onload = (file) => {
      setuploadimage(file.target.result);
      getImage(file.target.result);
    };
    {
      reader.readAsDataURL(event.target.files[0]) && uploadimage();
    }
  };
  return (
    <div className="container_img_picker">
      <input
        id="image_picker"
        ref={imageSelectorRef}
        className="sixth_box"
        type="file"
        style={{ display: "none" }}
        onChange={handleChange}
      ></input>
      {uploadimage.length > 0 ? (
        <div className="image_container_product">
          <img
            className="but-prodform-image"
            src={uploadimage}
            onClick={handleClick}
            //onMouseEnter={handleBin}
            href="None"
          />
          <div className="delete_image_icon" onClick={handleBin}>
            <img src={Bin} className="bin_label" />
          </div>
        </div>
      ) : (
        <button className="but-prodform-image" onClick={handleClick}>
          +
        </button>
      )}
      {/* <div className="delete_image_icon">
        <img src={Bin} className="bin_label" />
      </div> */}
    </div>
  );
};

export default ButtonProductForm;
