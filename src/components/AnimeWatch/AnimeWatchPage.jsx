import "./AnimeWatchPage.css";
import AnimeEpisodeCard from "./AnimeEpisodeCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    async function getAnime() {
      try {
        let response = await axios.get(
          `http://localhost:3001/api/v1/anime/${id}`
        );
        console.log(response.data.data);
        setAnime(response.data.data);
        let totalpages = totalPages(response.data.data.totalEpisodes);
        setPageNumbers([...totalpages]);

        const components = [];
        for (let index = 1; index <= totalpages[0][1]; index++) {
          components.push(<AnimeEpisodeCard key={index} value={index} />);
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
    <div>
      {anime && (
        <div className="anime-watch-page">
          <div>
            <h1>{anime.name}</h1>
          </div>
          <div className="main-body">
            <div className="video-player">
              <video
                src="https://anime-059.s3.ap-south-1.amazonaws.com/002+-+The+Hokage's+Son!.mp4"
                controls
                style={{ width: "100%" }}
              ></video>
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
                      components.push(<AnimeEpisodeCard key={i} value={i} />);
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
