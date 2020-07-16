from django.urls import path

from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('terms/', views.terms, name='terms'),
    path('privacy/', views.privacy, name='privacy')
]
