# Generated by Django 4.2 on 2023-09-26 22:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('condominiums', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='groupnotices',
            name='condominium',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='group_notices', to='condominiums.condominium'),
        ),
    ]
