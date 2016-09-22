from flask import Flask, render_template, request, jsonify
from flask_bootstrap import Bootstrap
import requests
import json
import datetime

#flask
app = Flask(__name__)
app.debug = True

Bootstrap(app)


#home page
@app.route('/')
def hello():
    return render_template('index.html')

#google books price info
@app.route('/gbooks/<string:search>', methods=['GET']) 
def get_price(search):
    timestamp = datetime.datetime.now()
    #quotestr = "https://www.googleapis.com/books/v1/volumes?q=intitle:{}".format(search)
    quotestr = "http://webservices.amazon.com/onca/xml?"
    quotestr += "Service=AWSECommerceService&Operation=ItemLookup"
    quotestr += "&ResponseGroup=Offers"
    quotestr += "&IdType=ASIN"
    quotestr += "&ItemId=B00KOKTZLQ"
    #quotestr += "&AssociateTag=[Your_AssociateTag]"
    quotestr += "&AWSAccessKeyId=['AKIAIJPXF347YBUNCV7A']"
    quotestr += "&Timestamp=["+str(timestamp)+"]"
    #quotestr += "&Signature=[Request_Signature]"
    res = requests.get(quotestr)
    dct = json.loads(res.text)
    print(dct)
    #return render "search results" with query string
    return jsonify({"title":dct,"price":" "})



    bookTitle = dct["items"][0]["volumeInfo"]["title"]
    saleInfo = dct["items"][0]["saleInfo"]
    price = "NOT_FOR_SALE"
    if  saleInfo["saleability"] == "FOR_SALE":
        price = "<b>" + str(saleInfo["listPrice"]["amount"]) + "</b>" + " " + saleInfo["listPrice"]["currencyCode"]
    return jsonify({"title":bookTitle,"price":price})


if __name__ == "__main__":
    app.run()
