from django.shortcuts import render
from django.views.generic import View
from .models import Testimony, Member


class HomeView(View):
    def get(self, *args, **kwargs):
        context = {
            'testimonies': Testimony.objects.filter(approved=True),
            'members': Member.objects.all()
        }
        return render(self.request, 'index.html', context)


home_view = HomeView.as_view()


def terms(request):
    return render(request, 'pages/terms-conditions.html')


def privacy(request):
    return render(request, 'pages/privacy-policy.html')
