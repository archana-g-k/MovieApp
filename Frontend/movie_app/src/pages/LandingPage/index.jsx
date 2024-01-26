import { useEffect, useState } from "react";
import Header from "../../components/Header";
import MovieList from "../../components/MovieList";
import Navbar from "../../components/Navbar";

import MovieSearch from "../../components/MovieSearch";

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
