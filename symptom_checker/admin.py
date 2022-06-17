from django.contrib import admin

# Register your models here.
from symptom_checker.models import *

admin.site.register(Disease)
admin.site.register(Symptom)
admin.site.register(Frequency)
