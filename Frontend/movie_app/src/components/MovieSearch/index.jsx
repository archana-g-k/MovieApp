import React, { useState, useEffect } from "react";
import _ from "lodash";
// import styles from "./styles.module.css";
import Movie from "../MovieList/Movie";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");

  const fetchData = async () => {
    try {
      const url = `http://127.0.0.1:8000/api/movies/filter/?lang=${language}&genre=${genre}`;
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  const debouncedFetchData = _.debounce(fetchData, 800);

  useEffect(() => {
    debouncedFetchData();
  }, [genre, language]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <div style={inputContainer}>
        <label style={{ color: "white", marginRight: "10px" }}>Language:</label>
        <div style={inputWrapper}>
          <input
            type="text"
            placeholder="Enter language"
            style={inputStyle}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <span role="img" aria-label="Language" style={iconStyle}>
            🌐
          </span>
        </div>
      </div>
      <div style={inputContainer}>
        <label style={{ color: "white", marginRight: "10px" }}>Genre:</label>
        <div style={inputWrapper}>
          <input
            type="text"
            placeholder="Enter genre"
            style={inputStyle}
            onChange={(e) => setGenre(e.target.value)}
          />
          <span role="img" aria-label="Genre" style={iconStyle}>
            🎬
          </span>
        </div>
      </div>
      <div style={inputContainer}>
        <label style={{ color: "white", marginRight: "10px" }}>
          Search Movies:
        </label>
        <div style={inputWrapper}>
          <input type="text" placeholder="Search..." style={inputStyle} />
          <span role="img" aria-label="Search" style={iconStyle}>
            🔍
          </span>
        </div>
      </div>
    </div>
  );
};

const inputContainer = {
  display: "flex",
  alignItems: "center",
  marginRight: "20px",
};

const inputWrapper = {
  display: "flex",
  alignItems: "center",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  marginRight: "10px",
};

const iconStyle = {
  fontSize: "20px",
  cursor: "pointer",
};

export default MovieList;
