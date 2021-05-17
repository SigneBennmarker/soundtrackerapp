import React, { useState } from "react";
import TextInput from "../TextInput";
import { getMovieById, getMovieBySearch } from "../../api/apiTMDB";
import useStyles from "./styles";
import MatchingMovies from "../MatchingMovies";

const SearchForm = ({ label, value, setValue }) => {
  const classes = useStyles();
  const [searchTerm, setSeachTerm] = useState("");

  const [movie, setMovie] = useState("");


  const getMovie = async (e) => {
    e.preventDefault();

    const response = await getMovieBySearch(searchTerm);
    let data = await response;
    console.log("dATa i getMovie", data);

    let movie = {
      id: data.results[0].id,
      title: data.results[0].title,
      release_date: data.results[0].release_date,
    };
    const movieData = await getMovieById(movie.id);
    data = await movieData;
    console.log("data", data);

    movie.overview = data.overview;
    movie.poster_path = data.poster_path;
    movie.runtime = data.runtime; 
    movie.vote_average = data.vote_average;


    

    console.log("movie object: ", movie);
    setMovie(movie);
  };

  return (
    <>
      <form onSubmit={getMovie}>
        <h2>Search for movie</h2>
        <TextInput
          label="Search for movie"
          value={searchTerm}
          setValue={setSeachTerm}
        />
        <input
          type="submit"
          value="Search"
          className={classes.buttonStyle}
        ></input>
      </form>

      {movie && (
        <div>
          {/* <h3>Info som ska synas i sökningen: </h3>
          <p>{movieNames}</p>
          <p>{movieReleaseYear}</p>
          <h3>Info som ska synas när en film är "vald" </h3> */}
          <p>overview:</p>
          <p> {movie.overview}</p>
          <p>runtime:</p>

          <p> {movie.runtime}</p>
          <p> {movie.vote_average}</p>


{/*          
          <p>runtime: {movieRuntime}</p>
          <p>vote average: {movieVoteAvg}/10</p>
          */}

          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie poster" /> 
        </div>
      )}

      {/* {matchingMovies?.items ? matchingMovies.items.map((item) => <h1>{item.page}</h1>): 3 }  */}
    </>
  );
};

export default SearchForm;
