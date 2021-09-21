# Generated by Django 3.0.2 on 2020-07-17 08:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0002_auto_20200715_1511'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='avatar',
            field=models.ImageField(blank=True, default='avatar.jpg', null=True, upload_to='team/'),
        ),
        migrations.AddField(
            model_name='testimony',
            name='role',
            field=models.CharField(blank=True, default='Developer', max_length=50, null=True),
        ),
    ]