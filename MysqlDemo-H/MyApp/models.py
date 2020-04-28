from django.db import models

# Create your models here.

class CountryPopulation(models.Model):
    continent_name = models.CharField(max_length=40)
    country_code = models.CharField(max_length=5)
    country_name = models.CharField(max_length=50)
    year = models.IntegerField()
    population = models.BigIntegerField()
    class Meta:
        db_table = 'country_population'

class ContinentPopulation(models.Model):
    continent_name = models.CharField(max_length=40)
    year = models.IntegerField()
    population = models.BigIntegerField()
    class Meta:
        db_table = 'continent_population'

class WorldPopulation(models.Model):
    year = models.IntegerField(primary_key=True)
    population = models.BigIntegerField()
    class Meta:
        db_table = 'world_population'
    # World population trend will be shown for the first time
    # x-axis  - time
    # y-axis - population count

class CountryAreaContinent(models.Model):
    country_code = models.CharField(max_length = 5)
    country_name = models.CharField(max_length = 50)
    country_area = models.BigIntegerField()
    continent_name = models.CharField(max_length=40)
    class Meta:
        db_table = 'country_area_continent'

class BirthDeathGrowthRates(models.Model):
    country_code = models.CharField(max_length=5)
    country_name = models.CharField(max_length = 50)
    year = models.IntegerField()
    crude_birth_rate = models.FloatField()  # births per 1000 population 
    crude_death_rate = models.FloatField()  # deaths per 1000 population
    net_migration = models.FloatField()     # number of migrants per 1000 population
    rate_natural_increase = models.FloatField()
    growth_rate = models.FloatField()
    class Meta:
        db_table = 'birth_death_growth_rates'

class AgeSpecificFertilityRates(models.Model):
    country_code = models.CharField(max_length=5)
    country_name = models.CharField(max_length = 50)
    year = models.IntegerField()
    fertility_rate_15_19 = models.FloatField()
    fertility_rate_20_24 = models.FloatField()
    fertility_rate_25_29 = models.FloatField()
    fertility_rate_30_34 = models.FloatField()
    fertility_rate_35_39 = models.FloatField()
    fertility_rate_40_44 = models.FloatField()
    fertility_rate_45_49 = models.FloatField()
    total_fertility_rate = models.FloatField()
    gross_reproduction_rate = models.FloatField()
    sex_ratio_at_birth = models.FloatField()
    class Meta:
        db_table = 'age_specific_fertility_rates'

class MidyearPopulation(models.Model):
    country_code = models.CharField(max_length=5)
    country_name = models.CharField(max_length = 50)
    year = models.IntegerField()
    midyear_population = models.BigIntegerField()
    class Meta:
        db_table = 'midyear_population'

class MortalityLifeExpectancy(models.Model):
    country_code = models.CharField(max_length = 5)
    country_name = models.CharField(max_length = 50)
    year = models.IntegerField()
    infant_mortality = models.FloatField()
    infant_mortality_male = models.FloatField()
    infant_mortality_female = models.FloatField()
    life_expectancy = models.FloatField()
    life_expectancy_male = models.FloatField()
    life_expectancy_female = models.FloatField()
    mortality_rate_under_5 = models.FloatField()
    mortality_rate_under_5_male = models.FloatField()
    mortality_rate_under_5_female = models.FloatField()
    mortality_rate_1_to_4 = models.FloatField()
    mortality_rate_1_to_4_male = models.FloatField()
    mortality_rate_1_to_4_female = models.FloatField()
    class Meta:
        db_table = 'mortality_life_expectancy'
    
    # User has to make a choice of country
    # Mortality rate under 5 as a stacked bar chart.

class MidyearPopulationAgeSexNew(models.Model):
    country_code = models.CharField(max_length=5)
    country_name = models.CharField(max_length = 50)
    year = models.IntegerField()
    sex = models.CharField(max_length=10)
    age = models.IntegerField()
    population = models.BigIntegerField()
    class Meta:
        db_table = 'midyear_population_age_sex_New'

class CountryGenderSimilarity(models.Model):
    country_name = models.CharField(max_length=40)
    year = models.IntegerField()
    distance = models.FloatField()
    class Meta:
        db_table = 'country_gender_similarity'
        
class CountryAgeSexRatio(models.Model):
    country_name = models.CharField(max_length = 50)
    year = models.IntegerField()
    age = models.IntegerField()
    ratio = models.FloatField()
    class Meta:
        db_table = 'country_age_sex_ratio'

class MidyearPopulationAgeSex(models.Model):
    country_code = models.CharField(max_length=5)
    country_name = models.CharField(max_length = 50)
    year = models.IntegerField()
    sex = models.CharField(max_length=10)
    max_age = models.IntegerField()
    population_0 = models.BigIntegerField()
    population_1 = models.BigIntegerField()
    population_2 = models.BigIntegerField()
    population_3 = models.BigIntegerField()
    population_4 = models.BigIntegerField()
    population_5 = models.BigIntegerField()
    population_6 = models.BigIntegerField()
    population_7 = models.BigIntegerField()
    population_8 = models.BigIntegerField()
    population_9 = models.BigIntegerField()
    population_10 = models.BigIntegerField()
    population_11 = models.BigIntegerField()
    population_12 = models.BigIntegerField()
    population_13 = models.BigIntegerField()
    population_14 = models.BigIntegerField()
    population_15 = models.BigIntegerField()
    population_16 = models.BigIntegerField()
    population_17 = models.BigIntegerField()
    population_18 = models.BigIntegerField()
    population_19 = models.BigIntegerField()
    population_20 = models.BigIntegerField()
    population_21 = models.BigIntegerField()
    population_22 = models.BigIntegerField()
    population_23 = models.BigIntegerField()
    population_24 = models.BigIntegerField()
    population_25 = models.BigIntegerField()
    population_26 = models.BigIntegerField()
    population_27 = models.BigIntegerField()
    population_28 = models.BigIntegerField()
    population_29 = models.BigIntegerField()
    population_30 = models.BigIntegerField()
    population_31 = models.BigIntegerField()
    population_32 = models.BigIntegerField()
    population_33 = models.BigIntegerField()
    population_34 = models.BigIntegerField()
    population_35 = models.BigIntegerField()
    population_36 = models.BigIntegerField()
    population_37 = models.BigIntegerField()
    population_38 = models.BigIntegerField()
    population_39 = models.BigIntegerField()
    population_40 = models.BigIntegerField()
    population_41 = models.BigIntegerField()
    population_42 = models.BigIntegerField()
    population_43 = models.BigIntegerField()
    population_44 = models.BigIntegerField()
    population_45 = models.BigIntegerField()
    population_46 = models.BigIntegerField()
    population_47 = models.BigIntegerField()
    population_48 = models.BigIntegerField()
    population_49 = models.BigIntegerField()
    population_50 = models.BigIntegerField()
    population_51 = models.BigIntegerField()
    population_52 = models.BigIntegerField()
    population_53 = models.BigIntegerField()
    population_54 = models.BigIntegerField()
    population_55 = models.BigIntegerField()
    population_56 = models.BigIntegerField()
    population_57 = models.BigIntegerField()
    population_58 = models.BigIntegerField()
    population_59 = models.BigIntegerField()
    population_60 = models.BigIntegerField()
    population_61 = models.BigIntegerField()
    population_62 = models.BigIntegerField()
    population_63 = models.BigIntegerField()
    population_64 = models.BigIntegerField()
    population_65 = models.BigIntegerField()
    population_66 = models.BigIntegerField()
    population_67 = models.BigIntegerField()
    population_68 = models.BigIntegerField()
    population_69 = models.BigIntegerField()
    population_70 = models.BigIntegerField()
    population_71 = models.BigIntegerField()
    population_72 = models.BigIntegerField()
    population_73 = models.BigIntegerField()
    population_74 = models.BigIntegerField()
    population_75 = models.BigIntegerField()
    population_76 = models.BigIntegerField()
    population_77 = models.BigIntegerField()
    population_78 = models.BigIntegerField()
    population_79 = models.BigIntegerField()
    population_80 = models.BigIntegerField()
    population_81 = models.BigIntegerField()
    population_82 = models.BigIntegerField()
    population_83 = models.BigIntegerField()
    population_84 = models.BigIntegerField()
    population_85 = models.BigIntegerField()
    population_86 = models.BigIntegerField()
    population_87 = models.BigIntegerField()
    population_88 = models.BigIntegerField()
    population_89 = models.BigIntegerField()
    population_90 = models.BigIntegerField()
    population_91 = models.BigIntegerField()
    population_92 = models.BigIntegerField()
    population_93 = models.BigIntegerField()
    population_94 = models.BigIntegerField()
    population_95 = models.BigIntegerField()
    population_96 = models.BigIntegerField()
    population_97 = models.BigIntegerField()
    population_98 = models.BigIntegerField()
    population_99 = models.BigIntegerField()
    population_100 = models.BigIntegerField()

    class Meta:
        db_table = 'midyear_population_age_sex'


