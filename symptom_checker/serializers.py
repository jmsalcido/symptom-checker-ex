from rest_framework import serializers

from symptom_checker.models import SymptomCheckerRequest, OrphadataDisorderWeight, OrphadataDisorder


class SymptomSerializer(serializers.Serializer):
    id = serializers.CharField(allow_blank=False, allow_null=False, required=True, source="hpo_id")
    name = serializers.CharField(allow_blank=False, allow_null=False, required=True, source="term")

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass


class SymptomCheckerRequestSerializer(serializers.Serializer):
    hpo_ids = serializers.ListField(child=serializers.CharField(allow_blank=False, required=True),
                                    required=True)

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        return SymptomCheckerRequest(**validated_data)


class DisorderSerializer(serializers.Serializer):
    orpha_code = serializers.IntegerField(required=True)
    name = serializers.CharField(required=True)

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass


class DisorderWeightSerializer(serializers.Serializer):
    disorder = DisorderSerializer(source="orphadata_disorder")
    matching_symptoms = serializers.DictField()
    weight = serializers.DecimalField(max_digits=10, decimal_places=3)
    obligate_symptoms = serializers.ListField(child=(serializers.CharField()))
    very_frequent_symptoms = serializers.ListField(child=(serializers.CharField()))
    frequent_symptoms = serializers.ListField(child=(serializers.CharField()))
    occasional_symptoms = serializers.ListField(child=(serializers.CharField()))
    very_rare_symptoms = serializers.ListField(child=(serializers.CharField()))
    excluded_symptoms = serializers.ListField(child=(serializers.CharField()))

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass


class SymptomCheckerResponseSerializer(serializers.Serializer):
    result_id = serializers.UUIDField()
    matching_disorders = DisorderWeightSerializer(many=True)
    symptoms = SymptomSerializer(many=True)

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass
