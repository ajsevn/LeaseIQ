# LeaseIQ — Real Estate Data Analytics Platform

**LeaseIQ** is a full-stack real estate data analytics platform designed to simplify and supercharge how users explore, analyze, and derive insights from property datasets. Built with the **MERN stack** and integrated with a **Flask-based machine learning microservice**, LeaseIQ empowers users with intelligent visualizations, trend forecasting, and prediction capabilities.

---

## ✨ Features at a Glance
- User authentication with secure JWT tokens
- Upload and analyze real estate datasets (CSV)
- Interactive data visualizations & insights
- ML-powered prediction engine via Flask

---

## 🚧 Roadmap / In Progress

LeaseIQ is a work-in-progress, and I'm actively improving it. Here's what's coming next:

- 🔐 Role-based user dashboard
- 📈 Advanced data filtering + custom visualization options
- 🤖 Improved ML pipeline integration
- 🧠 GPT-like chat assistant for property data insights
- 🧪 End-to-end testing & production optimization

---

## 🤖 Tech Stack

### Frontend
- **React.js** + **React Router** — SPA architecture & routing
- **Axios** — API communication layer
- **React Icons** — Iconography and UI enhancements

### Backend (API Server)
- **Node.js + Express.js** — RESTful API design
- **MongoDB + Mongoose** — Flexible NoSQL database
- **JWT Auth** — Secure access control
- **CORS + dotenv** — Security & environment config

### ML Microservice
- **Flask** — Lightweight Python backend
- **Pandas, NumPy, scikit-learn** — Data wrangling & ML models
- **Flask-CORS** — Seamless frontend-backend interaction

---

## 📂 Project Architecture
```
leaseiq/
├── client/               # React frontend
│   ├── public/
│   └── src/
├── server/               # Express.js backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── config/
│   └── server.js
├── ml_service/           # Flask ML microservice
│   ├── models/
│   ├── app.py
│   └── requirements.txt
```

---

## ⚙️ Getting Started

### 🪲 Backend Setup
1. **Install Node dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Install Python dependencies** (with pip)
   ```bash
   cd ../ml_service
   pip install -r requirements.txt
   ```

3. **MongoDB Setup**
   - Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB instance.

4. **Environment Variables** (`server/.env`)
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:3000
   ```

5. **Start backend servers**
   ```bash
   # Express backend
   cd ../server
   npm start

   # Flask ML microservice
   cd ../ml_service
   flask run
   ```

---

### 💻 Frontend Setup
1. **Install dependencies**
   ```bash
   cd client
   npm install
   ```

2. **Run the development server**
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📘 Usage Guide
1. **Register/Login** to gain access to analytics features.
2. **Upload CSV Data** with property-level details.
3. **Get Instant Visual Insights** on trends and distribution.
4. **Analyze with AI** using our integrated ML microservice.
5. **Download Processed Outputs** for offline reporting.

---

## ✨ Contribution Guidelines
We welcome contributions from the community!

1. Fork the repo
2. Create your feature branch
   ```bash
   git checkout -b feat/awesome-feature
   ```
3. Commit your changes
4. Push to origin and create a PR

---

## ✉️ License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for full details.

---

> Built with ❤️ to bring data-driven insights to real estate.

