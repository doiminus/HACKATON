from django.urls import path
from .views import *


urlpatterns = [
    path('register', RegisterView.as_view()),
    path('me', RetrieveUserView.as_view()),
    path('me/certs', RetrieveUserViewCert.as_view()),
    path('photo', AddPhoto.as_view()),
    path('user/password-reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('user/password-reset-execute/', PasswordResetExecuteView.as_view(), name='password_reset_execute'),
    path('events/latest/', LatestEventsLightView.as_view(), name='latest-100-events'),
    path('events/create/', CreateEventView.as_view(), name='create-event'),
    path('event/<int:event_id>/', LatestEventView.as_view(), name='event-detail'),
    path('organization/my/', UserOrganizationView.as_view(), name='user-organization'),
    path('organizations/sports/<int:org_id>/', SportCategoriesByOrganizationView.as_view(), name='organization-sport-categories'),
    path('organizations/venues/<int:org_id>/', VenuesByOrganizationView.as_view(), name='organization-venues'),
    path('teams/by-sport/', TeamsBySportAndCategoryBodyView.as_view(), name='teams-by-sport'),
]
