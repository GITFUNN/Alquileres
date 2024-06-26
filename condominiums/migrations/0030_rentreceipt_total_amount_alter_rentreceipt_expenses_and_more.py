# Generated by Django 4.2.4 on 2024-04-26 20:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('condominiums', '0029_alter_privnotices_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='rentreceipt',
            name='total_amount',
            field=models.DecimalField(decimal_places=3, default=None, max_digits=20),
        ),
        migrations.AlterField(
            model_name='rentreceipt',
            name='expenses',
            field=models.DecimalField(decimal_places=3, max_digits=20),
        ),
        migrations.AlterField(
            model_name='rentreceipt',
            name='net_amount',
            field=models.DecimalField(decimal_places=3, max_digits=20),
        ),
    ]
