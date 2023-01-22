from django.views import generic


class StartView(generic.TemplateView):
    template_name = 'start/start.html'
