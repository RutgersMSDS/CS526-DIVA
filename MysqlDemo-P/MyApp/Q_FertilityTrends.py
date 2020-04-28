from MyApp.models import MortalityLifeExpectancy, AgeSpecificFertilityRates, ContinentPopulation, WorldPopulation
import json

def getWorldFertility():
    q1 = WorldPopulation.objects\
        .all()\
        .values('year', 'fertility_rate_15_19', 'fertility_rate_20_24', 'fertility_rate_25_29',
                'fertility_rate_30_34', 'fertility_rate_35_39', 'fertility_rate_40_44', 'fertility_rate_45_49',
                'total_fertility_rate', 'gross_reproduction_rate', 'mortality_rate_under_5',
                'mortality_rate_under_5_male', 'mortality_rate_under_5_female')

    nor = len(q1)  # no of records
    wp = {'fertilityList': {}}
    population = list()  # list having world population from 1950 to 2050. 101 values.

    for i in range(0, nor):
        population.append({
            'year': q1[i]['year'],
            '15-19': q1[i]['fertility_rate_15_19'],
            '20-24': q1[i]['fertility_rate_20_24'],
            '25-29': q1[i]['fertility_rate_25_29'],
            '30-34': q1[i]['fertility_rate_30_34'],
            '35-39': q1[i]['fertility_rate_35_39'],
            '40-44': q1[i]['fertility_rate_40_44'],
            '45-49': q1[i]['fertility_rate_45_49'],
            'World': q1[i]['total_fertility_rate'],
            'Place': 'World',
            'Gross Reproduction Rate': q1[i]['gross_reproduction_rate'],
            'Mortality Rate under 5': q1[i]['mortality_rate_under_5'],
            'Mortality Rate under 5 male': q1[i]['mortality_rate_under_5_male'],
            'Mortality Rate under 5 female': q1[i]['mortality_rate_under_5_female']
        })

    wp['fertilityList'] = population
    with open('FertilityWorld.json', 'w') as json_file:
        json.dump(wp, json_file)
    return wp


def getContinentFertility(continentName):
    print("Continent: ".format(continentName))
    cp = {'fertilityList': {}}

    q1 = ContinentPopulation.objects\
        .filter(continent_name=continentName) \
        .values('year', 'fertility_rate_15_19', 'fertility_rate_20_24', 'fertility_rate_25_29',
                'fertility_rate_30_34', 'fertility_rate_35_39', 'fertility_rate_40_44', 'fertility_rate_45_49',
                'total_fertility_rate', 'gross_reproduction_rate', 'mortality_rate_under_5',
                'mortality_rate_under_5_male', 'mortality_rate_under_5_female')

    nor1 = len(q1)
    population = list()
    for i in range(nor1):
        population.append({
            'year': q1[i]['year'],
            '15-19': q1[i]['fertility_rate_15_19'],
            '20-24': q1[i]['fertility_rate_20_24'],
            '25-29': q1[i]['fertility_rate_25_29'],
            '30-34': q1[i]['fertility_rate_30_34'],
            '35-39': q1[i]['fertility_rate_35_39'],
            '40-44': q1[i]['fertility_rate_40_44'],
            '45-49': q1[i]['fertility_rate_45_49'],
            continentName: q1[i]['total_fertility_rate'],
            'Place': continentName,
            'Gross Reproduction Rate': q1[i]['gross_reproduction_rate'],
            'Mortality Rate under 5': q1[i]['mortality_rate_under_5'],
            'Mortality Rate under 5 male': q1[i]['mortality_rate_under_5_male'],
            'Mortality Rate under 5 female': q1[i]['mortality_rate_under_5_female']
        })
    cp['fertilityList'] = population

    with open('FertilityContinent.json', 'w') as json_file:
        json.dump(cp, json_file)

    return cp


def getCountryFertility(countryName):
    cp = {'fertilityList': {}}
    q1 = AgeSpecificFertilityRates.objects\
        .filter(country_name=countryName) \
        .values('year', 'fertility_rate_15_19', 'fertility_rate_20_24', 'fertility_rate_25_29',
                'fertility_rate_30_34', 'fertility_rate_35_39', 'fertility_rate_40_44', 'fertility_rate_45_49',
                'total_fertility_rate', 'gross_reproduction_rate')

    q2 = MortalityLifeExpectancy.objects\
        .filter(country_name=countryName)\
        .values('year', 'mortality_rate_under_5', 'mortality_rate_under_5_male', 'mortality_rate_under_5_female')

    nor1 = len(q1)  # no of records
    nor2 = len(q2)  # no of records
    population = list()

    for i in range(nor1):
        record = {
            'year': q1[i]['year'],
            '15-19': q1[i]['fertility_rate_15_19'],
            '20-24': q1[i]['fertility_rate_20_24'],
            '25-29': q1[i]['fertility_rate_25_29'],
            '30-34': q1[i]['fertility_rate_30_34'],
            '35-39': q1[i]['fertility_rate_35_39'],
            '40-44': q1[i]['fertility_rate_40_44'],
            '45-49': q1[i]['fertility_rate_45_49'],
            countryName: q1[i]['total_fertility_rate'],
            'Place': countryName,
            'Gross Reproduction Rate': q1[i]['gross_reproduction_rate'],
        }
        for j in range(nor2):
            if q2[j]['year'] == record['year']:
                record['Mortality Rate under 5']: q1[i]['mortality_rate_under_5']
                record['Mortality Rate under 5 male']: q1[i]['mortality_rate_under_5_male']
                record['Mortality Rate under 5 female']: q1[i]['mortality_rate_under_5_female']
                break

        population.append(record)

    cp['fertilityList'] = population
    with open('FertilityCountry.json', 'w') as json_file:
        json.dump(cp, json_file)

    return cp

def getChoroplethDataForFertility():

    choroplethData = {}
    categories = [
        'fertility_rate_15_19', 'fertility_rate_20_24', 'fertility_rate_25_29', 'fertility_rate_30_34',
        'fertility_rate_35_39', 'fertility_rate_40_44', 'fertility_rate_45_49']

    for yr in range(1950,2051):
        populationDict = {}
        categoriesDict = {'fertility_rate_15_19': 0, 'fertility_rate_20_24': 0, 'fertility_rate_25_29': 0,
                          'fertility_rate_30_34': 0, 'fertility_rate_35_39': 0, 'fertility_rate_40_44': 0,
                          'fertility_rate_45_49': 0}

        q1 = AgeSpecificFertilityRates.objects.filter(year = yr)\
            .values('year', 'country_name','fertility_rate_15_19', 'fertility_rate_20_24', 'fertility_rate_25_29',
                    'fertility_rate_30_34', 'fertility_rate_35_39', 'fertility_rate_40_44', 'fertility_rate_45_49')

        noc = len(q1)
        for i in range(noc):

            maxValueKey = max(categories, key=lambda k: q1[i][k] if k in categories else -1)
            categoriesDict[maxValueKey] = categoriesDict[maxValueKey] + 1

            populationDict[q1[i]['country_name']] = maxValueKey

        populationDict['Antarctica'] = 0
        populationDict['legend'] = categoriesDict

        choroplethData[yr] = populationDict

    with open('worldDataChoropleth.json', 'w') as json_file:
        json.dump(choroplethData, json_file)
    return choroplethData