# Generated by Django 3.0.2 on 2020-07-19 14:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0009_searchterms'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='visits',
            field=models.PositiveIntegerField(default=1),
        ),
    ]
