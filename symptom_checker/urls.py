from django.urls import path
from symptom_checker import views

urlpatterns = [
    path('symptom-checker/symptom/search/', views.SymptomCheckerSearch.as_view()),
    path('symptom-checker/', views.SymptomCheckerSearch.as_view()),
]
