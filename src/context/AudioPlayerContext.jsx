import React, { createContext, useRef, useState } from "react";

export const AudioPlayerContext = createContext();

export function AudioPlayerProvider({ children }) {
  const audioRef = useRef(null);
  const [current, setCurrent] = useState(null); // { src, title, show, episode }
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const play = (track) => {
    setCurrent(track);
    setPlaying(true);
  };

  const pause = () => setPlaying(false);
  const clear = () => setCurrent(null);

  const seek = (time) => {
    if (audioRef.current) audioRef.current.currentTime = time;
  };

  const onTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration)
      setProgress(audioRef.current.currentTime / audioRef.current.duration);
  };

  return (
    <AudioPlayerContext.Provider value={{ current, play, pause, clear }}>
      {children}
      <audio
        ref={audioRef}
        src={current?.src}
        autoPlay={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={onTimeUpdate}
        style={{ display: "none" }}
      />
    </AudioPlayerContext.Provider>
  );
}