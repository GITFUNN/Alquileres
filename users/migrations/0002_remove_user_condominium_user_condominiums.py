# Generated by Django 4.2 on 2023-09-26 22:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('condominiums', '0003_alter_groupnotices_condominium'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='condominium',
        ),
        migrations.AddField(
            model_name='user',
            name='condominiums',
            field=models.ManyToManyField(to='condominiums.condominium'),
        ),
    ]
