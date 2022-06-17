from rest_framework import serializers

from symptom_checker.models import Symptom, Frequency, SymptomCheckerSymptom


class SymptomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symptom
        fields = ['id', 'name']


class FrequencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Frequency
        fields = ['id', 'value', 'weight']


class SymptomCheckerSymptomSerializer(serializers.Serializer):
    symptoms = SymptomSerializer(many=True)
    frequencies = FrequencySerializer(many=True)

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        SymptomCheckerSymptom(**validated_data)
