from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required
def index(request):
    template = loader.get_template('map/index2.html')
    context = {}
    return HttpResponse(template.render(context, request))
