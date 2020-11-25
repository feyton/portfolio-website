from django import forms
from django.forms.models import ModelForm

from .models import AssistanceRequest


class AssistanceRequestForm(forms.ModelForm):

    class Meta:
        model = AssistanceRequest
        fields = ("name", "email", "phone", "message")
