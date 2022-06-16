from django.db import models


class Symptom(models.Model):
    name = models.CharField(max_length=100, null=False)
    hpo_id = models.CharField(max_length=20)


class Frequency(models.Model):
    name = models.CharField(max_length=20, blank=False)
    weight = models.IntegerField(null=False, default=0)


class Disease(models.Model):
    name = models.CharField(max_length=100, null=False)
    symptoms = models.ManyToManyField(Symptom, through='DiseaseSymptomFrequency')
    symptom_frequency = models.ManyToManyField(Frequency, through='DiseaseSymptomFrequency')


class DiseaseSymptomFrequency(models.Model):
    disease = models.ForeignKey(Disease, on_delete=models.CASCADE)
    symptom = models.ForeignKey(Symptom, on_delete=models.CASCADE)
    frequency = models.ForeignKey(Frequency, on_delete=models.CASCADE)
