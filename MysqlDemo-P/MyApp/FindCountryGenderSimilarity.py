
from  MyApp.models import MidyearPopulationAgeSexNew as mpas
from MyApp.models import CountryAgeSexRatio as casr
from MyApp.models import CountryGenderSimilarity as cgs
from MyApp.models import CountryAreaContinent as cac

def getWorldAgeSexRatio(yr , ag):
    result = casr.objects.filter(year=yr, age=ag)
    ageSexRatios = {}
    nor = len(result)
    for i in range(nor):
        cn = result[i].country_name
        rt = result[i].ratio
        ageSexRatios[cn] = rt
    return ageSexRatios

def findSexRatio():
    countryData = cac.objects.all()
    noc = len(countryData)
    countryList = []
    for i in range(noc):
        countryList.append(countryData[i].country_name)
    print(countryList)
    countryList = countryList[185:]
    #countryList = ['Sudan']
    countryNumber=185
    for country in countryList:
        print(countryNumber)
        countryNumber = countryNumber + 1
        for yr in range(1991,2051):
            print("{0} {1}".format(country,yr))
            for ag in range(0,101):
                maleData = mpas.objects.filter(country_name=country, year=yr, sex='Male', age=ag)
                femaleData = mpas.objects.filter(country_name=country, year=yr, sex='Female', age=ag)
                if(len(maleData)==0):
                    continue
                if femaleData[0].population == 0 or maleData[0].population==0:
                    continue

                rt = (maleData[0].population/femaleData[0].population)*100
                record = CountryAgeSexRatio(country_name = country, year = yr, age = ag, ratio = rt)
                #record.save()
    
   # maleData = mpas.objects.filter(country_name=cn, year=yr, sex='Male', age=ag)
   # femaleData = mpas.objects.filter(country_name=cn, year=yr, sex='Female', age=ag)
   # rt = (maleData[0].population/femaleData[0].population)*100
   # record = CountryAgeSexRatio(country_name = cn, year = yr, age = ag, ratio = rt)
   # record.save()
   # return rt

def findSimilarity(cn, yr):
    maleData = mpas.objects.filter(country_name=cn, year=yr, sex='Male')
    femaleData = mpas.objects.filter(country_name=cn, year=yr, sex='Female')
    #maleData = np.array(maleData)
    #femaleData = np.array(femaleData)
    
    norm = len(maleData)
    norf = len(femaleData)
    print(norm)
    print(norf)
    diff = []

    malePopulation = []
    femalePopulation = []

    for i in range(norm):
        malePopulation.append(maleData[i].population)

    for i in range(norf):
        femalePopulation.append(femaleData[i].population)

    minMale = min(malePopulation)
    maxMale = max(malePopulation)
    minFemale = min(femalePopulation)
    maxFemale = max(femalePopulation)

    normMalePopulation = []
    normFemalePopulation = []

    for i in range(norm):
        normMalePopulation.append((malePopulation[i] - minMale)/(maxMale - minMale))
    
    for i in range(norf):
        normFemalePopulation.append((femalePopulation[i] - minFemale)/(maxFemale - minFemale))
  
    for i in range(norf):
        #print(i)
        diff.append((normMalePopulation[i]-normFemalePopulation[i])**2)
    
    total = sum(diff)
    return total**0.5
