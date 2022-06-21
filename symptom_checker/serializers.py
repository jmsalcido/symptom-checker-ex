from rest_framework import serializers

from symptom_checker.models import SymptomCheckerRequest, OrphadataSymptom


class SymptomSerializer(serializers.Serializer):
    id = serializers.CharField(allow_blank=False, allow_null=False, required=True)
    name = serializers.CharField(allow_blank=False, allow_null=False, required=True)

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        return OrphadataSymptom(hpo_id=validated_data['id'], term=validated_data['name'])


class SymptomCheckerRequestSerializer(serializers.Serializer):
    hpo_ids = serializers.ListField(child=serializers.CharField(allow_blank=False, required=True),
                                    required=True)

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        return SymptomCheckerRequest(**validated_data)
