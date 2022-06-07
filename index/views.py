from django.contrib import messages
from django.shortcuts import render
from django.views.generic import View

from blog.models import Category, Post

from .forms import AssistanceRequestForm
from .models import Member, Testimony


class HomeView(View):
    def get(self, *args, **kwargs):
        form = AssistanceRequestForm()
        context = {
            'testimonies': Testimony.objects.filter(approved=True),
            'members': Member.objects.all(),
            'form': form,
            'posts': Post.objects.filter(published=True).order_by('-published_date'),
            'categories': Category.objects.all(),
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


def about(request):
    return render(request, "pages/about.html")


def work(request):
    return render(request, "pages/work.html")


def dashboard(request):
    return render(request, "dashboard/index.html")
