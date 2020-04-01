# Generated by Django 3.0.3 on 2020-03-12 18:59

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('MyApp', '0006_delete_midyear_population'),
    ]

    operations = [
        migrations.CreateModel(
            name='midyear_population',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('continent_name', models.CharField(default='xyz', max_length=40)),
                ('country_code', models.CharField(max_length=5)),
                ('country_name', models.CharField(max_length=50)),
                ('year', models.IntegerField()),
                ('midyear_population', models.BigIntegerField()),
            ],
        ),
    ]
