import { Link } from "react-router-dom";

const Movie = (props) => {
  const { id, title, image, rating } = props.data;

  return (
    <div style={{ width: "25%", padding: "10px", boxSizing: "border-box" }}>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Link to={`/movies/detail/${id}`}>
          <img
            src={image}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px 8px 0 0",
            }}
            alt="..."
          />
        </Link>
        <div style={{ padding: "10px", textAlign: "center" }}>
          <h3
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              marginBottom: "5px",
              color: "white",
            }}
          >
            {title}
          </h3>
          <h3 style={{ fontWeight: "bold", fontSize: "1rem", color: "white" }}>
            {rating}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Movie;
