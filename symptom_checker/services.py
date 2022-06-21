from rest_framework import status as http_status

from symptom_checker.models import SymptomSearchException, OrphadataModel
from symptom_checker.serializers import SymptomSerializer


class OrphadataDataService:
    def __init__(self):
        self.orphadata = OrphadataModel()
        self.orphadata.load_data()

    def match_disorders(self, symptom_ids):
        # for each disorder
        disorders = self.orphadata.all_disorders()
        for disorder in disorders:
            # check if the symptom_ids are relevant.
            pass
        return False

    def search(self, query):
        symptom_items = self.orphadata.all_symptoms().values()

        response = []

        # do a naive and simple search for the symptom name in the cache
        for symptom in symptom_items:
            if query.lower() in symptom.term.lower():
                response.append({"id": symptom.hpo_id, "name": symptom.term})

        return response


class SymptomCheckerDisorderService:
    def __init__(self):
        self.symptom_checker_data_service = OrphadataDataService()

    def match(self, symptom_checker_request):
        # for all disorders...
        disorders = self.symptom_checker_data_service.match_disorders(symptom_checker_request.hpo_ids)
        # check the symptoms if it's contained
        pass


class SymptomCheckerSearchService:
    def __init__(self):
        self.symptom_checker_data_service = OrphadataDataService()

    def search(self, query):
        response = self.symptom_checker_data_service.search(query)

        if len(response) == 0:
            raise SymptomSearchException("No symptoms with query: {} found".format(query),
                                         http_status.HTTP_404_NOT_FOUND)

        serializer = SymptomSerializer(data=response, many=True)
        if serializer.is_valid():
            return serializer.data
        else:
            raise SymptomSearchException()
