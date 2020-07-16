from django.db import models
from .utils import code_generator


class AssistanceRequest(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(blank=False, null=False, unique=False)
    phone = models.CharField(max_length=15, blank=True, null=True)
    assisted = models.BooleanField(default=False)
    ticket_id = models.CharField(
        blank=False, null=False, unique=True, primary_key=False, max_length=255)

    def __str__(self):
        return "%s - %s" % (self.name, self.ticket_id)

    def save(self, *args, **kwargs):
        if not self.ticket_id:
            self.ticket_id = 'TKT-%s' % code_generator()

        super().save(*args, **kwargs)


class Testimony(models.Model):
    author = models.CharField(max_length=200, blank=False, null=False)
    avatar = models.ImageField(
        upload_to='testimony/', blank=True, null=True, default='testimony/avatar.jpg')
    message = models.TextField(blank=False, null=False)
    approved = models.BooleanField(default=True)

    def __str__(self):
        return self.author


class Member(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
