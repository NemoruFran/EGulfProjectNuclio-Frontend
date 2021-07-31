import { useForm } from "react-hook-form";
import PlusIcon from "../../assets/plusIcon.png";
import ButtonProductForm from "../buttonproductform/buttonproductform";
import "./productform.css";
import React, { useState, useEffect, useRef } from "react";
import { API_ROOT } from "../../utils/apiHost/apiHost";

const ProductForm = () => {
  const [selectedCategoriers, setSelectedCategories] = useState([]);
  const reference = useRef();

  const CategorySelector = ({ options, onChange }) => {
    if (options.length !== 0) {
      return (
        <select
          onChange={(e) => onChange(e.target.value)}
          className="form_main_category"
        >
          <option>Select the category</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    } else {
      return (
        <input
          type="text"
          className="form_main_category"
          onChange={(e) => (reference.current = e.target.value)}
        ></input>
      );
    }
  };

  const CategoryCreation = () => {
    const categoryname = reference.current;
    console.log(categoryname);
    const parent = selectedCategoriers[selectedCategoriers.length - 1];
    fetch(`${API_ROOT}categories/searchName/${parent}`, {
      method: "GET",
      "Content-Type": "application/json",
      headers: {},
    })
      .then((res) => res.json())
      .then((json) => {
        let category = json;
        const parentid = category[0]._id;
        fetch(`${API_ROOT}categories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name: categoryname,
            parentCategory: parentid,
          }),
        })
          .then((res) => res.json())
          .catch((errors) => console.log(JSON.stringify(errors)));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const Subcategory = ({ selectedSubcategory, onChange }) => {
    const [subcateogryOptions, setSubcategoryOptions] = useState([]);
    // Haz el useEffect con el fetch a las categorias de la selectedSubcategory
    useEffect(() => {
      fetch(`${API_ROOT}categories/name/${selectedSubcategory}`, {
        method: "GET",
        "Content-Type": "application/json",
        headers: {},
      })
        .then((res) => res.json())
        .then((json) => {
          let pushList = json;
          setSubcategoryOptions(pushList.map((category) => category.name));
        })
        .catch((error) => {
          console.error(error);
        });
    }, [selectedSubcategory]);

    return (
      <CategorySelector options={subcateogryOptions} onChange={onChange} />
    );
  };

  const MainCategories = ({ onChange }) => {
    const [subcateogryOptions, setSubcategoryOptions] = useState([]);
    useEffect(() => {
      fetch(`${API_ROOT}categories/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          let categoriesfirst = [];
          for (const el in json) {
            if (!json[el]["parentCategory"]) {
              categoriesfirst.push(json[el]);
            }
          }
          setSubcategoryOptions(
            categoriesfirst.map((category) => category.name)
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    return (
      <CategorySelector options={subcateogryOptions} onChange={onChange} />
    );
  };

  const [imageArray, setImageArray] = useState([]);

  const ProductFormValues = {
    name: String, //product
    description: String, //product
    images: String,
    shippingFee: Number,
    owner: String, //sacar usuario;
    categoryId: String,
    usersFavs: [],
    createdAt: Date.now,
    updateAt: Date.now,
  };

  const AuctionFormValues = {
    name: String, //product
    description: String, //product
    images: String,
    shippingFee: Number,
    owner: String, //sacar usuario;
    categoryId: String,
    usersFavs: [],
    createdAt: Date.now,
    updateAt: Date.now,
  };

  const submitImage = async (image) => {
    const url = "https://api.cloudinary.com/v1_1/dnktf2sol/image/upload";
    const uploadPreset = "unsigned";
    const cloudinaryFolder = "egulf";

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", cloudinaryFolder);

    const options = { method: "POST", body: formData };

    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm(AuctionFormValues);

  let imgUrls = [];
  console.log(imgUrls);

  const onSubmit = async (data) => {
    for (const img of imageArray) {
      const image = await submitImage(img);
      imgUrls.push(image.secure_url);
      console.log("This is length: " + imgUrls.length);
    }

    setValue("images", imgUrls);

    console.log(data);

    const jsondata = JSON.stringify(data);
    if (Object.keys(errors).length !== 0) {
      alert(JSON.stringify(errors));
    } else {
      fetch(`${API_ROOT}products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: jsondata,
      })
        .then((res) => res.json())
        /* .then((json) => {
          localStorage.setItem("token", json); 
        })*/
        .catch((errors) => console.log(JSON.stringify(errors)));
    }
  };
  const handleUploadImage = (image) => {
    setImageArray([image, ...imageArray]);
  };
  console.log(watch());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="main_container1">
          <img className="plus_icon" src={PlusIcon} alt="icon-plus" />
          <p className="principal_title"> Vende un nuevo producto</p>

          <div className="product_container1">
            <MainCategories
              key={"jajaxd"}
              onChange={(selected) => setSelectedCategories([selected])}
            />
            {selectedCategoriers.map((subcategory, index) => {
              return (
                <Subcategory
                  selectedSubcategory={subcategory}
                  onChange={(selected) => {
                    setSelectedCategories([
                      ...selectedCategoriers.slice(0, index + 1), //de esta forma cualquier cambio destruye lo que viene después,ya que cada paso carga subcategorias según la selección
                      selected,
                    ]);
                  }}
                />
              );
            })}
            <p className="paragraph">
              No encuentras la subcategoría perfecta para tu producto?
              <button className="button" onClick={CategoryCreation}>
                Créala
              </button>
            </p>
          </div>
        </div>

        <div className="product_container2">
          <p className="product_details_title">Detalles del producto</p>
          <input
            className="first_box"
            type="text"
            placeholder="Nombre del producto"
            {...register("name", { required: true })}
          ></input>
          {errors.name && <span>Campo requerido!</span>}
          <input
            className="second_box"
            type="text"
            placeholder="Descripción del producto"
            {...register("description", { required: true })}
          ></input>
          {errors.description && <span>Escribe una breve descripción.</span>}
        </div>

        <div className="product_container3">
          <p className="product_details_title">Subasta y envío</p>
          <input
            className="third_box"
            type="text"
            placeholder="Precio de salida         €"
          ></input>
          <input
            className="fourth_box"
            type="text"
            placeholder="Fecha de inicio de la subasta"
          ></input>
          <input
            className="fifth_box"
            type="text"
            placeholder="Tarifa de envio           €"
          ></input>
        </div>
        <div className="product_container4">
          <div>
            <p className="product_details_title">Imágenes del producto</p>
          </div>

          <div className="container_img_picker">
            <ButtonProductForm getImage={handleUploadImage} />
            <ButtonProductForm getImage={handleUploadImage} />
            <ButtonProductForm getImage={handleUploadImage} />
            <ButtonProductForm getImage={handleUploadImage} />
          </div>
        </div>
      </div>
      <input
        className="_button_submit"
        type="submit"
        value="Submit"
        //{...register}
      />
    </form>
  );
};

export default ProductForm;
