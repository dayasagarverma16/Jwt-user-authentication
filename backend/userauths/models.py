from django.db import models
from django.contrib.auth.models import AbstractUser
from shortuuid.django_fields import ShortUUIDField
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

class User(AbstractUser):
    username = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=100, null=True, blank=True)
    otp = models.CharField(max_length=100, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        email_username = self.email.split('@')[0]  # Use part of email as username
        if not self.full_name:
            self.full_name = email_username # Default full name to email if not set
        if not self.username:
            self.username = email_username  # Default username to email prefix if not set
        super(User, self).save(*args, **kwargs)
        

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='accounts/users', default='default/default-user.jpg', null=True, blank=True)
    full_name = models.CharField(max_length=100, null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    gender = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    address = models.CharField(max_length=100, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    pid = ShortUUIDField(unique=True, length=10, max_length=20, alphabet="abcdefghijk")

    def __str__(self):
        return self.full_name or self.user.full_name or "No Name"

    def save(self, *args, **kwargs):
        # Sync profile full_name with user full_name if not set
        if not self.full_name:
            self.full_name = self.user.full_name
        super(Profile, self).save(*args, **kwargs)

# Combine the signals for creating and saving the user profile
@receiver(post_save, sender=User)
def manage_user_profile(sender, instance, created, **kwargs):
    if created:
        # Create a profile for a newly created user
        Profile.objects.create(user=instance)
    else:
        # Update the profile if user data changes (e.g., full_name update)
        instance.profile.save()

























































# from django.db import models
# from django.contrib.auth.models import AbstractUser
# from shortuuid.django_fields import ShortUUIDField
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from django.utils import timezone

# class User(AbstractUser):
#     username = models.CharField(max_length=100, null=True, blank=True)
#     email = models.EmailField(unique=True)
#     full_name = models.CharField(max_length=100, null=True, blank=True)
#     phone = models.CharField(max_length=100, null=True, blank=True)
#     otp = models.CharField(max_length=100, null=True, blank=True)

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['username']

#     def __str__(self):
#         return self.email

#     def save(self, *args, **kwargs):
#         email_username = self.email.split('@')[0]
#         if not self.full_name:
#             self.full_name = self.email
#         if not self.username:
#             self.username = email_username
#         super(User, self).save(*args, **kwargs)


# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     image = models.ImageField(upload_to='accounts/users', default='default/default-user.jpg', null=True, blank=True)
#     full_name = models.CharField(max_length=100, null=True, blank=True)
#     about = models.TextField(null=True, blank=True)
    
#     gender = models.CharField(max_length=100, null=True, blank=True)
#     country = models.CharField(max_length=100, null=True, blank=True)
#     city = models.CharField(max_length=100, null=True, blank=True)
#     state = models.CharField(max_length=100, null=True, blank=True)
#     address = models.CharField(max_length=100, null=True, blank=True)
    
#     date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
#     pid = ShortUUIDField(unique=True, length=10, max_length=20, alphabet="abcdefghijk")

#     def __str__(self):
#         return self.full_name or self.user.full_name or "No Name"

#     def save(self, *args, **kwargs):
#         if not self.full_name:
#             self.full_name = self.user.full_name
#         super(Profile, self).save(*args, **kwargs)


# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)


# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()

