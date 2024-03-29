from django.shortcuts import render
from .serializers import *
from django.core.paginator import Paginator
from django.db.models import Q
# Create your views here.
from rest_framework.response import Response
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

import json

from rest_framework import status
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated,IsAdminUser
# Create your views here.
 # Created user details
class SignUpView(APIView):

    def post(self, request):
        data= json.loads(request.body)
        userExist = User.objects.filter(email=data["email"])
        if not userExist:
            serializer = UserSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message":"Account Created Successfully"}, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message":"Account Already Exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
class SignInView(APIView):
    def post(self,request):
        data=request.data
        serializer=LoginSerializer(data=data)
        print(serializer)

        if serializer.is_valid():
            user=serializer.validated_data
            token=RefreshToken.for_user(user)
            return Response(
                {

                    "message":"Login successful",
                    "access_token":str(token.access_token),
                    "refresh_token":str(token)
                }
            )
        return Response(serializer.errors,status=401)
    
class ActiveDeactive(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        user.is_active = not user.is_active
        user.save()
        return Response({'message': 'User active status toggled successfully'}, status=200)
    
class UpdateSpecificUser(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({'message': 'User is not found'}, status=status.HTTP_404_NOT_FOUND)
    def put(self, request, id):
        user = self.get_object(id)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User has been updated"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)       

class SpecificUserView(APIView):                      
    def get(self,request,id):
        user=User.objects.get(id=id)
        serializer=UserSerializer(user).data
        
        return Response(serializer)
    
class MoviesView(APIView):
    def get_permissions(self):
        if self.request.method in ["POST", "DELETE","PUT"]:
            return[IsAuthenticated(), IsAdminUser()]
        return[]
    def get(self,request,id=None):
        if id:
            try:
                movie=Movie.objects.get(id=id)
                serializer=MovieSerializer(movie.data)
                return Response(serializer,status=status.HTTP_200_OK)
            except Movie.DoesNotExist:
                return Response({"message":"Movie not found"},status=status.HTTP_404_NOT_FOUND)
        query=request.GET.get("query",None)
        rating=request.GET.get("rating",None)
        genre=request.GET.get("genre",None)
        language=request.GET.get("language",None)
        page_no=request.GET.get("page",1)
        allMovies=Movie.objects.all().order_by("-id")
        if query:
            allMovies=allMovies.filter(Q(title__icontains=query) | Q(description__icontains=query ))
        if rating:
            allMovies=allMovies.filter(rating__gte=int(rating))
        if genre:
            allMovies=allMovies.filter(genre__icontains=genre)
        if language:
            allMovies=allMovies.filter(Q(language__in=language.split("|")) | Q(language__icontains=language ))
        paginate=Paginator(allMovies,8)
        page=paginate.get_page(page_no)
        page_data=page.object_list
        serializer=MovieSerializer(page_data,many=True).data
        return Response(
    {
        "count": allMovies.count(),
        "total_page": paginate.num_pages,
        "next": page.has_next(),
        "previous": page.has_previous(),
        "data": serializer,
    },  # Add a comma here
    status=status.HTTP_200_OK,
)
    def post(self,request):
        data=request.data
        serializer=MovieSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Movie has been created "}, status=201)
        return Response(serializer.errors, status=400)
    
class SpecificMovie(APIView):
    def get(self, request, movie_id):
        movie = Movie.objects.get(id=movie_id)
        serializer = MovieSerializer(movie).data
        return Response(serializer)
    
class DeleteMovieAPIView(APIView):
    permission_classes=[IsAuthenticated & IsAdminUser]
    def post(self, request, movie_id):
        try:
            # Filter movies by id
            movie = Movie.objects.get(id=movie_id)
            # Delete the movie
            movie.delete()
            return Response({'message': 'Movie deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Movie.DoesNotExist:
            return Response({'message': 'Movie not found'}, status=status.HTTP_404_NOT_FOUND)
class UpdateSpecificMovie(APIView):
    permission_classes=[IsAuthenticated & IsAdminUser]

    def get_object(self, movie_id):
        try:
            return Movie.objects.get(id=movie_id)
        except Movie.DoesNotExist:
            return Response({'message': 'Movie not found'}, status=status.HTTP_404_NOT_FOUND)
    def put(self, request, movie_id):
        movie = self.get_object(movie_id)
        serializer = MovieSerializer(movie, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Movie has been updated"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)       

class FilterViewMovie(APIView):
    def get(self, request):
       
        genre = request.GET.get("gen", None)
        language = request.GET.get("lang", None)
       

        movies = Movie.objects.all()
        
        if genre:
            movies = movies.filter(genre__icontains=genre)
        if language:
            movies = movies.filter(language__iexact=language)
       

        serializer = MovieSerializer(movies, many=True).data
        return Response(serializer, status=200)
class TheatreView(APIView):

    def get(self, request):
        theatre = Theatre.objects.all()
        serializer = TheatreSerializer(theatre, many=True).data
        return Response(serializer, status=200)
    
         
class GetTheaterDetailsViews(APIView):
    def get(self, request, id):
        try:
            # Use filter() instead of get() if there can be multiple theatres with the same movie ID
            theatres = Theatre.objects.filter(id=id)
            
            if theatres.exists():
                serializer = TheatreSerializer(theatres, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Theater not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def post(self, request, movie_id):
        print(request.data)
        try:
            movie = Movie.objects.get(id=movie_id)
            request.data['movie'] = movie_id
        except Movie.DoesNotExist:
            return Response({"message": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = TheatreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(movie=movie)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    

class SpecificTheatreView(APIView):                      
    def get(self,request,id):
        theatre=Theatre.objects.get(id=id)
        serializer=TheatreSerializer(theatre).data
        
        return Response(serializer)
class TheatreDetailsView(APIView):
    def get(self,request,id):
        try:
            movie=Movie.objects.get(id=id)
        except Movie.DoesNotExist:
            return Response({"error":"Movie not found"},status=status.HTTP_404_NOT_FOUND)
        movie_serializer=MovieSerializer(movie).data
        theaters_serializer=TheatreSerializer(movie.theatres.all(),many=True).data
        response_data={
            "movie":movie_serializer,
            "theatres":theaters_serializer
        }
        return Response(response_data,status=status.HTTP_200_OK)
class TheatreDetailView(APIView):
    def get(self, request, movie_id):
        theatre = get_object_or_404(Theatre, movie__id=movie_id)
        serializer = TheatreSerializer(theatre)
        return Response(serializer.data, status=200)    
   
class SeatView(APIView):
    
    def get(self, request, movie_id):
        permission_classes = [IsAuthenticated]

        seats = Seat.objects.filter(movie_id=movie_id)
        seat_list = [{'seat_number': seat.seat_number, 'reserved': seat.reserved} for seat in seats]
        return JsonResponse({'seats': seat_list})

    def post(self, request):
        permission_classes=[IsAuthenticated & IsAdminUser]
        data = json.loads(request.body.decode('utf-8'))
        movie_id = data.get('movie_id')
        seat_number = data.get('seat_number')

        seat = Seat.objects.filter(movie_id=movie_id, seat_number=seat_number).first()

        if seat and not seat.reserved:
            seat.reserved = True
            seat.save()
            return JsonResponse({'message': 'Seat reserved successfully'})
        else:
            return JsonResponse({'error': 'Seat is already reserved or does not exist'})

    def put(self, request):
        data = json.loads(request.body.decode('utf-8'))
        movie_id = data.get('movie_id')
        seat_number = data.get('seat_number')
        reserved_status = data.get('reserved_status')

        seat = Seat.objects.filter(movie_id=movie_id, seat_number=seat_number).first()

        if seat:
            seat.reserved = reserved_status
            seat.save()
            return JsonResponse({'message': 'Seat reservation status updated successfully'})
        else:
            return JsonResponse({'error': 'Seat does not exist'})
class SeatBookingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        data = request.data
        theater_id = data.get('theater')
        seats_data = data.get('seats')
        category = data.get('category')
        movie_id = data.get('movie')
        price = data.get('price')
        movie_timing = data.get('movie_timing')
        date = data.get('date')

        # Fetch the actual movie object based on the provided movie_id
        try:
            movie = Movie.objects.get(id=movie_id)
        except Movie.DoesNotExist:
            return Response({'message': 'Invalid movie ID'}, status=status.HTTP_400_BAD_REQUEST)

        # Create the Booking object using the movie object
        booking = Booking(user=request.user, movie=movie, total_cost=len(seats_data) * price)
        booking.save()

        # Create Seat objects for each seat in the list
        for seat_number in seats_data:
            seat = Seat(
                theatre_id=theater_id,
                movie=movie,  # Use the movie object instead of movie_id
                seat_number=seat_number,
                category=category,
                price=price,
                is_reserved=True,
                movie_timing=movie_timing,
                date=date,
                user=request.user
            )
            seat.save()
            booking.seats.add(seat)

        return Response({'message': 'Booking created successfully'}, status=status.HTTP_201_CREATED)

class BookedSeatView(APIView):
    def get(self, request, theater_id, movie_id, date, movie_timing):
        permission_classes = [IsAuthenticated]

        queryset = Seat.objects.filter(
            theater_id=theater_id,
            movie_id=movie_id,
            date=date,
            movie_timing=movie_timing,
            is_reserved=True  # Filter only reserved seats
        )
        
        # serializer = SeatSerializer(queryset, many=True)
        seat_numbers = [seat.seat_number for seat in queryset]
        # You can customize the response data here if needed
        response_data = {
            # 'reserved_seats': serializer.data
            'reserved_seat_numbers': seat_numbers
        }

        return Response(response_data)
    


class UserBookingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        bookings = Booking.objects.filter(user_id=user_id)
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data, status=200)
    
