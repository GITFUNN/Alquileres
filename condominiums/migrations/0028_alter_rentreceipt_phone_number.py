# Generated by Django 4.2 on 2024-02-13 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('condominiums', '0027_rentreceipt_timestamp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rentreceipt',
            name='phone_number',
            field=models.CharField(blank=True, default=None, max_length=255, null=True),
        ),
    ]