// SeatPage.js
import React, { useState, useEffect } from "react";
import Seat from "../../components/Seat";
import BookingPage from "../BookingPage";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

const SeatPage = () => {
  const params = useParams();
  const movieId = params.movieId;
  const theaterId = params.theater_id; // Change to theaterId (camelCase)

  const navigate = useNavigate();
  console.log(movieId);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [isProceedClicked, setIsProceedClicked] = useState(false);
  const [userId, setUserId] = useState("");

  // Track if the Proceed button is clicked
  const seatPrice = 150;
  const handleSeatClick = (seatId) => {
    // Toggle seat selection
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((seat) => seat !== seatId);
      } else {
        return [...prevSelectedSeats, seatId];
      }
    });
  };
  useEffect(() => {
    // Update current date and time every second
    const intervalId = setInterval(() => {
      const now = new Date();
      const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const formattedDateTime = new Intl.DateTimeFormat(
        "en-US",
        options
      ).format(now);
      setCurrentDateTime(formattedDateTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    // Calculate total price whenever selectedSeats change
    const totalPrice = selectedSeats.length * seatPrice;
    setTotalPrice(totalPrice);
  }, [selectedSeats, seatPrice]);
  const renderSeats = () => {
    const rows = [
      { rowName: "G", seatsCount: 10 },
      { rowName: "F", seatsCount: 10 },
      // Add more rows as needed
    ];

    // Create an array of seat components
    const seats = rows.map((row) => {
      const rowSeats = Array.from({ length: row.seatsCount }, (_, index) => {
        // Calculate the seat number (G1, G2, ..., G10) or (F1, F2, ..., F10)
        const seatNumber = `${row.rowName}${index + 1}`;

        return (
          <Seat
            key={seatNumber}
            seatId={seatNumber}
            isSelected={selectedSeats.includes(seatNumber)}
            onClick={handleSeatClick}
          />
        );
      });

      return (
        <div key={row.rowName} className="seat-row">
          {rowSeats}
        </div>
      );
    });

    return seats;
  };
  const handleBooking = async () => {
    // Handle the booking logic here using selectedSeats
    //navigate("/getticket");
    console.log("Selected seats:", selectedSeats);
    console.log("Total price:", totalPrice);
    const access_token = localStorage.getItem("access_token");
    console.log("Token:", access_token);
    const tokenParts = access_token.split(".");
    const encodedPayload = tokenParts[1];

    // Decode the Base64-encoded payload
    const decodedPayload = atob(encodedPayload);

    // Parse the decoded payload as JSON
    const payloadObject = JSON.parse(decodedPayload);
    console.log("Payload", payloadObject);
    // Now you can access the username from the payload
    setUserId(payloadObject.user_id);
    console.log("Booking Details to be Sent to Server:");
    console.log("User ID:", userId); // Replace with actual theater ID

    console.log("Theater ID:", theaterId); // Replace with actual theater ID
    console.log("Selected Seats:", selectedSeats);
    console.log("Category:", "regular"); // Replace with actual category
    console.log("Movie ID:", movieId); // Replace with actual movie ID
    console.log("Price:", 150); // Replace with actual price
    console.log("Movie Timing:", "120"); // Replace with actual movie timing
    console.log("Date:", "2024-01-24");
    // Make API call to save booking details
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/movies/bookseats/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
            // Add any additional headers as needed
          },
          body: JSON.stringify({
            theater: theaterId, // Replace with actual theater ID
            seats: selectedSeats,
            category: "regular", // Replace with actual category
            movie: movieId, // Replace with actual movie ID
            price: 150, // Replace with actual price
            movie_timing: "120", // Replace with actual movie timing
            date: "2024-01-24", // Replace with actual date
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("Booking created successfully:", data);
        alert("Booking created successfully:");
        setIsProceedClicked(true);
      } else {
        console.error("Failed to create booking");
        // Handle error scenarios
      }
    } catch (error) {
      console.error("Error while making API call:", error);
      // Handle error scenarios
    }
  };

  // Render BookingPage if Proceed button is clicked
  if (isProceedClicked) {
    // console.log(theaterId);

    return (
      <BookingPage
        selectedSeats={selectedSeats}
        totalPrice={totalPrice}
        movieId={movieId}
        theaterId={theaterId}
        Number
        of
        tickets={selectedSeats.length}
        userId={userId}
      />
    );
  }
  return (
    <div>
      <Navbar />
      <h1
        style={{ color: "white", display: "flex", justifyContent: "center" }}
        className="heading-color"
      >
        SCREEN
      </h1>
      <p
        style={{
          fontSize: "16px",
          color: "white",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {currentDateTime}
      </p>
      <div className="seat-container">{renderSeats()}</div>

      {selectedSeats.length > 0 && (
        <div className="selected-seats-section">
          <p className="selected-seats-text">
            You have chosen the seats:{selectedSeats.join(", ")}
          </p>
          <p className="total-price-text">Total Price: Rs.{totalPrice}</p>
        </div>
      )}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <button onClick={handleBooking}>Proceed</button>
      </div>
    </div>
  );
};

export default SeatPage;
