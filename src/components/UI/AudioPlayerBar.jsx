import React, { useContext } from "react";
import { AudioPlayerContext } from "../../context/AudioPlayerContext";
import styles from "./AudioPlayerBar.module.css";

export default function AudioPlayerBar() {
  const { current, playing, play, pause, seek, progress, audioRef, setPlaying } = useContext(AudioPlayerContext);

  if (!current) return null;

  

  const handlePlayPause = () => {
    if (playing) {
      pause();
    } else {
      play(current);
    }
  };

  const handleSeek = (e) => {
    const pct = parseFloat(e.target.value); 
    if (audioRef.current && audioRef.current.duration && isFinite(audioRef.current.duration)) {
      const time = (pct / 100) * audioRef.current.duration;
      if (isFinite(time)) {
        seek(time);
      } else {
        console.error("Invalid seek time calculated:", time);
      }
    } else {
      console.error("Audio duration is not available or finite");
    }
  };

  return (
    <div className={styles.playerBar}>
      <div className={styles.info}>
        <strong>{current.title}</strong>
        <span>{current.show}</span>
      </div>
      <button onClick={handlePlayPause}>
        {playing ? "Pause" : "Play"}
      </button>
      <input
        type="range"
        min={0}
        max={100}
        value={isNaN(progress * 100) ? 0 : progress * 100}
        onChange={handleSeek}
      />
    </div>
  );
}