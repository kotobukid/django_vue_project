from django.http import HttpResponse


def index(request):
    html = '<html><body><div id="root">{{ message }}</div></body>' \
           '<script src="/static/main.js"></script>' \
           '<script src="/static/javascripts/pages/index.js"></script>' \
           '</html>'
    return HttpResponse(html)
