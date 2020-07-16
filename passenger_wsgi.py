
import os
import sys

#########Accessing the App's Default WSGI##############
import feyton.wsgi

application = feyton.wsgi.application

######## PASSENGER PATH INFO-FIX INITIALISATIONS#######
cwd = os.getcwd()
sys.path.append(cwd)
#sys.path.append(os.getcwd())
sys.path.append(cwd + 'feyton')  #You must add your project here
# Set this to your root
SCRIPT_NAME = os.getcwd()

########  MIDDLEWARE CLASS TO FIX PASSENGER'S URI ISSUES #############
class PassengerPathInfoFix(object):
    """
    Sets PATH_INFO from REQUEST_URI since Passenger doesn't provide it.
    """
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        #IF YOU ARE IN PYTHON 2.7 USE: from urllib import unquote
        from urllib.parse import unquote
        environ['SCRIPT_NAME'] = SCRIPT_NAME

        request_uri = unquote(environ['REQUEST_URI'])
        script_name = unquote(environ.get('SCRIPT_NAME', ''))
        offset = request_uri.startswith(script_name) and len(environ['SCRIPT_NAME']) or 0
        environ['PATH_INFO'] = request_uri[offset:].split('?', 1)[0]
        return self.app(environ, start_response)

###########the redirecting Middleware
application = PassengerPathInfoFix(application)