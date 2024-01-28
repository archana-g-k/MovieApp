import Navbar from "../../components/Navbar";

import Header from "../../components/Header";
import MovieSearch from "../../components/MovieSearch";

import MovieList from "../../components/MovieList";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <MovieSearch />
      <MovieList />
    </>
  );
};
export default LandingPage;
