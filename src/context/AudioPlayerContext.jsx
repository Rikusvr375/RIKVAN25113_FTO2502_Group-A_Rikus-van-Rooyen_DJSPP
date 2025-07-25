import React, { createContext, useState, useEffect, useRef } from "react";

export const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null); // { src, title, show, episode, showId, seasonIndex, episodeId }
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // Progress in seconds
  const [duration, setDuration] = useState(0); // Duration in seconds
  const audioRef = useRef(new Audio()); // Global audio element

  useEffect(() => {
    const audio = audioRef.current;

    // Update progress on timeupdate
    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration);
    };

    // Set duration when metadata is loaded
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    // Reset state when track ends
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    // Prompt on page reload if audio is playing
    const handleBeforeUnload = (e) => {
      if (isPlaying) {
        e.preventDefault();
        e.returnValue = "Audio is playing. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isPlaying]);

  const play = (track) => {
    if (!track.src) return;
    if (currentTrack?.src !== track.src) {
      audioRef.current.src = track.src;
      setCurrentTrack(track);
      setProgress(0);
    }
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const seek = (time) => {
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        duration,
        play,
        pause,
        seek,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};