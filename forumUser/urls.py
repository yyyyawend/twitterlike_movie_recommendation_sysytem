from django.urls import path

from .views import UserAPI, RegisterAPI, LoginAPI

from knox import views as knox_views

urlpatterns = [
    path('api/user', UserAPI.as_view(), name='user'),
    path('api/register', RegisterAPI.as_view(), name='register'),
    path('api/login', LoginAPI.as_view(), name='login'),
    path('api/logout', knox_views.LogoutView.as_view(), name='logout'),
]
