// // import React from "react";
// // import { useState } from "react";
// // import { useEffect } from "react";

// // function SearchPanel({ onNameChange, onLanguageChange, onGenreChange }) {
// //   const [searchName, setSearchName] = useState("");
// //   const [genres, setGenres] = useState([]);
// //   const [selectedGenre, setSelectedGenre] = useState("");
// //   const [languages, setLanguages] = useState([]);
// //   const [selectedLanguage, setSelectedLanguage] = useState("");
// //   useEffect(() => {
// //     // Fetch genres from the API
// //     fetch("http://127.0.0.1:8000/api/movies/genres/")
// //       .then((response) => response.json())
// //       .then((data) => {
// //         setGenres(data);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching genres:", error);
// //       });
// //   }, []);

// //   const handleGenreChange = (event) => {
// //     const newGenre = event.target.value;
// //     setSelectedGenre(newGenre);
// //     onGenreChange(newGenre);
// //   };
// //   useEffect(() => {
// //     // Fetch the unique languages from the API
// //     fetch("http://127.0.0.1:8000/api/movies/language/")
// //       .then((response) => response.json())
// //       .then((data) => {
// //         setLanguages(data);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching languages:", error);
// //       });
// //   }, []);
// //   const handleLanguageChange = (value) => {
// //     setSelectedLanguage(value);
// //     onLanguageChange(value); // Call the parent's callback function with the selected language
// //   };

// //   const handleNameChange = (e) => {
// //     const newName = e.target.value;
// //     setSearchName(newName); // Update the state with the typed name
// //     onNameChange(newName); // Call the parent's callback function with the new name
// //   };

// //   console.log(searchName);

// //   return (
// //     <div className="searchPanel">
// //       <div>
// //         <p className="header1">WELCOME TO BOLETO</p>
// //         <h1 className="header2">WHAT ARE YOU LOOKING FOR</h1>
// //       </div>
// //       <div className="searchBox">
// //         <div className="searchWrapper">
// //           <input
// //             className="searchInput"
// //             placeholder="Search for Movies"
// //             type="text"
// //             value={searchName}
// //             onInput={handleNameChange}
// //           />
// //           <svg
// //             className="searchIcon bi bi-search"
// //             xmlns="http://www.w3.org/2000/svg"
// //             width="16"
// //             height="16"
// //             fill="currentColor"
// //             viewBox="0 0 16 16"
// //           >
// //             <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
// //           </svg>
// //         </div>

// //         <div className="searchOption">
// //           <img
// //             src="https://cdn3.iconfinder.com/data/icons/ballicons-reloaded-vol-1/512/icon-99-512.png"
// //             style={{ width: "50px", height: "50px" }}
// //           ></img>
// //           {/* <label>Category</label> */}
// //           <select value={selectedGenre} onChange={handleGenreChange}>
// //             <option value="">Select Category</option>
// //             {genres.map((genre, index) => (
// //               <option key={index} value={genre}>
// //                 {genre}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div className="searchOption">
// //           <img
// //             src="https://ww1.prweb.com/prfiles/2013/01/29/10376536/1.jpg"
// //             style={{ width: "50px", height: "50px" }}
// //             alt=""
// //           />
// //           {/* <label>Language</label> */}
// //           <select
// //             value={selectedLanguage}
// //             onChange={(e) => handleLanguageChange(e.target.value)}
// //           >
// //             <option value="">Select a Language</option>
// //             {languages.map((language, index) => (
// //               <option key={index} value={language}>
// //                 {language}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div className="searchOption">
// //           <img
// //             src="https://icon-library.com/images/movie-icon/movie-icon-2.jpg"
// //             style={{ width: "50px", height: "50px" }}
// //             alt=""
// //           />
// //           <label>Cinema</label>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default SearchPanel;
// import { Link } from "react-router-dom";

// const SearchPanel = (props) => {
//   const { id, title, image, rating, language, genre } = props.data;

//   return (
//     <div style={{ width: "25%", padding: "10px", boxSizing: "border-box" }}>
//       <div
//         style={{
//           border: "1px solid #ddd",
//           borderRadius: "8px",
//           overflow: "hidden",
//         }}
//       >
//         <Link to={`/movies/detail/${id}`}>
//           <img
//             src={image}
//             style={{
//               width: "100%",
//               height: "200px",
//               objectFit: "cover",
//               borderRadius: "8px 8px 0 0",
//             }}
//             alt="..."
//           />
//         </Link>
//         <div style={{ padding: "10px", textAlign: "center" }}>
//           <h3
//             style={{
//               fontWeight: "bold",
//               fontSize: "1.2rem",
//               marginBottom: "5px",
//               color: "white",
//             }}
//           >
//             {title}
//           </h3>
//           <h3 style={{ fontWeight: "bold", fontSize: "1rem", color: "white" }}>
//             {rating}
//           </h3>
//         </div>
//         <div style={{ padding: "10px" }}>
//           <p style={{ color: "white" }}>Language: {language}</p>
//           <p style={{ color: "white" }}>Genre: {genre}</p>
//         </div>
//         <div style={{ padding: "10px" }}>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <label style={{ color: "white", marginRight: "10px" }}>
//               Language:
//             </label>
//             <input
//               type="text"
//               placeholder="Enter language"
//               value={language}
//               readOnly
//               style={inputStyle}
//             />
//             <span style={iconStyle}>🌐</span>
//           </div>
//         </div>
//         <div style={{ padding: "10px" }}>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <label style={{ color: "white", marginRight: "10px" }}>
//               Genre:
//             </label>
//             <input
//               type="text"
//               placeholder="Enter genre"
//               value={genre}
//               readOnly
//               style={inputStyle}
//             />
//             <span style={iconStyle}>🎬</span>
//           </div>
//         </div>
//         <div style={{ padding: "10px" }}>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <label style={{ color: "white", marginRight: "10px" }}>
//               Search Movies:
//             </label>
//             <input type="text" placeholder="Search..." style={inputStyle} />
//             <span style={iconStyle}>🔍</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// const inputStyle = {
//   padding: "8px",
//   borderRadius: "4px",
//   border: "1px solid #ddd",
//   marginRight: "10px",
//   width: "150px",
// };

// const iconStyle = {
//   fontSize: "20px",
//   cursor: "pointer",
// };

// export default SearchPanel;
// import React from "react";

// const MovieSearch = () => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         flexDirection: "column",
//       }}
//     >
//       <div style={{ marginBottom: "20px" }}>
//         <label style={{ color: "white", marginRight: "10px" }}>Language:</label>
//         <div style={inputContainer}>
//           <input type="text" placeholder="Enter language" style={inputStyle} />
//           <span role="img" aria-label="Language" style={iconStyle}>
//             🌐
//           </span>
//         </div>
//       </div>
//       <div style={{ marginBottom: "20px" }}>
//         <label style={{ color: "white", marginRight: "10px" }}>Genre:</label>
//         <div style={inputContainer}>
//           <input type="text" placeholder="Enter genre" style={inputStyle} />
//           <span role="img" aria-label="Genre" style={iconStyle}>
//             🎬
//           </span>
//         </div>
//       </div>
//       <div>
//         <label style={{ color: "white", marginRight: "10px" }}>
//           Search Movies:
//         </label>
//         <div style={inputContainer}>
//           <input type="text" placeholder="Search..." style={inputStyle} />
//           <span role="img" aria-label="Search" style={iconStyle}>
//             🔍
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// const inputContainer = {
//   display: "flex",
//   alignItems: "center",
//   width: "300px",
// };

// const inputStyle = {
//   padding: "8px",
//   borderRadius: "4px",
//   border: "1px solid #ddd",
//   marginRight: "10px",
//   width: "100%",
// };

// const iconStyle = {
//   fontSize: "20px",
//   cursor: "pointer",
// };

// export default MovieSearch;
import React from "react";

const MovieSearch = () => {
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
          <input type="text" placeholder="Enter language" style={inputStyle} />
          <span role="img" aria-label="Language" style={iconStyle}>
            🌐
          </span>
        </div>
      </div>
      <div style={inputContainer}>
        <label style={{ color: "white", marginRight: "10px" }}>Genre:</label>
        <div style={inputWrapper}>
          <input type="text" placeholder="Enter genre" style={inputStyle} />
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

export default MovieSearch;
