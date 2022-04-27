from django.http import HttpResponse, JsonResponse
from django.template import loader


def index(request):
    template = loader.get_template('index.html')
    context = {
    }
    return HttpResponse(template.render(context, request))


def save_prices(request):
    if request.method == 'GET':
        return JsonResponse({
            "success": False,
            "reason": "HttpメソッドがGETです(POSTでリクエストを発行してください)"
        })
    else:
        return JsonResponse({
            "success": True
        })
