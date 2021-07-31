import React from "react";
import { useEffect, useState } from "react";
import { API_ROOT } from "../utils/apiHost/apiHost";

export const useAuctions = (userId) => {
  const url = `${API_ROOT}auctions`;
  const userUrl = `${API_ROOT}auctions/user/${userId}`;
  const [auctions, setAuctions] = useState(undefined);
  const [refreshAuctions, setRefreshAuctions] = useState(false);

  const handleRefresh = () => {
    setRefreshAuctions(!refreshAuctions);
  };

  useEffect(() => {
    fetch(userId ? userUrl : url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        let auctionUser = data;
        setAuctions(auctionUser);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refreshAuctions]);

  return { auctions, handleRefresh };
};
