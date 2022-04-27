from django.http import HttpResponse, JsonResponse
from django.template import loader


def index(request):
    template = loader.get_template('index.html')
    context = {
    }
    return HttpResponse(template.render(context, request))
