
from MyApp.models import CountryPopulation, ContinentPopulation, WorldPopulation

def getWorldPopulation():
    q = WorldPopulation.objects.all()
    noc = len(q) # no of countries
    wp = list() # list having world population from 1950 to 2050. 101 values.
    
    for i in range(0,101):
        wp.append({
            'x':q[i].year,
            'y':q[i].population
        })
    return wp

def getContinentPopulations():
    q = ContinentPopulation.objects.all()
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
    return cp



def getCountryPopulation(country_name, year):
    q = CountryPopulation.objects.all()
    i=0
    while i<len(q):
        n = q[i].country_name
        y = q[i].year
        if country_name==n and year==y:
            return q[i].midyear_population
        i = i+1

def 