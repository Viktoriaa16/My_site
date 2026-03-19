from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
from .models import ServiceRequest

def index(request):
    # Простая view без проверки аутентификации
    context = {
        'title': 'ДОНГИС | Ведущая инженерная компания России',
        'page_title': 'ДОНГИС - Ведущая инженерная компания России',
        'projects_count': 15  # Примерное количество проектов
    }
    return render(request, 'mainapp/index.html', context)

def services(request):
    # View для страницы услуг
    context = {
        'title': 'Услуги | ДОНГИС',
        'page_title': 'Наши услуги'
    }
    return render(request, 'mainapp/services.html', context)

@csrf_exempt
def submit_request(request):
    """
    Обработка формы заявки
    """
    if request.method == 'POST':
        full_name = request.POST.get('fullName')
        phone = request.POST.get('phone')
        email = request.POST.get('email')
        
        if not full_name or not phone:
            return JsonResponse({
                'success': False,
                'message': 'Пожалуйста, заполните имя и телефон'
            })
        
        try:
            service_request = ServiceRequest.objects.create(
                full_name=full_name,
                phone=phone,
                email=email if email else None
            )
            
            send_notification_email(service_request)
            
            return JsonResponse({
                'success': True,
                'message': 'Спасибо! Ваша заявка принята. Наш менеджер свяжется с вами.',
                'request_id': service_request.id
            })
            
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': f'Ошибка при сохранении: {str(e)}'
            })
    
    return JsonResponse({
        'success': False,
        'message': 'Метод не поддерживается'
    })

def send_notification_email(request_obj):
    """
    Отправка уведомления о новой заявке
    """
    subject = f'Новая заявка с сайта ДОНГИС #{request_obj.id}'
    
    message = f"""
Здравствуйте!

Поступила новая заявка с сайта ДОНГИС.

ДЕТАЛИ ЗАЯВКИ:
----------------
Номер заявки: {request_obj.id}
Как к вам обращаться: {request_obj.full_name}
Телефон: {request_obj.phone}
Почта: {request_obj.email or 'не указана'}
Дата и время: {request_obj.created_at.strftime('%d.%m.%Y %H:%M')}

ССЫЛКА ДЛЯ ПРОСМОТРА:
----------------
Для просмотра и обработки заявки перейдите в админ-панель:
http://127.0.0.1:8000/admin/mainapp/servicerequest/{request_obj.id}/change/

Или войдите в админку: http://127.0.0.1:8000/admin/

----------------
С уважением,
Ваш сайт ДОНГИС
"""
    
    admin_emails = [admin[1] for admin in settings.ADMINS]
    
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=admin_emails,
            fail_silently=False,
        )
    except Exception as e:
        print(f"Ошибка при отправке email: {e}")