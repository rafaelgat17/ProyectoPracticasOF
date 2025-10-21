from django.db import models

# Create your models here.

class Bloque(models.Model):
    titulo = models.CharField(max_length=200, null=False)
    descripcion = models.TextField(blank=True, null=True)
    orden = models.IntegerField(null=False)
    contenido_teoria = models.TextField(null=True)
    imagen_portada = models.ImageField(upload_to='bloques/', blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    filas_circuito = models.IntegerField(default=2)
    columnas_circuito = models.IntegerField(default=3)

    def __str__(self):
        return self.titulo
    
    class Meta:
        db_table = 'contenidos_bloque'
        verbose_name = 'Bloque'
        verbose_name_plural = 'Bloques'
        ordering = ['orden']


class CircuitoGenerado(models.Model):
    bloque = models.ForeignKey(Bloque, on_delete=models.CASCADE, related_name='circuitos_generados')
    filas = models.IntegerField()
    columnas = models.IntegerField()
    nodes = models.JSONField()
    edges = models.JSONField()
    fecha_generacion = models.DateTimeField(auto_now_add=True)
    imagen_renderizada = models.ImageField(upload_to='circuitos_generados/', blank=True, null=True)


    def __str__(self):
        return f"Circuito {self.filas}x{self.columnas} - {self.bloque.titulo}"
    
    class Meta:
        db_table = 'contenidos_circuito_generado'
        verbose_name = 'Circuito Generado'
        verbose_name_plural = 'Circuitos Generados'
        ordering = ['-fecha_generacion']


class PreguntaGenerada(models.Model):
    circuito = models.ForeignKey(CircuitoGenerado, on_delete=models.CASCADE, related_name='preguntas')
    orden = models.IntegerField()
    texto_pregunta = models.TextField()
    tipo_pregunta = models.CharField(max_length=20, choices=TIPO_PREGUNTA_CHOICES)
    opciones = models.JSONField(blank=True, null=True, help_text="Array de opciones")
    respuesta_correcta = models.TextField()
    explicacion = models.TextField(blank=True, null=True)
    puntos = models.IntegerField(default=1)
    componente_relacionado = models.CharField(max_length=50, blank=True, null=True, help_text="Ej: N11-N12 (resistor)")
    
    def __str__(self):
        return f"Pregunta {self.orden} - {self.circuito}"
    
    class Meta:
        db_table = 'contenidos_preguntagenerada'
        verbose_name = 'Pregunta Generada'
        verbose_name_plural = 'Preguntas Generadas'
        ordering = ['circuito', 'orden']
        unique_together = [['circuito', 'orden']]