import "./mainpage.css";
import TabHeader from "../../components/tabheader/tabheader";
import TabSubHeader from "../../components/tabsubheader/tabsubheader";
import AdBanner from "../../components/adbanner/adbanner";
import Roll from "../../components/roll/roll";

const MainPage = () => {
  return (
    <div className="App">
      <TabHeader />

      <hr className="_separatorLine2" size="1" width="99.9%" color="#D9D9D9" />

      <AdBanner />
      <Roll title="Articulos vistos recientemente" />
      <Roll title="Televisores" />
    </div>
  );
};

export default MainPage;
