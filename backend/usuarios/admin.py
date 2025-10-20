from django.contrib import admin
from .models import Usuario

# Register your models here.

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email', 'uvus', 'grado']
    search_fields = ['first_name', 'email', 'uvus']
    list_filter = ['grado', 'is_active', 'is_staff']
    ordering = ['-date_joined']
