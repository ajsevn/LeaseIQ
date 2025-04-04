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
from werkzeug.utils import secure_filename
import logging
from ml_model import analyze_data,clean_data_for_json  # Directly import from the same folder

# Load environment variables
load_dotenv()
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)
CORS(app)

# Configure JWT
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET", "your_default_secret")  # Change in production
jwt = JWTManager(app)

# Set up logging
logging.basicConfig(level=logging.INFO)

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

        # TODO: Replace with real authentication (e.g., database check + hashed password)
        if username == os.getenv("ADMIN_USER", "admin") and password == os.getenv("ADMIN_PASS", "password"):
            access_token = create_access_token(identity={"username": username, "role": "admin"})
            return jsonify({"access_token": access_token})
        return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        logging.error(f"Login Error: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500

# Protected route
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Hello, {current_user['username']}! This is a protected route."})

# File Upload & Processing Route
@app.route("/upload", methods=["POST"])
def upload_file():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
        
        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "Empty filename"}), 400

        # Secure the filename
        filename = secure_filename(file.filename)

        # Read file into DataFrame
        if filename.endswith(".csv"):
            df = pd.read_csv(file)
        elif filename.endswith(".xlsx"):
            df = pd.read_excel(file)
        else:
            return jsonify({"error": "Unsupported file format"}), 400

        if df.empty:
            return jsonify({"error": "Uploaded file is empty"}), 400

        # Run analysis (prompt can be optional)
        prompt = request.form.get("prompt")  # Optional user-defined analysis request
        result = analyze_data(df, prompt)

        # ✅ Ensure the result is JSON-friendly (No NaNs)
        cleaned_result = clean_data_for_json(result)

        return jsonify(cleaned_result)  # Now NaNs won't cause issues!
    
    except Exception as e:
        logging.error(f"Upload Error: {str(e)}")
        return jsonify({"error": f"Error uploading file: {str(e)}"}), 500

# Export processed data to CSV
@app.route("/download", methods=["POST"])
def download_csv():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        df = pd.DataFrame(data)
        output = BytesIO()
        df.to_csv(output, index=False)
        output.seek(0)

        return send_file(output, mimetype="text/csv", as_attachment=True, download_name="processed_data.csv")
    except Exception as e:
        logging.error(f"Download Error: {str(e)}")
        return jsonify({"error": "Error generating CSV"}), 500

# Data Visualization
@app.route("/rera-data", methods=["GET"])
def get_rera_data():
    try:
        region = request.args.get("region", "").lower().strip()
        if not region:
            return jsonify({"error": "Region parameter is required"}), 400

        # Validate input to prevent path traversal attacks
        allowed_regions = {"mumbai-city","mumbai-suburban" ,"thane", "nashik", "pune", "nagpur", "palghar", "raigarh", "dadra-daman"}
        if region not in allowed_regions:
            return jsonify({"error": f"Invalid region: {region}"}), 400

        # Get absolute path
        dataset_path = os.path.join(BASE_DIR, "datasets", f"{region}-rera-dataset.csv")

        logging.info(f"Looking for file at: {dataset_path}")

        # Check if the file exists
        if not os.path.exists(dataset_path):
            logging.error(f"❌ File not found: {dataset_path}")
            return jsonify({"error": f"Dataset for '{region}' not found"}), 404

        logging.info(f"✅ File found: {dataset_path}")

        df = pd.read_csv(dataset_path)
        return jsonify(df.to_dict(orient="records"))

    except Exception as e:
        logging.error(f"❌ Error: {str(e)}")
        return jsonify({"error": "Error retrieving data"}), 500
    
@app.route("/overall-analysis", methods=["GET"])
def overall_analysis():
    try:
        # Load the merged CSV with top 5 districts
        df = pd.read_csv('./datasets/revoked-projects-rera-dataset.csv')

        # Check if data is loaded correctly
        if df.empty:
            return jsonify({"error": "CSV file is empty"}), 400

        # Optional: Get column name from query params or default to 'project_area_(sqmts)'
        column = request.args.get('column', 'sanctioned_fsi')

        # Check if column exists in the dataframe
        if column not in df.columns:
            return jsonify({"error": f"Invalid column name: {column}"}), 400

        # Perform the analysis (group by district and sum the selected column)
        analysis = df.groupby('district')[column].sum().reset_index()

        # Debugging: Print the analysis result to the console for verification
        print(f"Analysis result:\n{analysis}")

        return jsonify(analysis.to_dict(orient='records'))

    except Exception as e:
        logging.error(f"❌ Error: {str(e)}")
        return jsonify({"error": "Error performing overall analysis"}), 500


if __name__ == "__main__":
    app.run(port=5001, debug=True)
