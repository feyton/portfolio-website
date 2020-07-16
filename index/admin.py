from django.contrib import admin
from .models import Testimony, AssistanceRequest, Member

admin.site.register(Testimony)
admin.site.register(AssistanceRequest)
admin.site.register(Member)
