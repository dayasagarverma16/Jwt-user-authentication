from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from userauths.models import Profile, User
from userauths.serializer import MyTokenObtainPairSerializer, RegisterSerializer,UserSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny
# Create your views here.

import random
import shortuuid
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import jwt
from datetime import datetime, timedelta

class TokenRefreshView(APIView):
    def post(self, request, *args, **kwargs):
        # Get the refresh token from the request
        refresh_token = request.data.get('refresh_token')

        if not refresh_token:
            return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Decode the refresh token using your secret key
            payload = jwt.decode(refresh_token, settings.JWT_SECRET_KEY, algorithms=["HS256"])
            
            # Check if the token is still valid (expiration is verified during decoding)
            if payload['exp'] < datetime.utcnow().timestamp():
                return Response({"error": "Refresh token has expired."}, status=status.HTTP_401_UNAUTHORIZED)
            
            # Create a new access token
            new_access_token = jwt.encode({
                'user_id': payload['user_id'],
                'exp': datetime.utcnow() + timedelta(minutes=15)  # Token expiration time
            }, settings.JWT_SECRET_KEY, algorithm='HS256')

            # Respond with the new access token
            return Response({"access_token": new_access_token}, status=status.HTTP_200_OK)

        except jwt.ExpiredSignatureError:
            return Response({"error": "Refresh token has expired."}, status=status.HTTP_401_UNAUTHORIZED)
        
        except jwt.InvalidTokenError:
            return Response({"error": "Invalid refresh token."}, status=status.HTTP_401_UNAUTHORIZED)



# This code defines a DRF View class called MyTokenObtainPairView, which inherits from TokenObtainPairView.
class MyTokenObtainPairView(TokenObtainPairView):
    # Here, it specifies the serializer class to be used with this view.
    serializer_class = MyTokenObtainPairSerializer



class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes=(AllowAny,)
    serializer_class= RegisterSerializer


class GenerateOTP:
    def otp(self):
        uuid_key = shortuuid.uuid()    
        unique_key = uuid_key[:6]  # Adjust this index based on your requirements
        return unique_key

class PasswordRestEmailVerify(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
    
    def get_object(self):
        email = self.kwargs['email']
        user = User.objects.get(email=email)
        
        print("user ***", user)  # Fix: Print the user object
        
        if user:
            otp_generator = GenerateOTP()  # Instantiate the GenerateOTP class
            user.otp = otp_generator.otp()  # Call the otp method
            user.save()
            
            uidb64 = user.pk
            otp=   user.otp
            
            link = f"http://localhost:5173/create-new-password?otp={user.otp}&uidb64={uidb64}"
            print("link=== ",link)
            
        return user
         
         
         
class PasswordChangeView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        payload = request.data
        
        otp = payload.get('otp')
        uidb64 = payload.get('uidb64')
        password = payload.get('password')

        try:
            user = User.objects.get(id=uidb64, otp=otp)  # Adjust as needed
            user.set_password(password)
            user.otp = ""  # Clear OTP after change
            user.save()

            return Response({"message": "Password Changed Successfully"}, status=status.HTTP_201_CREATED)
        except User.DoesNotExist:
            return Response({"message": "Invalid OTP or User ID"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message": "An Error Occurred: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    
    
             