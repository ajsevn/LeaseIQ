from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask ML service is running"})

if __name__ == "__main__":
    app.run(port=5001, debug=True)
