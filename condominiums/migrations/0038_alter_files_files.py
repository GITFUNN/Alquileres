# Generated by Django 4.2.4 on 2024-05-04 14:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('condominiums', '0037_alter_files_title_alter_privimages_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='files',
            name='files',
            field=models.FileField(default=None, upload_to='documents/'),
        ),
    ]
