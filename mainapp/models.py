from django.db import models
from django.utils import timezone

class ServiceRequest(models.Model):
    # Статусы заявки
    STATUS_CHOICES = [
        ('new', '🆕 Новая'),
        ('in_progress', '⚙️ В обработке'),
        ('completed', '✅ Завершена'),
        ('rejected', '❌ Отклонена'),
        ('reviewed', '👁️ Рассмотрено'),  # добавил "рассмотрено"
    ]
    
    # Только телефон
    phone = models.CharField(
        max_length=20,
        verbose_name='Телефон'
    )
    
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='new',  # по умолчанию новая
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
        ordering = ['-created_at']  # новые сверху
    
    def __str__(self):
        return f"Заявка #{self.id} - {self.phone}"