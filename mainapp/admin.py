from django.contrib import admin
from django.core.mail import send_mail
from django.conf import settings
from django.contrib import messages
from django.shortcuts import redirect, render
from django.urls import path
from .models import ServiceRequest

@admin.register(ServiceRequest)
class ServiceRequestAdmin(admin.ModelAdmin):
    # Обычные поля без цвета
    list_display = [
        'id', 
        'full_name', 
        'phone', 
        'email', 
        'status',  # Просто статус без цвета
        'created_at'
    ]
    
    # По каким полям можно кликнуть
    list_display_links = ['id', 'full_name']
    
    # Фильтры справа
    list_filter = ['status', 'created_at']
    
    # Поиск
    search_fields = ['full_name', 'phone', 'email']
    
    # Сортировка
    ordering = ['-created_at']
    
    # Какие поля редактировать прямо в списке
    list_editable = ['status']  # Теперь работает, потому что status есть в list_display
    
    # Добавляем действия
    actions = ['mark_as_read', 'mark_as_unread', 'send_email_response']
    
    # Действие: отметить как прочитанное
    def mark_as_read(self, request, queryset):
        updated = queryset.update(status='read')
        self.message_user(
            request, 
            f'{updated} заявок отмечено как прочитанные',
            messages.SUCCESS
        )
    mark_as_read.short_description = "✅ Отметить как прочитанное"
    
    # Действие: отметить как новое
    def mark_as_unread(self, request, queryset):
        updated = queryset.update(status='new')
        self.message_user(
            request, 
            f'{updated} заявок отмечено как новые',
            messages.SUCCESS
        )
    mark_as_unread.short_description = "🔄 Отметить как новое"
    
    # Действие: отправить ответ на почту
    def send_email_response(self, request, queryset):
        # Сохраняем ID выбранных заявок в сессии
        request.session['selected_requests'] = [obj.id for obj in queryset]
        
        # Перенаправляем на страницу отправки ответа
        return redirect('admin:send-response')
    
    send_email_response.short_description = "✉️ Отправить ответ на почту"
    
    # Кастомные URL
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                'send-response/',
                self.admin_site.admin_view(self.send_response_view),
                name='send-response',
            ),
        ]
        return custom_urls + urls
    
    def send_response_view(self, request):
        if request.method == 'POST':
            # Получаем данные из формы
            recipient_email = request.POST.get('email')
            subject = request.POST.get('subject')
            message_body = request.POST.get('message')
            request_id = request.POST.get('request_id')
            
            if not recipient_email or not subject or not message_body:
                messages.error(request, 'Пожалуйста, заполните все поля')
                return redirect('..')
            
            try:
                # Отправляем письмо
                send_mail(
                    subject=subject,
                    message=message_body,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[recipient_email],
                    fail_silently=False,
                )
                
                # Помечаем заявку как обработанную
                if request_id:
                    ServiceRequest.objects.filter(id=request_id).update(status='completed')
                
                messages.success(request, f'Ответ успешно отправлен на {recipient_email}')
                return redirect('..')
                
            except Exception as e:
                messages.error(request, f'Ошибка при отправке: {str(e)}')
                return redirect('..')
        
        # GET запрос - показываем форму
        selected_ids = request.session.get('selected_requests', [])
        requests_data = ServiceRequest.objects.filter(id__in=selected_ids)
        
        context = {
            'requests': requests_data,
            'title': 'Отправить ответ клиенту',
        }
        return render(request, 'admin/send_response.html', context)