# Generated by Django 4.2 on 2024-01-12 15:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('condominiums', '0019_alter_joiningrequest_timestamp'),
    ]

    operations = [
        migrations.RenameField(
            model_name='joiningrequest',
            old_name='timestamp',
            new_name='created_on',
        ),
    ]