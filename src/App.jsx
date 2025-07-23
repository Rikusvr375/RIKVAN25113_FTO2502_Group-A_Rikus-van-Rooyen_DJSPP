import { Routes, Route } from "react-router-dom";
import Header from "./components/UI/Header";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail.jsx";
import { PodcastProvider } from "./context/PodcastContext.jsx";
import { AudioPlayerProvider } from "./context/AudioPlayerContext.jsx";
import AudioPlayerBar from "./components/UI/AudioPlayerBar.jsx";

/**
 * Root component of the Podcast Explorer app.
 *
 * - Wraps the application in the `PodcastProvider` context for global state.
 * - Includes the `Header` component, displayed on all pages.
 * - Defines client-side routes using React Router:
 *    - "/" renders the `Home` page
 *    - "/show/:id" renders the `ShowDetail` page for a specific podcast
 *
 * @returns {JSX.Element} The application component with routing and context.
 */
export default function App() {
  return (
    <AudioPlayerProvider>
      <Header />
      <PodcastProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/show/:id`} element={<ShowDetail />} />
        </Routes>
      </PodcastProvider>
      <AudioPlayerBar />
    </AudioPlayerProvider>
  );
}
