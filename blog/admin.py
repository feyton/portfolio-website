from django.contrib import admin

from .models import Category, Comment, Post, Service, Tag, SearchTerms


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('name', 'body', 'post', 'created_on', 'approved')
    list_filter = ('approved', 'created_on')
    search_fields = ('name', 'email', 'body')
    actions = ['approve_comments']

    def approve_comments(self, request, queryset):
        queryset.update(approved=True)


admin.site.register(Post)
admin.site.register(Category)
admin.site.register(Service)
admin.site.register(Tag)
admin.site.register(SearchTerms)
