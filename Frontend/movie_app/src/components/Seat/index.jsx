// Seat.js
import React from "react";
import "../../seat.css";

const Seat = ({ seatId, isSelected, onClick }) => {
  const handleClick = () => {
    onClick(seatId);
  };

  return (
    <div
      className={`seat ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
    >
      {seatId}
    </div>
  );
};

export default Seat;
