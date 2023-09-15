import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import "../home/Home.css";
import Button from "@mui/material/Button";
import "./AnimeEpisodeUploadForm.css";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config";

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

const AnimeEpisodeUploadForm = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigator = useNavigate();
  const [video, setVideo] = useState("");
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [episodeNumber, setEpisodeNumber] = useState();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [successFullyUploaded, setSuccessfullyUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [anime, setAnime] = useState(null);
  const inputStyle = {
    color: "#FF9E00", // Change this to the desired text color
  };

  useEffect(() => {
    async function getanime() {
      try {
        let response = await axios.get(
          `http://localhost:3001/api/v1/anime/${id}`
        );

        console.log(response.data.data);
        setAnime(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getanime();
  }, []);

  function submitHandler(e) {
    e.preventDefault();
    console.log(episodeNumber, episodeTitle, video);

    if (!episodeTitle) {
      console.log("please fill the episodeTitle");
      return;
    }

    if (!episodeNumber) {
      console.log("please fill the episode number");
      return;
    }

    if (!video) {
      console.log("please upload a video");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("episode", video);
    formData.append("episodeTitle", episodeTitle.trim());
    formData.append("episodeNumber", episodeNumber.trim());

    async function uploadNewAnimeEpisode() {
      try {
        let response = await axios.post(
          `${BASE_URL}/api/v1/anime/upload_episode/${id}`,
          formData
        );
        console.log(response.data.data);
        setUploading(false);
        setSuccessfullyUploaded(true);
        setTimeout(() => {
          navigator(`/anime/${id}`);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }

    uploadNewAnimeEpisode();

    console.log(formData);
  }
  return (
    <div>
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "54px",
          }}
        >
          <div class="loader"></div>
        </div>
      )}
      {anime && (
        <div className="episode-form">
          <div className="anime-name">{anime.name}</div>
          {uploading && (
            <div>
              <h4 style={{ fontWeight: "bold", color: "#FF9E00" }}>
                {" "}
                Uploading...
              </h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "24px",
                }}
              >
                <div class="loader"></div>
              </div>
            </div>
          )}
          {successFullyUploaded && (
            <div>
              <h4
                style={{
                  fontWeight: "bold",
                  marginTop: "24px",
                  color: "green",
                  fontSize: "2rem",
                }}
              >
                {" "}
                Successfully Uploaded
              </h4>
            </div>
          )}
          {!uploading && !successFullyUploaded && (
            <div>
              <div className="textfield">
                <TextField
                  //   helperText="Please enter anime status"
                  id="demo-helper-text-aligned"
                  label="Episode-Title"
                  fullWidth={true}
                  InputProps={{ sx: { height: 50 }, style: inputStyle }}
                  className={classes.root}
                  onChange={e => setEpisodeTitle(e.target.value)}
                />
              </div>
              <div className="textfield">
                <TextField
                  //   helperText="Please enter anime status"
                  id="demo-helper-text-aligned"
                  label="Episode-Number"
                  fullWidth={true}
                  type="Number"
                  InputProps={{ sx: { height: 50 }, style: inputStyle }}
                  className={classes.root}
                  onChange={e => setEpisodeNumber(e.target.value)}
                />
              </div>

              <div className="textfield">
                <TextField
                  //   helperText="Please enter anime status"
                  id="demo-helper-text-aligned"
                  fullWidth={true}
                  type="File"
                  InputProps={{ sx: { height: 50 }, style: inputStyle }}
                  className={classes.root}
                  onChange={e => {
                    console.log(e.target.files[0]);
                    setVideo(e.target.files[0]);
                  }}
                />
              </div>

              {/* {progress > 0 && <ProgressBar now={progress} label={`${progress}%`} />} */}

              {/* <div>
          <Button
            variant="contained"
            component="label"
            fullWidth={true}
            InputProps={{ sx: { height: 50 } }}
            className={classes.root}
            style={{ backgroundColor: "#FF9E00" }}
            onClick={() => {
              const formData = new FormData();
              formData.append("video", video);
              console.log(formData);
              console.log("inside the upload function");
              async function upload() {
                try {
                  let response = await axios.post(
                    "http://localhost:3001/api/v1/anime/uploadEpisode",
                    formData,
                    {
                      onUploadProgress: progressEvent => {
                        const percentCompleted = Math.round(
                          (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProgress(percentCompleted);
                      },
                    }
                  );

                  console.log(response.data);
                  console.log(response);
                } catch (error) {
                  console.log(error);
                }
              }
              upload();
            }}
          >
            Upload-Video
          </Button>
        </div> */}

              <div>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth={true}
                  InputProps={{ sx: { height: 50 } }}
                  className={classes.root}
                  style={{ backgroundColor: "#FF9E00", marginTop: "12px" }}
                  onClick={submitHandler}
                >
                  submit
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnimeEpisodeUploadForm;
