"""
URL configuration for myproject project.
"""
from django.contrib import admin
from django.urls import path, include  # Добавьте include
from django.conf import settings
from django.conf.urls.static import static
# для доступности куки в админке (убраны)
try:
    from cookie_consent.models import CookieGroup, Cookie, LogItem
    admin.site.unregister(CookieGroup)
    admin.site.unregister(Cookie)
    admin.site.unregister(LogItem)
except:
    pass

try:
    from django.contrib.auth.models import User, Group
    admin.site.unregister(User)
    admin.site.unregister(Group)
except:
    pass
###
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('mainapp.urls')),  # Подключаем urls из приложения
    path('cookies/', include('cookie_consent.urls')),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)