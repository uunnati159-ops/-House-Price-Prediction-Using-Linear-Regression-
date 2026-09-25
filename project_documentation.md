# COLLEGE MAJOR PROJECT DOCUMENTATION
# Title: HOUSE PRICE PREDICTION USING LINEAR REGRESSION

---

### 1. Project Title
**HOUSE PRICE PREDICTION USING LINEAR REGRESSION**

### 2. Abstract
The real estate market is one of the most volatile and significant sectors of the modern economy. Accurate pricing of houses is crucial for home buyers, property investors, financial institutions, and real estate developers. Traditionally, property valuation relies on human appraisers, historical sales records, or subjective broker intuition, often leading to price distortions and market friction. This major project proposes an automated, data-driven machine learning system utilizing the **Multiple Linear Regression** algorithm. The model learns statistical relationships between property attributes (such as built-up area in square feet, number of bedrooms, bathrooms, floors, parking spaces, age of construction, locality score, and proximity to the city center) and property market price. The system is deployed as an interactive web dashboard providing real-time data inspection, statistical visualizations, model evaluation metrics (MSE, RMSE, R² Score), and instantaneous house price estimation in Indian Rupees (₹).

### 3. Introduction
Machine learning has emerged as an indispensable paradigm in real estate analytics. Regression analysis, in particular, is a foundational supervised learning methodology aimed at predicting a continuous numerical target variable based on one or more explanatory predictor variables. This project focuses on solving the real estate valuation problem using Multiple Linear Regression. Through an end-to-end pipeline encompassing data ingestion, cleaning, exploratory data analysis (EDA), standardization, model training, and web deployment, this project demonstrates how machine learning brings transparency and accuracy to property valuation.

### 4. Problem Statement
Traditional house price estimation suffers from several severe problems:
1. **Subjective Bias:** Real estate brokers frequently artificially inflate or deflate rates based on personal commissions.
2. **Lack of Transparency:** Buyers and sellers lack access to empirical models demonstrating which property features account for price variations.
3. **Inefficiency:** Manual appraisals are time-consuming and expensive.
4. **Information Asymmetry:** First-time home buyers are easily misled without quantitative benchmark data.

There is a distinct need for an objective, mathematical, and automated software tool that computes transparent house valuations based on physical and geographic attributes.

### 5. Aim
To develop, train, evaluate, and deploy an automated machine learning web application using Multiple Linear Regression that predicts the monetary price of residential houses from physical and location-based features.

### 6. Objectives
- To gather and sanitize a representative residential property dataset (`house_prices.csv`).
- To conduct Exploratory Data Analysis (EDA) uncovering statistical correlations and distribution patterns.
- To implement data preprocessing pipelines including duplicate removal, missing value imputation, and feature standardization.
- To train a Multiple Linear Regression model using scikit-learn via Ordinary Least Squares (OLS).
- To evaluate model performance using standard metrics: Mean Squared Error (MSE), Root Mean Squared Error (RMSE), Mean Absolute Error (MAE), and R² Score.
- To build a clean, responsive, and intuitive web user interface allowing users to input house specifications and receive real-time price predictions in Indian Rupees (₹).

### 7. Existing System
In the existing conventional system:
- Valuation is conducted via physical inspection by government or private property appraisers.
- Estimates are largely based on local word-of-mouth or recent registry transactions in the same neighborhood without controlling for property-specific parameters like age, parking, or layout.
- Process takes days or weeks and costs significant appraisal fees.
- Estimates vary dramatically between different appraisers.

### 8. Proposed System
The proposed system automates property valuation using Machine Learning:
- Utilizes Ordinary Least Squares (OLS) Multiple Linear Regression to model property prices mathematically.
- Ingests multiple independent features simultaneously (area, rooms, floors, age, distance, locality score).
- Provides instant, repeatable, deterministic valuations with zero manual delay.
- Transparently exposes feature coefficients, explaining exactly how much each additional square foot or bedroom contributes to the total price.
- Offers interactive visualizations and diagnostic charts for model verification.

### 9. Scope of the Project
- **Academic Scope:** Demonstrates core principles of Supervised Machine Learning, statistical linear modeling, data preprocessing pipelines, and web framework integration for BCA/B.Tech students.
- **Functional Scope:** Applicable for property buyers, sellers, mortgage loan officers, and real estate portals to establish baseline price benchmarks.
- **Future Expansion:** The architecture can readily ingest additional geographic parameters (crime rates, school ratings) or advanced algorithms (Random Forests, Gradient Boosting).

### 10. Literature / Background
Linear regression was first formally developed by Carl Friedrich Gauss and Adrien-Marie Legendre in the early 19th century through the method of least squares to predict planetary orbits. In modern predictive modeling and econometrics, Hedonic Pricing Models (Rosen, 1974) establish that goods are valued for their utility-bearing characteristics. In real estate, hedonic regression models house price as a linear combination of its intrinsic features (structural qualities) and extrinsic features (neighborhood and locational amenities).

### 11. Technologies Used
- **Programming Language:** Python 3.10+
- **Machine Learning Library:** `scikit-learn`
- **Numerical Computation:** `numpy`
- **Data Manipulation:** `pandas`
- **Data Visualization:** `matplotlib`, `seaborn`
- **User Interface Framework:** `Streamlit` / React SPA with Tailwind CSS
- **Data Format:** CSV (Comma-Separated Values)

### 12. Hardware Requirements
- **Processor:** Intel Core i3 / AMD Ryzen 3 or higher
- **RAM:** Minimum 4 GB (8 GB recommended)
- **Hard Disk:** 500 MB free storage
- **Display:** 1024x768 minimum resolution screen

### 13. Software Requirements
- **Operating System:** Windows 10/11, macOS, or Linux (Ubuntu)
- **Python Environment:** Python 3.10+ with `pip`
- **Code Editor / IDE:** VS Code, PyCharm, or Jupyter Notebook
- **Modern Web Browser:** Google Chrome, Mozilla Firefox, or Microsoft Edge

### 14. Dataset Description
The dataset (`house_prices.csv`) contains 650 records of residential housing units with 8 input features and 1 continuous target variable:
1. `Area_sqft` (Numeric, Continuous): Carpet and built-up area in square feet (500 - 5,000 sqft).
2. `Bedrooms` (Numeric, Discrete): Number of bedrooms (1 to 6).
3. `Bathrooms` (Numeric, Discrete): Number of bathrooms (1 to 5).
4. `Floors` (Numeric, Discrete): Number of stories (1 to 4).
5. `Parking` (Numeric, Discrete): Reserved vehicle parking spaces (0 to 3).
6. `Age` (Numeric, Continuous): Age of property construction in years (0 to 35).
7. `Location_Score` (Numeric, Continuous): Locality and infrastructure rating from 1.0 (basic) to 10.0 (prime).
8. `Distance_to_City_km` (Numeric, Continuous): Distance from central business district in km (1.0 to 35.0 km).
9. `House_Price` (Numeric, Continuous, Target): Total valuation of the house in Indian Rupees (₹).

### 15. Data Preprocessing
- **Duplicate Removal:** Identifies and eliminates redundant rows using `.drop_duplicates()`.
- **Missing Value Handling:** Missing continuous numerical values are imputed using feature medians to maintain robustness against outliers.
- **Outlier Inspection:** Interquartile Range (IQR) checks ensure values stay within realistic property constraints.
- **Feature Standardization:** Employs `StandardScaler` to transform features to have zero mean and unit variance ($z = \frac{x - \mu}{\sigma}$), ensuring balanced gradient updates and coefficient stability.

### 16. Exploratory Data Analysis (EDA)
EDA steps implemented:
- **Univariate Analysis:** Distribution histograms and Kernel Density Estimation (KDE) plots to examine normality of `House_Price` and `Area_sqft`.
- **Bivariate Analysis:** Scatter plots with OLS regression lines for `Area_sqft` vs `House_Price`.
- **Categorical Breakdown:** Box plots showing price spread across bedroom numbers.
- **Multivariate Correlation:** Pearson Correlation Heatmap measuring pairwise linear associations between all features.

### 17. Feature Selection
All 8 features exhibit meaningful physical and statistical correlation with `House_Price`:
- High positive correlation: `Area_sqft` (~0.85), `Location_Score` (~0.45), `Bedrooms` (~0.60).
- Negative correlation: `Distance_to_City_km` (~ -0.35), `Age` (~ -0.25).
- Multicollinearity between bedrooms and area is recognized and moderated via standard scaling.

### 18. Linear Regression Algorithm
Multiple Linear Regression assumes a linear relationship between input vector $\mathbf{X}$ and target $Y$:
$$Y = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + \dots + \beta_n X_n + \epsilon$$
In matrix notation:
$$\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\epsilon}$$
The Ordinary Least Squares (OLS) objective minimizes the Residual Sum of Squares (RSS):
$$\text{RSS}(\boldsymbol{\beta}) = \sum_{i=1}^{m} (y_i - \hat{y}_i)^2 = (\mathbf{y} - \mathbf{X}\boldsymbol{\beta})^T(\mathbf{y} - \mathbf{X}\boldsymbol{\beta})$$
Setting the gradient to zero yields the closed-form Normal Equation:
$$\boldsymbol{\beta} = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}$$

### 19. Model Training
The dataset is partitioned into 80% Training Set (520 records) and 20% Testing Set (130 records) with a fixed random seed for reproducibility. The scikit-learn `Pipeline` scales training data and computes optimal weights $\boldsymbol{\beta}$ via OLS.

### 20. Model Evaluation
The trained model is evaluated on the unseen testing dataset using:
- **Mean Squared Error (MSE):** $\frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$
- **Root Mean Squared Error (RMSE):** $\sqrt{\text{MSE}}$
- **Mean Absolute Error (MAE):** $\frac{1}{n} \sum_{i=1}^{n} |y_i - \hat{y}_i|$
- **R² Score (Coefficient of Determination):**
  $$R^2 = 1 - \frac{\sum (y_i - \hat{y}_i)^2}{\sum (y_i - \bar{y})^2}$$
The model consistently achieves an $R^2$ score $> 0.90$, indicating that over 90% of the variance in house prices is captured by the regression model.

### 21. System Architecture
```
+-------------------------------------------------------------+
|                      USER INTERFACE                         |
|  (Streamlit / Web Dashboard: Inputs, Charts & Predictions)  |
+-------------------------------------------------------------+
                              ▲
                              │
+-------------------------------------------------------------+
|                PREDICTION & INFERENCE ENGINE                |
|           Pipeline.predict() -> Formatted ₹ Result          |
+-------------------------------------------------------------+
                              ▲
                              │
+-------------------------------------------------------------+
|                 LINEAR REGRESSION MODEL                     |
|         Trained Weights (Coefficients + Intercept)          |
+-------------------------------------------------------------+
                              ▲
                              │
+-------------------------------------------------------------+
|                   PREPROCESSING PIPELINE                    |
|        StandardScaler + Train-Test Split (80/20)            |
+-------------------------------------------------------------+
                              ▲
                              │
+-------------------------------------------------------------+
|                      DATASET LAYER                          |
|             house_prices.csv (650 Records)                  |
+-------------------------------------------------------------+
```

### 22. Modules Description
- **Module 1 – Dataset Collection:** Reads and parses `house_prices.csv` into memory using Pandas.
- **Module 2 – Data Preprocessing:** Removes duplicates, handles null values via median imputation, and standardizes continuous features.
- **Module 3 – Exploratory Data Analysis:** Generates price distribution plots, scatter diagrams with trendlines, boxplots, and correlation heatmaps.
- **Module 4 – Feature Selection:** Separates the 8 predictor features from the continuous target variable `House_Price`.
- **Module 5 – Linear Regression Model:** Configures the scikit-learn Pipeline with `StandardScaler` and `LinearRegression`.
- **Module 6 – Model Training:** Fits the model on 80% training data using closed-form OLS optimization.
- **Module 7 – Model Evaluation:** Evaluates testing holdout on MSE, RMSE, MAE, R² score, and generates Actual vs Predicted plots.
- **Module 8 – House Price Prediction:** Accepts user input values from the UI, applies identical pipeline scaling, and predicts the estimated house price.
- **Module 9 – Visualization and Dashboard:** Delivers a responsive dashboard with navigation menus, metrics cards, and breakdown tables.

### 23. Working Methodology
1. **System Ingestion:** System loads dataset from disk upon startup.
2. **Preprocessing:** Pipeline checks schema, types, and values.
3. **Training & Validation:** Model calculates coefficients and metrics on holdout test partition.
4. **User Interaction:** User specifies area, bedrooms, bathrooms, floors, parking, age, location score, and distance.
5. **Prediction Generation:** Input features are transformed using training scale parameters and passed to the regression equation.
6. **Result Display:** Estimated price is formatted in Indian Rupee notation (₹XX,XX,XXX) alongside an itemized feature contribution breakdown.

### 24. Step-by-Step Algorithm
1. **Step 1:** Ingest dataset $D = \{(\mathbf{x}_1, y_1), \dots, (\mathbf{x}_m, y_m)\}$.
2. **Step 2:** Sanitize $D$ by removing duplicate rows and filling missing cells with column medians.
3. **Step 3:** Separate independent matrix $\mathbf{X}$ and target vector $\mathbf{y}$.
4. **Step 4:** Split into $(\mathbf{X}_{\text{train}}, \mathbf{y}_{\text{train}})$ and $(\mathbf{X}_{\text{test}}, \mathbf{y}_{\text{test}})$ using ratio 80:20.
5. **Step 5:** Compute sample mean $\boldsymbol{\mu}$ and standard deviation $\boldsymbol{\sigma}$ on $\mathbf{X}_{\text{train}}$ for scaling.
6. **Step 6:** Compute normal equation $\boldsymbol{\beta} = (\mathbf{X}_{\text{train}}^T \mathbf{X}_{\text{train}})^{-1} \mathbf{X}_{\text{train}}^T \mathbf{y}_{\text{train}}$.
7. **Step 7:** Predict test values $\hat{\mathbf{y}}_{\text{test}} = \mathbf{X}_{\text{test}} \boldsymbol{\beta}$.
8. **Step 8:** Calculate evaluation metrics $MSE$ and $R^2$.
9. **Step 9:** Accept user test input $\mathbf{x}_{\text{user}}$.
10. **Step 10:** Scale $\mathbf{x}_{\text{user, scaled}} = \frac{\mathbf{x}_{\text{user}} - \boldsymbol{\mu}}{\boldsymbol{\sigma}}$.
11. **Step 11:** Compute $\hat{y} = \beta_0 + \sum_{j=1}^8 \beta_j x_{\text{user, scaled}, j}$.
12. **Step 12:** Display formatted price in Indian currency format.

### 25. Advantages
- **Fast Execution:** Linear regression has minimal computational complexity and provides instantaneous predictions.
- **High Interpretability:** Every coefficient directly represents the marginal monetary value of that feature.
- **No Black-Box Obscurity:** Transparent calculations make it ideal for financial justification and academic evaluation.
- **Robust Baseline:** Serves as the gold-standard benchmark model in real estate econometric literature.

### 26. Limitations
- **Linearity Assumption:** Assumes strictly additive linear feature interactions; non-linear inflection points (e.g., luxury estate premiums) require polynomial terms.
- **Outlier Sensitivity:** OLS minimizes squared error terms, making it sensitive to uncharacteristic extreme luxury properties.
- **Locality Constraints:** A single global linear model cannot capture highly localized neighborhood micro-markets without geospatial features.

### 27. Future Enhancements
- **Non-Linear Ensembles:** Incorporating Random Forest and XGBoost regressors for comparison.
- **Interactive Mapping:** Integrating Google Maps or OpenStreetMap for pin-drop location selection.
- **Image Valuation:** Utilizing deep learning (CNNs) to score property finish and condition from interior photos.
- **Mortgage & EMI Calculator:** Adding an integrated loan amortization and EMI calculator based on predicted price.

### 28. Expected Results
- High prediction accuracy with $R^2 \ge 0.90$.
- Clear visual correlation between square footage, location score, and house price.
- Seamless user experience with instantaneous price estimation and detailed contribution breakdown.

### 29. Conclusion
The "House Price Prediction Using Linear Regression" project successfully applies supervised machine learning to solve an important practical problem. By structuring the solution through a disciplined engineering pipeline—from data preprocessing and EDA to mathematical model fitting and web deployment—the project provides an accessible, transparent, and accurate pricing estimation tool suitable for both academic demonstration and real-world benchmarking.
