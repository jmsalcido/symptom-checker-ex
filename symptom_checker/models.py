from django.core.cache import cache
from django.db import models
from rest_framework import status


class Symptoms:
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
        cache.set(Symptoms.cache_key(), self.id_to_symptom)

    def all(self):
        symptoms = cache.get(Symptoms.cache_key())
        if symptoms is None:
            return self.id_to_symptom
        return symptoms


class Disorders:
    @staticmethod
    def cache_key():
        return "disorders"

    def __init__(self):
        self.disorders = []

    def add(self, orphadata_disorder):
        self.disorders.append(orphadata_disorder)

    def save(self):
        cache.set(Disorders.cache_key(), self.disorders)

    def all(self):
        disorders = cache.get(Disorders.cache_key())
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
