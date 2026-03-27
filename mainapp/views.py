from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from .models import ContactInfo, SiteStatistics
import re

def index(request):
    """Главная страница"""
    contacts = ContactInfo.objects.first()
    stats = SiteStatistics.objects.first()
    
    if not contacts:
        contacts = ContactInfo.objects.create(
            phone='+7 (988) 898-16-04',
            email='info@don-gis.ru',
            address='Россия, г. Ростов-на-Дону, пер. Братский 48/19, оф. 3,4.'
        )
    
    if not stats:
        stats = SiteStatistics.objects.create(
            years_experience=29,
            projects_completed=1300,
            federal_projects=520,
            employees_count=120,
            regions_count=50
        )
    
    context = {
        'title': 'ДОНГИС | Ведущая инженерная компания России',
        'page_title': 'ДОНГИС - Ведущая инженерная компания России',
        'contacts': contacts,
        'stats': stats,
    }
    return render(request, 'mainapp/index.html', context)


   

def projects(request):
    """Страница проектов"""
    contacts = ContactInfo.objects.first()
    
    if not contacts:
        contacts = ContactInfo.objects.create(
            phone='+7 (988) 898-16-04',
            email='info@don-gis.ru',
            address='Россия, г. Ростов-на-Дону, пер. Братский 48/19, оф. 3,4.'
        )
    
    context = {
        'title': 'Проекты | ДОНГИС',
        'page_title': 'Наши проекты',
        'contacts': contacts,
    }
    return render(request, 'mainapp/projects.html', context)

def it(request):
    """Страница IT технологий"""
    contacts = ContactInfo.objects.first()
    
    if not contacts:
        contacts = ContactInfo.objects.create(
            phone='+7 (988) 898-16-04',
            email='info@don-gis.ru',
            address='Россия, г. Ростов-на-Дону, пер. Братский 48/19, оф. 3,4.'
        )
    
    context = {
        'title': 'IT технологии | ДОНГИС',
        'page_title': 'IT технологии',
        'contacts': contacts,
    }
    return render(request, 'mainapp/it.html', context)

def tech(request):
    """Страница технического оснащения"""
    contacts = ContactInfo.objects.first()
    
    if not contacts:
        contacts = ContactInfo.objects.create(
            phone='+7 (988) 898-16-04',
            email='info@don-gis.ru',
            address='Россия, г. Ростов-на-Дону, пер. Братский 48/19, оф. 3,4.'
        )
    
    context = {
        'title': 'Техническое оснащение | ДОНГИС',
        'page_title': 'Техническое оснащение',
        'contacts': contacts,
    }
    return render(request, 'mainapp/tech.html', context)

def contacts(request):
    """Страница контактов"""
    contacts = ContactInfo.objects.first()
    
    if not contacts:
        contacts = ContactInfo.objects.create(
            phone='+7 (988) 898-16-04',
            email='info@don-gis.ru',
            address='Россия, г. Ростов-на-Дону, пер. Братский 48/19, оф. 3,4.'
        )
    
    context = {
        'title': 'Контакты | ДОНГИС',
        'page_title': 'Контакты',
        'contacts': contacts,
    }
    return render(request, 'mainapp/contacts.html', context)

def validate_phone(phone):
    """Проверка формата телефона"""
    phone_regex = r'^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$'
    return re.match(phone_regex, phone) is not None

def validate_subject(subject):
    """Проверка темы обращения (только не пустая)"""
    return subject and subject.strip() != ''

@csrf_exempt
def submit_request(request):
    """
    Обработка формы заявки - отправка на почту
    """
    if request.method == 'POST':
        phone = request.POST.get('phone')
        subject_text = request.POST.get('subject')
        
        errors = []
        
        if not phone:
            errors.append('phone')
        elif not validate_phone(phone):
            errors.append('phone')
        
        if not subject_text:
            errors.append('subject')
        elif not validate_subject(subject_text):
            errors.append('subject')
        
        if errors:
            return JsonResponse({
                'success': False,
                'errors': errors
            })
        
        try:
            send_notification_email(phone, subject_text)
            return JsonResponse({
                'success': True
            })
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': 'server'
            })
    
    return JsonResponse({
        'success': False,
        'error': 'method'
    })

def send_notification_email(phone, subject_text):
    """
    Отправка заявки на почту администраторам
    """
    email_subject = f'🆕 Новая заявка с сайта ДОНГИС: {subject_text[:50]}'
    
    message = f"""
Здравствуйте!

Поступила новая заявка с сайта ДОНГИС.

ДЕТАЛИ ЗАЯВКИ:
----------------
Телефон: {phone}
Тема обращения: {subject_text}
Дата и время: {timezone.now().strftime('%d.%m.%Y %H:%M')}

----------------
С уважением,
Ваш сайт ДОНГИС
"""
    
    admin_emails = [admin[1] for admin in settings.ADMINS]
    
    try:
        send_mail(
            subject=email_subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=admin_emails,
            fail_silently=False,
        )
        print(f"Письмо отправлено на {admin_emails}")
    except Exception as e:
        print(f"Ошибка при отправке email: {e}")
        raise e