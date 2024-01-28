import "../../styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "../Movie";
// import Movie from "./Movie";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/api/movies/")
      .then((response) => {
        console.log(response.data.data);
        setMovies(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container">
      <h1 className="text-center">MovieList</h1>
      <div class="row">
        {movies.map((movie) => (
          <Movie data={movie} />
        ))}{" "}
      </div>
    </div>
  );
};
export default MovieList;
