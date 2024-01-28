// UserProfile.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import Navbar from "../../components/Navbar";

const UserProfile = () => {
  const [user, setUser] = useState("");
  const [bookings, setBookings] = useState([]);
  const [movieTheatreDetails, setMovieTheatreDetails] = useState([]);

  const access_token = localStorage.getItem("access_token");
  console.log("Token:", access_token);
  const tokenParts = access_token.split(".");
  const encodedPayload = tokenParts[1];

  // Decode the Base64-encoded payload
  const decodedPayload = atob(encodedPayload);

  // Parse the decoded payload as JSON
  const payloadObject = JSON.parse(decodedPayload);
  console.log("Payload", payloadObject);
  console.log(payloadObject.user_id);
  // Now you can access the username from the payload
  //setUserId(payloadObject.user_id);
  useEffect(
    () => {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/auth/getuser/${payloadObject.user_id}/`
          );
          setUser(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
      const fetchBookingDetails = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/user-bookings/${payloadObject.user_id}/`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          setBookings(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
      const fetchMovieTheatreDetails = async () => {
        try {
          const movieDetailsPromises = bookings.map(async (booking) => {
            const movieId = booking.movie;
            console.log("movieId:", movieId);

            const movieTheatreDetailsResponse = await axios.get(
              `http://127.0.0.1:8000/api/theatre/${movieId}/`
            );
            console.log(movieTheatreDetailsResponse.data);

            return movieTheatreDetailsResponse.data;
          });

          const movieTheatreDetails = await Promise.all(movieDetailsPromises);
          console.log("movieTheatreDetails", movieTheatreDetails);
          setMovieTheatreDetails(movieTheatreDetails);
        } catch (error) {
          console.error("Error fetching user booking details:", error);
        }
      };

      fetchUserDetails();
      fetchBookingDetails();
      fetchMovieTheatreDetails();
    },
    [payloadObject.user_id],
    [bookings],
    [movieTheatreDetails]
  );
  return (
    <div>
      <Navbar />
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "50px",
          color: "white",
        }}
      >
        User Profile
      </h1>
      {user ? (
        <div>
          <h2
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "50px",
              color: "white",
            }}
          >
            Welcome,{" "}
            <a style={{ fontWeight: "bold", color: "white" }}>
              {user.username}
            </a>
          </h2>
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "50px",
              color: "white",
            }}
          >
            Email:{user.email}
          </h3>
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "50px",
              color: "white",
            }}
          >
            Your Bookings
          </h3>

          {/* Add other fields as needed */}
          <ul style={{ display: "flex", margin: "50px" }}>
            {bookings.map((booking, index) => (
              <div className="col-md-4" key={booking.id}>
                <div className={styles.wrapper}>
                  {movieTheatreDetails[index] && (
                    <div>
                      <h2>Movie:{movieTheatreDetails[index].movie.title}</h2>
                      console.log("Movie Details:",
                      movieTheatreDetails[index].movie);
                      <h4 className={styles.author}>
                        Theatre: {movieTheatreDetails[index].name}
                      </h4>
                    </div>
                  )}
                  <h4 className={styles.author}>
                    Seats booked:{" "}
                    {booking.seats.map((seat) => seat.seat_number).join(", ")}
                  </h4>
                  <h2 className={styles.author}>
                    Total Cost: Rs. {booking.total_cost}/-
                  </h2>
                  <h2 className={styles.author}>
                    Booked at: {booking.booking_time}
                  </h2>
                </div>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
