import React from "react";
import Roll from "../../components/roll/roll";
import RollFavorites from "../../components/rollFavorites/rollFavorites";
import TabHeader from "../../components/tabheader/tabheader";


function FavouritePage() {

  return (
    <div className="App">
      <TabHeader />
      <RollFavorites/>
    </div>
  );
}

export default FavouritePage;
