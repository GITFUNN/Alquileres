from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from . import views

urlpatterns = [
  path('register/', views.Register.as_view()),
  path('login/', views.LoginView.as_view()),
  path('refresh/', TokenRefreshView.as_view()),
]

