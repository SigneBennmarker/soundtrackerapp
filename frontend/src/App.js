import {React, useContext} from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import "./App.css";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import SearchForm from "../src/components/SearchForm";
import SpotifySearch from "../src/components/spotifySearch";



const GET_MOVIE = gql`
  {
    movies {
      tite
    }
  }`

 
function App() {
  //const { loading, error, data } = useQuery(GET_MOVIE)
  //  console.log("data: ", data)

  

  return (
    <div className="App">
      <header className="App-header">
        <Switch>
        </Switch>
        <SearchForm></SearchForm>  
      {/* {data} */}
      </header>
    </div>
  );
}

export default App;
