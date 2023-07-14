import os
from pathlib import Path

import dj_database_url
from decouple import config
from django.contrib.messages import constants as messages

BASE_DIR = Path(__file__).resolve().parent.parent

# Variables
MODE = config("MODE", default="production")
DEBUG = config("DEBUG", default=False)
ALLOWED_HOSTS = ["*"]
SECRET_KEY = config("SECRET_KEY", default="insecure-add-key")


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
    "django.contrib.humanize",
    "hitcount",
    "index",
    "blog",
    "user",
    "widget_tweaks",
    # CK Editor
    "ckeditor",
    "ckeditor_uploader",
    # AllAuth
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "django_gravatar",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "feyton.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "feyton.wsgi.application"
AUTH_USER_MODEL = "user.User"
LANGUAGE_CODE = "en-us"
TIME_ZONE = "Europe/Paris"
USE_I18N = True
USE_L10N = True
USE_TZ = True


# Static
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "asset"
STATICFILES_DIRS = [BASE_DIR / "static"]

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

CKEDITOR_JQUERY_URL = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"

CKEDITOR_UPLOAD_PATH = "uploads/"
CKEDITOR_IMAGE_BACKEND = "pillow"
CKEDITOR_RESTRICT_BY_USER = True
CKEDITOR_BROWSE_SHOW_DIRS = True
CKEDITOR_UPLOAD_SLUGIFY_FILENAME = False

CKEDITOR_CONFIGS = {
    "default": {
        "toolbar": None,
    },
}

SITE_ID = 1

# REGISTRATION-LOGIN URLS
LOGIN_URL = "account_login"
LOGOUT_URL = "account_logout"
LOGIN_REDIRECT_URL = "home"

AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    # `allauth` specific authentication methods, such as login by e-mail
    "allauth.account.auth_backends.AuthenticationBackend",
)

# All Auth SETTINGS
SIGNUP_FORM_CLASS = "user.forms.CreateUserForm"
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = "mandatory"
ACCOUNT_LOGIN_ATTEMPTS_LIMIT = 5
ACCOUNT_LOGIN_ATTEMPTS_TIMEOUT = 300
ACCOUNT_SIGNUP_PASSWORD_ENTER_TWICE = True
SOCIALACCOUNT_AUTO_SIGNUP = True
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_LOGOUT_ON_GET = True
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_SESSION_REMEMBER = True
ACCOUNT_SIGNUP_FORM_CLASS = SIGNUP_FORM_CLASS
ACCOUNT_LOGIN_ON_EMAIL_COMFIRMATION = False
ACCOUNT_PASSWORD_INPUT_RENDER_VALUE = True
ACCOUNT_EMAIL_SUBJECT_PREFIX = "Feyton Inc |"


def ACCOUNT_USER_DISPLAY(user):
    return user.get_full_name()


MESSAGE_TAGS = {
    messages.ERROR: "danger",
}

HITCOUNT_KEEP_HIT_ACTIVE = 2
HITCOUNT_HITS_PER_IP_LIMIT = 10
GRAVATAR_DEFAULT_IMAGE = "https://res.cloudinary.com/feyton/image/upload/v1653155678/zpvyjo3vpemjrjwikcyc.jpg"

if MODE == "dev":
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
        }
    }
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
    EMAIL_HOST_USER = "no-reply@feyton.co.rw"
    DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

if MODE == "production":
    STATIC_URL = "/static/"
    STATIC_ROOT = "/var/www/feyton.co.rw/static"

    MEDIA_URL = "/media/"
    MEDIA_ROOT = "/var/www/feyton.co.rw/media"
    DATABASES = {"default": dj_database_url.parse(config("DATABASE_URL", default=""))}
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    ADMINS = (("Feyton", "info@feyton.co.rw"),)
    EMAIL_HOST_USER = "no-reply@feyton.co.rw"
    DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
    EMAIL_BACKEND = "anymail.backends.mailjet.EmailBackend"
    ANYMAIL = {
        "MAILJET_API_KEY": config("MAILJET_API_KEY", default=""),
        "MAILJET_SECRET_KEY": config("MAILJET_SECRET_KEY", default=""),
    }
    ALLOWED_HOSTS = [
        "*.feyton.co.rw",
    ]

CSRF_TRUSTED_ORIGINS = [
    "https://feyton.co.rw",
    "https://*.feyton.co.rw",
    "http://*.feyton.co.rw",
]
