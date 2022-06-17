from django.urls import path
from symptom_checker import views

urlpatterns = [
    path('symptom-checker/symptoms', views.SymptomCheckerSymptomsView.as_view()),
]
