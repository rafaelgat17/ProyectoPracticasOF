from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Usuario(AbstractUser):
    username = models.CharField(max_length=150,unique=True)
    email = models.EmailField(max_length=255, unique=True)
    uvus = models.CharField(max_length=20, unique=True)
    grado = models.CharField(max_length=255)
    tiempo_total_sesion = models.IntegerField(default=0)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'uvus', 'grado']

    def __str__(self):
        return self.email
    
    class Meta:
        db_table = 'usuarios'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        ordering = ['-date_joined']
