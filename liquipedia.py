from flask import Flask, json, request
from flask_cors import CORS

import requests

app = Flask(__name__)
CORS(app)

@app.route('/<datatype>/<wiki>')
def index(datatype, wiki):
    url = 'https://api.liquipedia.net/api/v1/' + datatype
    params = {
        'apikey': 'V1SMuprzPQe1eJSrnMx3mDDgeKdSZBXQzTYrbbPERMx2mF8V96Sp9IDqJgqXMnXqC9L5pbtH7XArEAuJSANh7foz4d4umLHmUOuzYvNApePUblTr70pNHVPGZVzmg9yO',
        'wiki': wiki
    }
    response = requests.post(url, data=params)

    return response.content, response.status_code
    # return json.dumps({'message': 'hello world'}), 200

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=4200, debug=True)