from django.urls import path

from . import views as user_views

urlpatterns = [
    path("profile", user_views.ProfileView, name="profile_view")
]
