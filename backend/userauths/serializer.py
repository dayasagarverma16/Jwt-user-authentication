from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from userauths.models import Profile,User
from django.contrib.auth.password_validation import validate_password


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    
    def get_token(cls,user):
        token = super().get_token(user)

        token['full_name'] = user.full_name
        token['email'] = user.email
        token['username'] = user.username
        
        try:
            token['vendor_id']= user.vendor.id
            
        except:
            token['vendor_id']=0
            
        return token  
    
    
   
class RegisterSerializer(serializers.ModelSerializer):
    password =serializers.CharField(write_only=True,required=True,validators=[validate_password])
    password2 =serializers.CharField(write_only=True,required=True)    
    
    class Meta:
        
                # Specify the model that this serializer is associated with

        model = User
        fields = ['full_name','email','phone','password','password2']  
        
   
    def validate(self, attrs):
        # Define a validation method to check if the passwords match
        if attrs['password'] != attrs['password2']:
            # Raise a validation error if the passwords don't match
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        # Return the validated attributes
        return attrs   
    
    def create(self, validated_data):
        # Define a method to create a new user based on validated data
        user = User.objects.create(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            phone=validated_data['phone']
        )
        email_username, mobile = user.email.split('@')
        user.username = email_username

        # Set the user's password based on the validated data
        user.set_password(validated_data['password'])
        user.save()

        # Return the created user
        return user     
    
    





class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = '__all__'
        
        
        
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        modle = 'Profile'
        fields = '__all__' 
        
    def to_representation(self, instance):
        response= super().to_representation(instance)
        response['User'] = UserSerializer(instance.user).data
        return response
       
                