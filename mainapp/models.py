from django.db import models
from django.utils import timezone

# Модель для контактной информации
class ContactInfo(models.Model):
    """Контактная информация сайта"""
    phone = models.CharField(max_length=20, verbose_name='Телефон')
    email = models.EmailField(verbose_name='Email')
    address = models.CharField(max_length=500, verbose_name='Адрес')
    working_hours = models.CharField(max_length=200, verbose_name='Часы работы', blank=True)
    map_link = models.URLField(verbose_name='Ссылка на карту', blank=True)
    
    # Социальные сети
    vk_link = models.URLField(verbose_name='VK', blank=True)
    telegram_link = models.URLField(verbose_name='Telegram', blank=True)
    
    class Meta:
        verbose_name = 'Контактная информация'
        verbose_name_plural = 'Контактная информация'
    
    def __str__(self):
        return f"Контакты (обновлено: {self.id})"
    
    def save(self, *args, **kwargs):
        # Ограничиваем создание только одной записи
        if not self.pk and ContactInfo.objects.exists():
            raise ValueError("Может существовать только одна запись контактов")
        super().save(*args, **kwargs)

# Модель для статистики на главной
class SiteStatistics(models.Model):
    """Статистика компании на главной странице"""
    years_experience = models.PositiveIntegerField(default=29, verbose_name='Лет опыта')
    projects_completed = models.PositiveIntegerField(default=1300, verbose_name='Реализованных проектов')
    federal_projects = models.PositiveIntegerField(default=520, verbose_name='Проектов федерального масштаба')
    employees_count = models.PositiveIntegerField(default=120, verbose_name='Количество сотрудников')
    
    # Дополнительные поля для будущего расширения
    regions_count = models.PositiveIntegerField(default=50, verbose_name='Регионов присутствия', blank=True, null=True)
    
    class Meta:
        verbose_name = 'Статистика компании'
        verbose_name_plural = 'Статистика компании'
    
    def __str__(self):
        return f"Статистика (обновлено: {self.id})"
    
    def save(self, *args, **kwargs):
        # Ограничиваем создание только одной записи
        if not self.pk and SiteStatistics.objects.exists():
            raise ValueError("Может существовать только одна запись статистики")
        super().save(*args, **kwargs)