from rest_framework import serializers


class SymptomData(serializers.Serializer):
    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        return validated_data

    id = serializers.CharField(required=True, allow_blank=False)
    name = serializers.CharField(required=True, allow_blank=False)
