from django.db import models


class PriceHistory(models.Model):
    source = models.TextField(null=False, blank=False)
