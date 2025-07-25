import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AudioPlayerContext } from "../../context/AudioPlayerContext.jsx"; 
import { FavouritesContext } from "../../context/FavouritesContext.jsx";
import { formatDate } from "../../utils/formatDate.js";
import GenreTags from "../UI/GenreTags.jsx";
import styles from "./PodcastDetail.module.css";

export default function PodcastDetail({ podcast, genres }) {
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const season = podcast.seasons[selectedSeasonIndex];
  const navigate = useNavigate();
  const { play } = useContext(AudioPlayerContext);
  const { toggleFavourite, isFavourite } = useContext(FavouritesContext);

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.header}>
        <img src={podcast.image} alt="Podcast Cover" className={styles.cover} />
        <div>
          <h1 className={styles.title}>{podcast.title}</h1>
          <p className={styles.description}>{podcast.description}</p>
          <div className={styles.metaInfo}>
            <div className={styles.seasonInfo}>
              <div>
                <p>Genres</p>
                <GenreTags genres={genres} />
              </div>
              <div>
                <p>Last Updated:</p>
                <strong>{formatDate(podcast.updated)}</strong>
              </div>
              <div>
                <p>Total Seasons:</p>
                <strong>{podcast.seasons.length} Seasons</strong>
              </div>
              <div>
                <p>Total Episodes:</p>
                <strong>
                  {podcast.seasons.reduce((acc, s) => acc + s.episodes.length, 0)} Episodes
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.seasonDetails}>
        <div className={styles.seasonIntro}>
          <div className={styles.left}>
            <img className={styles.seasonCover} src={season.image} />
            <div>
              <h3>
                Season {selectedSeasonIndex + 1}: {season.title}
              </h3>
              <p>{season.description}</p>
              <p className={styles.releaseInfo}>
                {season.episodes.length} Episodes
              </p>
            </div>
          </div>
          <select
            value={selectedSeasonIndex}
            onChange={(e) => setSelectedSeasonIndex(Number(e.target.value))}
            className={styles.dropdown}
          >
            {podcast.seasons.map((s, i) => (
              <option key={i} value={i}>
                Season {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.episodeList}>
          {season.episodes.map((ep, index) => (
            <div key={index} className={styles.episodeCard}>
              <img className={styles.episodeCover} src={season.image} alt="" />
              <div className={styles.episodeInfo}>
                <p className={styles.episodeTitle}>
                  Episode {index + 1}: {ep.title}
                </p>
                <p className={styles.episodeDesc}>{ep.description}</p>
                <button
                  className={styles.playButton}
                  onClick={() =>
                    play({
                      src: ep.file,
                      title: ep.title,
                      show: podcast.title,
                      episode: ep.id,
                      showId: podcast.id,
                      seasonIndex: selectedSeasonIndex,
                      episodeId: ep.id,
                    })
                  }
                >
                  Play
                </button>
                <button
                  className={styles.favButton}
                  onClick={() =>
                    toggleFavourite({
                      title: ep.title,
                      show: podcast.title,
                      showId: podcast.id,
                      seasonIndex: selectedSeasonIndex,
                      episodeId: ep.id,
                    })
                  }
                >
                  {isFavourite({
                    id: ep.id,
                    showId: podcast.id,
                  }) ? "❤️" : "🤍"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}