import React, { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";
import { Link } from "react-router-dom";
import GenreTags from "./UI/GenreTags";
import styles from "./RecommendedCarousel.module.css";

export default function RecommendedCarousel() {
  const { allPodcasts } = useContext(PodcastContext);

  const scroll = (direction) => {
    const container = document.querySelector(`.${styles.carousel}`);
    const scrollAmount = direction === "left" ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className={styles.carouselContainer}>
      <h2>Recommended Shows</h2>
      <button className={styles.arrow} onClick={() => scroll("left")}>
        ←
      </button>
      <div className={styles.carousel}>
        {allPodcasts.map((podcast) => (
          <Link
            key={podcast.id}
            to={`/show/${podcast.id}`}
            className={styles.carouselItem}
          >
            <img src={podcast.image} alt={podcast.title} />
            <h3>{podcast.title}</h3>
            <GenreTags genres={podcast.genres || []} />
          </Link>
        ))}
      </div>
      <button className={styles.arrow} onClick={() => scroll("right")}>
        →
      </button>
    </div>
  );
}