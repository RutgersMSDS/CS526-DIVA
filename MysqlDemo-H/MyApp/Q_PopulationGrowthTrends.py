
from MyApp.models import CountryPopulation, ContinentPopulation, WorldPopulation, CountryAreaContinent
import json

def getWorldPopulation():
    q1 = WorldPopulation.objects.all()
    nor = len(q1) # no of records
    wp = dict()
    population = list() # list having world population from 1950 to 2050. 101 values.
    
    for i in range(0,nor):
        population.append({
            'year':q1[i].year,
            'population':q1[i].population
        })
    
    q2 = CountryAreaContinent.objects.all()
    noc = len(q2) # no of countries
    temp = {
        'Africa':0,
        'Asia':0,
        'Europe':0,
        'North America':0,
        'Oceania':0,
        'South America':0
    }
    for i in range(0,noc):
        continentName = q2[i].continent_name
        countryArea = q2[i].country_area
        temp[continentName] = temp[continentName] + countryArea

    area = list()
    area.append({'name':'Africa','area':temp['Africa']})
    area.append({'name':'Asia','area':temp['Asia']})
    area.append({'name':'Europe','area':temp['Europe']})
    area.append({'name':'North America','area':temp['North America']})
    area.append({'name':'Oceania','area':temp['Oceania']})
    area.append({'name':'South America','area':temp['South America']})

    wp['population'] = population
    wp['area'] = area
    #with open('worldData.json', 'w') as json_file:
    #    json.dump(wp, json_file)
    return wp

def getWorldPopulationNew():
    q1 = WorldPopulation.objects.all()
    nor = len(q1) # no of records
    wp = {'populationList':{}}
    population = list() # list having world population from 1950 to 2050. 101 values.
    
    for i in range(0,nor):
        population.append({
            'year':q1[i].year,
            'population':q1[i].population
        })
    
    """q2 = CountryAreaContinent.objects.all()
    noc = len(q2) # no of countries
    temp = {
        'Africa':0,
        'Asia':0,
        'Europe':0,
        'North America':0,
        'Oceania':0,
        'South America':0
    }
    for i in range(0,noc):
        continentName = q2[i].continent_name
        countryArea = q2[i].country_area
        temp[continentName] = temp[continentName] + countryArea

    area = list()
    area.append({'name':'Africa','area':temp['Africa']})
    area.append({'name':'Asia','area':temp['Asia']})
    area.append({'name':'Europe','area':temp['Europe']})
    area.append({'name':'North America','area':temp['North America']})
    area.append({'name':'Oceania','area':temp['Oceania']})
    area.append({'name':'South America','area':temp['South America']})"""

    wp['populationList']["world"] = population
    #wp['area'] = area
    with open('worldData.json', 'w') as json_file:
        json.dump(wp, json_file)
    return wp

"""def getContinentPopulations(cn):
    q = ContinentPopulation.objects.filter(continent_name=cn)
    nor = len(q) # no of records

    cp = dict()
    population = list()


    temp = {
        'Asia':0,
        'Europe':0,
        'North America':0,
        'Africa':0,
        'Oceania':0,
        'South America':0
    }    

    cp = list()
    for i in range(0,101):
        cp.append(temp)
    return cp"""

"""def getContinentPopulationsNew(cn):
    q1 = ContinentPopulation.objects.filter(continent_name = cn)
    nor1 = len(q1) # no of records
    cp = dict()
    population = list()

    for i in range(nor1):
        population.append({
            'year':q1[i].year,
            'population':q1[i].population,
        })
    
    q2 = CountryAreaContinent.objects.filter(continent_name=cn)
    noc = len(q2) # no of countries
    area = list()
    for i in range(noc):
        area.append({
            'name':q2[i].country_name,
            'area':q2[i].country_area
        })

    cp['population'] = population
    cp['area'] = area

    #with open('OceaniaData.json', 'w') as json_file:
    #    json.dump(cp, json_file)

    return cp"""

def getContinentPopulationsNew(cn):
    print("Continents are {0}".format(cn[0]))
    no_of_continents = len(cn)
    print(no_of_continents)
    cp = {'populationList':{}}
    for i in range(no_of_continents):
        continentName = cn[i]
        q1 = ContinentPopulation.objects.filter(continent_name = continentName)
        nor1 = len(q1) # no of records
        population = list()
        for i in range(nor1):
            population.append({
                'year':q1[i].year,
                'population':q1[i].population,
            })
        cp['populationList'][continentName] = population
    
    with open('MultipleContinents.json', 'w') as json_file:
        json.dump(cp, json_file)
    return cp
    
    
    """q2 = CountryAreaContinent.objects.filter(continent_name=cn)
    noc = len(q2) # no of countries
    area = list()
    for i in range(noc):
        area.append({
            'name':q2[i].country_name,
            'area':q2[i].country_area
        })

    cp['population'] = population
    cp['area'] = area

    #with open('OceaniaData.json', 'w') as json_file:
    #    json.dump(cp, json_file)

    return cp"""



def getCountryPopulation(cn):
    q1 = CountryPopulation.objects.filter(country_name = cn)
    nor = len(q1)
    cp = dict()
    population = list()

    for i in range(nor):
        population.append({
            'year':q1[i].year,
            'population':q1[i].population
        })
 
    cp['population'] = population

    #with open('FranceData.json', 'w') as json_file:
    #    json.dump(cp, json_file)

    return cp


def getCountryPopulationNew(cn):
    print("Countries are {0}".format(cn[0]))
    no_of_countries = len(cn)
    print(no_of_countries)
    cp = {'populationList':{}}
    for i in range(no_of_countries):
        countryName = cn[i]
        q1 = CountryPopulation.objects.filter(country_name = countryName)
        nor1 = len(q1) # no of records
        population = list()
        for i in range(nor1):
            population.append({
                'year':q1[i].year,
                'population':q1[i].population,
            })
        cp['populationList'][countryName] = population
    
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
    
    return choroplethData