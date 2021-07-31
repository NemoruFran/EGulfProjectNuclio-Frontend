import "./tabsubheader.css";
const TabSubHeader = ({ subcategories }) => {
  return (
    <div className="_subheadContainerPosition">
      <div className="_subheadContainer">
        {subcategories}
      </div>
    </div>
  );
};
export default TabSubHeader;