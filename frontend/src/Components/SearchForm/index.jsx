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

  };

  return (
    <>
      <Grid container spacing={8} className="movieContent">
        <Grid item xs={12} sm={4} >
          <form onSubmit={getMovie}>
            <TextInput
              label="Search for movie"
              value={searchTerm}
              setValue={setSeachTerm}
            />
            <BiSearch/>
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
                  <small> {movie.release_date}  •  </small>

                  {movie.genres.map((genre, index) => (
                    <small key={genre.id}>{(index ? ', ' : '')}{genre.name}</small>
                  ))}

                  <small> •  {movie.runtime} minutes</small>

                  <h3>
                    {" "}
                    <BsStarFill size={20} /> {movie.vote_average}
                  </h3>

                  <p> {movie.overview}</p>
                </div>
              )}
            </Grid>

            <Grid container spacing={4}>
              <Grid item xs={12} sm={9}>
                {movie.actor3 && (
                  
                  <div className="actors">
                    <p> <strong>Actors</strong></p>
                    <p> {movie.actor1}, {movie.actor2}, {movie.actor3}
                  </p>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
          {movie.title && (
          <SpotifySearch value={movie.title} />)}
        </Grid>
      </Grid>

    </>
  );
};

export default SearchForm;
