import React, { useEffect, useState } from "react";
import axios from "axios";

const SEARCH_ENDPOINT = "https://api.spotify.com/v1/search?q=frozen&type=playlist";

const SpotifySearch = () => {
    const [token, setToken] = useState('');
    const [data, setData] = useState({});
    const headers = {
        'Accept': "application/json",
        'Content-Type': "application/json",
        Authorization: "Bearer " + token,
    }

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setToken(localStorage.getItem("accessToken"));
        }
    }, []);

    const handleSearch = () => {
        axios.get(SEARCH_ENDPOINT, {
            "headers": headers, 
        }).then(response => {
            setData(response.data);
            console.log(response)
        })
            .catch((error) => {
                console.log("error i handle_search", error);
            });
    }

    return <button onClick={handleSearch}>Get music</button>;
};

export default SpotifySearch;

