from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from symptom_checker.models import SymptomSearchException, SymptomCheckerResponse
from symptom_checker.serializers import SymptomCheckerRequestSerializer, SymptomSerializer, \
    SymptomCheckerResponseSerializer, SymptomCheckerResultResponseSerializer
from symptom_checker.services import SymptomCheckerSearchService, SymptomCheckerMatchService, \
    SymptomCheckerResultService


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

            result_service = SymptomCheckerResultService()
            result_id = result_service.save(matching_disorders)
            response = SymptomCheckerResponse(result_id=result_id)

            response_serializer = SymptomCheckerResponseSerializer(response)
            return Response(response_serializer.data)
        else:
            return Response({"error": "There was an error while parsing your request"},
                            status=status.HTTP_400_BAD_REQUEST)


class SymptomCheckerResult(APIView):
    @staticmethod
    def get(request, result_id):
        # TODO: catch exception when thrown from the result service
        result_service = SymptomCheckerResultService()
        result = result_service.results(str(result_id))
        response_serializer = SymptomCheckerResultResponseSerializer(instance=result)
        return Response(response_serializer.data)
