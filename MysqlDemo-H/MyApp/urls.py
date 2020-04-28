
from django.urls import path
from MyApp import views

urlpatterns = [
    path('', views.home),
    path('pyramidChartHtml',views.pyramidChartHtml),
    path('showWorldData',views.showWorldData),
    path('showContinentsData',views.showContinentData),
    path('showCountryData',views.showCountryData),
    path('showChoroplethData',views.showChoroplethData),
    path('barChartNew2.js',views.barChartNew2),
    path('lineChartNew.js',views.lineChartNew),
    path('worldData',views.worldData),
    path('continentData',views.continentData),
    path('countryData',views.countryData),
    path('110m.tsv',views.countryIdsNames),
    path('choropleth2.js',views.choroplethNew),
    path('getMaleData',views.getMaleData),
    path('getFemaleData',views.getFemaleData),
    path('pyramidChart.js',views.pyramidChart),
    path('d3-tip.js',views.d3_tip),
    path('pyramidChoropleth.js',views.pyramidChoropleth),
    path('getPyramidChoroplethData',views.getPyramidChoroplethData)
]

