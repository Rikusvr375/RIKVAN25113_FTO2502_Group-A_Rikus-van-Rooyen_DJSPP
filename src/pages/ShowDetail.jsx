import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSinglePodcast } from "../api/fetchPata.js";
import Loading from "../components/UI/Loading.jsx";
import Error from "../components/UI/Error.jsx";
import PodcastDetail from "../components/Podcasts/PodcastDetail.jsx";

export default function ShowDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSinglePodcast(id, setPodcast, setError, setLoading);
  }, [id]);

  if (loading) return <Loading message="Loading podcast..." />;
  if (error) return <Error message={`Error occurred while fetching podcast: ${error}`} />;
  if (!podcast) return null;

  return <PodcastDetail podcast={podcast} genres={podcast.genres || []} />;
}