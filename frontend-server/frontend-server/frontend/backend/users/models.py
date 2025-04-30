from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.conf import settings
from django.utils.crypto import get_random_string
from django.utils import timezone


class UserAccountManager(BaseUserManager):
    def create_user(self, first_name, last_name, email, password=None, qr=False, certs=False):
        if not email:
            raise ValueError("Users must have an email address")
        
        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=email,
            qr=qr,
            certs=certs
        )

        user.set_password(password)
        user.save(using=self._db)
        
        return user
    
    def create_superuser(self, first_name, last_name, email, password=None):
        user = self.create_user(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
        )

        user.is_staff = True
        user.is_superuser = True 
        user.save(using=self._db)
        return user
    

    def create_realtor(self, first_name, last_name, email, password=None):
        user = self.create_user(first_name, last_name, email, password)
        user.is_realtor = True
        user.save(using=self._db)
        return user
    
def user_directory_path(instance, filename):
    base_filename, file_extension = filename.rsplit('.', 1)
    user_folder = str(instance.id)  
    return f'user_{user_folder}/{base_filename}.{file_extension}'    
    
#User model
class UserAccount(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, max_length=255)
    is_active = models.BooleanField(default=True) #
    is_staff = models.BooleanField(default=False)
    
    #access za drugi app/db
    is_realtor =  models.BooleanField(default=False)
    image = models.ImageField(upload_to=user_directory_path, blank=True, null=True)
    unique_name = models.CharField(max_length=6, unique=True, null=False, blank=False)
    qr = models.BooleanField(default=False)
    certs = models.BooleanField(default=False)
    objects = UserAccountManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]
    
    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        if not self.unique_name:
            self.unique_name = self.generate_unique_name()
        super(UserAccount, self).save(*args, **kwargs)
         
    def generate_unique_name(self):
        unique_name = get_random_string(length=6)
        while UserAccount.objects.filter(unique_name=unique_name).exists():
            unique_name = get_random_string(length=6)
        return unique_name
            
#
#################### PASSWORD RESET ####################
#
def generate_random_hash():
    return get_random_string(length=20)

class PasswordResetRequest(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='password_reset_requests')
    email = models.EmailField(max_length=255)
    hash = models.CharField(max_length=20, default=generate_random_hash)  
    executed = models.BooleanField(default=False)
    date_of_request = models.DateTimeField(auto_now_add=True)
    date_of_execution = models.DateTimeField(null=True, blank=True)

    def execute(self):
        """ Mark the request as executed and set the execution date. """
        self.executed = True
        self.date_of_execution = timezone.now()
        self.save()

    def __str__(self):
        return f"{self.user.email} - Reset Request on {self.date_of_request.strftime('%Y-%m-%d')}"

    class Meta:
        verbose_name = "Password Reset Request"
        verbose_name_plural = "Password Reset Requests"     
        
#
#################### DATA MODEL ####################
#

class SportOrganization(models.Model):
    owner = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='owner_sports_organizations')
    organization_name = models.TextField(blank=True)
    description = models.TextField(blank=True)
    added_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['owner']  

    def __str__(self):
        return f"{self.organization_name}"

#Lokacije
class Venue(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    capacity = models.IntegerField(null=True, blank=True)
    facilities = models.TextField(null=True, blank=True)
    photo = models.CharField(max_length=255, null=True, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    def __str__(self):
        return self.name       
 
#Sport i kategorija    
class SportAndCategory(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    category = models.CharField(max_length=100, null=True, blank=True)
    sport = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    organization = models.ForeignKey(SportOrganization, on_delete=models.CASCADE, related_name='owning_organization')

    class Meta:
        unique_together = ['name', 'category']

    def __str__(self):
        return f"{self.name} - {self.category}"

#Momčadi    
class Team(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    sport_and_category = models.ForeignKey(SportAndCategory, on_delete=models.CASCADE, null=True, blank=True)  
    logo = models.CharField(max_length=255, null=True, blank=True)  
    members_count = models.IntegerField(null=True, blank=True)
    wins = models.IntegerField(default=0, null=True, blank=True)
    losses = models.IntegerField(default=0, null=True, blank=True)
    draws = models.IntegerField(default=0, null=True, blank=True)
    total_points = models.IntegerField(default=0, null=True, blank=True)
    team_record = models.CharField(max_length=255, null=True, blank=True)  
    tournaments_participated = models.IntegerField(default=0, null=True, blank=True)

    def __str__(self):
        return self.name
    
# Player model
class Player(models.Model):
    name = models.CharField(max_length=100)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='players')
    position = models.CharField(max_length=50, blank=True, null=True)  
    jersey_number = models.IntegerField(blank=True, null=True)  

    def __str__(self):
        return f"{self.name} ({self.team.name})"


# PlayerStatistic model
class PlayerStatistic(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='statistics')
    stat_name = models.CharField(max_length=100)
    stat_value = models.FloatField()

    def __str__(self):
        return f"{self.stat_name} - {self.stat_value} ({self.player.name})"
    
#Turniiri    
class Tournament(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    sport_and_category = models.ForeignKey(SportAndCategory, on_delete=models.CASCADE, related_name='tournaments')
    start_date = models.DateField()
    end_date = models.DateField()
    venue = models.ForeignKey(Venue, on_delete=models.SET_NULL, null=True, related_name='tournaments')

    def __str__(self):
        return self.name

#Događaji
class Event(models.Model):
    name = models.CharField(max_length=200)
    sport_and_category = models.ForeignKey(SportAndCategory, on_delete=models.CASCADE, related_name='events')
    venue = models.ForeignKey(Venue, on_delete=models.SET_NULL, null=True, related_name='events')
    tournament = models.ForeignKey(Tournament, on_delete=models.SET_NULL, null=True, blank=True, related_name='events')

    home_team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, related_name='home_matches')
    away_team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, related_name='away_matches')

    date = models.DateField()
    time = models.TimeField()

    score_home = models.PositiveIntegerField(default=0)
    score_away = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.name} - {self.home_team} vs {self.away_team} on {self.date}"
    
class SportLocation(models.Model):
    sport = models.ForeignKey(SportAndCategory, on_delete=models.CASCADE, related_name='venues', null=True, blank=True)
    venue = models.ForeignKey(Venue, on_delete=models.CASCADE, related_name='sports', null=True, blank=True)
    organization = models.ForeignKey(SportOrganization, on_delete=models.CASCADE, related_name='enterprising_organization', null=True, blank=True)

    def __str__(self):
        return f"{self.sport} at {self.venue.name}"
    