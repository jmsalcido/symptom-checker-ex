from rest_framework.response import Response
from rest_framework.views import APIView

from symptom_checker.models import Symptom, Frequency, SymptomCheckerSymptom
from symptom_checker.serializers import SymptomCheckerSymptomSerializer


class SymptomCheckerSymptomsView(APIView):
    @staticmethod
    def get(request):
        symptoms = Symptom.objects.all()
        frequencies = Frequency.objects.all()
        symptom_checker_symptoms = SymptomCheckerSymptom(symptoms=symptoms, frequencies=frequencies)
        serializer = SymptomCheckerSymptomSerializer(symptom_checker_symptoms)
        return Response(serializer.data)
