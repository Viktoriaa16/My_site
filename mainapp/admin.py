from django.contrib import admin
from django.contrib.auth.models import User, Group
from .models import ContactInfo, SiteStatistics, AboutInfo

# Регистрирую  свои модели из админки
@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ['id', 'phone', 'email', 'sakhalin_phone', 'address']
    fieldsets = (
        ('Офис в Ростове-на-Дону', {'fields': ('phone', 'email', 'address')}),
        ('Офис в Южно-Сахалинске', {'fields': ('sakhalin_phone', 'sakhalin_address')}),
    )
    def has_add_permission(self, request):
        if ContactInfo.objects.exists():
            return False
        return super().has_add_permission(request)
    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(SiteStatistics)
class SiteStatisticsAdmin(admin.ModelAdmin):
    list_display = ['id', 'years_experience', 'projects_completed', 'employees_count']
    fieldsets = (('Статистика компании', {'fields': ('years_experience', 'projects_completed', 'employees_count')}),)
    def has_add_permission(self, request):
        if SiteStatistics.objects.exists():
            return False
        return super().has_add_permission(request)
    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(AboutInfo)
class AboutInfoAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']
    fieldsets = (('О компании', {'fields': ('title', 'text')}),)
    def has_add_permission(self, request):
        if AboutInfo.objects.exists():
            return False
        return super().has_add_permission(request)
    def has_delete_permission(self, request, obj=None):
        return False


# Отключила ненужные модели 
try:
    from cookie_consent.models import CookieGroup, Cookie, LogItem
    admin.site.unregister(CookieGroup)
    admin.site.unregister(Cookie)
    admin.site.unregister(LogItem)
except (ImportError, admin.sites.NotRegistered):
    pass

try:
    admin.site.unregister(User)
    admin.site.unregister(Group)
except admin.sites.NotRegistered:
    pass