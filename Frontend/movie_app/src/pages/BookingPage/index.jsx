import React, { useState, useEffect } from "react";
import axios from "axios";

const BookingPage = ({ selectedSeats, totalPrice, movieId, theaterId }) => {
  const [movie, setMovie] = useState({});
  const [theater, setTheater] = useState({});

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/movies/${movieId}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchTheaterDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/theatres/${theaterId}/`
        );
        setTheater(response.data);
      } catch (error) {
        console.error("Error fetching theater details:", error);
      }
    };

    fetchMovieDetails();
    fetchTheaterDetails();
  }, [movieId, theaterId]);
  console.log(theater.name);
  // Implement your booking page UI and logic here
  return (
    <div>
      <h1 style={{ fontSize: "2rem", color: "white" }}>Booking Details</h1>
      <p style={{ fontSize: "1rem", color: "white" }}>
        Selected seats: {selectedSeats.join(", ")}
      </p>
      <p style={{ fontSize: "1rem", color: "white" }}>
        Total Price: ${totalPrice}
      </p>
      {/* Additional booking form and confirmation logic */}
      <p style={{ fontSize: "1rem", color: "white" }}>
        Movie Name: {movie.title}
      </p>
      <p style={{ fontSize: "1rem", color: "white" }}>
        Theatre Name: {theater.name}
      </p>
      <p style={{ fontSize: "1rem", color: "white" }}>
        Number of tickets: {selectedSeats.length}
      </p>
    </div>
  );
};

export default BookingPage;
