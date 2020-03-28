from MyApp.models.models import MortalityLifeExpectancy

def getInfantMortality():
    data = MortalityLifeExpectancy.objects.all()
    nor = len(data) # number of records
    im = list()

    for i in range(0,nor):
        im.append({
            'year':data[i].year,
            'infant_mortality':data[i].infant_mortality,
            'infant_mortality_male':data[i].infant_mortality_male,
            'infant_mortality_female':data[i].infant_mortality_female
        })
    return im

def getLifeExpectancy():
    data = MortalityLifeExpectancy.objects.all()
    nor = len(data) # number of records
    le = list()

    for i in range(0,nor):
        le.append({
            'year':data[i].year,
            'life_expectancy':data[i].life_expectancy,
            'life_expectancy_male':data[i].life_expectancy_male,
            'life_expectancy_female':data[i].life_expectancy_female
        })
    return le

def getMortalityRateUnder5():
    data = MortalityLifeExpectancy.objects.all()
    nor = len(data) # number of records
    le = list()

    for i in range(0,nor):
        le.append({
            'year':data[i].year,
            'mortality_rate_under_5':data[i].mortality_rate_under_5,
            'mortality_rate_under_5_male':data[i].mortality_rate_under_5_male,
            'mortality_rate_under_5_female':data[i].mortality_rate_under_5_female
        })
    return le

def getMortalityRate1To4():
    data = MortalityLifeExpectancy.objects.all()
    nor = len(data) # number of records
    le = list()

    for i in range(0,nor):
        le.append({
            'year':data[i].year,
            'mortality_rate_1_to_4':data[i].mortality_rate_1_to_4,
            'mortality_rate_1_to_4_male':data[i].mortality_rate_1_to_4_male,
            'mortality_rate_1_to_4_female':data[i].mortality_rate_1_to_4_female
        })
    return le