# Generated by Django 4.2 on 2024-02-12 11:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('condominiums', '0023_remove_privnotices_image_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='privnotices',
            old_name='apartment_resipient',
            new_name='apartment_recipient',
        ),
    ]
