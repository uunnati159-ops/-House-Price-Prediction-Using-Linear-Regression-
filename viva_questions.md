# 🎓 VIVA VOCE QUESTIONS & ANSWERS
## Project: HOUSE PRICE PREDICTION USING LINEAR REGRESSION
### For BCA / B.Sc / B.Tech Computer Science Major Project Examination

---

### Q1: What is Machine Learning?
**Answer:** Machine Learning is a branch of Artificial Intelligence (AI) that enables computer systems to learn patterns and relationships directly from empirical data without being explicitly programmed with hardcoded rules.

### Q2: What is Supervised Learning?
**Answer:** Supervised Learning is a category of machine learning where the model is trained on labeled data containing both input features ($X$) and ground-truth output labels ($y$). The model learns a mathematical mapping function $y = f(X)$ so that it can predict labels for new, unseen input data.

### Q3: What is Regression in Machine Learning?
**Answer:** Regression is a supervised learning task where the target output variable is a continuous numerical value (such as price, temperature, or height), in contrast to Classification where the target is a discrete categorical label (such as Spam/Not Spam).

### Q4: What is Linear Regression?
**Answer:** Linear Regression is a statistical and machine learning technique that models the linear relationship between one or more independent predictor variables ($X$) and a continuous dependent target variable ($y$) using a straight-line equation:
$$y = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + \dots + \beta_n X_n + \epsilon$$

### Q5: Why is Linear Regression suitable for this house price prediction project?
**Answer:**
1. House prices naturally exhibit a strong direct linear relationship with attributes like square footage, bedrooms, and location score.
2. It offers high interpretability: each coefficient provides a direct monetary value (e.g., adding 1 sqft adds ~₹3,200).
3. It is computationally lightweight, training in milliseconds with closed-form mathematical guarantees (OLS).
4. It provides an ideal academic benchmark for major project evaluation.

### Q6: What is a Dependent Variable?
**Answer:** The dependent variable (also called the target or response variable) is the outcome being predicted by the model. In this project, **`House_Price`** is the dependent variable because its value depends upon property characteristics.

### Q7: What are Independent Variables?
**Answer:** Independent variables (also called input features or predictor variables) are the attributes used by the model to calculate the prediction. In this project, the 8 independent variables are:
`Area_sqft`, `Bedrooms`, `Bathrooms`, `Floors`, `Parking`, `Age`, `Location_Score`, and `Distance_to_City_km`.

### Q8: What is train_test_split?
**Answer:** `train_test_split` is a function from scikit-learn's `model_selection` module that randomly partitions a dataset into two subsets:
1. **Training Set (typically 70% - 80%):** Used by the algorithm to learn weights/coefficients.
2. **Testing Set (typically 20% - 30%):** Held out as unseen data to evaluate how accurately the model generalizes.

### Q9: Why do we split the dataset into train and test sets?
**Answer:** If we evaluate the model on the same data it was trained on, we cannot verify whether it actually learned generalizable patterns or simply memorized the data (overfitting). Splitting data ensures an unbiased, realistic measurement of model performance on fresh real-world inputs.

### Q10: What is Data Preprocessing?
**Answer:** Data preprocessing is the process of cleaning, transforming, and organizing raw data into an orderly format suitable for training machine learning algorithms. It includes handling missing values, eliminating duplicate records, removing outliers, and scaling features.

### Q11: What is Feature Scaling and why is it used?
**Answer:** Feature scaling (e.g., `StandardScaler`) transforms numerical features that have vastly different ranges (like `Area_sqft` in thousands vs `Floors` from 1 to 4) into a comparable numerical scale (mean = 0, standard deviation = 1). This prevents high-magnitude features from dominating the gradient calculations and ensures numerical stability.

### Q12: What is Mean Squared Error (MSE)?
**Answer:** MSE is a loss and evaluation metric that measures the average of the squared differences between the actual house prices ($y$) and the predicted prices ($\hat{y}$):
$$\text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$$
Because errors are squared, MSE heavily penalizes large estimation errors.

### Q13: What is Root Mean Squared Error (RMSE)?
**Answer:** RMSE is simply the square root of MSE ($\sqrt{\text{MSE}}$). The primary advantage of RMSE is that it is expressed in the same physical units as the target variable (in this case, in Indian Rupees ₹), making it intuitive to interpret as the average pricing error.

### Q14: What is R² Score (Coefficient of Determination)?
**Answer:** $R^2$ is a statistical metric ranging from 0 to 1 (or 0% to 100%) that measures the proportion of variance in the target variable that is explained by the input features in the model:
$$R^2 = 1 - \frac{\text{SS}_{\text{residual}}}{\text{SS}_{\text{total}}}$$
An $R^2$ of 0.92 means 92% of the variation in house prices is captured by our features.

### Q15: What does a Regression Coefficient ($\beta_i$) mean?
**Answer:** A regression coefficient represents the rate of change in the target variable for every 1-unit increase in that specific feature, holding all other features constant. For example, if the coefficient of `Area_sqft` is 3,200, an increase of 1 square foot raises the predicted house price by ₹3,200.

### Q16: What is an Intercept ($\beta_0$)?
**Answer:** The intercept represents the expected baseline value of the dependent variable when all input features are zero ($X_1 = X_2 = \dots = 0$).

### Q17: What is Overfitting?
**Answer:** Overfitting occurs when a machine learning model learns the training data and its random noise too closely, achieving near-perfect scores on the training set but failing to generalize and performing poorly on unseen testing data.

### Q18: What is Underfitting?
**Answer:** Underfitting occurs when a model is overly simplistic and cannot capture the underlying trend in the data, resulting in poor accuracy on both the training set and testing set.

### Q19: What is Ordinary Least Squares (OLS)?
**Answer:** OLS is the mathematical optimization technique used by scikit-learn's `LinearRegression`. It finds the optimal coefficient vector $\boldsymbol{\beta}$ by minimizing the sum of squared vertical distances (residuals) between observed data points and the fitted regression hyperplane:
$$\boldsymbol{\beta} = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}$$

### Q20: What are the main limitations of Linear Regression?
**Answer:**
1. It assumes a purely linear relationship between features and the target.
2. It is sensitive to extreme outliers due to squared error penalties.
3. It assumes features are independent (can suffer from multicollinearity).

### Q21: Why is house price considered a continuous target variable?
**Answer:** A house price is continuous because it can take any real numerical value along an unbroken continuum (e.g., ₹45,50,000, ₹45,50,500, etc.), unlike discrete classes which have predefined discrete categories.

### Q22: What happens when the user clicks 'PREDICT HOUSE PRICE' in the application?
**Answer:**
1. The user's input values from the input fields/sliders are collected into a Pandas DataFrame.
2. The values pass through the fitted `StandardScaler` pipeline to normalize them to the exact distribution scale learned during training.
3. The scaled values are multiplied by the model's coefficients $\boldsymbol{\beta}$ and added to the intercept $\beta_0$.
4. The resulting estimated price is formatted in Indian Rupee currency notation (₹XX,XX,XXX) and displayed on the UI alongside an itemized feature contribution breakdown.

### Q23: Why must the exact same preprocessing pipeline be applied to user predictions as training?
**Answer:** If the model was trained on scaled numbers (e.g., mean 0, std 1), feeding it raw numbers (like 2,000 sqft) would produce completely invalid mathematical outputs. A scikit-learn `Pipeline` guarantees consistency by applying the exact same scaling parameters ($\mu, \sigma$) learned during training to new user inputs.

### Q24: What is the purpose of the Correlation Matrix / Heatmap in EDA?
**Answer:** The correlation heatmap visualizes Pearson correlation coefficients between every pair of features. It helps identify which features have the strongest positive or negative correlation with house price, and helps detect potential multicollinearity between predictor features (like area and number of rooms).

### Q25: How can this project be enhanced in the future?
**Answer:**
1. Implementing non-linear algorithms such as Random Forest Regressor and XGBoost.
2. Integrating interactive Google Maps or OpenStreetMap for automatic coordinate-based amenity scoring.
3. Connecting a real-time database to ingest live real estate listings.
4. Adding deep learning computer vision to evaluate interior and exterior photos of the house.
