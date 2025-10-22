from django.contrib import admin
from .models import Bloque, CircuitoGenerado, PreguntaGenerada
# Register your models here.

@admin.register(Bloque)
class BloqueAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'descripcion', 'orden', 'contenido_teoria', 'imagen_portada', 'fecha_creacion']
    search_fields = ['titulo', 'descripcion']
    list_filter = ['fecha_creacion']
    ordering = ['orden']

@admin.register(CircuitoGenerado)
class CircuitoGeneradoAdmin(admin.ModelAdmin):
    list_display = ['id', 'bloque', 'filas', 'columnas', 'fecha_generacion']
    search_fields = ['bloque__titulo']
    list_filter = ['bloque', 'fecha_generacion', 'filas', 'columnas']
    ordering = ['-fecha_generacion']
    readonly_fields = ['fecha_generacion', 'nodes', 'edges']

@admin.register(PreguntaGenerada)
class PreguntaGeneradaAdmin(admin.ModelAdmin):
    list_display = ['orden', 'circuito', 'tipo_pregunta', 'puntos', 'componente_relacionado']
    search_fields = ['texto_pregunta']
    list_filter = ['circuito__bloque', 'tipo_pregunta']
    ordering = ['circuito', 'orden']