# Generated by Django 3.0.3 on 2020-03-19 13:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MyApp', '0023_delete_birthdeathgrowthrates'),
    ]

    operations = [
        migrations.CreateModel(
            name='BirthDeathGrowthRates',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country_code', models.CharField(max_length=5)),
                ('country_name', models.CharField(max_length=50)),
                ('year', models.IntegerField()),
                ('crude_birth_rate', models.FloatField()),
                ('crude_death_rate', models.FloatField()),
                ('net_migration', models.FloatField()),
                ('rate_natural_increase', models.FloatField()),
                ('growth_rate', models.FloatField()),
            ],
            options={
                'db_table': 'birth_death_growth_rates',
            },
        ),
    ]
