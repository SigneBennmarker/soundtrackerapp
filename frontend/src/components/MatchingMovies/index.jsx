import React, { useEffect, useState } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles'
import {
    getMovieBySearch
  } from "../../api/apiTMDB";

const MatchingMovies = ({ label }) => {
    const classes = useStyles();


    return (

        <Card className={classes.root}>
            <CardContent>
                <h2>{label}</h2>
                {/* <h3>Pris: {value1} kr</h3>
                <p>{value2}</p> */}
            </CardContent>
        </Card>
    )

}

export default MatchingMovies;