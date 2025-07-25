import React, { useContext } from "react";
import { AudioPlayerContext } from "../../context/AudioPlayerContext";
import styles from "./AudioPlayerBar.module.css";

export default function AudioPlayer() {
  const { currentTrack, isPlaying, progress, duration, play, pause, seek } =
    useContext(AudioPlayerContext);

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    seek(time);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (!currentTrack) return null;

  return (
    <div className={styles.player}>
      <div className={styles.info}>
        <span>{currentTrack.show} - {currentTrack.title}</span>
      </div>
      <div className={styles.controls}>
        <button
          onClick={isPlaying ? pause : () => play(currentTrack)}
          className={styles.playButton}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={progress}
          onChange={handleSeek}
          className={styles.seekBar}
        />
        <span className={styles.time}>
          {formatTime(progress)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}