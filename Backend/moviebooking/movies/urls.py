from django.urls import path
from .views import *

urlpatterns=[
   path("users/signup/",SignUpView.as_view(),name="Sign-up-View"),
   path("users/login/",SignInView.as_view(),name="Sign-in-View"),
   path("deactivate/",ActiveDeactive.as_view(),name="ActiveDeactiveUser-View"),
   path("users/updateuser/<int:id>/",UpdateSpecificUser.as_view(),name="UpdateUser-View"),
   path("auth/getuser/<int:id>/",SpecificUserView.as_view(),name="SpecificUserView"),
  
   path("movies/",MoviesView.as_view(),name="Movies-View"),
   path("movies/<int:movie_id>/",SpecificMovie.as_view(),name="Specific-Movies-Detail-View"),
   path("movies/deletemovies/<int:movie_id>/",DeleteMovieAPIView.as_view(),name="Delete-Movies-Detail-View"),
   path("movies/updatemovies/<int:movie_id>/",UpdateSpecificMovie.as_view(),name="Update-Movies-Detail-View"),
   path('movies/filter/', FilterViewMovie.as_view(), name='filter-view'),

   path("theatres/",TheatreView.as_view(),name="Theatres-View"),
   path("theatres/<int:id>/",TheatreDetailsView.as_view(),name="Specific-MovieTheatre-Detail-View"),
   path("theatredetails/<int:id>/",SpecificTheatreView.as_view(),name="Specific-Theatre-Detail-View"),
   path("theatres/<int:id>/",TheatreDetailView.as_view(),name="Specific-MovieTheatre-Detail-View"),

   path("movies/bookseats/",SeatBookingView.as_view(),name="SeatBookingView"),
   path("reserved-seats/<int:theater_id>/<int:movie_id>/<str:date>/<str:movie_timing>/",BookedSeatView.as_view(),name="BookedSeatView"),
   path('user-bookings/<int:user_id>/', UserBookingsView.as_view(), name='user-booking-details'), #get

]