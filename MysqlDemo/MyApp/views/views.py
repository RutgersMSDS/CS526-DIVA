from django.shortcuts import render, HttpResponse
from MyApp.models import Q_PopulationGrowthTrends as qpgt
import json

def home(request):
    return render(request, 'home.html')

def showData(request):
    context = {
        'wp' : qpgt.getWorldPopulation()
    }
    return HttpResponse(json.dumps(context))

def barChart(request):
    return 'barChart.js'

def lineChart(request):
    return 'lineChart.js'