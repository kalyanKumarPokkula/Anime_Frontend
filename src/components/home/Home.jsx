import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import Card from "../ui/Card";
import BASE_URL from "../../config";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements at randomIndex and i
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
}

function Home() {
  const [animes, setanimes] = useState([]);
  const [search, setsearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAnimes() {
      try {
        let response = await axios.get(`${BASE_URL}/api/v1/anime`);

        console.log(response.data.data);
        shuffleArray(response.data.data);
        setanimes([...response.data.data]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getAnimes();
  }, []);

  return (
    <div className="homediv">
      <form>
        <input
          type="text"
          onChange={e => {
            setsearch(e.target.value);
          }}
        />
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-search"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <circle cx="10" cy="10" r="7"></circle>
            <line x1="21" y1="21" x2="15" y2="15"></line>
          </svg>
        </button>
      </form>
      <div className="content">
        {isLoading && <div class="loader"></div>}
        {animes.map(anime => {
          return <Card anime={anime} />;
        })}
      </div>
    </div>
  );
}

export default Home;
