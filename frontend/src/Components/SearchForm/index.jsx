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
import Error from "../Error";
import Grid from "@material-ui/core/Grid";
import { BsStarFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";

//const NumberContext = React.createContext();

const SearchForm = ({ label, value, setValue }) => {
  const classes = useStyles();
  const [searchTerm, setSeachTerm] = useState("");
  const [movie, setMovie] = useState("");
  const [showErr, setShowErr] = useState(false);

  const getSuggestions = async (e, SuggestionData) => {
    const response = await getMovieBySearch(searchTerm);
    SuggestionData = await response.results;
    console.log("dATa i getSuggestions", SuggestionData);
    //  setSuggestions(SuggestionData)
    return SuggestionData;
  };

  const getMovie = async (e) => {
    e.preventDefault();

    const response = await getMovieBySearch(searchTerm);
    let data = await response;

    if (data.total_results === 0) {
      setShowErr(true);
    }
    else {
      setShowErr(false);

      let movie = {
        id: data.results[0].id,
        title: data.results[0].title,
        release_date: data.results[0].release_date,
        release_year: data.results[0].release_date.split("-", 1),
      };

      const movieData = await getMovieById(movie.id);
      data = await movieData;

      movie.overview = data.overview;
      movie.poster_path = data.poster_path;
      movie.runtime = data.runtime;
      movie.vote_average = data.vote_average;

      let runtimeTotal = data.runtime;
      movie.runtimeHours = Math.floor(runtimeTotal / 60);
      movie.runtimeMinutes = runtimeTotal % 60;

      movie.genres = data.genres;

      // om vi vill hämta cast and crew
      const castCrewData = await getCastCrewById(movie.id);
      data = await castCrewData;

      movie.actor1 = data.cast[0].name;
      movie.actor2 = data.cast[1].name;
      movie.actor3 = data.cast[2].name;

      let directorFound = false;
      data.crew.map((crew) => {
        if (crew.department == "Directing" && !directorFound) {
          movie.director = crew.name;
          directorFound = true;
        }
      });

      setMovie(movie);
    }
  };

  // const handleOnSearch = (string, results) => {
  //   console.log(string, results);
  // };

  // const handleOnHover = (result) => {
  //   console.log(result);
  // };

  // const handleOnSelect = (item) => {
  //   console.log(item);
  // };

  // const handleOnFocus = () => {
  //   console.log("Focused");
  // };

  return (
    <>
      <Grid container spacing={0} className="movieContent">
        <Grid item sm={12} md={3}>
          {/* <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            styling={{ zIndex: 2 }} // To display it on top of the search box below
            autoFocus
          /> */}
          <form onSubmit={getMovie}>
            <TextInput
              value={searchTerm}
              setValue={setSeachTerm}
            // handleChange={getSuggestions(SuggestionData)}
            />
            <BiSearch size={20} />
          </form>

          {/*               
            {SuggestionData.map((movie, index) => (
                    <small key={movie.title}>
                      
                      {movie.title}</small>
                      
         ))} */}
        </Grid>

        <Grid item sm={0} md={1}></Grid>
        {!showErr ? (
          <Grid item sm={12} md={8}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                {movie && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="movie poster"
                    width="100%"
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={8}>
                {movie && (
                  <div>
                    <h2>
                      {movie.title} ({movie.release_year})
                    </h2>
                    <small> {movie.release_date} • </small>

                    {movie.genres.map((genre, index) => (
                      <small key={genre.id}>
                        {index ? ", " : ""}
                        {genre.name}
                      </small>
                    ))}

                    <small>
                      {" "}
                    • {movie.runtimeHours}h {movie.runtimeMinutes}m
                  </small>
                    <h3>
                      {" "}
                      <BsStarFill size={20} /> {movie.vote_average}
                    </h3>

                    <p> {movie.overview}</p>
                  </div >
                )}
              </Grid >
            </Grid >
            <Grid container spacing={0}>
              <Grid item xs={11} sm={9} className="castAndCrew">
                {movie.actor3 && (
                  <div>
                    <p>
                      {" "}
                      <strong>Actors</strong>
                    </p>
                    <p>
                      {" "}
                      {movie.actor1}, {movie.actor2}, {movie.actor3}
                    </p>
                  </div>
                )}
              </Grid>
              <Grid item xs={11} sm={3} className="castAndCrew">
                {movie.director && (
                  <div>
                    <p>
                      {" "}
                      <strong>Director</strong>
                    </p>
                    <p> {movie.director}</p>
                  </div>
                )}
              </Grid>

            </Grid >
            {movie.title && <SpotifySearch movieTitle={movie.title} genres={movie.genres} />}
          </Grid >
        ) : (
            <></>
          )}
        {showErr ? <Error /> : <></>}
      </Grid >
    </>
  );
};

export default SearchForm;
