import React, { useEffect, useState } from "react";
import axios from "axios";
import useStyles from "./styles";


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
            <button onClick={handleSearch} className={classes.buttonStyle}>Get music</button>
            <p> Playlist name:</p>
            <h5>{playlistName}</h5>

            <p> Playlist link:</p>
            <a href={playlistUrl}>{playlistUrl}</a>
            <iframe
                src={`https://open.spotify.com/embed/playlist/${playlistID}`}
                width="500"
                height="380"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media">
            </iframe>
        </div>
    );
};

export default SpotifySearch;
