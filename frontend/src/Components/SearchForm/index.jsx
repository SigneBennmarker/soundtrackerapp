import React, { useState, useEffect } from "react";
import TextInput from "../TextInput";
import {
  getMovieById,
  getMovieBySearch,
  getCastCrewById,
} from "../../api/apiTMDB";
import useStyles from "./styles";
import MatchingMovies from "../MatchingMovies";
import SpotifySearch from "../spotifySearch";
import Grid from "@material-ui/core/Grid";
import { BsStarFill } from "react-icons/bs";
import { BiSearch } from 'react-icons/bi'



//const NumberContext = React.createContext();

const SearchForm = ({ label, value, setValue }) => {
  const classes = useStyles();
  const [searchTerm, setSeachTerm] = useState("");
  const [movie, setMovie] = useState("");

  useEffect(() => {
    let movieTest = window.sessionStorage.getItem("movie");
    if (movieTest) {
      console.log("TEST AV SEESSSSSions", movie.title);
    }
  });

  const split = (string) => {
    movie.release_year = string.split('-', 1)
  };

  const getMovie = async (e) => {
    e.preventDefault();

    const response = await getMovieBySearch(searchTerm);
    let data = await response;
    console.log("dATa i getMovie", data);

    let movie = {
      id: data.results[0].id,
      title: data.results[0].title,
      release_date: data.results[0].release_date,
      release_year: data.results[0].release_date.split('-',1),
    };

    
    const movieData = await getMovieById(movie.id);
    data = await movieData;
    console.log("data", data);


    movie.overview = data.overview;
    movie.poster_path = data.poster_path;
    movie.runtime = data.runtime;
    movie.vote_average = data.vote_average;

    movie.genres = data.genres;
    console.log("movie object: ", movie.genres);

    // om vi vill hämta cast and crew
    const castCrewData = await getCastCrewById(movie.id);
    data = await castCrewData;
    console.log("castCrewData", data);

    movie.actor1 = data.cast[0].name;
    movie.actor2 = data.cast[1].name;
    movie.actor3 = data.cast[2].name;

    console.log("castData", movie.cast);

    console.log("movie object: ", movie);
    setMovie(movie);

    window.sessionStorage.setItem("movie", movie);
  };

  return (
    <>
      <Grid container spacing={0} className="movieContent">
        <Grid item xs={12} sm={4} className="search">
          <form onSubmit={getMovie}>
            <h3>Search for movie</h3>
            <TextInput
              label="Search for movie"
              value={searchTerm}
              setValue={setSeachTerm}
            />
            <BiSearch/>
          
            {/* <input
              type="submit"
              value="Search"
              className={classes.buttonStyle}
            ></input> */}
          </form>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={3}>
              {movie && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="movie poster"
                  width="100%"
                />
              )}
            </Grid>
            <Grid item xs={12} sm={9}>
              {movie && (
                <div>
                  <h2>
                    {" "}
                    {movie.title} ({movie.release_year})
                  </h2>
                  {movie.genres.map((genre) => (
                    <small key={genre.id}>{genre.name} </small>
                  ))}
                  <small>- {movie.runtime} minutes</small>
                  <small> - {movie.release_date}</small>

                  <h5>
                    {" "}
                    <BsStarFill size={20} /> {movie.vote_average}
                  </h5>

                  <p> {movie.overview}</p>
                </div>
              )}
            </Grid>

            <Grid container spacing={4}>
              <Grid item xs={12} sm={9}>
                {movie.actor3 && (
                  <p>
                    Actors: {movie.actor1}, {movie.actor2}, {movie.actor3}
                  </p>
                )}
              </Grid>
            </Grid>
          </Grid>
          {movie.title && (
          <SpotifySearch value={movie.title} />)}
        </Grid>
      </Grid>

      {/* {matchingMovies?.items ? matchingMovies.items.map((item) => <h1>{item.page}</h1>): 3 }  */}
    </>
  );
};

export default SearchForm;
