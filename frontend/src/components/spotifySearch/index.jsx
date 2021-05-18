import React, { useEffect, useState } from "react";
import axios from "axios";
import useStyles from "./styles";

const CLIENT_ID = "f64a840edf8c4442bbd6ac2fc2432d8c";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/";
const SCOPES = ["playlist-modify-public"];
const SPACE_DELIMETER = "%20";
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMETER);

// const SEARCH_ENDPOINT =
//     "https://api.spotify.com/v1/search?q=frozen&type=playlist";

const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accmulater, currentValue) => {
        console.log("current value :", currentValue);
        const [key, value] = currentValue.split("=");
        accmulater[key] = value;
        return accmulater;
    }, {});

    return paramsSplitUp;
}

const SpotifySearch = (value) => {
    const classes = useStyles();
    const [token, setToken] = useState("");
    const [data, setData] = useState();
    const [playlistName, setPlaylistName] = useState("");
    const [playlistUrl, setPlaylistUrl] = useState("");
    const [playlistID, setPlaylistID] = useState("");

    useEffect(() => {
        if (window.location.hash) {
            const {
                access_token,
                expires_in,
                token_type
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

    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    }

    const handleSearch = (value) => {
       
        console.log("I handleSearch", value)
        axios
            .get(`https://api.spotify.com/v1/search?q=${value}&type=playlist`, {
                headers: headers,
            })
            .then((response) => {
                setData(response.data);
                setPlaylistID(response.data.playlists.items[0].id)
                console.log("spotify response: ", response);
            })
            .catch((error) => {
                console.log("error i handle_search", error);
            });
    };

    return (
        <div>
            <button onClick={handleLogin} className={classes.buttonStyle}>Login with spotify</button>
            <button onClick={handleSearch({value})} className={classes.buttonStyle}>Get music</button>

            <iframe
                src={`https://open.spotify.com/embed/playlist/${playlistID}`}
                width="800"
                height="380"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media">
            </iframe>
        </div>
    );
};

export default SpotifySearch;
