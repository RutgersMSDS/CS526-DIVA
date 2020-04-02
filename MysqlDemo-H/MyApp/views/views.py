from django.shortcuts import render, HttpResponse
from MyApp import Q_PopulationGrowthTrends as qpgt
import json
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def home(request):
    return render(request,'home.html')

def showWorldData(request):
    context = {
        'wp' : qpgt.getWorldPopulationNew()
    }
    return HttpResponse(json.dumps(context))

"""def showContinentData(request):
    continentName = request.POST['continent']
    context = {
        'cp' : qpgt.getContinentPopulationsNew(continentName)
        #'cp':continentName
    }
    return HttpResponse(json.dumps(context))"""

@csrf_exempt
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

def barChart(request):
    return 'barChart.js'

def lineChartNew(request):
    return 'lineChartNew.js'

def countryIdsNames(request):
    return '110m.tsv'

def worldData(request):
    return

def continentData(request):
    return

def countryData(request):
    return