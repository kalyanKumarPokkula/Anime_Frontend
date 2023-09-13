import React, { useState, useEffect } from "react";
import "../home/Home.css";
import axios from "axios";
import Card from "../ui/Card";

function Movies() {
  const [animes, setanimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAnimes() {
      try {
        let response = await axios.get(
          `http://localhost:3001/api/v1/animes/${"Movie"}`
        );

        console.log(response.data.data);
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
      <div className="content">
        {isLoading && <div class="loader"></div>}
        {animes.map(anime => {
          return <Card anime={anime} />;
        })}
      </div>
    </div>
  );
}

export default Movies;
