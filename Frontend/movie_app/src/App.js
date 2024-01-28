import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import TheatreDetailsPage from "./pages/TheatreDetailsPage";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/seat/:movieId/:theater_id/"
          element={<SeatSelectionPage />}
        />

        <Route path="/movies/detail/:id" element={<MovieDetailPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/theatre/:movie_id/" element={<TheatreDetailsPage />} />
        <Route
          path="/theatre/:theaterId/:movieId/seat"
          element={<TheatreDetailsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
