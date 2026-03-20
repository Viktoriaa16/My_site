from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
from .models import ServiceRequest

def index(request):
    context = {
        'title': 'ДОНГИС | Ведущая инженерная компания России',
        'page_title': 'ДОНГИС - Ведущая инженерная компания России',
    }
    return render(request, 'mainapp/index.html', context)

def services(request):
    context = {
        'title': 'Услуги | ДОНГИС',
        'page_title': 'Наши услуги'
    }
    return render(request, 'mainapp/services.html', context)

@csrf_exempt
def submit_request(request):
    """
    Обработка формы заявки (только телефон)
    """
    if request.method == 'POST':
        phone = request.POST.get('phone')
        
        if not phone:
            return JsonResponse({
                'success': False,
                'message': 'Пожалуйста, укажите номер телефона'
            })
        
        try:
            # Создаем заявку - статус автоматически 'new'
            service_request = ServiceRequest.objects.create(
                phone=phone
            )
            
            # ОТПРАВЛЯЕМ УВЕДОМЛЕНИЕ АДМИНУ (эту строку вернули)
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
    Отправка уведомления о новой заявке (ТОЛЬКО АДМИНУ)
    """
    subject = f'🆕 Новая заявка с сайта ДОНГИС #{request_obj.id}'
    
    message = f"""
Здравствуйте!

Поступила новая заявка с сайта ДОНГИС.

ДЕТАЛИ ЗАЯВКИ:
----------------
Номер заявки: {request_obj.id}
Телефон: {request_obj.phone}
Статус: Новая
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
    
    # Отправляем администраторам сайта
    admin_emails = [admin[1] for admin in settings.ADMINS]
    
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=admin_emails,
            fail_silently=False,
        )
        print(f"Письмо отправлено на {admin_emails}")
    except Exception as e:
        print(f"Ошибка при отправке email: {e}")