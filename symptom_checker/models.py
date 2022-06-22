from xml.etree import ElementTree

import requests
from django.core.cache import cache
from rest_framework import status


class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]


class OrphadataModel(metaclass=SingletonMeta):

    def __init__(self, orphadata_model=None):
        # noinspection HttpUrlsUsage
        self.url = "http://www.orphadata.org/data/xml/en_product4.xml"
        self.orphadata_model = orphadata_model
        self.loaded = False
        self.__disorders = CacheDisorders()
        self.__symptoms = CacheSymptoms()
        self.__disorder_symptoms = CacheDisorderSymptoms()

    def all_symptoms(self):
        return self.__symptoms.all()

    def all_disorders(self):
        return self.__disorders.all()

    def find_disorder_symptoms(self, disorder_orpha_code):
        return self.__disorder_symptoms.find(disorder_orpha_code)

    def load_data(self):
        if self.loaded:
            return

        try:
            response = requests.get(self.url)
            xml_element = ElementTree.fromstring(response.content)

            if xml_element is None:
                return

            disorder_elements = xml_element.findall('HPODisorderSetStatusList/HPODisorderSetStatus/Disorder')
            if len(disorder_elements) == 0:
                return

            for disorder_element in disorder_elements:
                disorder_name = disorder_element.find('Name').text
                orpha_code = int(disorder_element.find('OrphaCode').text)

                orphadata_disorder = OrphadataDisorder(orpha_code=orpha_code, name=disorder_name)

                symptom_relationship_element = disorder_element \
                    .findall('HPODisorderAssociationList/HPODisorderAssociation')
                symptom_frequencies = {}
                for rel_element in symptom_relationship_element:
                    hpo_id = rel_element.find('HPO/HPOId').text
                    term = rel_element.find('HPO/HPOTerm').text
                    frequency = rel_element.find('HPOFrequency/Name').text

                    orphadata_symptom = OrphadataSymptom(hpo_id=hpo_id, term=term)
                    symptom_frequencies[hpo_id] = frequency[0:frequency.index(' (')].lower()

                    self.__symptoms.add(orphadata_symptom)

                self.__disorder_symptoms.add(orphadata_disorder.orpha_code, symptom_frequencies)
                self.__disorders.add(orphadata_disorder)

            # set all caches again
            self.__symptoms.save()
            self.__disorders.save()
            self.__disorder_symptoms.save()
            self.loaded = True
        except requests.exceptions.RequestException:
            # we can submit an error to sentry/rollbar/bugsnag to let devs know that there is an error happening while
            # trying to connect to orphadata
            print("There was an error trying to load data")
            return
        except ElementTree.ParseError:
            return


class CacheSymptoms:
    @staticmethod
    def cache_key():
        return "symptom_id_to_symptom_name"

    def __init__(self):
        self.id_to_symptoms = {}

    def add(self, orphadata_symptom):
        hpo_id = orphadata_symptom.hpo_id
        if self.id_to_symptoms.get(hpo_id) is None:
            self.id_to_symptoms[hpo_id] = orphadata_symptom

    def save(self):
        cache.set(CacheSymptoms.cache_key(), self.id_to_symptoms)

    @staticmethod
    def all():
        return cache.get(CacheSymptoms.cache_key())


class CacheDisorderSymptoms:
    @staticmethod
    def cache_key():
        return "disorder_to_symptoms"

    def __init__(self):
        self.disorder_to_symptoms = {}

    def add(self, disorder_orphadata_code, symptoms):
        if self.disorder_to_symptoms.get(disorder_orphadata_code) is None:
            self.disorder_to_symptoms[disorder_orphadata_code] = symptoms

    def save(self):
        cache.set(CacheDisorderSymptoms.cache_key(), self.disorder_to_symptoms)

    @staticmethod
    def find(disorder_orphadata_code):
        return cache.get(CacheDisorderSymptoms.cache_key()).get(disorder_orphadata_code)


class CacheDisorders:
    @staticmethod
    def cache_key():
        return "disorders"

    def __init__(self):
        self.disorders = {}

    def add(self, orphadata_disorder):
        self.disorders[orphadata_disorder.orpha_code] = orphadata_disorder

    def save(self):
        cache.set(CacheDisorders.cache_key(), self.disorders)

    @staticmethod
    def all():
        return cache.get(CacheDisorders.cache_key())


class OrphadataDisorderSymptoms:
    def __init__(self, disorder_orpha_code, orphadata_symptom):
        self.disorder_orpha_code = disorder_orpha_code
        self.orphadata_symptom = orphadata_symptom


class OrphadataDisorder:
    def __init__(self, orpha_code, name):
        self.orpha_code = orpha_code
        self.name = name


class OrphadataDisorderWeight:
    def __init__(self, orphadata_disorder, weight, matching_symptoms=None, obligate_symptoms=None,
                 very_frequent_symptoms=None, frequent_symptoms=None, occasional_symptoms=None,
                 very_rare_symptoms=None, excluded_symptoms=None):
        if excluded_symptoms is None:
            excluded_symptoms = []
        if very_rare_symptoms is None:
            very_rare_symptoms = []
        if occasional_symptoms is None:
            occasional_symptoms = []
        if frequent_symptoms is None:
            frequent_symptoms = []
        if matching_symptoms is None:
            matching_symptoms = []
        if obligate_symptoms is None:
            obligate_symptoms = []
        if very_frequent_symptoms is None:
            very_frequent_symptoms = []

        self.orphadata_disorder = orphadata_disorder
        self.matching_symptoms = matching_symptoms
        self.weight = weight
        self.obligate_symptoms = obligate_symptoms
        self.very_frequent_symptoms = very_frequent_symptoms
        self.frequent_symptoms = frequent_symptoms
        self.occasional_symptoms = occasional_symptoms
        self.very_rare_symptoms = very_rare_symptoms
        self.excluded_symptoms = excluded_symptoms


class OrphadataSymptom:
    def __init__(self, hpo_id, term):
        self.hpo_id = hpo_id
        self.term = term


class SymptomCheckerResponse:
    def __init__(self, result_id, matching_disorders=None, symptoms=None):
        if matching_disorders is None:
            matching_disorders = []
        if symptoms is None:
            symptoms = []
        self.result_id = result_id
        self.matching_disorders = matching_disorders
        self.symptoms = symptoms


class SymptomCheckerRequest:
    def __init__(self, hpo_ids=None):
        if hpo_ids is None:
            hpo_ids = []
        self.hpo_ids = hpo_ids


class SymptomSearchException(Exception):
    def __init__(self, message="There was an error while doing the search",
                 status_code=status.HTTP_400_BAD_REQUEST):
        self.message = message
        self.status_code = status_code
