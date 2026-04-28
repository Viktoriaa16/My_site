from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from .models import ContactInfo, SiteStatistics, AboutInfo
import re
from django.shortcuts import redirect

@csrf_exempt
def accept_cookies(request):
    """Принятие cookie - редирект обратно на страницу"""
    if request.method == 'POST':
        next_url = request.POST.get('next', '/')
        response = redirect(next_url)
        response.set_cookie('cookie_consent', 'accepted', max_age=365*24*60*60)
        return response
    return redirect('/')

def index(request):
    """Главная страница"""
    contacts = ContactInfo.objects.first()
    stats = SiteStatistics.objects.first()
    about_info = AboutInfo.objects.first()
    
    if not contacts:
        contacts = ContactInfo.objects.create(
            office_title='Офис в Ростове-на-Дону',
            office_phone='+7 (988) 898-16-04',
            office_email='info@don-gis.ru',
            office_address='Россия, г. Ростов-на-Дону, пер. Братский 48/19, оф. 3,4.',
            employment_title='По вопросам трудоустройства',
            employment_person='Чертопалова Ольга Сергеевна',
            employment_phone='+7 (863) 322-02-82 доб. 191<br>+7 (928) 127-14-83',
            employment_email='o.chertopalova@don-gis.ru'
        )
    
    if not stats:
        stats = SiteStatistics.objects.create(
            years_experience=29,
            projects_completed=1300,
            employees_count=120,
        )
    
    if not about_info:
        about_info = AboutInfo.objects.create(
            title='О компании',
            text='<strong>ДОНГИС</strong> — одна из ведущих инженерных компаний, выполняющая работы по всей России и стран ближнего зарубежья. Разнообразие и широкая география проектов подтверждают уникальный опыт в каждой из экспертных областей и готовность решать поставленные задачи даже в непростых условиях.\n\nОсновными направлениями деятельности компании являются кадастровые и землеустроительные работы, полный комплекс инженерных изысканий, проектные и строительные работы. Гарантом профессионализма и надежности являются партнеры и постоянные клиенты на территории России и других стран.'
        )
    
    context = {
        'title': 'ДОНГИС | Ведущая инженерная компания России',
        'page_title': 'ДОНГИС - Ведущая инженерная компания России',
        'contacts': contacts,
        'stats': stats,
        'about_info': about_info,
    }
    return render(request, 'mainapp/index.html', context)


def services(request):
    """Страница контактов"""
    contacts = ContactInfo.objects.first()
    
    if not contacts:
        contacts = ContactInfo.objects.create(
            office_title='Офис в Ростове-на-Дону',
            office_phone='+7 (988) 898-16-04',
            office_email='info@don-gis.ru',
            office_address='Россия, г. Ростов-на-Дону, пер. Братский 48/19, оф. 3,4.',
            employment_title='По вопросам трудоустройства',
            employment_person='Чертопалова Ольга Сергеевна',
            employment_phone='+7 (863) 322-02-82 доб. 191<br>+7 (928) 127-14-83',
            employment_email='o.chertopalova@don-gis.ru'
        )
    
    context = {
        'title': 'Услуги | ДОНГИС',
        'page_title': 'Наши услуги',
        'contacts': contacts,
    }
    return render(request, 'mainapp/services.html', context)

def privacy_policy(request):
    """Страница политики конфиденциальности"""
    contacts = ContactInfo.objects.first()
    
    if not contacts:
        contacts = ContactInfo.objects.create(
            phone='+7 (988) 898-16-04',
            email='info@don-gis.ru',
            address='Россия, г. Ростов-на-Дону, пер. Братский 48/19, оф. 3,4.'
        )
    
    context = {
        'title': 'Политика обработки персональных данных | ДОНГИС',
        'page_title': 'Политика обработки персональных данных',
        'contacts': contacts,
    }
    return render(request, 'mainapp/privacy.html', context)


def projects(request):
    """Страница проектов"""
    contacts = ContactInfo.objects.first()
    
    if not contacts:
        contacts = ContactInfo.objects.create(
        phone='+7 (863) 322-02-82',
        email='info@don-gis.ru',
        address='Россия, г. Ростов-на-Дону, пер. Братский 48/19, оф. 3,4.',
        sakhalin_phone='+7 (4242) 43-63-08',
        sakhalin_address='г. Южно-Сахалинск, ул. Хабаровская, д.2'
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
            office_title='Офис в Ростове-на-Дону',
            office_phone='+7 (988) 898-16-04',
            office_email='info@don-gis.ru',
            office_address='Россия, г. Ростов-на-Дону, пер. Братский 48/19, оф. 3,4.',
            employment_title='По вопросам трудоустройства',
            employment_person='Чертопалова Ольга Сергеевна',
            employment_phone='+7 (863) 322-02-82 доб. 191<br>+7 (928) 127-14-83',
            employment_email='o.chertopalova@don-gis.ru'
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
            office_title='Офис в Ростове-на-Дону',
            office_phone='+7 (988) 898-16-04',
            office_email='info@don-gis.ru',
            office_address='Россия, г. Ростов-на-Дону, пер. Братский 48/19, оф. 3,4.',
            employment_title='По вопросам трудоустройства',
            employment_person='Чертопалова Ольга Сергеевна',
            employment_phone='+7 (863) 322-02-82 доб. 191<br>+7 (928) 127-14-83',
            employment_email='o.chertopalova@don-gis.ru'
        )
    
    context = {
        'title': 'Техническое оснащение | ДОНГИС',
        'page_title': 'Техническое оснащение',
        'contacts': contacts,
    }
    return render(request, 'mainapp/tech.html', context)


def contacts_page(request):
    """Страница контактов"""
    contacts = ContactInfo.objects.first()
    
    if not contacts:
        contacts = ContactInfo.objects.create(
            office_title='Офис в Ростове-на-Дону',
            office_phone='+7 (988) 898-16-04',
            office_email='info@don-gis.ru',
            office_address='Россия, г. Ростов-на-Дону, пер. Братский 48/19, оф. 3,4.',
            employment_title='По вопросам трудоустройства',
            employment_person='Чертопалова Ольга Сергеевна',
            employment_phone='+7 (863) 322-02-82 доб. 191<br>+7 (928) 127-14-83',
            employment_email='o.chertopalova@don-gis.ru'
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


@csrf_exempt
def submit_request(request):
    """Обработка формы заявки - отправка на почту"""
    if request.method == 'POST':
        name = request.POST.get('name', '')
        phone = request.POST.get('phone', '')
        topic = request.POST.get('topic', '')
        custom_topic = request.POST.get('custom_topic', '')
        message = request.POST.get('message', '')
        consent = request.POST.get('consent', '')
        
        errors = []
        
        if not name or len(name.strip()) < 2:
            errors.append('name')
        
        if not phone:
            errors.append('phone')
        elif not validate_phone(phone):
            errors.append('phone')
        
        final_topic = topic
        if topic == 'other':
            if not custom_topic or len(custom_topic.strip()) < 2:
                errors.append('topic')
            else:
                final_topic = custom_topic
        elif not topic:
            errors.append('topic')
        
        if not message or len(message.strip()) < 10:
            errors.append('message')
        
        if not consent:
            errors.append('consent')
        
        if errors:
            return JsonResponse({
                'success': False,
                'errors': errors
            })
        
        try:
            send_notification_email(name, phone, final_topic, message)
            return JsonResponse({'success': True})
        except Exception as e:
            print(f"Ошибка: {e}")
            return JsonResponse({'success': False, 'error': 'server'})
    
    return JsonResponse({'success': False, 'error': 'method'})


def send_notification_email(name, phone, topic, message):
    """Отправка заявки на почту администраторам"""
    email_subject = f'🆕 Новая заявка с сайта ДОНГИС: {topic[:50]}'
    
    full_message = f"""
Здравствуйте!

Поступила новая заявка с сайта ДОНГИС.

ДЕТАЛИ ЗАЯВКИ:
----------------
Имя: {name}
Телефон: {phone}
Тема обращения: {topic}
Сообщение: {message}
Дата и время: {timezone.now().strftime('%d.%m.%Y %H:%M')}

----------------
С уважением,
Ваш сайт ДОНГИС
"""
    
    admin_emails = [admin[1] for admin in settings.ADMINS]
    
    try:
        send_mail(
            subject=email_subject,
            message=full_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=admin_emails,
            fail_silently=False,
        )
        print(f"Письмо отправлено на {admin_emails}")
    except Exception as e:
        print(f"Ошибка при отправке email: {e}")
        raise e