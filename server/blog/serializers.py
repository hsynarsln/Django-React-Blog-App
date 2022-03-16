from django.utils.timezone import now
from rest_framework import serializers

from .models import Comment, Like, Post, PostView


class CommentSerializer(serializers.ModelSerializer):
    days_since_creation = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('id', 'post', 'user', 'content',
                  'createdDate', 'days_since_creation')

    def get_days_since_creation(self, obj):
        return (now() - obj.createdDate).days


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('id', 'post', 'user')


class PostViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostView
        fields = ('id', 'post', 'user')


class PostSerializer(serializers.ModelSerializer):
    days_since_creation = serializers.SerializerMethodField()
    createdDate = serializers.DateTimeField(write_only=True, required=False)
    comments = CommentSerializer(many=True, read_only=True)
    comment_count = serializers.SerializerMethodField()
    likes = LikeSerializer(many=True, write_only=True, required=False)
    like_count = serializers.SerializerMethodField()
    views = PostViewSerializer(many=True, write_only=True, required=False)
    view_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'user', 'title', 'content', 'image',
                  'createdDate', 'updatedDate', 'days_since_creation', 'category', 'likes', 'like_count', 'views', 'view_count', 'comment_count', 'comments')

    def get_days_since_creation(self, obj):
        return (now() - obj.createdDate).days

    def get_comment_count(self, obj):
        return obj.comments.count()

    def get_like_count(self, obj):
        return obj.likes.count()

    def get_view_count(self, obj):
        return obj.views.count()
