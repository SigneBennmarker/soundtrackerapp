
import React, { useState } from "react";
import TextInput from "../TextInput";
import {getMovieById,getMovieBySearch} from '../../api/apiTMDB'
import useStyles from "./styles";
import MatchingMovies from '../MatchingMovies'



const SearchForm = ({ label, value, setValue }) => {
    const classes = useStyles();
    const [searchTerm, setSeachTerm] = useState("")
    const [matchingMovies, setMatchingMovies] = useState({});
    const [movieNames, setMovieNames] = useState();
    const [moviePoster, setMoviePoster] = useState(); 

    const [movieInformaion, setMovieInformation] = useState();
    const [movieId, setMovieId] = useState();
    const [movieReleaseYear, setMovieReleaseYear] = useState(); 
    const [movieRuntime, setMovieRuntime] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [movieVoteAvg, setMovieVoteAvg] = useState(); 
    
    

    const getMovie = async (e) => {
        const response = await getMovieBySearch(searchTerm);
        setMovieNames(response.results[0].title);
        setMovieReleaseYear(response.results[0].release_date)
        setMovieId(response.results[0].id)
        console.log("data som kommit till search form", response);
        console.log("data som kommit till search form", movieNames);
        console.log("releasedate som kommit till search form", movieReleaseYear);


        getMovieDetails(); 


      };

  const getMovieDetails = async() => {

    const movieData = await getMovieById(movieId);

    console.log("data som kommit till getMovieDetails", movieData);
    setMovieRuntime(movieData.runtime); 
    setMovieInformation(movieData.overview);
    console.log("path : ", movieData.poster_p)
    setImageUrl("https://image.tmdb.org/t/p/w500/" + movieData.poster_path)
    console.log("Rumtime : " ,movieRuntime)
    console.log("PosterPath : " , imageUrl)
    setMovieVoteAvg(movieData.vote_average);
    console.log("Vote average : " , movieVoteAvg); 


    }

  return (
    <>
   <form onSubmit={getMovie}>
        <h2>Search for movie</h2>
        <TextInput label="Search for movie" value={searchTerm} setValue={setSeachTerm}/>
        <input type="submit" value="Search" className={classes.buttonStyle}></input>
      </form>
    <p>Info som ska synas i sökningen: </p>
    <h1>{movieNames}</h1>
    <h4>{movieReleaseYear}</h4>

    <h3>Info som ska synas när en film är "vald" </h3>
    
    <p>overview: {movieInformaion}</p>
    <p>runtime {movieRuntime}</p>
    <p>vote average: {movieVoteAvg}/10</p>


    <img src={imageUrl} alt="movie poster"/>



    




     {/* {matchingMovies?.items ? matchingMovies.items.map((item) => <h1>{item.page}</h1>): 3 }  */}
      
   
    </>
  );
};

export default SearchForm;
