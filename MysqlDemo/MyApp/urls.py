
from django.urls import path
from MyApp import views

urlpatterns = [
    path('', views.home),
    path('showData',views.showData),
    path('barChart.js',views.barChart),
    path('lineChart.js',views.lineChart),
]

