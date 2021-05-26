import { React } from "react"
import './About.css';

function About() {

    return (
        <div className="App">
            <header className="App-header">
                <div className="about-container">
                    <h3 className="header">About</h3>
                    <p className="about">Wanting to find the soundtrack for you favorite movie?
                    <br />Soundtracker will find a playlist for the movie of your choice. Ready for you to play, directly from your browser.</p>

                    <p className="copyright">Copyright © 2021 Signe Bennmarker and Pernilla Sjöberg, except TV show data, artwork and music.
                    <br />TV show data provided by The Movie Database (TMDb).
                    <br />Playlists and music provided by Spotify.</p>
                </div>
            </header>
        </div>
    );
}

export default About;
