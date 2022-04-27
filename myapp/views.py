from django.http import HttpResponse, JsonResponse
from django.template import loader
import json


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
        body = json.loads(request.body)

        for p in body["prices"]:
            print(p)

        return JsonResponse({
            "success": True,
            "reason": ""
        })
