import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Card.css";

function Card(props) {
  const navigator = useNavigate();
  const title = props.anime.name;
  const playIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-player-play"
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
      <path d="M7 4v16l13 -8z"></path>
    </svg>
  );

  return (
    <div className="carddiv">
      <img src={props.anime.imageURL} alt="poster" />
      <h2
        className="title"
        onClick={() => navigator(`/anime/${props.anime._id}`)}
      >
        {title}
      </h2>
      <p>{props.anime.description.substr(0, 55)}...</p>
      <div className="card-action-div">
        <b>{props.anime.rating.toFixed(1)}</b>
        {/* <b>{props.anime.type}</b> */}
        <a
          href={props.anime.watchurl}
          className="card-watch-btn"
          target="_blank"
        >
          {playIcon}
        </a>
      </div>
    </div>
  );
}

export default Card;
