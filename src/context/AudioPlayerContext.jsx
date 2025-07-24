import React, { createContext, useRef, useState } from "react";

export const AudioPlayerContext = createContext();

export function AudioPlayerProvider({ children }) {
  const audioRef = useRef(null);
  const [current, setCurrent] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const play = async (track) => {
    if (!track?.src) {
      console.error("No audio source provided");
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setCurrent(track);
    audioRef.current.src = track.src;
    setPlaying(true);

    try {
      await audioRef.current.play();
    } catch (error) {
      console.error("Failed to play audio:", error);
      setPlaying(false);
    }
  };

  const pause = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
    setPlaying(false);
  };

  const clear = () => {
    setCurrent(null);
    setPlaying(false);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const seek = (time) => {
    if (audioRef.current && isFinite(time) && time >= 0 && time <= audioRef.current.duration) {
      audioRef.current.currentTime = time;
      setProgress(time / audioRef.current.duration || 0);
    } else {
      console.error("Invalid seek time:", time);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      setProgress(audioRef.current.currentTime / audioRef.current.duration);
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        current,
        playing,
        play,
        pause,
        clear,
        seek,
        progress,
        audioRef,
        setPlaying,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={onTimeUpdate}
        onError={(e) => console.error("Audio error:", e)}
        style={{ display: "none" }}
      />
    </AudioPlayerContext.Provider>
  );
}