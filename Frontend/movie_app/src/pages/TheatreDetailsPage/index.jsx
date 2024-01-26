import React, { useState, useEffect } from "react";
import axios from "axios";
import "./theatrestyles.css";
import { useParams, Link } from "react-router-dom";

const Theater = ({ onSelectTheater }) => {
  const params = useParams(); // Destructure both parameters
  const movieId = params.movie_id;
  console.log(movieId);

  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/theatres/` + movieId
        );
        console.log("Data received from API:", data);

        // Make sure that data.theaters is initialized as an array
        setTheaters(data.theatres || []);
      } catch (error) {
        console.error("Error fetching theaters:", error);
        setError("An error occurred while fetching theaters.");
      } finally {
        setLoading(false);
      }
    };

    // Immediately-invoked async function expression (IIFE)
    (async () => {
      await fetchTheaters();
    })();
  }, [movieId]);

  const handleTheaterSelect = (selectedTheater) => {
    onSelectTheater(selectedTheater);
  };

  if (loading) {
    return <div>Loading theaters...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("Theaters:", theaters);
  const staticMovieTime = "9:00 AM";
  // Render the component only when theaters are available
  return (
    <div className="theater-selection-container">
      <h2>Select a Theater</h2>
      {theaters.length > 0 ? (
        <ul>
          {theaters.map((theater) => (
            <li
              key={theater.id}
              className="theater-item"
              style={{
                marginBottom: "20px", // Adjust the spacing as needed
                display: "flex",
                alignItems: "center",
              }}
            >
              <span className="heart-symbol">❤</span>
              <strong>
                <Link
                  to={`/seat/${movieId}/${theater.id}`}
                  className="theater-link"
                  style={{ marginLeft: "10px" }} // Adjust the spacing between symbol and theater name
                >
                  {theater.name}
                </Link>
              </strong>
              <p style={{ marginLeft: "10px" }}>{staticMovieTime}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>No theaters available.</div>
      )}
    </div>
  );
};

export default Theater;
