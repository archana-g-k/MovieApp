// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "../../components/Navbar";
// import { useParams } from "react-router-dom";

// const MovieDetailPage = () => {
//   const { id } = useParams();

//   const [movie, setMovie] = useState({});
//   const isAuthenticated = localStorage.getItem("access_token") !== null;

//   const handleClick = () => {
//     if (isAuthenticated) {
//       // If authenticated, navigate to the movie details page
//       window.location.href = `/theatre/${movie.id}/`;
//     } else {
//       // If not authenticated, show an alert
//       alert("Please log in to view the movie details.");
//     }
//   };

//   const fetchData = () => {
//     axios
//       .get("http://127.0.0.1:8000/api/movies/" + id)
//       .then((response) => setMovie(response.data))
//       .catch((error) => console.log(error));
//   };

//   useEffect(() => {
//     fetchData();
//   }, [id]);

//   return (
//     <>
//       <Navbar />
//       <div className="container m-5 py-2">
//         <div className="wrapper">
//           <div className="row">
//             <div className="col-md-6">
//               <img
//                 src={movie.image}
//                 alt=""
//                 className="img-fluid"
//                 style={{
//                   width: "100%",
//                   maxHeight: "400px",
//                   objectFit: "cover",
//                 }}
//               />
//             </div>

//             <div className="col-md-6" style={{ textAlign: "left" }}>
//               <h5 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
//                 {movie.title}
//               </h5>
//               <p style={{ fontSize: "1rem", marginBottom: "5px" }}>
//                 Language: {movie.language}
//               </p>
//               <p style={{ fontSize: "1rem", marginBottom: "5px" }}>
//                 Genre: {movie.genre}
//               </p>
//               <p style={{ fontSize: "1rem", marginBottom: "5px" }}>
//                 Release Date: {movie.release_date}
//               </p>
//               <p style={{ fontSize: "1rem", marginBottom: "5px" }}>
//                 Movie Length: {movie.movie_length}
//               </p>

//               <button
//                 className="btn btn-outline-dark m-2"
//                 onClick={handleClick}
//                 style={{ alignSelf: "center" }}
//               >
//                 BOOK TICKETS
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MovieDetailPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState({});
  const isAuthenticated = localStorage.getItem("access_token") !== null;

  const handleClick = () => {
    if (isAuthenticated) {
      // If authenticated, navigate to the movie details page
      window.location.href = `/theatre/${movie.id}/`;
    } else {
      // If not authenticated, show an alert
      alert("Please log in to view the movie details.");
    }
  };

  const fetchData = () => {
    axios
      .get("http://127.0.0.1:8000/api/movies/" + id)
      .then((response) => setMovie(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="container m-5 py-2">
        <div className="wrapper">
          <div className="row">
            <div className="col-md-6">
              <img
                src={movie.image}
                alt=""
                className="img-fluid"
                style={{
                  width: "100%",
                  maxHeight: "500px", // Adjust the max height for a bigger image
                  objectFit: "cover",
                }}
              />
            </div>

            <div
              className="col-md-6"
              style={{ textAlign: "left", color: "white" }}
            >
              <h5 style={{ fontSize: "2rem", marginBottom: "10px" }}>
                {movie.title}
              </h5>
              <p style={{ fontSize: "1.5rem", marginBottom: "5px" }}>
                Language: {movie.language}
              </p>
              <p style={{ fontSize: "1.5rem", marginBottom: "5px" }}>
                Genre: {movie.genre}
              </p>
              <p style={{ fontSize: "1.5rem", marginBottom: "5px" }}>
                Release Date: {movie.release_date}
              </p>
              <p style={{ fontSize: "1.5rem", marginBottom: "5px" }}>
                Movie Length: {movie.movie_length}
              </p>

              <button
                className="btn btn-outline-dark m-2"
                onClick={handleClick}
                style={{ alignSelf: "center", color: "white" }}
              >
                BOOK TICKETS
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetailPage;
