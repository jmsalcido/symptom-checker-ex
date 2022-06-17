from django.db import models


class Symptom(models.Model):
    name = models.CharField(max_length=100, null=False)
    hpo_id = models.CharField(max_length=20)

    def __str__(self):
        return "{}".format(self.name)


class Frequency(models.Model):
    value = models.CharField(max_length=20, blank=False)
    weight = models.IntegerField(null=False, default=0)

    def __str__(self):
        return "{}({})".format(self.value, self.weight)


class Disease(models.Model):
    name = models.CharField(max_length=100, null=False)
    symptoms = models.ManyToManyField(Symptom, through='DiseaseSymptomFrequency')
    symptom_frequency = models.ManyToManyField(Frequency, through='DiseaseSymptomFrequency')

    def __str__(self):
        return "{}".format(self.name)


class DiseaseSymptomFrequency(models.Model):
    disease = models.ForeignKey(Disease, on_delete=models.CASCADE)
    symptom = models.ForeignKey(Symptom, on_delete=models.CASCADE)
    frequency = models.ForeignKey(Frequency, on_delete=models.CASCADE)


class SymptomCheckerSymptom:
    def __init__(self, symptoms, frequencies):
        self.symptoms = symptoms
        self.frequencies = frequencies
