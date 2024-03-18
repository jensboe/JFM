"""
Django settings for jfm project.

Generated by 'django-admin startproject' using Django 4.1.5.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path
from jfm.base_settings import *


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'asdf'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1'
]
