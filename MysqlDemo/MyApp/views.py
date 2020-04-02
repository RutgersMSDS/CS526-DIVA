from django.shortcuts import render, HttpResponse
from MyApp import Q_PopulationGrowthTrends as qpgt
import json

# Create your views here.

def home(request):
    return render(request,'mywebsiteNew2.html')

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

def showCountryData(request):
    #countryName = request.POST['country']
    countryNames = request.POST.get('countries')
    countryNames = json.loads(countryNames)
    #countryNames = ['India','China','United States','Canada','Russia','Malaysia','Singapore','Jordan','Australia','New Zealand']
    context = {
        'cp' : qpgt.getCountryPopulationNew(countryNames)
    }
    return HttpResponse(json.dumps(context))

def barChart(request):
    return 'barChart.js'

def lineChartNew(request):
    return 'lineChartNew.js'

def worldData(request):
    return

def continentData(request):
    return

def countryData(request):
    return