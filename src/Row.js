import React, { useState, useEffect } from 'react';
import axios from './axios';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';

import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original"

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState([]);

  useEffect(() => {

    async function fetchData() {

      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "99%",
    playerVars: {
      autoplay: 0,
    }
  }

  const handleClick = (movie) => {
    // console.table(movie?.title)
    setTrailerUrl(movie)
    // if (trailerUrl) {
    //   setTrailerUrl('')
    // } else {
    //   movieTrailer(movie?.title || "")
    //     .then(url => {
    //       const urlParams = new URLSearchParams(new URL(url).search);
    //       setTrailerUrl(urlParams.get('v'));
    //     }).catch((error) => console.log(error));
    // }
  }
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  console.log(trailerUrl);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map(movie => {
          return <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name} />
        })}
      </div>
      <div style={{ padding: "5px 2px" }}>
        {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} */}
         {/* <img src={trailerUrl?.poster_path} alt="this is img" /> */}
         <h1 className="trailerName">{trailerUrl?.name}</h1>
         <p className="trailerDescription">{truncate(trailerUrl?.overview, 135)}</p>        
         <h5 className="trailerDate">{trailerUrl?.first_air_date}</h5>
      </div>
    </div>
  );
}

export default Row;