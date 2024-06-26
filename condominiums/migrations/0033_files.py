# Generated by Django 4.2.4 on 2024-05-02 12:26

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('condominiums', '0032_rename_expiry_date_rentreceipt_expire_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='Files',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('files', models.FileField(default=None, upload_to='documents/', validators=[django.core.validators.FileExtensionValidator(['pdf', 'docx', 'odt', 'rtf', 'txt', 'epub', 'xls', 'xlsx', 'doc', 'csv', 'ppt', 'pptx'])])),
                ('title', models.CharField(max_length=30)),
            ],
        ),
    ]
