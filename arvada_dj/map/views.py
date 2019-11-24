from django.http import HttpResponse
from django.template import loader
from django.contrib.auth.decorators import login_required


@login_required
def index(request):
    template = loader.get_template('map/map.html')
    context = {'super_map': 'false'}
    return HttpResponse(template.render(context, request))


@login_required
def super_map(request):
    template = loader.get_template('map/map.html')
    context = {'super_map': 'true'}
    return HttpResponse(template.render(context, request))
