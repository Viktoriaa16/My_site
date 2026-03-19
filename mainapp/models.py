from django.db import models
from django.utils import timezone

class ServiceRequest(models.Model):
    # Статусы заявки
    STATUS_CHOICES = [
        ('new', '🆕 Новая'),
        ('read', '👁️ Прочитано'),
        ('in_progress', '⚙️ В обработке'),
        ('completed', '✅ Завершена'),
        ('rejected', '❌ Отклонена'),
    ]
    
    full_name = models.CharField(
        max_length=255,
        verbose_name='Как к вам обращаться'
    )
    
    phone = models.CharField(
        max_length=20,
        verbose_name='Телефон'
    )
    
    email = models.EmailField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name='Почта'
    )
    
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='new',
        verbose_name='Статус'
    )
    
    admin_comment = models.TextField(
        blank=True,
        null=True,
        verbose_name='Комментарий администратора'
    )
    
    created_at = models.DateTimeField(
        default=timezone.now,
        verbose_name='Дата заявки'
    )
    
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Дата обновления'
    )
    
    class Meta:
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.full_name} - {self.phone}"
    
    def get_status_display(self):
        return dict(self.STATUS_CHOICES).get(self.status, self.status)