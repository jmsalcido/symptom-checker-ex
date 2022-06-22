import uuid
from operator import attrgetter

from rest_framework import status as http_status

from symptom_checker.models import SymptomSearchException, OrphadataModel, OrphadataDisorderWeight, CacheResults, \
    SymptomCheckerResultResponse, ResourceNotFoundException


class OrphadataDataService:
    def __init__(self):
        self.__orphadata = OrphadataModel()
        self.__orphadata.load_data()
        self.__results = CacheResults()
        self.__weight_by_frequency = {
            'obligate': 1,
            'very frequent': 0.8,
            'frequent': 0.3,
            'occasional': 0.05,
            'very rare': 0.04,
            'excluded': -1,
        }

    def store_results(self, result_id, matching_disorders):
        self.__results.save(result_id, matching_disorders)

    def find_results(self, result_id):
        return self.__results.find(result_id)

    def match_disorders(self, symptom_ids):
        """`match_disorder` OrphadataDataService is a naive class, it uses a bunch of operations to find out the
        "relationship" in the caches """
        # for each disorder
        disorders = self.__orphadata.all_disorders()
        match_by_weight = []
        for disorder in disorders.values():
            # check if the symptom_ids are relevant
            disorder_weight = []
            matching_symptoms = {}
            disorder_symptoms_frequencies = self.__orphadata.find_disorder_symptoms(disorder.orpha_code)
            for symptom_id in symptom_ids:
                frequency = disorder_symptoms_frequencies.get(symptom_id)
                if frequency is not None:
                    matching_symptoms[symptom_id] = frequency
                    disorder_weight.append(self.__weight_by_frequency[frequency])

            disorder_weight = round(sum(disorder_weight), 6)

            if disorder_weight == 0:
                break

            orphadata_disorder_weight = OrphadataDisorderWeight(disorder,
                                                                disorder_weight,
                                                                matching_symptoms)
            match_by_weight.append(orphadata_disorder_weight)
        match_by_weight.sort(reverse=True, key=attrgetter('weight'))
        return match_by_weight

    def search(self, query):
        """`search` OrphadataDataService is a naive class, we simply match the query to any substring in the symptom
        name to find out """
        symptom_items = self.__orphadata.all_symptoms().values()

        response = []

        # do a naive and simple search for the symptom name in the cache
        for symptom in symptom_items:
            if query.lower() in symptom.term.lower():
                response.append(symptom)

        return response

    def load_disorder_symptoms(self, matching_disorders):
        for match in matching_disorders:
            disorder = match.orphadata_disorder
            disorder_symptoms = self.__orphadata.find_disorder_symptoms(disorder.orpha_code)
            obligate_symptoms = set()
            very_frequent_symptoms = set()
            frequent_symptoms = set()
            occasional_symptoms = set()
            very_rare_symptoms = set()
            excluded_symptoms = set()
            for symptom_id, frequency in disorder_symptoms.items():
                if frequency == 'obligate':
                    obligate_symptoms.add(symptom_id)
                elif frequency == 'very frequent':
                    very_frequent_symptoms.add(symptom_id)
                elif frequency == 'frequent':
                    frequent_symptoms.add(symptom_id)
                elif frequency == 'occasional':
                    occasional_symptoms.add(symptom_id)
                elif frequency == 'very rare':
                    very_rare_symptoms.add(symptom_id)
                elif frequency == 'excluded':
                    excluded_symptoms.add(symptom_id)
            match.obligate_symptoms = obligate_symptoms
            match.very_frequent_symptoms = very_frequent_symptoms
            match.frequent_symptoms = frequent_symptoms
            match.occasional_symptoms = occasional_symptoms
            match.very_rare_symptoms = very_rare_symptoms
            match.excluded_symptoms = excluded_symptoms

    def load_symptoms(self):
        return list(self.__orphadata.all_symptoms().values())


class SymptomCheckerResultService:
    def __init__(self):
        self.__symptom_checker_data_service = OrphadataDataService()
        self.__disorder_symptom_service = SymptomCheckerDisorderSymptomService()

    def save(self, matching_disorders):
        result_id = str(uuid.uuid1())
        self.__symptom_checker_data_service.store_results(result_id, matching_disorders)
        return result_id

    def results(self, result_id):
        matching_disorders = self.__symptom_checker_data_service.find_results(result_id)
        # TODO: if not present or empty, throw error

        if matching_disorders is None:
            raise ResourceNotFoundException

        self.__disorder_symptom_service.load_disorder_symptoms(matching_disorders)
        symptoms = self.__disorder_symptom_service.load_symptoms()

        return SymptomCheckerResultResponse(result_id=uuid.uuid1(), matching_disorders=matching_disorders,
                                            symptoms=symptoms)


class SymptomCheckerMatchService:
    def __init__(self):
        self.__symptom_checker_data_service = OrphadataDataService()

    def match(self, symptom_checker_request):
        matching_disorders = self.__symptom_checker_data_service.match_disorders(symptom_checker_request.hpo_ids)
        return matching_disorders[0:5]


class SymptomCheckerDisorderSymptomService:
    def __init__(self):
        self.__symptom_checker_data_service = OrphadataDataService()

    def load_disorder_symptoms(self, matching_disorders):
        self.__symptom_checker_data_service.load_disorder_symptoms(matching_disorders)

    def load_symptoms(self):
        return self.__symptom_checker_data_service.load_symptoms()


class SymptomCheckerSearchService:
    def __init__(self):
        self.__symptom_checker_data_service = OrphadataDataService()

    def search(self, query):
        if len(query) <= 2:
            raise SymptomSearchException("Too few characters to do a search",
                                         http_status.HTTP_400_BAD_REQUEST)

        response = self.__symptom_checker_data_service.search(query)

        if len(response) == 0:
            raise SymptomSearchException("No symptoms with query: {} found".format(query),
                                         http_status.HTTP_404_NOT_FOUND)

        return response
