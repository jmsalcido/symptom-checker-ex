from xml.etree import ElementTree

import requests
from django.core.cache import cache

from symptom_checker.models import OrphadataDisorder


class OrphadataService:
    @staticmethod
    def disorders_cache_key():
        return "disorders"

    @staticmethod
    def symptom_id_to_symptom_name_cache_key():
        return "symptom_id_to_symptom_name"

    def __init__(self):
        self.url = "http://www.orphadata.org/data/xml/en_product4.xml"

    def load_data(self):
        try:
            response = requests.get(self.url)
            xml_element = ElementTree.fromstring(response.content)

            if xml_element is None:
                return

            disorders = xml_element.findall('HPODisorderSetStatusList/HPODisorderSetStatus/Disorder')
            if len(disorders) == 0:
                return

            symptom_id_to_name = {}
            orphadata_disorders = []

            for disorder in disorders:
                disorder_name = disorder.find('Name').text
                orpha_code = int(disorder.find('OrphaCode').text)
                orphadata_disorder = OrphadataDisorder(orpha_code=orpha_code, name=disorder_name)

                symptom_relationship = disorder.findall('HPODisorderAssociationList/HPODisorderAssociation')
                symptom_frequencies = []
                for s in symptom_relationship:
                    hpo_id = s.find('HPO/HPOId').text
                    term = s.find('HPO/HPOTerm').text
                    frequency = s.find('HPOFrequency/Name').text

                    if symptom_id_to_name.get(hpo_id) is None:
                        symptom_id_to_name[hpo_id] = term

                    symptom_frequencies.append((hpo_id, frequency))

                orphadata_disorder.symptom_frequencies = symptom_frequencies
                orphadata_disorders.append(orphadata_disorder)

            # set all caches again
            cache.set(self.symptom_id_to_symptom_name_cache_key(), symptom_id_to_name)
            cache.set(self.disorders_cache_key(), orphadata_disorders)
        except requests.exceptions.RequestException:
            # we can submit an error to sentry/rollbar/bugsnag to let devs know that there is an error happening while
            # trying to connect to orphadata
            print("There was an error trying to load data")
            return
        except ElementTree.ParseError:
            return


class SymptomCheckerSearchService:
    def __init__(self, orphadata_service=None):
        self.orphadata_service = orphadata_service

    def search(self, query):
        symptom_names = cache.get(OrphadataService.symptom_id_to_symptom_name_cache_key())
        if symptom_names is None:
            self.orphadata_service.load_data()
            symptom_names = cache.get(OrphadataService.symptom_id_to_symptom_name_cache_key())

        symptoms = []

        # do a naive and simple search for the symptom name
        for k, v in symptom_names.items():
            if query in v:
                symptoms.append({"id": k, "name": v})

        return symptoms
