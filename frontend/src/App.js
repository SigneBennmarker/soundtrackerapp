import { React, useState, useEffect } from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import "./App.css";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import SearchForm from "../src/components/SearchForm";
import SpotifyLogin from "../src/components/spotifyLogin";



const GET_MOVIE = gql`
  {
    movies {
      tite
    }
  }`


function App() {
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
        </Switch>

        {loggedIn === 'true' && (
          <SearchForm />
        )}
        {loggedIn === 'false' && <SpotifyLogin />}

        {/* {data} */}
      </header>
    </div>
  );
}

export default App;
