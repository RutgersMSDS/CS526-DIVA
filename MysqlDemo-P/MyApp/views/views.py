from django.shortcuts import render, HttpResponse
from MyApp import Q_PopulationGrowthTrends as qpgt
from MyApp import MaleFemalePyramid as mfp
from MyApp import FindCountryGenderSimilarity as fcgs
from MyApp import Q_FertilityTrends as ft
from MyApp import Q_Mortality as mt
import json
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def home(request):
    return render(request,'home.html')

def showPopulationTrend(request):
    return render(request, 'PopulationTrends.html')

def pyramidChartHtml(request):
    return render(request,'pyramidChart.html')

def showWorldData(request):
    context = {
        'wp' : qpgt.getWorldPopulationNew()
    }
    return HttpResponse(json.dumps(context))

@csrf_exempt
def showContinentData(request):
    continentName = request.POST.get('continents')
    context = {
        'cp' : qpgt.getContinentPopulationsNew(continentName)
    }
    return HttpResponse(json.dumps(context))

@csrf_exempt
def showCountryData(request):
    countryName = request.POST['country']
    context = {
        'cp' : qpgt.getCountryPopulationNew(countryName)
    }
    return HttpResponse(json.dumps(context))

@csrf_exempt
def showFertilityData(request):
    return render(request,'Fertility.html')

@csrf_exempt
def showChoroplethData(request):
    #year = request.POST.get('year')
    context = {
        'choroplethData' : qpgt.getChoroplethData()
    }
    return HttpResponse(json.dumps(context))

@csrf_exempt
def showChoroplethDataForFertility(request):
    #year = request.POST.get('year')
    context = {
        'choroplethData' : ft.getChoroplethDataForFertility()
    }
    return HttpResponse(json.dumps(context))

@csrf_exempt
def showChoroplethForInfantMortality(request):
    #year = request.POST.get('year')
    context = {
        'choroplethData' : mt.getChoroplethDataForInfantMortality()
    }
    return HttpResponse(json.dumps(context))

@csrf_exempt
def getWorldFertility(request):
    context = {
        'cp' : ft.getWorldFertility()
    }
    return HttpResponse(json.dumps(context))

@csrf_exempt
def getContinentFertility(request):
    continentName = request.POST.get('continent')
    context = {
        'cp' : ft.getContinentFertility(continentName)
    }
    return HttpResponse(json.dumps(context))

@csrf_exempt
def getCountryFertility(request):
    countryName = request.POST['country']
    context = {
        'cp' : ft.getCountryFertility(countryName)
    }
    return HttpResponse(json.dumps(context))

@csrf_exempt
def getWorldMortality(request):
    context = {
        'cp' : mt.getWorldMortality()
    }
    return HttpResponse(json.dumps(context))

@csrf_exempt
def getContinentMortality(request):
    continentName = request.POST.get('continent')
    context = {
        'cp' : mt.getContinentMortality(continentName)
    }
    return HttpResponse(json.dumps(context))

@csrf_exempt
def getCountryMortality(request):
    countryName = request.POST['country']
    context = {
        'cp' : mt.getCountryMortality(countryName)
    }
    return HttpResponse(json.dumps(context))

@csrf_exempt
def getMaleData(request):
    countryName = request.POST.get('country')
    #print(countryName)
    year = request.POST.get('year')
    context = {
        'maleData' : mfp.getMalePopulation(countryName,year)
    }
    return HttpResponse(json.dumps(context))

@csrf_exempt
def getFemaleData(request):
    countryName = request.POST.get('country')
    year = request.POST.get('year')
    context = {
        'femaleData' : mfp.getFemalePopulation(countryName,year)
    }
    return HttpResponse(json.dumps(context))

@csrf_exempt
def getPyramidChoroplethData(request):
    year = request.POST.get('year')
    age = request.POST.get('age')
    print(year)
    print(age)
    context = {
        'pyramidChoroplethData': fcgs.getWorldAgeSexRatio(year,age)
    }
    return HttpResponse(json.dumps(context))

def pyramidChart(request):
    return 'pyramidChart.js'

def pyramidChoropleth(request):
    return 'pyramidChoropleth.js'

def d3_tip(request):
    return 'd3-tip.js'

def barChartNew2(request):
    return 'barChartNew2.js'

def lineChartNew(request):
    return 'lineChartNew.js'

def choroplethNew(request):
    return 'choroplethNew.js'

def countryIdsNames(request):
    return '110m.tsv'

def worldData(request):
    return

def continentData(request):
    return

def countryData(request):
    return