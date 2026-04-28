from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('projects/', views.projects, name='projects'),
    path('it/', views.it, name='it'),
    path('tech/', views.tech, name='tech'),
    path('contacts/', views.contacts_page, name='contacts'),
    path('submit-request/', views.submit_request, name='submit_request'),
    path('privacy/', views.privacy_policy, name='privacy_policy'),
    path('accept-cookies/', views.accept_cookies, name='accept_cookies'),
]