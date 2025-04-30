from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from .models import *

User = get_user_model()

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        fields = ('first_name', 'last_name', 'email', 'password', 'is_realtor', 'qr', 'certs')
        
    def validate(self, data):
        user = User(**data)
        password = data.get('password')
        try:
            validate_password(password, user)
        except exceptions.ValidationError as e:
            serializer_errors = serializers.as_serializer_error(e)
            raise exceptions.ValidationError(
                {'password':serializer_errors['non_field_errors']}
            )
            
        return data
             
    def create(self, validated_data):
        print(validated_data)
        is_realtor = validated_data['is_realtor']
        if is_realtor == 'True' or is_realtor == True:
            is_realtor = True
            
        else:
            is_realtor = False
            
        if not is_realtor:
            user = User.objects.create_user(
                first_name = validated_data['first_name'],
                last_name = validated_data['last_name'],
                email = validated_data['email'],
                password = validated_data['password'],  
                qr = False,
                certs = False 
        )
        else:
            user = User.objects.create_realtor(
                first_name = validated_data['first_name'],
                last_name = validated_data['last_name'],
                email = validated_data['email'],
                password = validated_data['password'],  
                qr = False,
                certs = False 
        )
            
            
        return user
    
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        #fields = ('id', 'first_name', 'last_name', 'email', 'is_realtor',)
        fields = ('id', 'first_name', 'last_name', 'email', 'image', 'unique_name', 'qr', 'certs', 'is_superuser')
        


class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = '__all__'


class SportAndCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SportAndCategory
        fields = '__all__'
        
# PlayerStatistic Serializer
class PlayerStatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerStatistic
        fields = ['id', 'stat_name', 'stat_value']


# Player Serializer (with nested PlayerStatistic)
class PlayerSerializer(serializers.ModelSerializer):
    statistics = PlayerStatisticSerializer(many=True, read_only=True)

    class Meta:
        model = Player
        fields = ['id', 'name', 'team', 'position', 'jersey_number', 'statistics']


# Team Serializer (with nested SportAndCategory)
class TeamSerializer(serializers.ModelSerializer):
    sport_and_category = SportAndCategorySerializer(read_only=True)
    players = PlayerSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'sport_and_category', 'logo', 'members_count', 'wins', 'losses', 'draws', 
                  'total_points', 'team_record', 'tournaments_participated', 'players']
        
class TournamentSerializer(serializers.ModelSerializer):
    venue = VenueSerializer(read_only=True)
    sport_and_category = SportAndCategorySerializer(read_only=True)

    class Meta:
        model = Tournament
        fields = ['id', 'name', 'description', 'sport_and_category', 'start_date', 'end_date', 'venue']


class EventSerializer(serializers.ModelSerializer):
    venue = VenueSerializer(read_only=True)
    sport_and_category = SportAndCategorySerializer(read_only=True)
    tournament = TournamentSerializer(read_only=True)
    home_team = TeamSerializer(read_only=True)
    away_team = TeamSerializer(read_only=True)

    class Meta:
        model = Event
        fields = ['id', 'name', 'sport_and_category', 'venue', 'tournament', 'home_team', 'away_team', 'date', 'time', 'score_home', 'score_away']
        
        
class SportAndCategoryMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = SportAndCategory
        fields = '__all__'



class VenueMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = '__all__'


class SportLocationSerializer(serializers.ModelSerializer):
    sport = SportAndCategoryMiniSerializer(read_only=True)
    venue = VenueMiniSerializer(read_only=True)

    class Meta:
        model = SportLocation
        fields = '__all__'

        
class SportOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SportOrganization
        fields = '__all__'
