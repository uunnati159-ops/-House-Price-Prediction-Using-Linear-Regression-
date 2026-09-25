# HOUSE PRICE PREDICTION USING LINEAR REGRESSION
### College Major Project (BCA / B.Sc / B.Tech Computer Science)

An end-to-end Machine Learning web application designed to predict residential property valuations using Multiple Linear Regression.

---

## 📌 Project Overview
Valuing real estate properties is traditionally prone to subjective bias, asymmetry of information, and fluctuating agent commissions. This project implements a **Supervised Machine Learning** pipeline using the **Multiple Linear Regression (Ordinary Least Squares)** algorithm to estimate house prices systematically based on 8 key structural and geographic parameters:
- **Area (sqft)**
- **Bedrooms**
- **Bathrooms**
- **Floors**
- **Parking Spaces**
- **House Age (Years)**
- **Location Score (1.0 to 10.0)**
- **Distance to City Center (km)**

---

## 🛠️ Technology Stack
- **Language:** Python 3.10+
- **Machine Learning Library:** `scikit-learn` (LinearRegression, StandardScaler, train_test_split, metrics)
- **Data Manipulation:** `pandas`, `numpy`
- **Data Visualization:** `matplotlib`, `seaborn`
- **Web Interface:** `Streamlit` / React SPA interactive dashboard
- **Dataset:** `house_prices.csv` (650 records)

---

## 🚀 How to Run the Project Locally

### Step 1: Clone or Navigate to Project Directory
```bash
cd house-price-prediction
```

### Step 2: Create and Activate a Python Virtual Environment
```bash
# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

### Step 3: Install Required Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Run the Streamlit Application
```bash
streamlit run app.py
```
The application will launch in your default web browser at `http://localhost:8501`.

---

## 📂 Project Structure
```
├── app.py                      # Main Streamlit web application & ML pipeline
├── house_prices.csv            # 650-row real estate dataset
├── requirements.txt            # Python library dependencies
├── README.md                   # Setup guide and technical documentation
├── project_documentation.md    # 29-section College Major Project Report
├── viva_questions.md           # 25+ Viva questions & model answers
```

---

## 📊 Machine Learning Pipeline Workflow
```
[ house_prices.csv ]
        │
        ▼
[ Data Preprocessing ] ──> Null Check & Median Imputation, Duplicate Removal
        │
        ▼
[ Train/Test Split ] ────> 80% Training Data / 20% Testing Data
        │
        ▼
[ Feature Scaling ] ─────> StandardScaler (Z-Score Normalization)
        │
        ▼
[ Model Fitting ] ───────> Ordinary Least Squares (OLS) Closed-Form Solution
        │
        ▼
[ Model Evaluation ] ────> MSE, RMSE, MAE, R² Score, Residual Analysis
        │
        ▼
[ User Interface ] ──────> User Inputs Property Specs ──> Predicted Price (₹)
```

---

## 📈 Evaluation Metrics
- **Mean Squared Error (MSE):** Measures the average squared difference between estimated values and actual prices.
- **Root Mean Squared Error (RMSE):** Represents standard deviation of the residuals in Indian Rupees (₹).
- **R² Score (Coefficient of Determination):** Explains >90% of price variance based on selected features.

---

## 📄 License & Attribution
Developed as an academic major project for academic demonstration and machine learning research.
