from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("index.urls")),
    path("blog/", include("blog.urls")),
    # path('ckeditor', include('ckeditor_uploader.urls')),
    path("accounts/", include("allauth.urls")),
    path("users/", include("user.urls")),
    path(r"hitcount/", include("hitcount.urls", namespace="hitcount")),
    path(
        "ckeditor5/", include("django_ckeditor_5.urls"), name="ck_editor_5_upload_file"
    ),
]


if settings.DEBUG:
    urlpatterns += static(
        settings.STATIC_URL, document_root=settings.STATIC_ROOT
    ) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
