from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from symptom_checker.models import SymptomSearchException
from symptom_checker.serializers import SymptomCheckerRequestSerializer
from symptom_checker.services import SymptomCheckerSearchService


class SymptomCheckerSearch(APIView):
    @staticmethod
    def post(request):
        search_query = request.data['search']
        search_service = SymptomCheckerSearchService()
        try:
            symptoms = search_service.search(query=search_query)
            return Response({'symptoms': symptoms})
        except SymptomSearchException as e:
            return Response({"error": e.message}, e.status_code)


class SymptomChecker(APIView):
    @staticmethod
    def post(request):
        serializer = SymptomCheckerRequestSerializer(data=request.data)
        if serializer.is_valid():
            request_data = serializer.save()
            request_data.hpo_ids
        else:
            return Response({"error": "There was an error while parsing your request"},
                            status=status.HTTP_400_BAD_REQUEST)
        return Response({'response': 'OK'})
