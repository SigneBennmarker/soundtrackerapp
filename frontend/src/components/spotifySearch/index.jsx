import React, { useEffect, useState } from "react";
import axios from "axios";

const SEARCH_ENDPOINT =
  "https://api.spotify.com/v1/search?q=frozen&type=playlist";

const SpotifySearch = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState();
  const [playlistName, setPlaylistName] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
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
        setPlaylistUrl(response.data.playlists.items[0].external_urls.spotify);
        console.log("spotify response: ", response);
        console.log("spotify data: ", data);
        console.log("spotify playlists: ", data.playlists);
      })
      .catch((error) => {
        console.log("error i handle_search", error);
      });
  };

  return (
    <div>
      <button onClick={handleSearch}>Get music</button>
      <p> Playlist name:</p>

      <h5>{playlistName}</h5>
      <p> Playlist link:</p>

      <a href={playlistUrl}>{playlistUrl}</a>
    </div>
  );
};

export default SpotifySearch;
