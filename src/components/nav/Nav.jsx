import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Nav.css";
import { IconArrowsDoubleSeNw } from "@tabler/icons";

function Nav() {
  const navigator = useNavigate();
  const sun = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-sun"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
    </svg>
  );

  const moon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-moon"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
    </svg>
  );

  const [mode, setmode] = useState(true);
  const [icon, seticon] = useState(sun);

  function modeChangeHandler() {
    if (mode) {
      document.documentElement.setAttribute("data-theme", "light");
      setmode(false);
      seticon(moon);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      setmode(true);
      seticon(sun);
    }
  }

  return (
    <nav>
      <h2>ANIMEdn59</h2>
      <div className="navlinks">
        <NavLink to="anime/">Home</NavLink>
        <NavLink to="anime/tvSeries">Tv Series</NavLink>
        <NavLink to="anime/movies">Movies</NavLink>
        <NavLink to="anime/top10">Top10</NavLink>
        <NavLink to="anime/trending">Trending</NavLink>
      </div>
      <div className="actions">
        <button className="action-btn" onClick={modeChangeHandler}>
          <IconArrowsDoubleSeNw
            size={36} // set custom `width` and `height`
            stroke={2} // set `stroke-width`
          />
        </button>
        <button className="action-btn" onClick={modeChangeHandler}>
          {icon}
        </button>
      </div>
    </nav>
  );
}

export default Nav;
