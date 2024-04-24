from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from . import views

urlpatterns = [
   path('login/', views.MyTokenObtainPairSerializer.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    path('register/', views.register),
    path('get/<str:email>/', views.get_user),
    path('get_sender/<int:pk>/', views.getSenderEmail),
]

