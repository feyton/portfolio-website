from decouple import config

from .base import *
DEBUG = config('DEBUG', cast=bool, default=False)
ALLOWED_HOSTS = ['feyton.co.rw', 'www.feyton.co.rw', "127.0.0.1", "localhost", '198.54.116.172']
SECRET_KEY = config('SECRET_KEY')



STATIC_URL = '/static/'
STATIC_ROOT = '/home/igityopp/feyton.co.rw/static'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]


MEDIA_URL = '/media/'
MEDIA_ROOT = '/home/igityopp/feyton.co.rw/media'
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'igityopp_blog',
        'USER': 'igityopp_fahrer',
        'PASSWORD': config("DB_PASS"),
        'HOST': '127.0.0.1',
        'PORT': '3306',
        'OPTIONS': {
            'sql_mode': 'STRICT_TRANS_TABLES',
        }
    }
}

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

SECURE_SSL_REDIRECT = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
ADMINS = (('Feyton', 'info@feyton.co.rw'),)

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = '198.54.116.172'
EMAIL_PORT = '465'
EMAIL_HOST_USER = 'no-reply@feyton.co.rw'
EMAIL_HOST_PASSWORD = config('HOST_PASS', cast=str)
EMAIL_USE_TLS = False
EMAIL_USE_SSL = True

DEFAULT_FROM_EMAIL = EMAIL_HOST_USER



AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]