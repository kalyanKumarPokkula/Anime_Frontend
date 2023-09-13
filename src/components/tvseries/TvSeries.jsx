import React, { useState, useEffect } from "react";
import "../home/Home.css";
import Card from "../ui/Card";
import axios from "axios";

function TvSeries() {
  const [animes, setanimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAnimes() {
      try {
        let response = await axios.get(
          `http://localhost:3001/api/v1/animes/${"Tv"}`
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
        {animes.length > 0 &&
          animes.map(anime => {
            return <Card key={anime._id} anime={anime} />;
          })}
      </div>
    </div>
  );
}

export default TvSeries;
