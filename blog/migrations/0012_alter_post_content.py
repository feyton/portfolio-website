# Generated by Django 5.0.4 on 2024-04-15 18:42

import django_ckeditor_5.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0011_alter_category_id_alter_comment_id_alter_post_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='content',
            field=django_ckeditor_5.fields.CKEditor5Field(blank=True, null=True, verbose_name='Text'),
        ),
    ]
