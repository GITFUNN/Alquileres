# Generated by Django 4.2 on 2023-09-26 15:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Condominium',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condominium_name', models.CharField(max_length=30)),
                ('condominium_location', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='GroupNotices',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('message', models.TextField(blank=True, max_length=400)),
                ('image', models.ImageField(blank=True, default=None, null=True, upload_to='media')),
            ],
        ),
        migrations.CreateModel(
            name='PrivNotices',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('message', models.TextField(blank=True, max_length=400)),
                ('image', models.ImageField(blank=True, default=None, null=True, upload_to='media')),
            ],
        ),
    ]
