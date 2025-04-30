from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import UserAccount, PasswordResetRequest
from .serializers import UserCreateSerializer, UserSerializer 
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .serializers import *
from django.conf import settings
from django.utils.crypto import get_random_string
from django.utils import timezone
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        data = request.data
        serializer = UserCreateSerializer(data=data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)
        return Response(user.data, status=status.HTTP_201_CREATED)
  
    
class RetrieveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = request.user
        if user.qr is False or user.qr is None or user.certs is True:
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'detail': 'Invalid user'}, status=status.HTTP_404_NOT_FOUND)
    
    
class RetrieveUserViewCert(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = request.user
        if user.certs is True:
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'detail': 'Invalid user'}, status=status.HTTP_404_NOT_FOUND)
    


class AddPhoto(APIView):
    def patch(self, request, *args, **kwargs):
        user_profile = get_object_or_404(UserAccount, id=request.user.id)
        
        image_file = request.FILES.get('image')
        if image_file:
            user_profile.image.save(image_file.name, image_file)
            return JsonResponse({'message': 'Profile image updated successfully'}, status=200)
        else:
            return JsonResponse({'error': 'No image provided'}, status=400)
         

class PasswordResetRequestView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email address is required'}, status=status.HTTP_400_BAD_REQUEST)

        user = UserAccount.objects.filter(email=email).first()
        if not user:
            return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)

        existing_requests = PasswordResetRequest.objects.filter(user=user, executed=False)
        if existing_requests.exists():
            existing_requests.delete()

        reset_request = PasswordResetRequest.objects.create(
            user=user,
            email=email,
            hash=get_random_string(length=20)
        )

        reset_link = request.build_absolute_uri(f'http://localhost:3000/recovery/{reset_request.hash}/update')
        subject = 'Zahtjev  za promjenom lozinke'
        message = f'Molimo kliknite na poveznicu kako bi nastavili sa procesom promjene lozinke: {reset_link}'
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [email],
            fail_silently=False,
        )

        return Response({'message': 'Password reset request created', 'hash': reset_request.hash}, status=status.HTTP_201_CREATED)
    
class PasswordResetExecuteView(APIView):
    permission_classes = [permissions.AllowAny]  
    def post(self, request):
        hash = request.data.get('hash')
        new_password = request.data.get('new_password')

        if not hash or not new_password:
            return Response({'error': 'Hash and new password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        reset_request = PasswordResetRequest.objects.filter(hash=hash, executed=False).first()
        if not reset_request:
            return Response({'error': 'Invalid or already executed reset request.'}, status=status.HTTP_404_NOT_FOUND)

        reset_request.executed = True
        reset_request.date_of_execution = timezone.now()
        reset_request.save()

        user = reset_request.user
        user.password = make_password(new_password)
        user.save()

        return Response({'message': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)
    
    
class LatestEventsView(APIView):
    permission_classes = [permissions.AllowAny] 
    def get(self, request):
        events = Event.objects.select_related(
            'sport_and_category',
            'venue',
            'home_team',
            'away_team',
        ).order_by('-date', '-time')[:2]

        event_list = []

        for event in events:
            event_data = {
                'event_id': event.id,
                'event_name': event.name,
                'date': event.date,
                'time': event.time.strftime('%H:%M'),
                'venue': event.venue.name if event.venue else None,
                'image': event.venue.photo if event.venue else None,
                'latitude':event.venue.latitude if event.venue else None,
                'longitude':event.venue.longitude if event.venue else None,
                'sport_and_category': {
                    'id': event.sport_and_category.id,
                    'name': event.sport_and_category.name,
                    'category': event.sport_and_category.category,
                    'sport': event.sport_and_category.sport,
                    'description': event.sport_and_category.description,
                } if event.sport_and_category else None,
                'home_team': {
                    'id': event.home_team.id if event.home_team else None,
                    'name': event.home_team.name if event.home_team else None,
                },
                'away_team': {
                    'id': event.away_team.id if event.away_team else None,
                    'name': event.away_team.name if event.away_team else None,
                },
                'score_home': event.score_home,
                'score_away': event.score_away,
            }
            event_list.append(event_data)

        return Response({'events': event_list}, status=status.HTTP_200_OK)
    
    
class LatestEventsLightView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        events = Event.objects.select_related(
            'sport_and_category',
            'venue',
            'home_team',
            'away_team',
        ).order_by('-date', '-time')[:100]

        event_list = []

        for event in events:
            sport_name = "Unknown"
            if event.sport_and_category:
                if event.sport_and_category.id == 1:
                    sport_name = "Football"
                elif event.sport_and_category.id == 2:
                    sport_name = "Basketball"

            event_data = {
                'id': event.id,
                'sport': sport_name, 
                'category':event.sport_and_category.category if event.sport_and_category else None,
                'teamA': event.home_team.name if event.home_team else None,
                'teamB': event.away_team.name if event.away_team else None,
                'venue': event.venue.name if event.venue else None,
                'date': event.date.strftime('%Y-%m-%d'),
                'time': event.time.strftime('%H:%M'),
                'imageUrl': event.venue.photo if event.venue else None,
                'score_home': event.score_home,
                'score_away': event.score_away,
                'coordinates': {
                    'lat': event.venue.latitude if event.venue else None,
                    'lng': event.venue.longitude if event.venue else None
                }
            }
            event_list.append(event_data)

        return Response({'events': event_list}, status=status.HTTP_200_OK)
    
class LatestEventView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, event_id=None):
        if event_id:
            try:
                event = Event.objects.select_related(
                    'sport_and_category',
                    'venue',
                    'home_team',
                    'away_team',
                ).get(id=event_id)
            except Event.DoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)  

            event_data = {
                'event_id': event.id,
                'event_name': event.name,
                'date': event.date,
                'time': event.time.strftime('%H:%M'),
                'venue': event.venue.name if event.venue else None,
                'image': event.venue.photo if event.venue else None,
                'latitude': event.venue.latitude if event.venue else None,
                'longitude': event.venue.longitude if event.venue else None,
                'sport_and_category': {
                    'id': event.sport_and_category.id,
                    'name': event.sport_and_category.name,
                    'category': event.sport_and_category.category,
                    'sport': event.sport_and_category.sport,
                    'description': event.sport_and_category.description,
                } if event.sport_and_category else None,
                'home_team': {
                    'id': event.home_team.id if event.home_team else None,
                    'name': event.home_team.name if event.home_team else None,
                },
                'away_team': {
                    'id': event.away_team.id if event.away_team else None,
                    'name': event.away_team.name if event.away_team else None,
                },
                'score_home': event.score_home,
                'score_away': event.score_away,
            }

            return Response({'event': event_data}, status=status.HTTP_200_OK)
        return Response({'detail': 'Event ID must be provided'}, status=status.HTTP_400_BAD_REQUEST)
    
class UserOrganizationView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        try:
            organization = SportOrganization.objects.get(owner=request.user)
            serializer = SportOrganizationSerializer(organization)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except SportOrganization.DoesNotExist:
            return Response({'detail': 'Organization not found for this user.'}, status=status.HTTP_404_NOT_FOUND)
        
class SportCategoriesByOrganizationView(APIView):
    permission_classes = [permissions.AllowAny]  
    def get(self, request, org_id):
        try:
            organization = SportOrganization.objects.get(id=org_id)
        except SportOrganization.DoesNotExist:
            return Response({'detail': 'Organization not found.'}, status=status.HTTP_404_NOT_FOUND)

        categories = SportAndCategory.objects.filter(organization=organization)
        serializer = SportAndCategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class VenuesByOrganizationView(APIView):
    permission_classes = [permissions.AllowAny]  
    def get(self, request, org_id):
        try:
            organization = SportOrganization.objects.get(id=org_id)
        except SportOrganization.DoesNotExist:
            return Response({'detail': 'Organization not found.'}, status=status.HTTP_404_NOT_FOUND)

        sport_locations = SportLocation.objects.filter(organization=organization).select_related('venue')
        venues = [sl.venue for sl in sport_locations if sl.venue]

        unique_venues = list({venue.id: venue for venue in venues}.values())

        serializer = VenueSerializer(unique_venues, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class TeamsBySportAndCategoryBodyView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        sport_ids = request.data.get('sport_ids')

        if not sport_ids or not isinstance(sport_ids, list):
            return Response(
                {'detail': 'sport_ids must be a list of integers.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        teams = Team.objects.filter(sport_and_category__id__in=sport_ids)
        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


class CreateEventView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        data = request.data

        try:
            name = data.get('name')
            sport_and_category = get_object_or_404(SportAndCategory, id=data.get('sport_and_category_id'))
            venue = get_object_or_404(Venue, id=data.get('venue_id')) if data.get('venue_id') else None
            home_team = get_object_or_404(Team, id=data.get('home_team_id')) if data.get('home_team_id') else None
            away_team = get_object_or_404(Team, id=data.get('away_team_id')) if data.get('away_team_id') else None
            date = data.get('date')
            time = data.get('time')
            score_home = data.get('score_home', 0)
            score_away = data.get('score_away', 0)

            Event.objects.create(
                name=name,
                sport_and_category=sport_and_category,
                venue=venue,
                home_team=home_team,
                away_team=away_team,
                date=date,
                time=time,
                score_home=score_home,
                score_away=score_away,
            )

            events = Event.objects.select_related(
                'sport_and_category',
                'venue',
                'home_team',
                'away_team',
            ).order_by('-date', '-time')[:100]

            event_list = []

            for event in events:
                sport_name = "Unknown"
                if event.sport_and_category:
                    if event.sport_and_category.id == 1:
                        sport_name = "Football"
                    elif event.sport_and_category.id == 2:
                        sport_name = "Basketball"

                event_data = {
                    'id': event.id,
                    'sport': sport_name,
                    'category': event.sport_and_category.category if event.sport_and_category else None,
                    'teamA': event.home_team.name if event.home_team else None,
                    'teamB': event.away_team.name if event.away_team else None,
                    'venue': event.venue.name if event.venue else None,
                    'date': event.date.strftime('%Y-%m-%d'),
                    'time': event.time.strftime('%H:%M'),
                    'imageUrl': event.venue.photo if event.venue else None,
                    'score_home': event.score_home,
                    'score_away': event.score_away,
                    'coordinates': {
                        'lat': event.venue.latitude if event.venue else None,
                        'lng': event.venue.longitude if event.venue else None,
                    }
                }
                event_list.append(event_data)

            return Response({'events': event_list}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
