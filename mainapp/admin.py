from django.contrib import admin
from django.contrib import messages
from .models import ServiceRequest

@admin.register(ServiceRequest)
class ServiceRequestAdmin(admin.ModelAdmin):
    # Отображаемые поля
    list_display = [
        'id', 
        'phone', 
        'status', 
        'created_at'
    ]
    
    # Кликабельные поля
    list_display_links = ['id', 'phone']
    
    # Фильтры справа
    list_filter = ['status', 'created_at']
    
    # Поиск по телефону
    search_fields = ['phone']
    
    # Сортировка
    ordering = ['-created_at']
    
    # Поля для редактирования прямо в списке
    list_editable = ['status']
    
    # Поля для формы редактирования
    fieldsets = (
        ('Информация о заявке', {
            'fields': ('phone', 'status', 'created_at')
        }),
        ('Комментарий администратора', {
            'fields': ('admin_comment',),
            'classes': ('wide',),
        }),
    )
    
    # Только для чтения (дату создания нельзя менять)
    readonly_fields = ['created_at']
    
    # Действия над заявками
    actions = ['mark_as_new', 'mark_as_in_progress', 'mark_as_completed', 
               'mark_as_rejected', 'mark_as_reviewed']
    
    def mark_as_new(self, request, queryset):
        updated = queryset.update(status='new')
        self.message_user(
            request, 
            f'{updated} заявок отмечено как новые',
            messages.SUCCESS
        )
    mark_as_new.short_description = "🆕 Отметить как новые"
    
    def mark_as_in_progress(self, request, queryset):
        updated = queryset.update(status='in_progress')
        self.message_user(
            request, 
            f'{updated} заявок отмечено как в обработке',
            messages.SUCCESS
        )
    mark_as_in_progress.short_description = "⚙️ Отметить как в обработке"
    
    def mark_as_completed(self, request, queryset):
        updated = queryset.update(status='completed')
        self.message_user(
            request, 
            f'{updated} заявок отмечено как завершенные',
            messages.SUCCESS
        )
    mark_as_completed.short_description = "✅ Отметить как завершенные"
    
    def mark_as_rejected(self, request, queryset):
        updated = queryset.update(status='rejected')
        self.message_user(
            request, 
            f'{updated} заявок отмечено как отклоненные',
            messages.SUCCESS
        )
    mark_as_rejected.short_description = "❌ Отметить как отклоненные"
    
    def mark_as_reviewed(self, request, queryset):
        updated = queryset.update(status='reviewed')
        self.message_user(
            request, 
            f'{updated} заявок отмечено как рассмотренные',
            messages.SUCCESS
        )
    mark_as_reviewed.short_description = "👁️ Отметить как рассмотренные"
    
    # Цвета для статусов в админке
    def status(self, obj):
        colors = {
            'new': 'red',
            'in_progress': 'orange',
            'completed': 'green',
            'rejected': 'gray',
            'reviewed': 'blue',
        }
        return format_html(
            '<span style="color: {}; font-weight: bold;">{}</span>',
            colors.get(obj.status, 'black'),
            obj.get_status_display()
        )
    status.short_description = 'Статус'
    status.admin_order_field = 'status'