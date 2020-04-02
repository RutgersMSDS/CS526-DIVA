
from django.urls import path
from MyApp import views

urlpatterns = [
    path('', views.home),
    path('showWorldData',views.showWorldData),
    path('showContinentsData',views.showContinentData),
    path('showCountryData',views.showCountryData),
    path('barChart.js',views.barChart),
    path('lineChartNew.js',views.lineChartNew),
    path('worldData',views.worldData),
    path('continentData',views.continentData),
    path('countryData',views.countryData)
]

