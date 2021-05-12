
import React, { useState } from "react";
import SearchButton from "../SeachButton";
import TextInput from "../TextInput";
import {getMovieById,getMovieBySearch} from '../../api/apiTMDB'
import useStyles from "./styles";




const SearchForm = ({ label, value, setValue }) => {
    const classes = useStyles();
    const [movieId, setMovieId] = useState("")
    const [searchTerm, setSeachTerm] = useState("")

    const getMovie = async (e) => {
        const data = await getMovieBySearch(searchTerm);
    
        console.log("data som kommit till search form", data);
    ;  };

  return (
    <>
   <form className="Prenumerant" onSubmit={getMovie}>
        <h2>Search for movie</h2>
        <TextInput label="Search for movie" value={movieId} setValue={setMovieId}/>
        <input type="submit" value="Search" className={classes.buttonStyle}></input>
      </form>

      
    </>
  );
};

export default SearchForm;
