from rest_framework import serializers

from symptom_checker.models import Symptom, Frequency


class SymptomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symptom
        fields = ['id', 'name', 'hpo_id']


class FrequencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Frequency
        fields = ['id', 'value', 'weight']
