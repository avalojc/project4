# Generated by Django 2.2.7 on 2019-11-25 16:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('skyfall_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cesbody',
            name='description',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='cesbody',
            name='name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='cesbody',
            name='velocity',
            field=models.CharField(max_length=100),
        ),
    ]
