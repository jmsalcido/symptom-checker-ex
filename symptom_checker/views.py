from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from symptom_checker.services import SymptomCheckerSearchService, OrphadataService


class SymptomCheckerSearch(APIView):
    @staticmethod
    def post(request):
        search_query = request.data['search']
        search_service = SymptomCheckerSearchService(orphadata_service=OrphadataService())
        symptoms = search_service.search(query=search_query)
        if len(symptoms) == 0:
            return Response({"error": "No symptoms found for the criteria"}, status=status.HTTP_404_NOT_FOUND)
        return Response({'symptoms': symptoms})
