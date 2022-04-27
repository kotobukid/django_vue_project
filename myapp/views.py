from django.http import HttpResponse, JsonResponse
from django.template import loader
import json
from myapp.models import PriceHistory


def index(request):
    template = loader.get_template('index.html')
    context = {
    }
    return HttpResponse(template.render(context, request))


def fetch_prices(request):
    price_histories = PriceHistory.objects.all()

    return JsonResponse({
        'price_history': [{
            "pk": p.pk,
            "source": p.source
        } for p in price_histories]
    })


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
