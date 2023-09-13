import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";
import Top from "./components/top10/Top";
import Trending from "./components/trending/Trending";
import Article from "./components/article/Article";
import TvSeries from "./components/tvseries/TvSeries";
import Movies from "./components/movies/Movies";
import AnimeUploadForm from "./components/AnimeUpload/AnimeUploadForm";
import AnimeEpisodeUploadForm from "./components/AnimeUpload/AnimeEpisodeUploadForm";
import AnimeWatchPage from "./components/AnimeWatch/AnimeWatchPage";

function App() {
  return (
    <div className="App">
      <Nav />
      <main>
        <Routes>
          <Route path="anime/" element={<Home />} />
          <Route path="anime/top10" element={<Top />} />
          <Route path="anime/trending" element={<Trending />} />
          <Route path="/anime/:id" element={<Article />} />
          <Route path="/anime/tvseries" element={<TvSeries />} />
          <Route path="/anime/movies" element={<Movies />} />
          <Route path="/anime/upload" element={<AnimeUploadForm />} />
          <Route
            path="/anime/uploadEp/:id"
            element={<AnimeEpisodeUploadForm />}
          />
          <Route path="/anime/:id/ep-1" element={<AnimeWatchPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
