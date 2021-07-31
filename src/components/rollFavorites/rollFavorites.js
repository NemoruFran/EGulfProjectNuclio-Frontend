import Card from "../card/card";
import "./rollFavorites.css";
import { useEffect, useState } from "react";
import { API_ROOT } from "../../utils/apiHost/apiHost";

const RollFavorites = () => {
  const url = `${API_ROOT}users/me/favorites`;
  const [favorites, setFavorites] = useState(undefined);
  const [refreshFavorites, setrefReshFavorites] = useState(false);
  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        let FavoriteUser = data;
        setFavorites(FavoriteUser);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refreshFavorites]);

  return (
    <div className="main_roll">
      <div className="card_roll">
        {favorites &&
          favorites.map((favorite) => (
            <Card
              img={favorite.images[0]}
              name={favorite.name}
              id={favorite._id}
              nameUser={favorite.owner.name}
              rating={favorite.owner.rating}
              onchangeFavorite={() => setrefReshFavorites(!refreshFavorites)}
            />
          ))}
      </div>
    </div>
  );
};

export default RollFavorites;
