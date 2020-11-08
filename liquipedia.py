from flask import Flask, json, request, jsonify
from flask_cors import CORS
import csv

import requests

app = Flask(__name__)
CORS(app)

@app.route('/<datatype>/<wiki>')
def index(datatype, wiki):
    url = 'https://api.liquipedia.net/api/v1/' + datatype
    params = {
        'apikey': '172edrW4KxLIfk1SMsvLLLzdx6ugmT8anucDNe1QkkRUh7p3hcUQRzA6EcQmaqPuCA5y22mExEPVTmVWpt9NDgysDBlBWXv3PopI79A6DgS8QXBUgEcyaDhdKXlry6b5',
        'wiki': wiki
    }
    response = requests.post(url, data=params)
    return response.content, response.status_code
    # return json.dumps({'message': 'hello world'}), 200

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=4200, debug=True)
