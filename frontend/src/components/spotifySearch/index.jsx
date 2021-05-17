import React, { useEffect, useState } from "react";
import axios from "axios";
import useStyles from "./styles";

const CLIENT_ID = "f64a840edf8c4442bbd6ac2fc2432d8c";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/";
const SCOPES = ["playlist-modify-public"];
const SPACE_DELIMETER = "%20";
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMETER);

const SEARCH_ENDPOINT =
    "https://api.spotify.com/v1/search?q=frozen&type=playlist";

const SpotifySearch = () => {
    const classes = useStyles();
    const [token, setToken] = useState("");
    const [data, setData] = useState();
    const [playlistName, setPlaylistName] = useState("");
    const [playlistUrl, setPlaylistUrl] = useState("");
    const [playlistID, setPlaylistID] = useState("");

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

    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    }

    const handleSearch = () => {
        axios
            .get(SEARCH_ENDPOINT, {
                headers: headers,
            })
            .then((response) => {
                setData(response.data);
                setPlaylistName(response.data.playlists.items[0].name);
                setPlaylistID(response.data.playlists.items[0].id)
                setPlaylistUrl(response.data.playlists.items[0].external_urls.spotify);
                console.log("spotify response: ", response);
            })
            .catch((error) => {
                console.log("error i handle_search", error);
            });
    };

    return (
        <div>
            <button onClick={handleLogin} className={classes.buttonStyle}>Login with spotify</button>
            <button onClick={handleSearch} className={classes.buttonStyle}>Get music</button>
            
            <iframe
                src={`https://open.spotify.com/embed/playlist/${playlistID}`}
                width="500"
                height="380"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media">
            </iframe>
        </div>
    );
};

export default SpotifySearch;
