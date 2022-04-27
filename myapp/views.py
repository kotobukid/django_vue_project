from django.http import HttpResponse, JsonResponse
from django.template import loader
import json
from myapp.models import PriceHistory


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

        # for p in body["prices"]:
        #     print(p)

        ph = PriceHistory()
        ph.source = body["prices"]
        ph.save()

        return JsonResponse({
            "success": True,
            "reason": ""
        })
