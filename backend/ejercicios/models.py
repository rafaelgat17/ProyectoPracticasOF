from django.db import models
from django.conf import settings
from contenidos.models import CircuitoGenerado, Bloque

# Create your models here.

class Sesion(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sesiones')
    fecha_inicio = models.DateTimeField(auto_now_add=True)
    fecha_fin = models.DateTimeField(blank=True, null=True)
    duracion_minutos = models.IntegerField(blank=True, null=True)
    activa = models.BooleanField(default=True)
    
    def __str__(self):
        return f"Sesión de {self.usuario.email} - {self.fecha_inicio}"
    
    class Meta:
        db_table = 'ejercicios_sesion'
        verbose_name = 'Sesion'
        verbose_name_plural = 'Sesiones'
        ordering = ['-fecha_inicio']


class Intento(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='intentos')
    circuito = models.ForeignKey('contenidos.CircuitoGenerado', on_delete=models.CASCADE, related_name='intentos')
    bloque = models.ForeignKey('contenidos.Bloque', on_delete=models.CASCADE, related_name='intentos')
    fecha_inicio = models.DateTimeField(auto_now_add=True)
    fecha_fin = models.DateTimeField(blank=True, null=True)
    tiempo_segundos = models.IntegerField(blank=True, null=True)
    completado = models.BooleanField(default=False)
    puntuacion_obtenida = models.IntegerField(default=0)
    puntuacion_maxima = models.IntegerField(default=0)
    porcentaje_acierto = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.usuario.email} - {self.circuito.titulo}"
    
    class Meta:
        db_table = 'ejercicios_intento'
        verbose_name = 'Intento'
        verbose_name_plural = 'Intentos'
        ordering = ['-fecha_inicio']

class RespuestaUsuario(models.Model):
    intento = models.ForeignKey(Intento, on_delete=models.CASCADE, related_name='respuestas')
    pregunta = models.ForeignKey('contenidos.PreguntaGenerada', on_delete=models.CASCADE, related_name='respuestas_usuarios')
    respuesta_dada = models.TextField(max_length=255)
    correcta = models.BooleanField()
    tiempo_respuesta_segundos = models.IntegerField(blank=True, null=True)
    fecha_respuesta = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Respuesta de {self.intento.usuario.email} a {self.pregunta.texto_pregunta[:30]}"
    
    class Meta:
        db_table = 'ejercicios_respuestausuario'
        verbose_name = 'Respuesta de Usuario'
        verbose_name_plural = 'Respuestas de Usuarios'
        ordering = ['intento', 'pregunta']
        unique_together = [['intento', 'pregunta']]