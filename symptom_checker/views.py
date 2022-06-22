import uuid

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from symptom_checker.models import SymptomSearchException, SymptomCheckerResponse
from symptom_checker.serializers import SymptomCheckerRequestSerializer, SymptomSerializer, \
    SymptomCheckerResponseSerializer
from symptom_checker.services import SymptomCheckerSearchService, SymptomCheckerMatchService, \
    SymptomCheckerDisorderSymptomService


class SymptomCheckerSearch(APIView):
    @staticmethod
    def post(request):
        search_query = request.data['search']
        search_service = SymptomCheckerSearchService()
        try:
            symptoms = search_service.search(query=search_query)
            serializer = SymptomSerializer(instance=symptoms, many=True)
            return Response({"symptoms": serializer.data})
        except SymptomSearchException as e:
            return Response({"error": e.message}, e.status_code)


class SymptomCheckerMatch(APIView):
    @staticmethod
    def post(request):
        request_serializer = SymptomCheckerRequestSerializer(data=request.data)
        if request_serializer.is_valid():
            request_data = request_serializer.save()
            match_service = SymptomCheckerMatchService()
            matching_disorders = match_service.match(request_data)

            if len(matching_disorders) == 0:
                return Response({"error": "No matching disorders"},
                                status=status.HTTP_404_NOT_FOUND)

            disorder_symptom_service = SymptomCheckerDisorderSymptomService()
            disorder_symptom_service.load_disorder_symptoms(matching_disorders)

            symptoms = disorder_symptom_service.load_symptoms()
            instance = SymptomCheckerResponse(result_id=uuid.uuid1(), matching_disorders=matching_disorders,
                                              symptoms=symptoms)
            response_serializer = SymptomCheckerResponseSerializer(
                instance=instance)
            return Response(response_serializer.data)
        else:
            return Response({"error": "There was an error while parsing your request"},
                            status=status.HTTP_400_BAD_REQUEST)
