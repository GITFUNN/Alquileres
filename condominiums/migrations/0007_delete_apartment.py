# Generated by Django 4.2 on 2023-10-04 19:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('condominiums', '0006_remove_apartment_condominium'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Apartment',
        ),
    ]