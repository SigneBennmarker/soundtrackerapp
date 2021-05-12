
import React, { useState } from "react";
import TextInput from "../TextInput";
import {getMovieById,getMovieBySearch} from '../../api/apiTMDB'
import useStyles from "./styles";
import MatchingMovies from '../MatchingMovies'



const SearchForm = ({ label, value, setValue }) => {
    const classes = useStyles();
    const [movieId, setMovieId] = useState("")
    const [searchTerm, setSeachTerm] = useState("")
    const [matchingMovies, setMatchingMovies] = useState({});
    const [movieNames, setMovieNames] = useState();
    const [movieInformaion, setMovieInformation] = useState();

    const getMovie = async (e) => {
        const response = await getMovieBySearch(searchTerm);
        setMovieNames(response.results[0].title);
        setMovieInformation(response.results[0].overview);
        console.log("data som kommit till search form", response);
        console.log("data som kommit till search form", movieNames);

      };

  return (
    <>
   <form onSubmit={getMovie}>
        <h2>Search for movie</h2>
        <TextInput label="Search for movie" value={searchTerm} setValue={setSeachTerm}/>
        <input type="submit" value="Search" className={classes.buttonStyle}></input>
      </form>
    
    <h1>{movieNames}</h1>
    <h3>{movieInformaion}</h3>
     {/* {matchingMovies?.items ? matchingMovies.items.map((item) => <h1>{item.page}</h1>): 3 }  */}
      
   
    </>
  );
};

export default SearchForm;
