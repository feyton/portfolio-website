from django.urls import path

from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('terms/', views.terms, name='terms'),
    path('privacy/', views.privacy, name='privacy'),
    path('about/', views.about, name='about'),
    path('work/', views.work, name='work'),
    path('dashboard/', views.dashboard, name='dashboard'),
]
