import { React, useState, useEffect } from "react"
import "./App.css";
import SearchForm from "../src/components/SearchForm";
import SpotifyLogin from "../src/components/spotifyLogin";


function Home() {
  //const { loading, error, data } = useQuery(GET_MOVIE)
  //  console.log("data: ", data)
  const [loggedIn, setLoggedIn] = useState('false')

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      setLoggedIn('true');
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {loggedIn === 'true' && (
          <SearchForm />
        )}
        {loggedIn === 'false' && (<><p>To use our service you will need to login to spotify.
          <br/>This way, we can match playlists to the movies of your choice.</p> <SpotifyLogin /></>)}
        {/* {data} */}
      </header>
    </div>
  );
}

export default Home;
