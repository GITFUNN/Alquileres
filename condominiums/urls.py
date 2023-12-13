from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from . import views

urlpatterns = [
   path('', views.get_condominiums),
   path('get/<int:pk>/', views.get_condominiumid),
   path('post/', views.create_condominium),
   path('edit/<int:pk>/', views.edit_condominium),
   path('delete/<int:pk>/', views.delete_condominium),
   path('apartments/<int:pk>/', views.create_apartment),
   path('get_apartments/<int:pk>/', views.get_apartments),
   path('get_solo_apartment/<int:pk>/', views.get_apartment),
   path('delete_apartment/<int:pk>/', views.delete_apartment),
   path('edit_apartment/<int:pk>/', views.edit_apartment),
   
]

