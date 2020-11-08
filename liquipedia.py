from flask import Flask, json, request, jsonify
from flask_cors import CORS
import csv
import sys

import requests

app = Flask(__name__)
CORS(app)

datatype = 'matchfeed'
wiki = 'valorant'

@app.route('/teamliquid')
def getdata():
    url = 'https://api.liquipedia.net/api/v1/' + datatype
    params = {
        'apikey': 'zIAPhNbTNS1xT5aEvAO0H4oE4aYrGLr04cjgx8LAqrgEj3iWPI27BG02RO09VgSHAuivIptunkuDZMQ8xjGMTKBXzp68v7e1AIbZBoad42I5dcGbyp9CjFg2czt1g3ak',
        'wiki': wiki,
        'type': 'team',
        'name': 'Team Liquid',
        'rawstreams': 'true',
        'limit': 50,
    }
    response = requests.post(url, data=params)
    return response.content, response.status_code
    # return json.dumps({'message': 'hello world'}), 200

@app.route('/fish123')
def getmoredata():
    url = 'https://api.liquipedia.net/api/v1/' + datatype
    params = {
        'apikey': 'zIAPhNbTNS1xT5aEvAO0H4oE4aYrGLr04cjgx8LAqrgEj3iWPI27BG02RO09VgSHAuivIptunkuDZMQ8xjGMTKBXzp68v7e1AIbZBoad42I5dcGbyp9CjFg2czt1g3ak',
        'wiki': wiki,
        'type': 'team',
        'name': 'fish123',
        'limit': 50,
    }
    response = requests.post(url, data=params)
    return response.content, response.status_code
    
@app.route('/g2esports')
def getevenmoredata():
    url = 'https://api.liquipedia.net/api/v1/' + datatype
    params = {
        'apikey': 'zIAPhNbTNS1xT5aEvAO0H4oE4aYrGLr04cjgx8LAqrgEj3iWPI27BG02RO09VgSHAuivIptunkuDZMQ8xjGMTKBXzp68v7e1AIbZBoad42I5dcGbyp9CjFg2czt1g3ak',
        'wiki': wiki,
        'type': 'team',
        'name': 'G2 Esports',
        'rawstreams': 'true',
        'limit': 50,
    }
    response = requests.post(url, data=params)
    return response.content, response.status_code

# attempt to combine all 3 reponses to single response :(
# @app.route('/<datatype>/<wiki>')
# def index(datatype, wiki):
#     url = 'https://api.liquipedia.net/api/v1/' + datatype
#     apikey = 'zIAPhNbTNS1xT5aEvAO0H4oE4aYrGLr04cjgx8LAqrgEj3iWPI27BG02RO09VgSHAuivIptunkuDZMQ8xjGMTKBXzp68v7e1AIbZBoad42I5dcGbyp9CjFg2czt1g3ak'
#     liquid_params = {
#         'apikey': apikey,
#         'wiki': wiki,
#         'type': 'team',
#         'name': 'Team Liquid',
#         # 'conditions': '[[pagename::ScreaM/Matches]]',
#         # 'query': 'opponent1, opponent2, date',
#         # 'limit': 50,
#     }
#     fish_params = {
#         'apikey': apikey,
#         'wiki': wiki,
#         'type': 'team',
#         'name': 'fish123',
#     }
#     g2esports_params = {
#         'apikey': apikey,
#         'wiki': wiki,
#         'type': 'team',
#         'name': 'g2esports',
#     }

#     liquid = requests.post(url, data=liquid_params)
#     fish123 = requests.post(url, data=fish_params)
#     g2esports = requests.post(url, data=g2esports_params)
#     # print(liquid.content.decode('utf-8'), file=sys.stderr)
#     # liquid_json = json.loads(liquid.content)
#     # fish123_json = json.loads(fish123.content)
#     resp_liquid = liquid.content.decode('utf-8').replace("\\\\\\", "")
#     # resp_fish123 = json.loads(fish123_json)
#     # resp_liquid.update(resp_fish123)
#     response =  {
#         'liquid': json.dumps(resp_liquid.replace("\\", "")),
#         'fish123': fish123.content.decode('utf-8'), # .content.results,
#         'g2esports': json.loads(g2esports.content.decode('utf-8')), # .content.results
#     }
#     return response, 200
    # return json.dumps({'message': 'hello world'}), 200

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=4200, debug=True)
