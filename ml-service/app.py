from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import pandas as pd
import numpy as np
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure JWT
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET", "your_default_secret")  # Change in production
jwt = JWTManager(app)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask ML service is running"})

# Login endpoint to generate JWT token
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # Dummy authentication (replace with real user validation)
    if username == "admin" and password == "password":
        access_token = create_access_token(identity=username)
        return jsonify({"access_token": access_token})
    else:
        return jsonify({"error": "Invalid credentials"}), 401

# Protected route
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Hello, {current_user}! This is a protected route."})

if __name__ == "__main__":
    app.run(port=5001, debug=True)
