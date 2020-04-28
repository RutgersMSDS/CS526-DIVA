from MyApp.models import MortalityLifeExpectancy, ContinentPopulation, WorldPopulation
import json

def getWorldMortality():
    q1 = WorldPopulation.objects\
        .all()\
        .values('year', 'mortality_rate_under_5', 'mortality_rate_under_5_male', 'mortality_rate_under_5_female')

    nor = len(q1)  # no of records
    wp = {'mortality': {}}
    population = list()  # list having world population from 1950 to 2050. 101 values.

    for i in range(0, nor):
        population.append({
            'year': q1[i].year,
            'mortality_rate_under_5': q1[i]['mortality_rate_under_5'],
            'mortality_rate_under_5_male': q1[i]['mortality_rate_under_5_male'],
            'mortality_rate_under_5_female': q1[i]['mortality_rate_under_5_female'],
        })

    wp['mortality'] = population
    with open('MortalityWorld.json', 'w') as json_file:
        json.dump(wp, json_file)
    return wp


def getContinentMortality(continentName):
    print("Continent: ".format(continentName))
    cp = {'mortality': {}}

    q1 = ContinentPopulation.objects\
        .filter(continent_name=continentName) \
        .values('year', 'mortality_rate_under_5', 'mortality_rate_under_5_male', 'mortality_rate_under_5_female')

    nor1 = len(q1)
    population = list()
    for i in range(nor1):
        population.append({
            'year': q1[i].year,
            'mortality_rate_under_5': q1[i]['mortality_rate_under_5'],
            'mortality_rate_under_5_male': q1[i]['mortality_rate_under_5_male'],
            'mortality_rate_under_5_female': q1[i]['mortality_rate_under_5_female'],
        })
    cp['mortality'] = population

    with open('MortalityContinent.json', 'w') as json_file:
        json.dump(cp, json_file)
    return cp


def getCountryMortality(countryName):
    cp = {'mortality': {}}
    q1 = MortalityLifeExpectancy.objects\
        .filter(country_name=countryName) \
        .values('year', 'mortality_rate_under_5', 'mortality_rate_under_5_male', 'mortality_rate_under_5_female')

    nor1 = len(q1)  # no of records
    population = list()
    for i in range(nor1):
        population.append({
            'year': q1[i].year,
            'mortality_rate_under_5': q1[i]['mortality_rate_under_5'],
            'mortality_rate_under_5_male': q1[i]['mortality_rate_under_5_male'],
            'mortality_rate_under_5_female': q1[i]['mortality_rate_under_5_female'],
        })

    with open('MortalityCountry.json', 'w') as json_file:
        json.dump(cp, json_file)

    cp['mortality'] = population
    return cp


def getWorldLifeExpectancy():
    q1 = WorldPopulation.objects\
        .all()\
        .values('year', 'infant_mortality', 'infant_mortality_male', 'infant_mortality_female', 'life_expectancy',
                'life_expectancy_male', 'life_expectancy_female')

    nor = len(q1)  # no of records
    wp = {'mortality': {}}
    population = list()  # list having world population from 1950 to 2050. 101 values.

    for i in range(0, nor):
        population.append({
            'year': q1[i].year,
            'infant_mortality': q1[i]['infant_mortality'],
            'infant_mortality_male': q1[i]['infant_mortality_male'],
            'infant_mortality_female': q1[i]['infant_mortality_female'],
            'life_expectancy': q1[i]['life_expectancy'],
            'life_expectancy_male': q1[i]['life_expectancy_male'],
            'life_expectancy_female': q1[i]['life_expectancy_female'],
        })

    wp['mortality'] = population
    with open('MortalityWorld.json', 'w') as json_file:
        json.dump(wp, json_file)
    return wp


def getContinentLifeExpectancy(continentName):
    print("Continent: ".format(continentName))
    cp = {'mortality': {}}

    q1 = ContinentPopulation.objects\
        .filter(continent_name=continentName) \
        .values('year', 'infant_mortality', 'infant_mortality_male', 'infant_mortality_female', 'life_expectancy',
                'life_expectancy_male', 'life_expectancy_female')

    nor1 = len(q1)
    population = list()
    for i in range(nor1):
        population.append({
            'year': q1[i].year,
            'infant_mortality': q1[i]['infant_mortality'],
            'infant_mortality_male': q1[i]['infant_mortality_male'],
            'infant_mortality_female': q1[i]['infant_mortality_female'],
            'life_expectancy': q1[i]['life_expectancy'],
            'life_expectancy_male': q1[i]['life_expectancy_male'],
            'life_expectancy_female': q1[i]['life_expectancy_female'],
        })
    cp['mortality'] = population

    with open('MortalityContinent.json', 'w') as json_file:
        json.dump(cp, json_file)
    return cp


def getCountryLifeExpectancy(countryName):
    cp = {'mortality': {}}
    q1 = MortalityLifeExpectancy.objects\
        .filter(country_name=countryName) \
        .values('year', 'infant_mortality', 'infant_mortality_male', 'infant_mortality_female', 'life_expectancy',
                'life_expectancy_male', 'life_expectancy_female')

    nor1 = len(q1)  # no of records
    population = list()
    for i in range(nor1):
        population.append({
            'year': q1[i].year,
            'infant_mortality': q1[i]['infant_mortality'],
            'infant_mortality_male': q1[i]['infant_mortality_male'],
            'infant_mortality_female': q1[i]['infant_mortality_female'],
            'life_expectancy': q1[i]['life_expectancy'],
            'life_expectancy_male': q1[i]['life_expectancy_male'],
            'life_expectancy_female': q1[i]['life_expectancy_female'],
        })

    with open('MortalityCountry.json', 'w') as json_file:
        json.dump(cp, json_file)

    cp['mortality'] = population
    return cp


def getChoroplethDataForInfantMortality():

    choroplethData = {}
    categories = [
        'country_name', 'mortality_rate_under_5', 'mortality_rate_under_5_male', 'mortality_rate_under_5_female']

    for yr in range(1950, 2051):
        populationDict = {}
        categoriesDict = {'mortality_rate_under_5_male': 0, 'mortality_rate_under_5_female': 0}

        q1 = MortalityLifeExpectancy.objects.filter(year=yr)\
            .values('year', 'country_name', 'mortality_rate_under_5_male', 'mortality_rate_under_5_female')

        noc = len(q1)
        for i in range(noc):
            maxValueKey = 'mortality_rate_under_5_male' if (q1[i]['mortality_rate_under_5_male'] >
                                                            q1[i]['mortality_rate_under_5_female']) \
                else 'mortality_rate_under_5_female'

            categoriesDict[maxValueKey] = categoriesDict[maxValueKey] + 1
            populationDict[q1[i].country_name] = maxValueKey

        populationDict['Antarctica'] = 0
        populationDict['legend'] = categoriesDict

        choroplethData[yr] = populationDict

    with open('worldDataChoropleth.json', 'w') as json_file:
        json.dump(choroplethData, json_file)
    return choroplethData