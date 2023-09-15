import "./AnimeEpisodeCard.css";

const AnimeEpisodeCard = props => {
  return (
    <div
      className="episode-box"
      onClick={e => {
        props.onGetAnimeEpisode(props.value);
      }}
    >
      <a target="_blank">{props.value}</a>
    </div>
  );
};

export default AnimeEpisodeCard;
