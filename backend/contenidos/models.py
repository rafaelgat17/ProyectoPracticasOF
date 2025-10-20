from django.db import models

# Create your models here.

class Bloque(models.Model):
    titulo = models.CharField(max_length=200, null=False)
    descripcion = models.TextField(blank=True, null=True)
    orden = models.IntegerField(null=False)
    contenido_teoria = models.TextField(null=True)
    imagen_portada = models.ImageField(upload_to='bloques/', blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo
    
    class Meta:
        db_table = 'contenidos_bloque'
        verbose_name = 'Bloque'
        verbose_name_plural = 'Bloques'
        ordering = ['orden']

