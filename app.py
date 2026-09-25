"""
HOUSE PRICE PREDICTION USING LINEAR REGRESSION
College Major Project (BCA / B.Tech Computer Science)

This Streamlit application trains a Multiple Linear Regression model
on the house_prices.csv dataset to predict estimated house prices.
"""

import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import os

# Set Matplotlib aesthetic style
plt.style.use('seaborn-v0_8-whitegrid' if 'seaborn-v0_8-whitegrid' in plt.style.available else 'default')
plt.rcParams['font.sans-serif'] = 'DejaVu Sans'

# -------------------------------------------------------------
# PAGE CONFIGURATION
# -------------------------------------------------------------
st.set_page_config(
    page_title="House Price Prediction - Linear Regression",
    page_icon="🏠",
    layout="wide",
    initial_sidebar_state="expanded"
)

# -------------------------------------------------------------
# HELPER FUNCTIONS & DATA PIPELINE
# -------------------------------------------------------------

@st.cache_data
def load_and_preprocess_data(csv_path="house_prices.csv"):
    """
    Module 1 & 2: Dataset Collection & Data Preprocessing
    Loads the CSV dataset, removes duplicates, handles missing values,
    and returns a cleaned Pandas DataFrame.
    """
    if not os.path.exists(csv_path):
        st.error(f"Dataset file '{csv_path}' not found! Please ensure it is in the project root directory.")
        return None
    
    df = pd.read_csv(csv_path)
    
    # Check and remove duplicates
    df = df.drop_duplicates()
    
    # Handle missing values if any
    num_cols = df.select_dtypes(include=[np.number]).columns
    for col in num_cols:
        if df[col].isnull().sum() > 0:
            df[col] = df[col].fillna(df[col].median())
            
    return df


@st.cache_resource
def train_linear_regression_model(df, test_size=0.2, random_state=42):
    """
    Module 4, 5 & 6: Feature Selection, Model Building & Training
    Uses scikit-learn Pipeline with StandardScaler and LinearRegression.
    """
    feature_cols = [
        'Area_sqft', 'Bedrooms', 'Bathrooms', 'Floors',
        'Parking', 'Age', 'Location_Score', 'Distance_to_City_km'
    ]
    target_col = 'House_Price'
    
    X = df[feature_cols]
    y = df[target_col]
    
    # Split dataset into Training and Testing sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state
    )
    
    # Create Pipeline with Feature Scaler and Linear Regression model
    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('regressor', LinearRegression())
    ])
    
    # Fit model on training data
    pipeline.fit(X_train, y_train)
    
    # Predictions for evaluation
    y_train_pred = pipeline.predict(X_train)
    y_test_pred = pipeline.predict(X_test)
    
    # Evaluation Metrics
    mse_test = mean_squared_error(y_test, y_test_pred)
    rmse_test = np.sqrt(mse_test)
    mae_test = mean_absolute_error(y_test, y_test_pred)
    r2_test = r2_score(y_test, y_test_pred)
    
    # Extract coefficients
    raw_model = pipeline.named_steps['regressor']
    coefficients = raw_model.coef_
    intercept = raw_model.intercept_
    
    # Unscaled coefficients for direct linear interpretation:
    # y = Intercept_unscaled + sum(coeff_unscaled_i * X_i)
    unscaled_model = LinearRegression()
    unscaled_model.fit(X_train, y_train)
    
    results = {
        'pipeline': pipeline,
        'unscaled_model': unscaled_model,
        'feature_cols': feature_cols,
        'X_train': X_train,
        'X_test': X_test,
        'y_train': y_train,
        'y_test': y_test,
        'y_test_pred': y_test_pred,
        'mse': mse_test,
        'rmse': rmse_test,
        'mae': mae_test,
        'r2': r2_test,
        'scaled_coef': coefficients,
        'intercept': intercept,
        'unscaled_coef': unscaled_model.coef_,
        'unscaled_intercept': unscaled_model.intercept_
    }
    return results


def format_inr(number):
    """Formats a number into Indian Rupee numbering format (₹XX,XX,XXX)"""
    num_int = int(round(number))
    if num_int < 0:
        return f"-₹{abs(num_int):,}"
    
    s = str(num_int)
    if len(s) <= 3:
        return f"₹{s}"
    last_three = s[-3:]
    remaining = s[:-3]
    
    # Group remaining digits in sets of 2
    groups = []
    while len(remaining) > 2:
        groups.insert(0, remaining[-2:])
        remaining = remaining[:-2]
    if remaining:
        groups.insert(0, remaining)
    
    formatted = ",".join(groups) + "," + last_three
    return f"₹{formatted}"


# -------------------------------------------------------------
# LOAD DATA & MODEL
# -------------------------------------------------------------
df = load_and_preprocess_data()

if df is not None:
    model_data = train_linear_regression_model(df)
else:
    st.stop()


# -------------------------------------------------------------
# SIDEBAR NAVIGATION
# -------------------------------------------------------------
st.sidebar.image("https://img.icons8.com/isometric/100/real-estate.png", width=80)
st.sidebar.title("House Price Prediction")
st.sidebar.markdown("**Major Project - BCA / CS**")
st.sidebar.markdown("---")

navigation = st.sidebar.radio(
    "Navigation Menu",
    [
        "1. 🏠 HOME",
        "2. 📊 DATASET",
        "3. 📈 DATA ANALYSIS",
        "4. 🧠 MODEL",
        "5. 💰 PRICE PREDICTION",
        "6. ℹ️ ABOUT PROJECT"
    ]
)

st.sidebar.markdown("---")
st.sidebar.markdown(f"**Model R² Score:** `{model_data['r2']:.4f}`")
st.sidebar.markdown(f"**Total Records:** `{len(df)} rows`")
st.sidebar.caption("Supervised Machine Learning • Linear Regression")


# =============================================================
# 1. HOME SECTION
# =============================================================
if navigation == "1. 🏠 HOME":
    st.title("🏠 HOUSE PRICE PREDICTION USING LINEAR REGRESSION")
    st.subheader("A Machine Learning Project for Real Estate Valuation")
    st.markdown("---")
    
    col1, col2 = st.columns([3, 2])
    
    with col1:
        st.markdown("""
        ### 📌 Project Overview
        House price prediction is a classic **Supervised Machine Learning** regression problem.
        The goal of this project is to develop an automated predictive system that estimates the 
        monetary market value of residential properties using their architectural, spatial, and locational features.
        
        ### 🎯 Project Objectives
        1. **Data Preprocessing & Cleaning**: Collect and sanitize multi-feature real estate records.
        2. **Exploratory Data Analysis (EDA)**: Uncover correlations between house price and features such as area, bedrooms, and location score.
        3. **Model Construction**: Implement the **Ordinary Least Squares (OLS) Linear Regression** algorithm using `scikit-learn`.
        4. **Model Evaluation**: Benchmark the model against test data using **Mean Squared Error (MSE)** and **Coefficient of Determination ($R^2$)**.
        5. **Interactive Prediction Interface**: Allow users to enter customized house details and receive an immediate, mathematically sound price estimate in Indian Rupees (₹).
        """)
        
    with col2:
        st.info("""
        ### ⚙️ How the System Works
        ```
        1. Raw House Dataset (CSV)
                ⬇
        2. Preprocessing & Scaling (StandardScaler)
                ⬇
        3. Train-Test Split (80/20)
                ⬇
        4. Linear Regression Model Training
                ⬇
        5. User Input Features
                ⬇
        6. Estimated Price (₹XX,XX,XXX)
        ```
        """)
        
    st.markdown("---")
    st.markdown("### 🏆 Key Project Performance Highlights")
    m1, m2, m3, m4 = st.columns(4)
    m1.metric("Dataset Size", f"{len(df)} Records", "8 Features")
    m2.metric("Model R² Score", f"{model_data['r2'] * 100:.2f}%", "Variance Explained")
    m3.metric("Root Mean Squared Error", format_inr(model_data['rmse']), "Average Deviation")
    m4.metric("Mean Absolute Error", format_inr(model_data['mae']), "L1 Loss")


# =============================================================
# 2. DATASET SECTION
# =============================================================
elif navigation == "2. 📊 DATASET":
    st.title("📊 Dataset Exploration & Preprocessing")
    st.write("Demonstration real-estate dataset (`house_prices.csv`) utilized for training the Linear Regression model.")
    st.markdown("---")
    
    col1, col2, col3, col4 = st.columns(4)
    col1.metric("Total Rows", df.shape[0])
    col2.metric("Total Columns", df.shape[1])
    col3.metric("Numerical Features", 8)
    col4.metric("Target Variable", "House_Price")
    
    st.markdown("### 📋 Dataset Preview (Top 10 Records)")
    st.dataframe(df.head(10), use_container_width=True)
    
    st.markdown("### 🔍 Feature Descriptions & Data Types")
    feature_info = pd.DataFrame({
        "Feature Name": df.columns,
        "Data Type": df.dtypes.astype(str),
        "Non-Null Count": df.notnull().sum(),
        "Missing Values": df.isnull().sum(),
        "Description": [
            "Total carpet and built-up area in square feet",
            "Total number of bedrooms in the property",
            "Total number of bathrooms in the property",
            "Total number of floors/stories",
            "Reserved vehicle parking spots",
            "Age of the construction in years",
            "Civic infrastructure & locality score (1.0 to 10.0)",
            "Road distance from central city hub in kilometers",
            "Final valuation price of the property in INR (₹) [Target]"
        ]
    })
    st.table(feature_info)
    
    st.markdown("### 📈 Statistical Summary (Pandas .describe())")
    st.dataframe(df.describe().T, use_container_width=True)
    
    st.info("💡 **Demonstration Dataset Note:** This dataset contains representative real estate records engineered for demonstration. In production environments, real-world registry or MLS datasets can be substituted directly.")


# =============================================================
# 3. DATA ANALYSIS SECTION
# =============================================================
elif navigation == "3. 📈 DATA ANALYSIS":
    st.title("📈 Exploratory Data Analysis (EDA)")
    st.write("Visual examination of feature distributions, multi-collinearity, and relationships with House Price.")
    st.markdown("---")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("1. House Price Distribution")
        fig1, ax1 = plt.subplots(figsize=(7, 4.5))
        sns.histplot(df['House_Price'] / 1e5, kde=True, color='#2563EB', ax=ax1, bins=25)
        ax1.set_xlabel("House Price (in Lakhs ₹)")
        ax1.set_ylabel("Frequency")
        ax1.set_title("Distribution of Property Prices")
        st.pyplot(fig1)
        
    with col2:
        st.subheader("2. Area (sqft) vs House Price")
        fig2, ax2 = plt.subplots(figsize=(7, 4.5))
        sns.regplot(
            data=df, x='Area_sqft', y=df['House_Price'] / 1e5,
            scatter_kws={'alpha': 0.5, 'color': '#059669'},
            line_kws={'color': '#DC2626', 'linewidth': 2},
            ax=ax2
        )
        ax2.set_xlabel("Area in Square Feet")
        ax2.set_ylabel("House Price (in Lakhs ₹)")
        ax2.set_title("Scatter Plot with Linear Regression Trendline")
        st.pyplot(fig2)
        
    st.markdown("---")
    col3, col4 = st.columns(2)
    
    with col3:
        st.subheader("3. Bedrooms vs House Price")
        fig3, ax3 = plt.subplots(figsize=(7, 4.5))
        sns.boxplot(x='Bedrooms', y=df['House_Price'] / 1e5, data=df, palette='Blues', ax=ax3)
        ax3.set_xlabel("Number of Bedrooms")
        ax3.set_ylabel("House Price (in Lakhs ₹)")
        ax3.set_title("Price Distribution Across Bedroom Counts")
        st.pyplot(fig3)
        
    with col4:
        st.subheader("4. Correlation Matrix Heatmap")
        fig4, ax4 = plt.subplots(figsize=(7, 4.5))
        corr = df.corr()
        sns.heatmap(corr, annot=True, fmt=".2f", cmap='coolwarm', cbar=True, ax=ax4, square=True)
        ax4.set_title("Pearson Correlation Heatmap")
        st.pyplot(fig4)
        
    st.markdown("---")
    st.subheader("5. Location Score vs Distance to City Analysis")
    fig5, ax5 = plt.subplots(figsize=(10, 4))
    scatter = ax5.scatter(
        df['Distance_to_City_km'], df['House_Price'] / 1e5,
        c=df['Location_Score'], cmap='viridis', alpha=0.75, s=df['Area_sqft'] / 40
    )
    ax5.set_xlabel("Distance to City (km)")
    ax5.set_ylabel("House Price (in Lakhs ₹)")
    ax5.set_title("Distance vs Price (Color = Location Score, Size = Area)")
    cbar = plt.colorbar(scatter, ax=ax5)
    cbar.set_label("Location Score (1 - 10)")
    st.pyplot(fig5)


# =============================================================
# 4. MODEL SECTION
# =============================================================
elif navigation == "4. 🧠 MODEL":
    st.title("🧠 Linear Regression Model Evaluation")
    st.write("Mathematical details, train/test metrics, regression coefficients, and diagnostic residual plots.")
    st.markdown("---")
    
    st.markdown("""
    ### 📐 Mathematical Formulation
    Multiple Linear Regression models the relationship between dependent variable ($Y$) and independent features ($X_1, X_2, \dots, X_n$):
    $$Y = \\beta_0 + \\beta_1 X_1 + \\beta_2 X_2 + \\dots + \\beta_n X_n + \\epsilon$$
    Where:
    - $Y$: Target variable (`House_Price`)
    - $\\beta_0$: Intercept (base price when all features are zero)
    - $\\beta_i$: Regression coefficient for feature $i$
    - $\\epsilon$: Residual error term
    """)
    
    st.markdown("### 📊 Performance Metrics on Test Set (20% Holdout)")
    m1, m2, m3, m4 = st.columns(4)
    m1.metric("R² Score (Coefficient of Determination)", f"{model_data['r2']:.4f}")
    m2.metric("Mean Squared Error (MSE)", f"{model_data['mse']:,.0f}")
    m3.metric("Root Mean Squared Error (RMSE)", format_inr(model_data['rmse']))
    m4.metric("Mean Absolute Error (MAE)", format_inr(model_data['mae']))
    
    st.markdown("### 📋 Learned Regression Coefficients")
    coef_df = pd.DataFrame({
        "Feature": model_data['feature_cols'],
        "Unscaled Coefficient (₹ / unit)": model_data['unscaled_coef'],
        "Standardized Coefficient": model_data['scaled_coef'],
        "Interpretation": [
            "For every 1 sqft increase, price increases by ~₹" + f"{int(model_data['unscaled_coef'][0]):,}",
            "Each additional bedroom adds ~₹" + f"{int(model_data['unscaled_coef'][1]):,}",
            "Each additional bathroom adds ~₹" + f"{int(model_data['unscaled_coef'][2]):,}",
            "Each additional floor adds ~₹" + f"{int(model_data['unscaled_coef'][3]):,}",
            "Each parking slot adds ~₹" + f"{int(model_data['unscaled_coef'][4]):,}",
            "Each year of property age reduces price by ~₹" + f"{abs(int(model_data['unscaled_coef'][5])):,}",
            "Each 1.0 point in Location Score increases price by ~₹" + f"{int(model_data['unscaled_coef'][6]):,}",
            "Each km away from city reduces price by ~₹" + f"{abs(int(model_data['unscaled_coef'][7])):,}"
        ]
    })
    st.dataframe(coef_df, use_container_width=True)
    st.write(f"**Model Intercept (\\beta_0):** `{format_inr(model_data['unscaled_intercept'])}`")
    
    st.markdown("---")
    st.subheader("🔍 Actual vs Predicted Prices Scatter Plot")
    fig, ax = plt.subplots(figsize=(8, 5))
    ax.scatter(model_data['y_test'] / 1e5, model_data['y_test_pred'] / 1e5, color='#2563EB', alpha=0.6, label='Predictions')
    # Ideal fit diagonal line
    min_val = min(model_data['y_test'].min(), model_data['y_test_pred'].min()) / 1e5
    max_val = max(model_data['y_test'].max(), model_data['y_test_pred'].max()) / 1e5
    ax.plot([min_val, max_val], [min_val, max_val], 'r--', lw=2, label='Perfect Fit (y = x)')
    ax.set_xlabel("Actual House Price (in Lakhs ₹)")
    ax.set_ylabel("Predicted House Price (in Lakhs ₹)")
    ax.set_title(f"Actual vs Predicted Prices (R² = {model_data['r2']:.4f})")
    ax.legend()
    st.pyplot(fig)


# =============================================================
# 5. PRICE PREDICTION SECTION
# =============================================================
elif navigation == "5. 💰 PRICE PREDICTION":
    st.title("💰 Real Estate Price Prediction")
    st.write("Enter house specifications below to compute the estimated market price using the trained Linear Regression pipeline.")
    st.markdown("---")
    
    with st.form("prediction_form"):
        col1, col2 = st.columns(2)
        
        with col1:
            st.markdown("#### 📐 Structural Specifications")
            area = st.number_input("Area in Square Feet (Area_sqft)", min_value=300, max_value=8000, value=1850, step=50)
            bedrooms = st.slider("Number of Bedrooms", min_value=1, max_value=8, value=3, step=1)
            bathrooms = st.slider("Number of Bathrooms", min_value=1, max_value=6, value=2, step=1)
            floors = st.slider("Number of Floors", min_value=1, max_value=5, value=2, step=1)
            
        with col2:
            st.markdown("#### 📍 Locality & Property Age")
            parking = st.slider("Parking Spaces", min_value=0, max_value=4, value=1, step=1)
            age = st.slider("Age of House in Years", min_value=0, max_value=50, value=5, step=1)
            location_score = st.slider("Location Score (1.0 = Rural / Basic, 10.0 = Prime Urban)", min_value=1.0, max_value=10.0, value=7.5, step=0.1)
            distance = st.number_input("Distance to City Center in km", min_value=0.5, max_value=50.0, value=8.5, step=0.5)
            
        st.markdown("---")
        submit_button = st.form_submit_button("🔮 PREDICT HOUSE PRICE", use_container_width=True)
        
    if submit_button:
        # Assemble input DataFrame
        user_input_df = pd.DataFrame([{
            'Area_sqft': area,
            'Bedrooms': bedrooms,
            'Bathrooms': bathrooms,
            'Floors': floors,
            'Parking': parking,
            'Age': age,
            'Location_Score': location_score,
            'Distance_to_City_km': distance
        }])
        
        # Preprocess using fitted pipeline and predict
        predicted_price = model_data['pipeline'].predict(user_input_df)[0]
        
        # Ensure non-negative price
        predicted_price = max(0, predicted_price)
        formatted_price = format_inr(predicted_price)
        in_lakhs = predicted_price / 100000
        in_crores = predicted_price / 10000000
        
        st.success(f"### 🎉 Estimated House Price: {formatted_price}")
        
        metric_col1, metric_col2, metric_col3 = st.columns(3)
        metric_col1.metric("Predicted Valuation", formatted_price)
        metric_col2.metric("In Lakhs (₹)", f"₹{in_lakhs:.2f} Lakhs")
        metric_col3.metric("In Crores (₹)", f"₹{in_crores:.2f} Cr" if in_crores >= 1.0 else "—")
        
        st.markdown("#### 🧾 Feature Contribution Breakdown")
        breakdown_data = []
        for feat, coef in zip(model_data['feature_cols'], model_data['unscaled_coef']):
            val = user_input_df[feat].values[0]
            contrib = val * coef
            breakdown_data.append({
                "Feature": feat,
                "User Value": val,
                "Rate / Unit": f"₹{coef:,.0f}",
                "Net Contribution": f"₹{contrib:,.0f}"
            })
        
        b_df = pd.DataFrame(breakdown_data)
        st.table(b_df)
        
        st.warning("⚠️ **Disclaimer:** This estimation is produced by a trained Multiple Linear Regression machine learning model for academic demonstration. Actual market prices depend on micro-location factors, legal clearances, negotiated terms, and prevailing real estate market dynamics.")


# =============================================================
# 6. ABOUT PROJECT SECTION
# =============================================================
elif navigation == "6. ℹ️ ABOUT PROJECT":
    st.title("ℹ️ About the Major Project")
    st.markdown("---")
    
    st.markdown("""
    ### 🎓 Project Identification
    - **Project Title:** HOUSE PRICE PREDICTION USING LINEAR REGRESSION
    - **Course:** Bachelor of Computer Applications (BCA) / B.Tech Computer Science
    - **Domain:** Supervised Machine Learning, Predictive Modeling, Real Estate Analytics
    - **Primary Algorithm:** Multiple Linear Regression (Ordinary Least Squares - OLS)
    
    ---
    
    ### 🎯 Aim and Objectives
    The central aim of this project is to eliminate guesswork and subjective speculation in real-estate valuations by creating an objective, algorithmic pricing model.
    - **Data Pipeline:** Seamless ingest, validation, and normalization of property characteristics.
    - **Mathematical Precision:** Minimization of residual sum of squares via closed-form OLS normal equations.
    - **Student-Friendly UI:** Intuitive, transparent presentation of both predictions and underlying mathematical coefficients.
    
    ---
    
    ### 💻 Technologies & Libraries
    | Technology | Purpose |
    | :--- | :--- |
    | **Python 3.10+** | Core programming language |
    | **Pandas** | Data wrangling, CSV manipulation, tabular analysis |
    | **NumPy** | High-performance multi-dimensional array arithmetic |
    | **Scikit-Learn** | Model training, StandardScaler, train_test_split, evaluation metrics |
    | **Matplotlib & Seaborn** | Statistical charts, distribution plots, heatmaps, regression lines |
    | **Streamlit** | Interactive web dashboard and real-time prediction interface |
    
    ---
    
    ### ⚠️ Limitations of Linear Regression
    1. **Assumes Linearity:** Real estate dynamics can exhibit non-linear inflection points (e.g., luxury threshold multipliers).
    2. **Outlier Sensitivity:** OLS minimizes squared errors, making it sensitive to extreme price outliers.
    3. **Multi-Collinearity:** Strong correlation between area and bedrooms requires careful feature inspection.
    
    ---
    
    ### 🚀 Future Enhancements
    1. **Non-Linear Models:** Integration of Random Forest Regressor and Gradient Boosting (XGBoost).
    2. **Geographical GIS Integration:** Interactive Google Maps / OpenStreetMap pin-drop for live latitude/longitude geocoding.
    3. **Time-Series Adjustment:** Incorporating inflation indices and historical price trends.
    4. **Image-Based Valuation:** Employing Convolutional Neural Networks (CNNs) to evaluate interior property finishes from photos.
    """)

st.markdown("---")
st.caption("College Major Project • House Price Prediction Using Linear Regression • Developed with Python, Scikit-Learn & Streamlit")
