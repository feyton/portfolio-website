
from django.shortcuts import render


def ProfileView(request):
    return render(request, "pages/profile.html")
