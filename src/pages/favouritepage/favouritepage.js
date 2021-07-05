import React from "react";
import Card from "../../components/card/card";
import Roll from "../../components/roll/roll";
import TabHeader from "../../components/tabheader/tabheader";

function FavouritePage() {
  return (
    <div>
      <TabHeader />
      <Roll />
      <Roll />
      <Roll />
    </div>
  );
}

export default FavouritePage;
