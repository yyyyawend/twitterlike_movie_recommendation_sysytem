from rest_framework import permissions
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.response import Response
from knox.models import AuthToken

from .models import ForumUser
from .serializers import UserSerializer, RegisterSerializer, ForumUserSerializer

from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView


# Register API
class RegisterAPI(GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class UserAPI(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        forumUser = ForumUser.objects.get(user_id=user.id)
        forumUser_serializer = ForumUserSerializer(forumUser)
        return Response({
            "user": forumUser_serializer.data,
            "token": AuthToken.objects.create(user)[1]
        })
