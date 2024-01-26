from django.contrib.auth import authenticate
from rest_framework import serializers
from django.db.models import Q
from .models import *

class UserSerializer(serializers.ModelSerializer):

    password=serializers.CharField(write_only=True)

    class Meta:
        model=User
        fields=("name","username","password","email")
   
    def create(self,validated_data):

        user=User.objects.create(
        username=validated_data["username"],
        name=validated_data["name"],
        email=validated_data["email"]
        )
        user.set_password (validated_data["password"])
        user.save()
        return user
      
class LoginSerializer(serializers.Serializer):
    username=serializers.CharField()
    password=serializers.CharField(write_only=True)

    def validate(self,data):
        username = data.get('username')
        password = data.get('password')

        user=authenticate(username=username, password=password)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect username or password")
    
class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'email', 'username') 
        
class TheatreSerializer(serializers.ModelSerializer) :
    class Meta:
        model=Theatre
        fields="__all__"  

class SeatSerializer(serializers.ModelSerializer) :
    class Meta:
        model=Seat
        fields="__all__"  

class MovieSerializer(serializers.ModelSerializer) :
    theatres=TheatreSerializer(many=True,read_only=True)
    seats=SeatSerializer(many=True,read_only=True)
    class Meta:
        model=Movie
        fields="__all__"  

class BookingSerializer(serializers.ModelSerializer):
    movie = MovieSerializer(read_only=True)
    seats = SeatSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = "__all__"

 

    





