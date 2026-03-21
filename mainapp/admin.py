from django.contrib import admin
from django.contrib import messages
from .models import ContactInfo, SiteStatistics

@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Основные контакты', {
            'fields': ('phone', 'email', 'address', 'working_hours', 'map_link')
        }),
        ('Социальные сети', {
            'fields': ('vk_link', 'telegram_link'),
            'classes': ('wide',)
        }),
    )
    
    def has_add_permission(self, request):
        # Запрещаем добавлять новые записи, если уже есть
        if ContactInfo.objects.exists():
            return False
        return super().has_add_permission(request)
    
    def has_delete_permission(self, request, obj=None):
        # Запрещаем удалять единственную запись
        return False

@admin.register(SiteStatistics)
class SiteStatisticsAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Статистика компании', {
            'fields': ('years_experience', 'projects_completed', 'federal_projects', 'employees_count', 'regions_count'),
            'description': 'Цифры, отображаемые на главной странице сайта'
        }),
    )
    
    def has_add_permission(self, request):
        # Запрещаем добавлять новые записи, если уже есть
        if SiteStatistics.objects.exists():
            return False
        return super().has_add_permission(request)
    
    def has_delete_permission(self, request, obj=None):
        # Запрещаем удалять единственную запись
        return False