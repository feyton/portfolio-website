# Generated by Django 3.0.4 on 2020-11-25 19:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0003_auto_20200717_1018'),
    ]

    operations = [
        migrations.AddField(
            model_name='assistancerequest',
            name='message',
            field=models.TextField(default='message'),
            preserve_default=False,
        ),
    ]
