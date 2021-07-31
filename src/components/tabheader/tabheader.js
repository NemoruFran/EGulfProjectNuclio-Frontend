import "./tabheader.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import TabSubHeader from "../tabsubheader/tabsubheader";
import { API_ROOT } from "../../utils/apiHost/apiHost";

const agregateCategoriesAndSubcategories = (categoryList) => {
  const filteredCategories = {};
  const filteredSubcategories = {};
  categoryList.forEach((category) => {
    const hasCategoryParent =
      category.parentCategory && category.parentCategory !== "";
    if (!hasCategoryParent) {
      return (filteredCategories[category.name] = [category._id]);
    } else {
      return (filteredSubcategories[category.name] = [category.parentCategory]);
    }
  });
  let finalCategories = {};
  Object.keys(filteredCategories).forEach((category) => {
    const categoryToSearch = filteredCategories[category][0];
    const subcategories = Object.keys(filteredSubcategories).filter(
      (subcategory) =>
        filteredSubcategories[subcategory][0] === categoryToSearch
    );
    finalCategories[category] = subcategories;
  });
  return finalCategories;
};
const TabHeader = () => {
  const [categories, setCategories] = useState();
  const history = useHistory();
  const [selectedCategory, setSelectedCategory] = useState(false);
  useEffect(() => {
    fetch(`${API_ROOT}categories`)
      .then((response) => response.json())
      .then((json) => {
        setCategories(agregateCategoriesAndSubcategories(json));
      });
  }, []);
  console.log(selectedCategory);
  return (
    <div>
      <div
        onMouseLeave={() => setSelectedCategory(null)}
        className="_headContainer"
      >
        <div className="_tabheadContainer">
          <span onClick={() => history.push("/")}>PORTADA</span>
        </div>
        <div className="_tabheadContainer">
          <span onClick={() => history.push("/favouritePage")}>FAVORITOS</span>
        </div>
        {categories &&
          Object.keys(categories).map((category) => {
            return (
              <div
                className="_tabheadContainer"
                onMouseEnter={() => setSelectedCategory(category)}
              >
                <span>{category}</span>
              </div>
            );
          })}
        {console.log(categories && categories.selectedCategory)}
        {selectedCategory && (
          <div>
            <TabSubHeader
              subcategories={
                categories &&
                categories[selectedCategory] &&
                categories[selectedCategory].map((subcategory) => {
                  return (
                    <div className="_tabSubheadContainer">{subcategory}</div>
                  );
                })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default TabHeader;
