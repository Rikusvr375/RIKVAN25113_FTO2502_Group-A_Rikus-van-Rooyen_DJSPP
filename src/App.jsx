import { Routes, Route } from "react-router-dom";
import Header from "./components/UI/Header";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail.jsx";
import { PodcastProvider } from "./context/PodcastContext.jsx";
import { AudioPlayerProvider } from "./context/AudioPlayerContext.jsx";
import AudioPlayerBar from "./components/UI/AudioPlayerBar.jsx";
import { FavouritesProvider } from "./context/FavouritesContext.jsx";
import Favourites from "./pages/Favourites.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { useEffect } from "react";

function AppContent() {
  useEffect(() => {
    const body = document.body;
    if (body) {
      const savedTheme = localStorage.getItem("theme") || "dark";
      body.classList.remove("dark", "light");
      body.classList.add(savedTheme);
    }
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetail />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
      <AudioPlayerBar />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AudioPlayerProvider>
        <FavouritesProvider>
          <PodcastProvider>
            <AppContent />
          </PodcastProvider>
        </FavouritesProvider>
      </AudioPlayerProvider>
    </ThemeProvider>
  );
}