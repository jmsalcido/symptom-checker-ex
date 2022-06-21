from xml.etree import ElementTree

import requests
from django.core.cache import cache
from django.db import models
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

    def all_symptoms(self):
        return self.__symptoms.all()

    def all_disorders(self):
        return self.__disorders.all()

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
                symptom_frequencies = []
                for rel_element in symptom_relationship_element:
                    hpo_id = rel_element.find('HPO/HPOId').text
                    term = rel_element.find('HPO/HPOTerm').text
                    frequency = rel_element.find('HPOFrequency/Name').text

                    symptom_frequencies.append((hpo_id, frequency))
                    orphadata_symptom = OrphadataSymptom(hpo_id=hpo_id, term=term)

                    self.__symptoms.add(orphadata_symptom)

                orphadata_disorder.symptom_frequencies = symptom_frequencies
                self.__disorders.add(orphadata_disorder)

            # set all caches again
            self.__symptoms.save()
            self.__disorders.save()
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
        self.id_to_symptom = {}

    def add(self, orphadata_symptom):
        hpo_id = orphadata_symptom.hpo_id
        if self.id_to_symptom.get(hpo_id) is None:
            self.id_to_symptom[hpo_id] = orphadata_symptom

    def save(self):
        cache.set(CacheSymptoms.cache_key(), self.id_to_symptom)

    def all(self):
        symptoms = cache.get(CacheSymptoms.cache_key())
        if symptoms is None:
            return self.id_to_symptom
        return symptoms


class CacheDisorders:
    @staticmethod
    def cache_key():
        return "disorders"

    def __init__(self):
        self.disorders = []

    def add(self, orphadata_disorder):
        self.disorders.append(orphadata_disorder)

    def save(self):
        cache.set(CacheDisorders.cache_key(), self.disorders)

    def all(self):
        disorders = cache.get(CacheDisorders.cache_key())
        if disorders is None:
            return self.disorders
        return disorders


class OrphadataDisorder:
    def __init__(self, orpha_code, name, symptom_frequencies=None):
        if symptom_frequencies is None:
            symptom_frequencies = []
        self.orpha_code = orpha_code
        self.name = name
        self.symptom_frequencies = symptom_frequencies


class OrphadataSymptom:
    def __init__(self, hpo_id, term):
        self.hpo_id = hpo_id
        self.term = term


class SymptomCheckerRequest:
    def __init__(self, hpo_ids=None):
        if hpo_ids is None:
            hpo_ids = []
        self.hpo_ids = hpo_ids


class Job(models.Model):
    class JobStatus(models.TextChoices):
        NOT_STARTED = "NOT STARTED"
        PROCESSING = "PROCESSING"
        COMPLETED = "COMPLETED"

    status = models.CharField(max_length=50, null=False, blank=False,
                              choices=JobStatus.choices,
                              default=JobStatus.NOT_STARTED)


class SymptomSearchException(Exception):
    def __init__(self, message="There was an error while doing the search",
                 status_code=status.HTTP_400_BAD_REQUEST):
        self.message = message
        self.status_code = status_code
