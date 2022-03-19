from django.contrib.auth.models import User
from django.utils.timezone import now
from rest_framework import serializers

from .models import Comment, Like, Post, PostView


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


class CommentSerializer(serializers.ModelSerializer):
    days_since_creation = serializers.SerializerMethodField()
    user = UserSerializer(write_only=True, required=False)
    author = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('id', 'post', 'user', 'author', 'content',
                  'createdDate', 'days_since_creation')

    def get_days_since_creation(self, obj):
        return (now() - obj.createdDate).days

    def get_author(self, obj):
        return obj.user.first_name + ' ' + obj.user.last_name

    def create(self, validated_data):
        user = self.context['request'].user
        if 'user' in validated_data:
            user = validated_data['user']
        return Comment.objects.create(user=user, **validated_data)


class LikeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Like
        fields = ('id', 'post', 'user')

    def create(self, validated_data):
        user = self.context['request'].user
        if 'user' in validated_data:
            user = validated_data['user']
        return Like.objects.create(user=user, **validated_data)


class PostViewSerializer(serializers.ModelSerializer):
    user = UserSerializer(write_only=True, required=False)

    class Meta:
        model = PostView
        fields = ('id', 'post', 'user')

    def create(self, validated_data):
        user = self.context['request'].user
        if 'user' in validated_data:
            user = validated_data['user']
        return PostView.objects.create(user=user, **validated_data)


class PostSerializer(serializers.ModelSerializer):
    days_since_creation = serializers.SerializerMethodField()
    createdDate = serializers.DateTimeField(write_only=True, required=False)
    comments = CommentSerializer(many=True, read_only=True)
    comment_count = serializers.SerializerMethodField()
    likes = LikeSerializer(many=True, required=False)
    like_count = serializers.SerializerMethodField()
    views = PostViewSerializer(many=True, write_only=True, required=False)
    view_count = serializers.SerializerMethodField()
    user = UserSerializer(write_only=True, required=False)
    author = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'user', 'author', 'title', 'content', 'image',
                  'createdDate', 'updatedDate', 'days_since_creation', 'category', 'likes', 'like_count', 'views', 'view_count', 'comment_count', 'comments')

    def get_days_since_creation(self, obj):
        return (now() - obj.createdDate).days

    def get_comment_count(self, obj):
        return obj.comments.count()

    def get_like_count(self, obj):
        return obj.likes.count()

    def get_view_count(self, obj):
        return obj.views.count()

    def get_author(self, obj):
        return obj.user.first_name + ' ' + obj.user.last_name
