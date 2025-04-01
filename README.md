
# LeaseIQ - Real Estate Data Analytics App

**LeaseIQ** is an ongoing project designed to provide analytical insights into various real estate data sets. It is a full-stack application built using the **MERN stack** (MongoDB, Express.js, React, Node.js) for the front end and **Flask** for machine learning (ML) operations in the backend. The app aims to visualize and analyze real estate data to help users make better decisions.

---

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
  - [Setting Up Backend](#setting-up-backend)
  - [Setting Up Frontend](#setting-up-frontend)
- [How to Use](#how-to-use)
- [Contributions](#contributions)
- [License](#license)

---

## Overview

LeaseIQ leverages data analytics and machine learning to provide insights into real estate markets. Users can upload data, view visualizations, and gain insights into various properties. The platform also includes ML-powered features, such as predictions and trend analysis.

---

## Technologies Used

- **Frontend:**
  - React.js (for building user interface)
  - React Router (for navigation)
  - React Icons (for icons)
  - Tailwind CSS (for styling)
  - Axios (for making HTTP requests)

- **Backend:**
  - Node.js with Express.js (for the RESTful API)
  - Flask (for machine learning operations)
  - Pandas, NumPy, scikit-learn (for ML models)

- **Database:**
  - MongoDB (for storing real estate data)

- **Others:**
  - JWT Authentication (for securing endpoints)
  - Flask-CORS (for enabling cross-origin requests)

---

## Project Structure

The project consists of the following directories:

- **`client/`** - Contains the frontend built with React.js and Tailwind CSS.
  - `public/` - Contains the `index.html` and static assets.
  - `src/` - Contains all the React components and routing logic.

- **`server/`** - Contains the Node.js/Express API server.
  - `controllers/` - Contains controllers for API routes.
  - `models/` - Contains Mongoose models.
  - `routes/` - Contains Express routes.
  - `config/` - Contains environment variables and database configurations.

- **`ml_service/`** - Contains the Flask backend responsible for machine learning tasks.
  - `app.py` - Main entry point for the Flask app that handles ML operations.
  - `models/` - Directory for machine learning models.
  - `requirements.txt` - Python dependencies for the Flask backend.

---

## Installation & Setup

### Setting Up Backend

1. Navigate to the `server/` directory.
2. Install dependencies for the Node.js backend:
    ```bash
    cd server
    npm install
    ```

3. Navigate to the `ml_service/` directory.
4. Install dependencies for the Flask backend (make sure to have `pip` installed):
    ```bash
    cd ml_service
    pip install -r requirements.txt
    ```

5. Ensure MongoDB is running locally or configure it with a cloud provider (e.g., MongoDB Atlas).

6. In the `server/` directory, set up environment variables:
    - Create a `.env` file with the necessary credentials:
      ```env
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      FLASK_APP=app.py
      ```

7. Start the backend services:
    ```bash
    cd server
    npm start
    ```

---

### Setting Up Frontend

1. Navigate to the `client/` directory.
2. Install dependencies for the React frontend:
    ```bash
    cd client
    npm install
    ```

3. Start the frontend:
    ```bash
    npm start
    ```

The app will be available at `http://localhost:3000`.

---

## How to Use

1. **Sign Up/Log In**: The app requires users to sign up and log in to gain access to its features.
2. **Upload Data**: Users can upload real estate data in CSV format to analyze various properties.
3. **Analyze Data**: View visualizations of the data and gain insights into various real estate trends.
4. **Machine Learning Features**: The ML service provides predictions and trend analysis based on the data uploaded.

---

## Contributions

Contributions to the project are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add feature'`).
4. Push your changes to your fork (`git push origin feature-branch`).
5. Open a Pull Request to the `main` branch.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
