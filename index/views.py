from django.contrib import messages
from django.shortcuts import render
from django.views.generic import View

from .forms import AssistanceRequestForm
from .models import Member, Testimony


class HomeView(View):
    def get(self, *args, **kwargs):
        form = AssistanceRequestForm()
        context = {
            'testimonies': Testimony.objects.filter(approved=True),
            'members': Member.objects.all(),
            'form': form
        }
        return render(self.request, 'index.html', context)

    def post(self, *args, **kwargs):
        form = AssistanceRequestForm(self.request.POST or None)
        if form.is_valid():
            form.save()
            messages.success(self.request, "Your ticket has been logged")
        context = {
            'testimonies': Testimony.objects.filter(approved=True),
            'members': Member.objects.all(),
            'form': form
        }
        return render(self.request, 'index.html', context)


home_view = HomeView.as_view()


def terms(request):
    return render(request, 'pages/terms-conditions.html')


def privacy(request):
    return render(request, 'pages/privacy-policy.html')
