from django.db import models

# Create your models here.


class KeplerianElements(models.Model):
    semi_major_axis_diacritic = models.CharField(max_length=100)
    semi_major_axis_subscript = models.CharField(max_length=100)
    eccentricity_diacritic = models.CharField(max_length=100)
    eccentricity_subscript = models.CharField(max_length=100)
    inclination_diacritic = models.CharField(max_length=100)
    inclination_subscript = models.CharField(max_length=100)
    mean_longitude_diacritic = models.CharField(max_length=100)
    mean_longitude_subscript = models.CharField(max_length=100)
    longitude_of_perihelion_diacritic = models.CharField(max_length=100)
    longitude_of_perihelion_subscript = models.CharField(max_length=100)
    longitude_of_the_ascending_node_diacritic = models.CharField(max_length=100)
    longitude_of_the_ascending_node_subscript = models.CharField(max_length=100)
    name = models.CharField(max_length=32)
    x_pos = models.CharField(max_length=100)
    y_pos = models.CharField(max_length=100)
    z_pos = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class CESBody(models.Model):
    name = ""
    description = ""
    Velocity = ""
    x_pos = models.CharField(max_length=100)
    y_pos = models.CharField(max_length=100)
    z_pos = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Planet(CESBody):
    def __init__(self, x_pos, y_pos, z_pos, gas_or_rocky):
        super().__init__(x_pos)
        super().__init__(y_pos)
        super().__init__(z_pos)
        self.gas_or_rocky = gas_or_rocky


class NearEarthObjects(CESBody):
    def __init__(self, x_pos, y_pos, z_pos, orbiting_body):
        super().__init__(x_pos)
        super().__init__(y_pos)
        super().__init__(z_pos)
        self.orbiting_body = orbiting_body


class LastUpdate(models.Model):
    date = ""

    def __str__(self):
        return self.date