from flask import Flask, json, request
from flask_cors import CORS

import requests

app = Flask(__name__)
CORS(app)

@app.route('/<datatype>/<wiki>')
def index(datatype, wiki):
    url = 'https://api.liquipedia.net/api/v1/' + datatype
    params = {
        'apikey': 'zIAPhNbTNS1xT5aEvAO0H4oE4aYrGLr04cjgx8LAqrgEj3iWPI27BG02RO09VgSHAuivIptunkuDZMQ8xjGMTKBXzp68v7e1AIbZBoad42I5dcGbyp9CjFg2czt1g3ak',
        'wiki': wiki
    }
    response = requests.post(url, data=params)

    return response.content, response.status_code
    # return json.dumps({'message': 'hello world'}), 200

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=4200, debug=True)
