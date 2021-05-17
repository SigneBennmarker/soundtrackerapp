import React, { useEffect } from "react";

const CLIENT_ID = "f64a840edf8c4442bbd6ac2fc2432d8c";
const SPOTIFY_AUTHORIZE_ENDPOINT ="https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN ="http://localhost:3000/";
const SCOPES = ["playlist-modify-public"];
const SPACE_DELIMETER = "%20";
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMETER);

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

const Spotify = () => {

    useEffect(() => {
        if(window.location.hash) {
            const {
                access_token,
                expires_in,
                token_type
            } =  getReturnedParamsFromSpotifyAuth(window.location.hash);

            localStorage.clear();
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("expiresIn", expires_in);
            localStorage.setItem("tokenType", token_type);
        }
    });

    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    }
    return (
        <div>
            <h1>Tjo</h1>
            <button onClick={handleLogin}>
                Login with spotify
            </button>            
        </div>
    );


};

export default Spotify;