# Generated by Django 4.2 on 2024-02-13 10:31

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('condominiums', '0026_alter_privnotices_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='rentreceipt',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]