export interface VivaItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export const VIVA_QUESTIONS: VivaItem[] = [
  {
    "id": 1,
    "question": "What is Machine Learning?",
    "answer": "Machine Learning is a branch of Artificial Intelligence (AI) that enables computer systems to learn patterns and relationships directly from empirical data without being explicitly programmed with hardcoded rules.",
    "category": "Fundamentals"
  },
  {
    "id": 2,
    "question": "What is Supervised Learning?",
    "answer": "Supervised Learning is a category of machine learning where the model is trained on labeled data containing both input features ($X$) and ground-truth output labels ($y$). The model learns a mathematical mapping function $y = f(X)$ so that it can predict labels for new, unseen input data.",
    "category": "Supervised Learning"
  },
  {
    "id": 3,
    "question": "What is Regression in Machine Learning?",
    "answer": "Regression is a supervised learning task where the target output variable is a continuous numerical value (such as price, temperature, or height), in contrast to Classification where the target is a discrete categorical label (such as Spam/Not Spam).",
    "category": "Linear Regression"
  },
  {
    "id": 4,
    "question": "What is Linear Regression?",
    "answer": "Linear Regression is a statistical and machine learning technique that models the linear relationship between one or more independent predictor variables ($X$) and a continuous dependent target variable ($y$) using a straight-line equation:\n$$y = \\beta_0 + \\beta_1 X_1 + \\beta_2 X_2 + \\dots + \\beta_n X_n + \\epsilon$$",
    "category": "Linear Regression"
  },
  {
    "id": 5,
    "question": "Why is Linear Regression suitable for this house price prediction project?",
    "answer": "1. House prices naturally exhibit a strong direct linear relationship with attributes like square footage, bedrooms, and location score.\n2. It offers high interpretability: each coefficient provides a direct monetary value (e.g., adding 1 sqft adds ~\u20b93,200).\n3. It is computationally lightweight, training in milliseconds with closed-form mathematical guarantees (OLS).\n4. It provides an ideal academic benchmark for major project evaluation.",
    "category": "Project Application"
  },
  {
    "id": 6,
    "question": "What is a Dependent Variable?",
    "answer": "The dependent variable (also called the target or response variable) is the outcome being predicted by the model. In this project, **`House_Price`** is the dependent variable because its value depends upon property characteristics.",
    "category": "Variables & Features"
  },
  {
    "id": 7,
    "question": "What are Independent Variables?",
    "answer": "Independent variables (also called input features or predictor variables) are the attributes used by the model to calculate the prediction. In this project, the 8 independent variables are:\n`Area_sqft`, `Bedrooms`, `Bathrooms`, `Floors`, `Parking`, `Age`, `Location_Score`, and `Distance_to_City_km`.",
    "category": "Variables & Features"
  },
  {
    "id": 8,
    "question": "What is train_test_split?",
    "answer": "`train_test_split` is a function from scikit-learn's `model_selection` module that randomly partitions a dataset into two subsets:\n1. **Training Set (typically 70% - 80%):** Used by the algorithm to learn weights/coefficients.\n2. **Testing Set (typically 20% - 30%):** Held out as unseen data to evaluate how accurately the model generalizes.",
    "category": "Train/Test Split"
  },
  {
    "id": 9,
    "question": "Why do we split the dataset into train and test sets?",
    "answer": "If we evaluate the model on the same data it was trained on, we cannot verify whether it actually learned generalizable patterns or simply memorized the data (overfitting). Splitting data ensures an unbiased, realistic measurement of model performance on fresh real-world inputs.",
    "category": "Train/Test Split"
  },
  {
    "id": 10,
    "question": "What is Data Preprocessing?",
    "answer": "Data preprocessing is the process of cleaning, transforming, and organizing raw data into an orderly format suitable for training machine learning algorithms. It includes handling missing values, eliminating duplicate records, removing outliers, and scaling features.",
    "category": "Data Preprocessing"
  },
  {
    "id": 11,
    "question": "What is Feature Scaling and why is it used?",
    "answer": "Feature scaling (e.g., `StandardScaler`) transforms numerical features that have vastly different ranges (like `Area_sqft` in thousands vs `Floors` from 1 to 4) into a comparable numerical scale (mean = 0, standard deviation = 1). This prevents high-magnitude features from dominating the gradient calculations and ensures numerical stability.",
    "category": "Feature Scaling"
  },
  {
    "id": 12,
    "question": "What is Mean Squared Error (MSE)?",
    "answer": "MSE is a loss and evaluation metric that measures the average of the squared differences between the actual house prices ($y$) and the predicted prices ($\\hat{y}$):\n$$\\text{MSE} = \\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2$$\nBecause errors are squared, MSE heavily penalizes large estimation errors.",
    "category": "Evaluation Metrics"
  },
  {
    "id": 13,
    "question": "What is Root Mean Squared Error (RMSE)?",
    "answer": "RMSE is simply the square root of MSE ($\\sqrt{\\text{MSE}}$). The primary advantage of RMSE is that it is expressed in the same physical units as the target variable (in this case, in Indian Rupees \u20b9), making it intuitive to interpret as the average pricing error.",
    "category": "Evaluation Metrics"
  },
  {
    "id": 14,
    "question": "What is R\u00b2 Score (Coefficient of Determination)?",
    "answer": "$R^2$ is a statistical metric ranging from 0 to 1 (or 0% to 100%) that measures the proportion of variance in the target variable that is explained by the input features in the model:\n$$R^2 = 1 - \\frac{\\text{SS}_{\\text{residual}}}{\\text{SS}_{\\text{total}}}$$\nAn $R^2$ of 0.92 means 92% of the variation in house prices is captured by our features.",
    "category": "Evaluation Metrics"
  },
  {
    "id": 15,
    "question": "What does a Regression Coefficient ($\\beta_i$) mean?",
    "answer": "A regression coefficient represents the rate of change in the target variable for every 1-unit increase in that specific feature, holding all other features constant. For example, if the coefficient of `Area_sqft` is 3,200, an increase of 1 square foot raises the predicted house price by \u20b93,200.",
    "category": "Model Parameters"
  },
  {
    "id": 16,
    "question": "What is an Intercept ($\\beta_0$)?",
    "answer": "The intercept represents the expected baseline value of the dependent variable when all input features are zero ($X_1 = X_2 = \\dots = 0$).",
    "category": "Model Parameters"
  },
  {
    "id": 17,
    "question": "What is Overfitting?",
    "answer": "Overfitting occurs when a machine learning model learns the training data and its random noise too closely, achieving near-perfect scores on the training set but failing to generalize and performing poorly on unseen testing data.",
    "category": "Model Generalization"
  },
  {
    "id": 18,
    "question": "What is Underfitting?",
    "answer": "Underfitting occurs when a model is overly simplistic and cannot capture the underlying trend in the data, resulting in poor accuracy on both the training set and testing set.",
    "category": "Model Generalization"
  },
  {
    "id": 19,
    "question": "What is Ordinary Least Squares (OLS)?",
    "answer": "OLS is the mathematical optimization technique used by scikit-learn's `LinearRegression`. It finds the optimal coefficient vector $\\boldsymbol{\\beta}$ by minimizing the sum of squared vertical distances (residuals) between observed data points and the fitted regression hyperplane:\n$$\\boldsymbol{\\beta} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y}$$",
    "category": "Mathematical Foundations"
  },
  {
    "id": 20,
    "question": "What are the main limitations of Linear Regression?",
    "answer": "1. It assumes a purely linear relationship between features and the target.\n2. It is sensitive to extreme outliers due to squared error penalties.\n3. It assumes features are independent (can suffer from multicollinearity).",
    "category": "Limitations"
  },
  {
    "id": 21,
    "question": "Why is house price considered a continuous target variable?",
    "answer": "A house price is continuous because it can take any real numerical value along an unbroken continuum (e.g., \u20b945,50,000, \u20b945,50,500, etc.), unlike discrete classes which have predefined discrete categories.",
    "category": "Target Characteristics"
  },
  {
    "id": 22,
    "question": "What happens when the user clicks 'PREDICT HOUSE PRICE' in the application?",
    "answer": "1. The user's input values from the input fields/sliders are collected into a Pandas DataFrame.\n2. The values pass through the fitted `StandardScaler` pipeline to normalize them to the exact distribution scale learned during training.\n3. The scaled values are multiplied by the model's coefficients $\\boldsymbol{\\beta}$ and added to the intercept $\\beta_0$.\n4. The resulting estimated price is formatted in Indian Rupee currency notation (\u20b9XX,XX,XXX) and displayed on the UI alongside an itemized feature contribution breakdown.",
    "category": "Prediction Pipeline"
  },
  {
    "id": 23,
    "question": "Why must the exact same preprocessing pipeline be applied to user predictions as training?",
    "answer": "If the model was trained on scaled numbers (e.g., mean 0, std 1), feeding it raw numbers (like 2,000 sqft) would produce completely invalid mathematical outputs. A scikit-learn `Pipeline` guarantees consistency by applying the exact same scaling parameters ($\\mu, \\sigma$) learned during training to new user inputs.",
    "category": "Pipeline Consistency"
  },
  {
    "id": 24,
    "question": "What is the purpose of the Correlation Matrix / Heatmap in EDA?",
    "answer": "The correlation heatmap visualizes Pearson correlation coefficients between every pair of features. It helps identify which features have the strongest positive or negative correlation with house price, and helps detect potential multicollinearity between predictor features (like area and number of rooms).",
    "category": "EDA & Correlation"
  },
  {
    "id": 25,
    "question": "How can this project be enhanced in the future?",
    "answer": "1. Implementing non-linear algorithms such as Random Forest Regressor and XGBoost.\n2. Integrating interactive Google Maps or OpenStreetMap for automatic coordinate-based amenity scoring.\n3. Connecting a real-time database to ingest live real estate listings.\n4. Adding deep learning computer vision to evaluate interior and exterior photos of the house.",
    "category": "Future Scope"
  }
];
