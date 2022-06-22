from django.urls import path

from symptom_checker import views

urlpatterns = [
    path('symptom-checker/symptom/search/', views.SymptomCheckerSearch.as_view()),
    path('symptom-checker/', views.SymptomCheckerMatch.as_view()),
    path('symptom-checker/results/<str:result_id>', views.SymptomCheckerResult.as_view()),
]
