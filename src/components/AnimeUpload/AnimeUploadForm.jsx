import react from "react";
import { TextField, Button } from "@mui/material";
import GenreMultipleSelectCheckmarks from "./Genre";
import TypesMultipleSelectCheckmarks from "./Types";
import "./AnimeUploadForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    // border: "1px solid #ff9e00",
    borderRadius: 1,
    backgroundColor: "#212529",
    "& .MuiFormLabel-root": {
      fontSize: "0.8rem",
    },
    "& .MuiInputLabel-root": {
      color: "#dee2e6",
    },
    "& label.Mui-focused": {
      color: "#FF9E00",
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& > fieldset": {
        borderColor: "#FF9E00",
      },
    },
  },
});

function AnimeUploadForm() {
  const classes = useStyles();
  const navigator = useNavigate();

  const inputStyle = {
    color: "#FF9E00", // Change this to the desired text color
  };
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [premiered, setPremiered] = useState("");
  const [studios, setStudios] = useState("");
  const [episodes, setEpisodes] = useState("");
  const [rating, setRating] = useState("");
  const [genre, setGenre] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    console.log(
      name,
      description,
      studios,
      status,
      duration,
      episodes,
      rating,
      type,
      image,
      genre,
      premiered
    );

    if (!name) {
      console.log("please fill the name");
      return;
    }

    if (!description) {
      console.log("please fill the description");
      return;
    }
    if (!rating) {
      console.log("please fill the rating");
      return;
    }
    if (!episodes) {
      console.log("please fill the episodes");
      return;
    }
    if (!image) {
      console.log("please fill the image");
      return;
    }
    if (!status) {
      console.log("please fill the status");
      return;
    }
    if (!studios) {
      console.log("please fill the studios");
      return;
    }
    if (type.length === 0) {
      console.log("please fill the type");
      return;
    }

    if (genre.length === 0) {
      console.log("please fill the genre");
      return;
    }
    if (!premiered) {
      console.log("please fill the premiered");
      return;
    }
    if (!duration) {
      console.log("please fill the duration");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("genre", genre);
    formData.append("rating", rating.trim());
    formData.append("episodes", episodes.trim());
    formData.append("studios", studios.trim());
    formData.append("premiered", premiered.trim());
    formData.append("type", type);
    formData.append("duration", duration.trim());
    formData.append("status", status.trim());
    formData.append("description", description.trim());
    formData.append("name", name.trim());

    async function uploadFrom() {
      try {
        let response = await axios.post(
          "http://localhost:3001/api/v1/animes",
          formData
        );
        console.log(response.data.data);
        navigator(`/anime/${response.data.data._id}`);
      } catch (error) {
        console.log(error);
      }
    }

    uploadFrom();

    console.log(formData);
  }

  return (
    <div className="anime-upload">
      <div className="title">
        <h1>Anime Upload</h1>
      </div>
      <div className="anime-form">
        <div>
          <div className="textfield">
            <TextField
              //   helperText="Please enter anime name"
              id="demo-helper-text-aligned"
              label="Name"
              InputProps={{
                sx: {
                  height: 50,
                },
                style: inputStyle,
              }}
              // sx={{
              //   "& .MuiFormLabel-root": {
              //     fontSize: "0.8rem",
              //   },
              //   "& .MuiInputLabel-root": {
              //     color: "#ff9e00",
              //   },
              //   border: "1px solid #ff9e00",
              //   borderRadius: 1,
              //   backgroundColor: "#212529",
              // }}
              // InputProps={{
              //   classes: {
              //     notchedOutline: classes.notchedOutline,
              //   },
              // }}
              className={classes.root}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="textfield">
            <TextField
              //   helperText="Please enter anime description "
              id="demo-helper-text-aligned"
              label="Description"
              fullWidth={true}
              InputProps={{ sx: { height: 50 }, style: inputStyle }}
              className={classes.root}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="textfield">
            <TextField
              //   helperText="Please enter anime status"
              id="demo-helper-text-aligned"
              label="Status"
              fullWidth={true}
              InputProps={{ sx: { height: 50 }, style: inputStyle }}
              className={classes.root}
              onChange={e => setStatus(e.target.value)}
            />
          </div>
          <div className="textfield">
            <TextField
              //   helperText="Please enter anime creation Studios"
              id="demo-helper-text-aligned"
              label="Duration"
              fullWidth={true}
              InputProps={{ sx: { height: 50 }, style: inputStyle }}
              className={classes.root}
              onChange={e => setDuration(e.target.value)}
            />
          </div>
          <div className="textfield">
            <TypesMultipleSelectCheckmarks
              onTypeHandler={e => {
                console.log(e);
                setType(e);
              }}
            />
          </div>
          <div>
            <Button
              variant="contained"
              component="label"
              fullWidth={true}
              InputProps={{ sx: { height: 50 } }}
              className={classes.root}
              style={{ backgroundColor: "#FF9E00" }}
              onChange={e => setImage(e.target.files[0])}
            >
              Upload
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </div>
        </div>
        <div>
          <div className="textfield">
            <TextField
              //   helperText="Please enter anime Premiered year"
              id="demo-helper-text-aligned"
              label="Premiered"
              fullWidth={true}
              InputProps={{ sx: { height: 50 }, style: inputStyle }}
              className={classes.root}
              onChange={e => setPremiered(e.target.value)}
            />
          </div>
          <div className="textfield">
            <TextField
              //   helperText="Please enter anime creation Studios"
              id="demo-helper-text-aligned"
              label="Studios"
              fullWidth={true}
              InputProps={{ sx: { height: 50 }, style: inputStyle }}
              className={classes.root}
              onChange={e => setStudios(e.target.value)}
            />
          </div>
          <div className="textfield">
            <TextField
              //   helperText="Please enter anime creation Studios"
              id="demo-helper-text-aligned"
              label="Episodes"
              fullWidth={true}
              InputProps={{ sx: { height: 50 }, style: inputStyle }}
              className={classes.root}
              onChange={e => setEpisodes(e.target.value)}
            />
          </div>

          <div className="textfield">
            <TextField
              //   helperText="Please enter anime Premiered year"
              id="demo-helper-text-aligned"
              label="Rating"
              fullWidth={true}
              InputProps={{ sx: { height: 50 }, style: inputStyle }}
              className={classes.root}
              onChange={e => setRating(e.target.value)}
            />
          </div>
          <div className="textfield">
            <GenreMultipleSelectCheckmarks
              onGenreHandler={e => {
                setGenre(e);
              }}
            />
          </div>
          <div>
            <Button
              variant="contained"
              component="label"
              fullWidth={true}
              InputProps={{ sx: { height: 50 } }}
              className={classes.root}
              style={{ backgroundColor: "#FF9E00" }}
              onClick={submitHandler}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeUploadForm;
