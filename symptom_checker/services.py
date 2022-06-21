from xml.etree import ElementTree

import requests
from rest_framework import status as http_status

from symptom_checker.models import OrphadataDisorder, OrphadataSymptom, Symptoms, Disorders, SymptomSearchException
from symptom_checker.serializers import SymptomSerializer


class OrphadataService:
    def __init__(self, orphadata_model=None):
        self.url = "http://www.orphadata.org/data/xml/en_product4.xml"
        self.orphadata_model = orphadata_model

    def load_data(self):
        try:
            response = requests.get(self.url)
            xml_element = ElementTree.fromstring(response.content)

            if xml_element is None:
                return

            disorder_elements = xml_element.findall('HPODisorderSetStatusList/HPODisorderSetStatus/Disorder')
            if len(disorder_elements) == 0:
                return

            disorders = Disorders()
            symptoms = Symptoms()

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

                    orphadata_symptom = OrphadataSymptom(hpo_id=hpo_id, term=term)
                    frequency = rel_element.find('HPOFrequency/Name').text
                    symptoms.add(orphadata_symptom)

                    symptom_frequencies.append((hpo_id, frequency))

                orphadata_disorder.symptom_frequencies = symptom_frequencies
                disorders.add(orphadata_disorder)

            # set all caches again
            symptoms.save()
            disorders.save()
        except requests.exceptions.RequestException:
            # we can submit an error to sentry/rollbar/bugsnag to let devs know that there is an error happening while
            # trying to connect to orphadata
            print("There was an error trying to load data")
            return
        except ElementTree.ParseError:
            return


class SymptomCheckerSearchService:
    def __init__(self):
        self.orphadata_service = OrphadataService()
        self.symptoms = Symptoms()

    def search(self, query):
        symptom_items = self.symptoms.all().values()
        if len(symptom_items) == 0:
            self.orphadata_service.load_data()
            symptom_items = self.symptoms.all().values()

        response = []

        # do a naive and simple search for the symptom name
        for symptom in symptom_items:
            if query.lower() in symptom.term.lower():
                response.append({"id": symptom.hpo_id, "name": symptom.term})

        if len(response) == 0:
            raise SymptomSearchException("No symptoms with query: {} found".format(query),
                                         http_status.HTTP_404_NOT_FOUND)

        serializer = SymptomSerializer(data=response, many=True)
        if serializer.is_valid():
            return serializer.data
        else:
            raise SymptomSearchException()


class SymptomCheckerService:
    def __init__(self):
        pass
