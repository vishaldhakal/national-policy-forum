# Generated by Django 4.2.13 on 2024-06-05 09:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0007_publication'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='slug',
            field=models.SlugField(blank=True, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='publication',
            name='slug',
            field=models.SlugField(blank=True, null=True, unique=True),
        ),
    ]