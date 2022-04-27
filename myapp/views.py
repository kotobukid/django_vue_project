from django.http import HttpResponse


def index(request):
    return HttpResponse('<html><body>Hello</body><script src="/static/main.js"></script></html>')
