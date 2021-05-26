import React, { useEffect, useState } from "react";
import axios from "axios";
import useStyles from "./styles";

// const SEARCH_ENDPOINT =
//     "https://api.spotify.com/v1/search?q=frozen&type=playlist";

const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accmulater, currentValue) => {
        const [key, value] = currentValue.split("=");
        accmulater[key] = value;
        return accmulater;
    }, {});

    return paramsSplitUp;
};

const SpotifySearch = ({ movieTitle, genres}) => {

  const classes = useStyles();
  const [token, setToken] = useState("");
  const [data, setData] = useState();
  const [playlistID, setPlaylistID] = useState("");
  const [searched, setSearched] = useState(false);
  const [resultsFound, setResultsFound] = useState(false);
  const [oldSearch, setOldSearch] = useState("");

    useEffect(() => {
        if (window.location.hash) {
            const {
                access_token,
                expires_in,
                token_type,
            } = getReturnedParamsFromSpotifyAuth(window.location.hash);

            localStorage.clear();
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("expiresIn", expires_in);
            localStorage.setItem("tokenType", token_type);
        }
    });

    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    };

    useEffect(() => {
      if (localStorage.getItem("accessToken")) {
          setToken(localStorage.getItem("accessToken"));
      }
  }, []);

  const handleSearch = () => {
        // value="se7en"
        console.log("I handleSearch", movieTitle);
        axios
          .get(
            `https://api.spotify.com/v1/search?q=${movieTitle}%20soundtrack&type=playlist`,
            {
              headers: headers,
            }
          )
          .then((response) => {
            console.log("spotify response.data", response.data);
    
            console.log(
              "spotify response.data.playslists",
              response.data.playlists
            );
            if (response.data.playlists.items.length) {
              console.log(
                "VI får resultat!!",
                response.data.playlists.items.length
              );
              setResultsFound(true);
              setData(response.data);
              setPlaylistID(response.data.playlists.items[0].id);
              console.log("spotify response: ", response);
            } else {
              console.log("NOLL REslutat, kallar på search genre ", response.data.playlists.items.length);
              seatchGenre();
            }
          })
          .catch((error) => {
            console.log("error i handle_search", error);
          });
        setOldSearch(movieTitle);
        setSearched(true);
      };

  const seatchGenre = () => {

    let twoGenres = false;
    genres.map((genre, index) => {
      if (index) {
        twoGenres= true;
        console.log("I seatchGenre GENRE 2", genre.name);

      }
    });

    console.log("I seatchGenre GENRE 1", genres[0].name );
    let genre = genres[0].name;
    if (twoGenres){
    genre = genres[0].name+" "+genres[1].name;
    console.log("I seatchGenre TOOOGETHER", genre );
    }
    axios
      .get(
        `https://api.spotify.com/v1/search?q=${genre}&type=playlist`,
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log("spotify response.data", response.data);

        console.log(
          "spotify response.data.playslists",
          response.data.playlists
        );
        if (response.data.playlists.items.length) {
          console.log(
            "VI får resultat!!",
            response.data.playlists.items.length
          );
          setResultsFound(true);
          setData(response.data);
          setPlaylistID(response.data.playlists.items[0].id);
          console.log("spotify response: ", response);
        } else {
          console.log("NOLL REslutat visar felmeddelande", response.data.playlists.items.length);
          setResultsFound(false);
        }
      })
      .catch((error) => {
        console.log("error i handle_search", error);
      });

    setSearched(true);
  }

  return (
    <div className="getMusic">
      <button onClick={handleSearch} className={classes.buttonStyle}>
        <strong>GET MUSIC</strong>
      </button>
      {resultsFound && (oldSearch === movieTitle) && (
        <iframe
          src={`https://open.spotify.com/embed/playlist/${playlistID}`}
          width="90%"
          height="380"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      )}
      {!resultsFound && searched && (oldSearch === movieTitle) && (
        <p> We're sorry but we couldn't find any playlists for this movie</p>
      )}
    </div>
  );
};

export default SpotifySearch;
