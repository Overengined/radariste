# app.py (updated)
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import random

engine_temp = 1900
engine_press = 720

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_data', methods=['GET'])
def get_value():
    value = {"enginetemp": engine_temp + random.randint(-200,200),
             "enginepress": engine_press + random.randint(-200,200)}
    response = jsonify(value)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/post_value', methods=['POST'])
def post_value():
    data = request.json
    print(data)
    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(debug=True)
