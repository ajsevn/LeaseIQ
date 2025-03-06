import sys
import os
sys.path.append(os.path.abspath(os.path.dirname(__file__)))
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import pandas as pd
import numpy as np
from io import BytesIO
from dotenv import load_dotenv
from ml_model import analyze_data  # Directly import from the same folder

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
    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        # Dummy authentication (replace with actual validation)
        if username == "admin" and password == "password":
            access_token = create_access_token(identity=username)
            return jsonify({"access_token": access_token})
        return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Protected route
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Hello, {current_user}! This is a protected route."})

# Data Analysis Route
@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        data = request.get_json()
        if not isinstance(data, list):
            return jsonify({"error": "Invalid format. Expected a list of dictionaries."}), 400

        result = analyze_data(data)  # Call ML function
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# File Upload & Processing Route
@app.route("/upload", methods=["POST"])
def upload_file():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
        
        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "Empty filename"}), 400

        # Read file into DataFrame
        if file.filename.endswith(".csv"):
            df = pd.read_csv(file)
        elif file.filename.endswith(".xlsx"):
            df = pd.read_excel(file)
        else:
            return jsonify({"error": "Unsupported file format"}), 400

        # Perform analysis
        result = analyze_data(df.to_dict(orient="records"))
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Export processed data to CSV
@app.route("/download", methods=["POST"])
def download_csv():
    try:
        data = request.get_json()
        df = pd.DataFrame(data)
        output = BytesIO()
        df.to_csv(output, index=False)
        output.seek(0)

        return send_file(output, mimetype="text/csv", as_attachment=True, download_name="processed_data.csv")
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#Data Visualization
@app.route("/rera-data", methods=["GET"])
def get_rera_data():
    try:
        region = request.args.get("region", "").lower()
        if not region:
            return jsonify({"error": "Region parameter is required"}), 400

        # Define dataset file path based on region
        dataset_path = os.path.join("datasets", f"{region}-rera-data.csv")

        if not os.path.exists(dataset_path):
            return jsonify({"error": "Dataset for this region not found"}), 404

        # Load dataset
        df = pd.read_csv(dataset_path)

        # Convert to JSON and return
        return jsonify(df.to_dict(orient="records"))
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5000, debug=True)
