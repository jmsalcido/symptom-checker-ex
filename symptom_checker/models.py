from django.db import models


class OrphadataDisorder:
    def __init__(self, orpha_code, name, symptom_frequencies=None):
        if symptom_frequencies is None:
            symptom_frequencies = []
        self.orpha_code = orpha_code
        self.name = name
        self.symptom_frequencies = symptom_frequencies


class Job(models.Model):
    class JobStatus(models.TextChoices):
        NOT_STARTED = "NOT STARTED"
        PROCESSING = "PROCESSING"
        COMPLETED = "COMPLETED"

    status = models.CharField(max_length=50, null=False, blank=False,
                              choices=JobStatus.choices,
                              default=JobStatus.NOT_STARTED)
