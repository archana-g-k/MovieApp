import "../../styles.css";

const Header = () => {
  const greenStyle = {
    color: "green",
  };

  const whiteStyle = {
    color: "white",
  };
  return (
    <div className="jumbotron text-center background-image">
      <h1 className="display-4">
        <span style={whiteStyle}>GET</span>
        <span style={greenStyle}> MOVIE </span>
        <span style={whiteStyle}>TICKETS</span>
      </h1>
      <p className="lead">
        Buy movie tickets in advance,find movie times watch trailers,read movie
        reviews and much more
      </p>
      <hr className="my-4" />
    </div>
  );
};
export default Header;
