# Generated by Django 2.2.7 on 2019-11-25 15:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('skyfall_app', '0002_auto_20191125_1022'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lastupdate',
            name='date',
            field=models.DateField(default='1900-01-01'),
        ),
    ]
