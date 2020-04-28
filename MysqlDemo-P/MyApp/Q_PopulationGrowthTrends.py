
from MyApp.models import CountryPopulation, ContinentPopulation, WorldPopulation
import json

def getWorldPopulationNew():
    q1 = WorldPopulation.objects.all().values('year', 'population')
    nor = len(q1) # no of records
    wp = {'populationList':{}}
    population = list() # list having world population from 1950 to 2050. 101 values.
    
    for i in range(0,nor):
        population.append({
            'year': q1[i]['year'],
            'World': q1[i]['population']
        })

    wp['populationList'] = population
    #wp['area'] = area
    with open('worldData.json', 'w') as json_file:
        json.dump(wp, json_file)
    return wp

def getContinentPopulationsNew(continentName):
    print("Continent: ".format(continentName))
    cp = {'populationList':{}}

    q1 = ContinentPopulation.objects.filter(continent_name = continentName).values('year', 'population')
    nor1 = len(q1)
    population = list()
    for i in range(nor1):
        population.append({
            'year':q1[i]['year'],
            continentName:q1[i]['population']
        })
    cp['populationList'] = population

    with open('MultipleContinents.json', 'w') as json_file:
        json.dump(cp, json_file)
    return cp

def getCountryPopulationNew(countryName):
    cp = {'populationList':{}}
    q1 = CountryPopulation.objects.filter(country_name = countryName).values('year', 'population')
    nor1 = len(q1) # no of records
    population = list()
    for i in range(nor1):
       population.append({
            'year':q1[i]['year'],
            countryName:q1[i]['population']
        })
    cp['populationList'] = population

    with open('MultipleCountries.json', 'w') as json_file:
        json.dump(cp, json_file)
    return cp


def getChoroplethData():

    choroplethData = {}

    for yr in range(1950,2051):
        populationDict = {}
        q1 = CountryPopulation.objects.filter(year = yr)
        noc = len(q1)
        for i in range(noc):
            populationDict[q1[i].country_name] = q1[i].population
        populationDict['Antarctica'] = 0
        choroplethData[yr] = populationDict

    with open('worldDataChoropleth.json', 'w') as json_file:
        json.dump(choroplethData, json_file)
    return choroplethData