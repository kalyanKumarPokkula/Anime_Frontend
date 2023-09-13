import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Article.css";
import axios from "axios";

function Article() {
  const { id } = useParams();
  const navigator = useNavigate();
  const [anime, setanimes] = useState(null);
  const red = "blue";

  useEffect(() => {
    async function getAnime() {
      try {
        let response = await axios.get(
          `http://localhost:3001/api/v1/anime/${id}`
        );
        console.log(response.data.data);
        setanimes(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    getAnime();
  }, []);

  return (
    <div>
      {anime && (
        <div
          className="articlediv"
          style={{ backgroundImage: `url(${anime.imageURL})` }}
        >
          <div className="article-inner-div">
            <div className="row">
              <div className="col-lg-4 poster-div">
                <img src={anime.imageURL} alt="poster" />
              </div>
              <div className="col-lg-8 info-div">
                <h2>{anime.name}</h2>
                <span>
                  rating : <b>{anime.rating}</b>
                </span>
                <p>{anime.description}</p>
                <div className="info-about-anime">
                  <div className="moreinfo">
                    <span>Type : {anime.type.name}</span>
                    <span>Ep : {anime.totalEpisodes}</span>
                    <span>Status : {anime.status}</span>
                    <span>Studios : {anime.studios}</span>
                  </div>
                  <div className="moreinfo">
                    <span> Premiered: {anime.premiered}</span>
                    <span>Duration : {anime.duration}</span>
                    <span>Genre : {anime.genre}</span>
                  </div>
                </div>
                <div style={{ marginTop: "2%" }}>
                  <button
                    className="watch-btn"
                    style={{ marginRight: "12px" }}
                    onClick={() => {
                      navigator(`/anime/uploadEp/${anime._id}`);
                    }}
                  >
                    Add Episode
                  </button>
                  <button
                    className="watch-btn"
                    onClick={() => navigator(`/anime/${anime._id}/ep-1`)}
                  >
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Article;
