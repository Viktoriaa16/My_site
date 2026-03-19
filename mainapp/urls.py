from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # Главная страница
    path('services/', views.services, name='services'),  # Страница услуг
    path('submit-request/', views.submit_request, name='submit_request'),  # Обработка формы
]