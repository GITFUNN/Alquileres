# Generated by Django 4.2 on 2023-10-04 20:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('condominiums', '0009_apartment'),
        ('users', '0009_auto_20231004_1659'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='apartment',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_DEFAULT, to='condominiums.apartment'),
        ),
    ]
