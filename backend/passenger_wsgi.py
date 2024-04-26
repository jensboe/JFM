"""
Miniconda3 installer doesn't work always.
Miniconda3-4.5.11-Linux-x86_64.sh is a working version

os.environ["HOME"] is the path which the normal ssh user sees as "~/".
But Pessenger isn't the user.
Therefor "/" becomes "/var/www/vhosts/hosting*user*.*server*.netcup.net/"

Create your app specific conda venv with 'conda create --name APP_SPECIFIC_VENV python=X'.
X Specifies the python version

This file in a recursive way.
'Some' interpreter will call this file.
If it doesnt match our defined interpreter it will call the defined interpreter.
If it match the defined interpreter it will run the normal application code.
"""
import os
import sys

## Change this & application specific code below
APP_SPECIFIC_VENV = "jfm_test"
PYTHON_VERSION = "python3.12"
MINICONDA_ROOT = "/miniconda3"


# python -m pip install pipenv
INTERP = os.environ["HOME"]+MINICONDA_ROOT+"/envs/"+APP_SPECIFIC_VENV+"/bin/"+PYTHON_VERSION


if sys.executable != INTERP:

    # INTERP doesn't match. A perfect opertunity to check if an requirements file exits
    # We may sould install some packages
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    requirements_file = cur_dir + "/requirements.txt"
    if os.path.isfile(requirements_file):
        import subprocess
        subprocess.call([INTERP, '-m', 'pip', 'install', "-r" , requirements_file])

    if os.path.isfile(cur_dir + "/Pipfile"):
        import subprocess
        subprocess.call([INTERP, '-m', 'pip', 'install', "pipenv" ])
        subprocess.call([INTERP, '-m', 'pipenv', 'install', "--system"])
    # Let' start again with the right environment
    os.execl(INTERP, INTERP, *sys.argv)


# application specific code starts here

from django.core.wsgi import get_wsgi_application # pylint: disable=wrong-import-position
from  django.core.management import execute_from_command_line

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jfm.deploysettings')
execute_from_command_line(['manage.py', 'migrate'])
application = get_wsgi_application()
