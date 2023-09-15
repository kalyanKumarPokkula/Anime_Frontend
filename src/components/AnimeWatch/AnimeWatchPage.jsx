import "./AnimeWatchPage.css";
import AnimeEpisodeCard from "./AnimeEpisodeCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BASE_URL from "../../config";

function totalPages(totalepisodes) {
  var totalpages = Math.round(totalepisodes / 56) + 1;
  let totalpagesoptions = [];
  let lowerBound = 1;
  let upperBound = 56;

  if (totalepisodes <= upperBound) {
    return [[lowerBound, totalepisodes]];
  }
  for (var i = 1; i <= totalpages; i++) {
    if (lowerBound == 1 && i == 1) {
      totalpagesoptions.push([lowerBound, upperBound]);
    } else {
      lowerBound = lowerBound + 56;
      upperBound = upperBound + 56;
      if (upperBound >= totalepisodes) {
        totalpagesoptions.push([lowerBound, totalepisodes]);
        return totalpagesoptions;
      } else {
        totalpagesoptions.push([lowerBound, upperBound]);
      }
    }
  }

  return totalpagesoptions;
}
console.log(totalPages(293));

const AnimeWatchPage = () => {
  const [anime, setAnime] = useState(null);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [componentsEp, setComponentsEp] = useState([]);
  const [episode, setEpisode] = useState(null);
  const { id } = useParams();
  const navigator = useNavigate();

  function getAnimeEpisode(ep) {
    async function helper() {
      try {
        let body = { episodeNumber: ep };

        console.log(body);
        let response = await axios.get(
          `${BASE_URL}/api/v1/anime/episodes/${id}`,
          {
            params: {
              episodeNumber: ep,
            },
          }
        );

        if (response.data.data.length == 0) {
          setEpisode(null);
        } else {
          setEpisode(response.data.data[0]);
        }
        console.log(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
    helper();
  }

  useEffect(() => {
    console.log(id);
    async function getAnime() {
      try {
        let response = await axios.get(`${BASE_URL}/api/v1/anime/${id}`);
        console.log(response.data.data);
        setAnime(response.data.data);
        let totalpages = totalPages(response.data.data.totalEpisodes);
        setPageNumbers([...totalpages]);

        const components = [];
        for (let index = 1; index <= totalpages[0][1]; index++) {
          components.push(
            <AnimeEpisodeCard
              key={index}
              value={index}
              onGetAnimeEpisode={getAnimeEpisode}
            />
          );
        }
        console.log(components);
        setComponentsEp([...components]);
      } catch (error) {
        console.log(error);
      }
    }

    getAnime();
  }, []);

  return (
    <div style={{ maxWidth: "100%", maxHeight: "100%" }}>
      {anime && (
        <div className="anime-watch-page">
          <div className="title">
            <h1>{anime.name}</h1>
          </div>
          <div className="main-body">
            <div className="video-player">
              {episode && (
                <video
                  src={episode.episodeURL}
                  controls
                  style={{ width: "100%" }}
                ></video>
              )}
              {!episode && (
                <div style={{ width: "100%", position: "relative" }}>
                  <div className="bg-image"></div>
                  <div className="watch-btns">Watch Now</div>
                  <img
                    src="https://wallpaper.dog/large/17108773.jpg"
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
            </div>
            <div className="anime-episode">
              <div>
                <select
                  name="episodes"
                  id="cars"
                  onChange={e => {
                    let page = e.target.value.split(",");
                    let components = [];
                    for (var i = Number(page[0]); i <= Number(page[1]); i++) {
                      components.push(
                        <AnimeEpisodeCard
                          key={i}
                          value={i}
                          onGetAnimeEpisode={getAnimeEpisode}
                        />
                      );
                    }

                    setComponentsEp([...components]);
                  }}
                >
                  {pageNumbers.map(page => {
                    return (
                      <option value={page}>
                        {page[0]}-{page[1]}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="episode-number">
                {componentsEp.map(episode => {
                  return episode;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeWatchPage;
