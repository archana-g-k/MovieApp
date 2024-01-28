import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

const BookingPage = ({
  selectedSeats,
  totalPrice,
  movieId,
  theaterId,
  userId,
}) => {
  const [movie, setMovie] = useState({});
  const [theater, setTheater] = useState({});
  const [user, setUser] = useState({});

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
          `http://127.0.0.1:8000/api/theatredetails/${theaterId}/`
        );
        setTheater(response.data);
      } catch (error) {
        console.error("Error fetching theater details:", error);
      }
    };
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/auth/getuser/${userId}/`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchMovieDetails();
    fetchTheaterDetails();
    fetchUserDetails();
  }, [movieId, theaterId, userId]);

  console.log(theater.name);

  // Implement your booking page UI and logic here
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Navbar />
      <h1 style={{ fontSize: "2rem", color: "white" }}>Booking Details</h1>
      <p style={{ fontSize: "1rem", color: "white" }}>
        User name: {user.username}
      </p>
      <p style={{ fontSize: "1rem", color: "white" }}>
        Selected seats: {selectedSeats.join(", ")}
      </p>

      <p style={{ fontSize: "1rem", color: "white" }}>
        Total Price: Rs.{totalPrice}
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
