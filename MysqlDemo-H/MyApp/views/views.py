from django.shortcuts import render, HttpResponse
from MyApp import Q_PopulationGrowthTrends as qpgt
from MyApp import MaleFemalePyramid as mfp
from MyApp import FindCountryGenderSimilarity as fcgs
import json
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def home(request):
    return render(request,'home.html')

def pyramidChartHtml(request):
    return render(request,'pyramidChart.html')

def showWorldData(request):
    context = {
        'wp' : qpgt.getWorldPopulationNew()
    }
    return HttpResponse(json.dumps(context))

def showContinentData(request):
    continentNames = request.POST.get('continents')
    #continentNames = ['Asia','Africa']
    continentNames = json.loads(continentNames)  # reverts the stringification of json
    print(continentNames)
    context = {
        'cp' : qpgt.getContinentPopulationsNew(continentNames)
        #'cp':continentName
    }
    return HttpResponse(json.dumps(context))

@csrf_exempt
def showCountryData(request):
    #countryName = request.POST['country']
    countryNames = request.POST.get('countries')
    countryNames = json.loads(countryNames)
    #countryNames = ['India','China','United States','Canada','Russia','Malaysia','Singapore','Jordan','Australia','New Zealand']
    context = {
        'cp' : qpgt.getCountryPopulationNew(countryNames)
    }
    return HttpResponse(json.dumps(context))

def showChoroplethData(request):
    #year = request.POST.get('year')
    context = {
        'choroplethData' : qpgt.getChoroplethData()
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