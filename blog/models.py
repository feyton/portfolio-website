from autoslug.fields import AutoSlugField
from ckeditor_uploader.fields import RichTextUploadingField
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.utils.html import strip_tags
from django.utils.translation import ugettext_lazy as _

User = get_user_model()


class Service(models.Model):
    title = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = 'service'
        verbose_name_plural = 'services'


class Category(models.Model):
    title = models.CharField(max_length=255, blank=False)
    slug = AutoSlugField(populate_from='title',
                         unique=False, primary_key=False)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('category-view', kwargs={'pk': self.pk, 'title': self.slug})


class Tag(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('tag-view', kwargs={'pk': self.pk, 'name': self.name})


class Post(models.Model):
    author = models.ForeignKey(
        User, blank=True, null=True, on_delete=models.SET_NULL, related_name='posts')
    title = models.CharField(max_length=255, blank=False, null=False)
    slug = AutoSlugField(_('slug'), populate_from='title',
                         unique=True, primary_key=False)
    category = models.ForeignKey(
        Category, blank=True, null=True, on_delete=models.SET_NULL, related_name='posts')
    content = RichTextUploadingField(_('content'), blank=True, null=True)
    summary = models.TextField(blank=True, null=True)
    published = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    published_date = models.DateField(
        auto_now_add=False, blank=True, null=True)
    tags = models.ManyToManyField(
        Tag, blank=True, related_name="posts")
    thumbnail = models.ImageField(
        upload_to='blog', blank=True, null=True, default='/blog/default.jpg')
    visits = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('blog-detail', kwargs={'pk': self.pk, 'title': self.slug})

    def save(self, *args, **kwargs):
        if self.published and not self.published_date:
            self.published_date = timezone.now()
        if not self.published and self.published_date is not None:
            self.published_date = None
        if not self.summary and self.content:
            text = strip_tags(self.content)
            if len(text) > 200:
                text = '%s ...' % text[:200]
            self.summary = text
        super().save(*args, **kwargs)


class Comment(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    email = models.EmailField(max_length=255, blank=False, null=False)
    body = models.TextField(blank=False, null="False")
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, null=False, blank=False, related_name='comments')
    created_on = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return self.name


class SearchTerms(models.Model):
    term = models.CharField(max_length=255, blank=False, null=False)
    slug = AutoSlugField(_('slug'), populate_from='term')

    def __str__(self):
        return self.term[:20]

    def slug_term(self):
        slug = self.term.replace(" ", "+")
        return slug

    def get_absolute_url(self):
        return "/blog/search/?q=%s" % self.term
