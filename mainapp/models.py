from django.db import models
from django.utils import timezone


class ContactInfo(models.Model):
    """Контактная информация сайта"""
    # Ростов-на-Дону
    phone = models.CharField(max_length=20, verbose_name='Телефон (Ростов-на-Дону)')
    email = models.EmailField(verbose_name='Email (Ростов-на-Дону)')
    address = models.CharField(max_length=500, verbose_name='Адрес (Ростов-на-Дону)')
    
    # Южно-Сахалинск
    sakhalin_phone = models.CharField(max_length=20, verbose_name='Телефон (Южно-Сахалинск)', blank=True, null=True)
    sakhalin_address = models.CharField(max_length=500, verbose_name='Адрес (Южно-Сахалинск)', blank=True, null=True)
    
    class Meta:
        verbose_name = 'Контактная информация'
        verbose_name_plural = 'Контактная информация'
    
    def __str__(self):
        return "Контактная информация сайта"
    
    def save(self, *args, **kwargs):
        if not self.pk and ContactInfo.objects.exists():
            raise ValueError("Может существовать только одна запись контактов")
        super().save(*args, **kwargs)


class SiteStatistics(models.Model):
    """Статистика компании на главной странице"""
    years_experience = models.PositiveIntegerField(default=29, verbose_name='Лет опыта')
    projects_completed = models.PositiveIntegerField(default=1300, verbose_name='Проектов федерального масштаба')
    employees_count = models.PositiveIntegerField(default=120, verbose_name='Количество сотрудников')
    
    
    class Meta:
        verbose_name = 'Статистика компании'
        verbose_name_plural = 'Статистика компании'
    
    def __str__(self):
        return "Статистика компании"
    
    def save(self, *args, **kwargs):
        if not self.pk and SiteStatistics.objects.exists():
            raise ValueError("Может существовать только одна запись статистики")
        super().save(*args, **kwargs)


class AboutInfo(models.Model):
    """Информация о компании на главной странице"""
    title = models.CharField(max_length=200, default='О компании', verbose_name='Заголовок раздела')
    text = models.TextField(verbose_name='Текст о компании')
    
    class Meta:
        verbose_name = 'О компании'
        verbose_name_plural = 'О компании'
    
    def __str__(self):
        return "О компании"
    
    def save(self, *args, **kwargs):
        if not self.pk and AboutInfo.objects.exists():
            raise ValueError("Может существовать только одна запись раздела 'О компании'")
        super().save(*args, **kwargs)