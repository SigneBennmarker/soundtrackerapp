import { React, useState, useEffect } from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import "./App.css";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import SearchForm from "../src/components/SearchForm";
import SpotifyLogin from "../src/components/spotifyLogin";
import About from './About'


function Home() {
  //const { loading, error, data } = useQuery(GET_MOVIE)
  //  console.log("data: ", data)
  const [loggedIn, setLoggedIn] = useState('false')

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setLoggedIn('true');
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Switch>
        <Route path="/about" exact component={About} />
        </Switch>

        

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
