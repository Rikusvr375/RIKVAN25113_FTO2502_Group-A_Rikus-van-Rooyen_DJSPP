import React, { createContext, useState, useEffect } from "react";

export const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (episode) => {
    const existing = favourites.find(
      (fav) => fav.episodeId === episode.id && fav.showId === episode.showId
    );
    if (existing) {
      setFavourites(favourites.filter((fav) => fav !== existing));
    } else {
      setFavourites([
        ...favourites,
        {
          ...episode,
          addedAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const isFavourite = (episode) =>
    favourites.some((fav) => fav.episodeId === episode.id && fav.showId === episode.showId);

  const sortFavourites = (key) => {
    const sorted = [...favourites];
    switch (key) {
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date-asc":
        sorted.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
        break;
      case "date-desc":
        sorted.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
        break;
      default:
        break;
    }
    setFavourites(sorted);
  };

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite, isFavourite, sortFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
}