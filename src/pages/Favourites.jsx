import React, { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";
import { Link } from "react-router-dom";
import styles from "./Favourites.module.css";
import { formatDate } from "../utils/formatDate";

export default function Favourites() {
  const { favourites, sortFavourites } = useContext(FavouritesContext);

  const sortOptions = [
    { key: "title-asc", label: "A → Z" },
    { key: "title-desc", label: "Z → A" },
    { key: "date-desc", label: "Newest" },
    { key: "date-asc", label: "Oldest" },
  ];

  const groupedFavourites = favourites.reduce((acc, fav) => {
    const showTitle = fav.show;
    acc[showTitle] = acc[showTitle] || [];
    acc[showTitle].push(fav);
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <h1>Favourites</h1>
      <select
        className={styles.sortSelect}
        onChange={(e) => sortFavourites(e.target.value)}
        defaultValue="date-desc"
      >
        {sortOptions.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
      {Object.entries(groupedFavourites).map(([showTitle, episodes]) => (
        <div key={showTitle} className={styles.showGroup}>
          <h2>{showTitle}</h2>
          {episodes.map((episode) => (
            <div key={episode.episodeId} className={styles.episode}>
              <Link to={`/show/${episode.showId}`}>
                <span>{episode.title}</span> (Season {episode.seasonIndex + 1})
              </Link>
              <span className={styles.addedDate}>
                Added: {formatDate(episode.addedAt)}
              </span>
            </div>
          ))}
        </div>
      ))}
      {favourites.length === 0 && <p>No favourites yet!</p>}
    </div>
  );
}