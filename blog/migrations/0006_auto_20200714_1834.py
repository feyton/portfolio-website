# Generated by Django 3.0.2 on 2020-07-14 16:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0005_category_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='thumbnail',
            field=models.ImageField(blank=True, default='/blog/default.jpg', null=True, upload_to='blog'),
        ),
    ]
