# Generated by Django 2.2.4 on 2019-09-16 14:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comment', '0003_auto_20190916_0431'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='time_stamp',
        ),
    ]
