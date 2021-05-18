import React, { useEffect, useState } from "react";
import axios from "axios";
import useStyles from "./styles";


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

const SpotifySearch = ({value}) => {
    const movieTitle = value;
    console.log("movieTilte: ", movieTitle)
    const classes = useStyles();
    const [token, setToken] = useState("");
    const [data, setData] = useState();
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


    const handleSearch = () => {
      // value="se7en"
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
            <button onClick={handleSearch} className={classes.buttonStyle}>Get music</button>

            <iframe
                src={`https://open.spotify.com/embed/playlist/${playlistID}`}
                width="90%"
                height="380"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media">
            </iframe>
        </div>
    );
};

export default SpotifySearch;
