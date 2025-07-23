import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSinglePodcast } from "../api/fetchPata";
import { Loading, Error } from "../components";
import { AudioPlayerContext } from "../context/AudioPlayerContext";
import styles from "./ShowDetail.module.css";

/**
 * ShowDetail page component for displaying detailed information about a single podcast.
 *
 * - Extracts the podcast ID from the URL using React Router's `useParams`.
 * - Optionally retrieves genre data from navigation state via `useLocation`.
 * - Fetches podcast data from the API on mount using `fetchSinglePodcast`.
 * - Displays a loading state, error message, or the detailed podcast view.
 *
 * Components used:
 * - `Loading` while fetching data
 * - `Error` if fetch fails
 * - `PodcastDetail` when data is successfully retrieved
 *
 * @returns {JSX.Element} The detailed view of a selected podcast.
 */
export default function ShowDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);

  const { play } = useContext(AudioPlayerContext);

  useEffect(() => {
    fetchSinglePodcast(id, setPodcast, setError, setLoading);
  }, [id]);

  if (loading) return <Loading message="Loading podcast..." />;
  if (error) return <Error message={`Error occurred while fetching podcast: ${error}`} />;
  if (!podcast || !podcast.seasons) return null;

  const season = podcast.seasons[selectedSeasonIndex];

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Header */}
      <div className={styles.header}>
        <img src={podcast.image} alt="Podcast Cover" className={styles.cover} />
        <div>
          <h1 className={styles.title}>{podcast.title}</h1>
          <p className={styles.description}>{podcast.description}</p>
          <div className={styles.metaInfo}>
            <div className={styles.seasonInfo}>
              <div>
                <p>Genres</p>
                {/* If you have a GenreTags component, use it here */}
                {/* <GenreTags genres={podcast.genres} /> */}
              </div>
              <div>
                <p>Last Updated:</p>
                <strong>{podcast.updated}</strong>
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

      {/* Season Details */}
      <div className={styles.seasonDetails}>
        <div className={styles.seasonIntro}>
          <div className={styles.left}>
            <img className={styles.seasonCover} src={season.image} alt="" />
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

        {/* Episode List */}
        <div className={styles.episodeList}>
          {season.episodes.map((episode, index) => (
            <div key={episode.id} className={styles.episodeCard}>
              <img className={styles.episodeCover} src={season.image} alt="" />
              <div className={styles.episodeInfo}>
                <p className={styles.episodeTitle}>
                  Episode {index + 1}: {episode.title}
                </p>
                <p className={styles.episodeDesc}>{episode.description}</p>
                <button
                  className={styles.playButton}
                  onClick={() =>
                    play({
                      src: episode.audio, // or episode.audioUrl, depending on your API
                      title: episode.title,
                      show: podcast.title,
                      episode: episode.id,
                    })
                  }
                >
                  Play
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
