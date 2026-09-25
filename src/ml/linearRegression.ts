/**
 * Linear Regression Machine Learning Engine
 * Implements Ordinary Least Squares (OLS) Normal Equation: β = (X^T * X)^(-1) * X^T * y
 * with StandardScaler, Train/Test Split, and Evaluation Metrics (MSE, RMSE, MAE, R²).
 */

export interface HouseRecord {
  Area_sqft: number;
  Bedrooms: number;
  Bathrooms: number;
  Floors: number;
  Parking: number;
  Age: number;
  Location_Score: number;
  Distance_to_City_km: number;
  House_Price: number;
}

export const FEATURE_NAMES = [
  'Area_sqft',
  'Bedrooms',
  'Bathrooms',
  'Floors',
  'Parking',
  'Age',
  'Location_Score',
  'Distance_to_City_km',
] as const;

export type FeatureKey = typeof FEATURE_NAMES[number];

export interface FeatureStats {
  feature: string;
  count: number;
  mean: number;
  std: number;
  min: number;
  q25: number;
  median: number;
  q75: number;
  max: number;
}

export interface ModelMetrics {
  r2: number;
  mse: number;
  rmse: number;
  mae: number;
  trainCount: number;
  testCount: number;
  unscaledIntercept: number;
  unscaledCoefficients: { [key in FeatureKey]: number };
  scaledCoefficients: { [key in FeatureKey]: number };
  testActuals: number[];
  testPredictions: number[];
  residuals: number[];
  featureMeans: { [key in FeatureKey]: number };
  featureStds: { [key in FeatureKey]: number };
}

// Matrix Operations for OLS: (X^T * X)^(-1) * X^T * y
function matrixTranspose(A: number[][]): number[][] {
  const rows = A.length;
  const cols = A[0].length;
  const AT: number[][] = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      AT[j][i] = A[i][j];
    }
  }
  return AT;
}

function matrixMultiply(A: number[][], B: number[][]): number[][] {
  const rowsA = A.length;
  const colsA = A[0].length;
  const colsB = B[0].length;
  const C: number[][] = Array.from({ length: rowsA }, () => Array(colsB).fill(0));

  for (let i = 0; i < rowsA; i++) {
    for (let k = 0; k < colsA; k++) {
      for (let j = 0; j < colsB; j++) {
        C[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return C;
}

function matrixInverse(A: number[][]): number[][] | null {
  const n = A.length;
  // Augment A with identity matrix
  const M: number[][] = A.map((row, i) => [
    ...row,
    ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  ]);

  for (let i = 0; i < n; i++) {
    // Pivot selection
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) {
        maxRow = k;
      }
    }
    if (Math.abs(M[maxRow][i]) < 1e-12) {
      // Singular matrix
      return null;
    }
    // Swap rows
    [M[i], M[maxRow]] = [M[maxRow], M[i]];

    // Normalize pivot row
    const pivot = M[i][i];
    for (let j = 0; j < 2 * n; j++) {
      M[i][j] /= pivot;
    }

    // Eliminate other rows
    for (let k = 0; k < n; k++) {
      if (k !== i) {
        const factor = M[k][i];
        for (let j = 0; j < 2 * n; j++) {
          M[k][j] -= factor * M[i][j];
        }
      }
    }
  }

  // Extract right half
  const inv: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      inv[i][j] = M[i][j + n];
    }
  }
  return inv;
}

/**
 * Calculates Descriptive Statistics for a list of numbers
 */
export function calculateStats(values: number[], name: string): FeatureStats {
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const sum = sorted.reduce((acc, val) => acc + val, 0);
  const mean = sum / n;
  const variance = sorted.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (n - 1 || 1);
  const std = Math.sqrt(variance);

  const getPercentile = (p: number) => {
    const idx = (p / 100) * (n - 1);
    const lower = Math.floor(idx);
    const upper = Math.ceil(idx);
    const weight = idx - lower;
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
  };

  return {
    feature: name,
    count: n,
    mean,
    std,
    min: sorted[0],
    q25: getPercentile(25),
    median: getPercentile(50),
    q75: getPercentile(75),
    max: sorted[n - 1],
  };
}

/**
 * Computes Pearson correlation between two arrays
 */
export function pearsonCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;

  let num = 0;
  let denX = 0;
  let denY = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }

  const den = Math.sqrt(denX * denY);
  if (den === 0) return 0;
  return num / den;
}

/**
 * Fits Linear Regression Model using OLS Normal Equation
 */
export function trainLinearRegression(
  data: HouseRecord[],
  testRatio = 0.2,
  seed = 42
): ModelMetrics {
  // Deterministic shuffle using seed
  const shuffled = [...data];
  let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const splitIdx = Math.floor(shuffled.length * (1 - testRatio));
  const trainSet = shuffled.slice(0, splitIdx);
  const testSet = shuffled.slice(splitIdx);

  // Calculate Mean and Std for StandardScaler
  const featureMeans: { [key in FeatureKey]: number } = {} as any;
  const featureStds: { [key in FeatureKey]: number } = {} as any;

  FEATURE_NAMES.forEach((feat) => {
    const vals = trainSet.map((r) => r[feat]);
    const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
    const variance =
      vals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (vals.length - 1 || 1);
    featureMeans[feat] = mean;
    featureStds[feat] = Math.sqrt(variance) || 1;
  });

  // Construct Design Matrix X_unscaled with bias column [1, x1, x2, ...]
  const X_unscaled = trainSet.map((r) => [1, ...FEATURE_NAMES.map((f) => r[f])]);
  const y_train = trainSet.map((r) => [r.House_Price]);

  // Construct Scaled Design Matrix X_scaled with bias column [1, z1, z2, ...]
  const X_scaled = trainSet.map((r) => [
    1,
    ...FEATURE_NAMES.map((f) => (r[f] - featureMeans[f]) / featureStds[f]),
  ]);

  // Solve OLS: beta = (X^T * X)^(-1) * X^T * y
  const solveOLS = (X: number[][], y: number[][]): number[] => {
    const XT = matrixTranspose(X);
    const XTX = matrixMultiply(XT, X);
    // Add small ridge regularization to diagonal for numerical stability (1e-6)
    for (let i = 0; i < XTX.length; i++) {
      XTX[i][i] += 1e-6;
    }
    const XTX_inv = matrixInverse(XTX);
    if (!XTX_inv) {
      throw new Error('Design matrix inversion failed: Singular matrix');
    }
    const XTy = matrixMultiply(XT, y);
    const beta = matrixMultiply(XTX_inv, XTy);
    return beta.map((row) => row[0]);
  };

  const betaUnscaled = solveOLS(X_unscaled, y_train);
  const betaScaled = solveOLS(X_scaled, y_train);

  const unscaledIntercept = betaUnscaled[0];
  const unscaledCoefficients: { [key in FeatureKey]: number } = {} as any;
  const scaledCoefficients: { [key in FeatureKey]: number } = {} as any;

  FEATURE_NAMES.forEach((f, idx) => {
    unscaledCoefficients[f] = betaUnscaled[idx + 1];
    scaledCoefficients[f] = betaScaled[idx + 1];
  });

  // Predict on Test Set
  const testActuals: number[] = [];
  const testPredictions: number[] = [];
  const residuals: number[] = [];

  let sumSquaredError = 0;
  let sumAbsoluteError = 0;
  const yTestMean =
    testSet.reduce((a, b) => a + b.House_Price, 0) / (testSet.length || 1);
  let totalSumOfSquares = 0;

  for (const record of testSet) {
    const actual = record.House_Price;
    let pred = unscaledIntercept;
    FEATURE_NAMES.forEach((f) => {
      pred += unscaledCoefficients[f] * record[f];
    });
    pred = Math.max(0, pred);

    const err = actual - pred;
    sumSquaredError += err * err;
    sumAbsoluteError += Math.abs(err);
    totalSumOfSquares += Math.pow(actual - yTestMean, 2);

    testActuals.push(actual);
    testPredictions.push(pred);
    residuals.push(err);
  }

  const mse = sumSquaredError / (testSet.length || 1);
  const rmse = Math.sqrt(mse);
  const mae = sumAbsoluteError / (testSet.length || 1);
  const r2 = 1 - sumSquaredError / (totalSumOfSquares || 1);

  return {
    r2: Math.max(0, Math.min(1, r2)),
    mse,
    rmse,
    mae,
    trainCount: trainSet.length,
    testCount: testSet.length,
    unscaledIntercept,
    unscaledCoefficients,
    scaledCoefficients,
    testActuals,
    testPredictions,
    residuals,
    featureMeans,
    featureStds,
  };
}

/**
 * Predicts House Price given model metrics and user input
 */
export function predictPrice(
  input: { [key in FeatureKey]: number },
  model: ModelMetrics
): {
  predictedPrice: number;
  breakdown: { feature: string; value: number; unitRate: number; contribution: number }[];
} {
  let price = model.unscaledIntercept;
  const breakdown: {
    feature: string;
    value: number;
    unitRate: number;
    contribution: number;
  }[] = [];

  FEATURE_NAMES.forEach((f) => {
    const val = input[f];
    const rate = model.unscaledCoefficients[f];
    const contrib = val * rate;
    price += contrib;
    breakdown.push({
      feature: f,
      value: val,
      unitRate: rate,
      contribution: contrib,
    });
  });

  return {
    predictedPrice: Math.max(0, price),
    breakdown,
  };
}

/**
 * Formats a number into Indian Rupee notation: ₹XX,XX,XXX
 */
export function formatINR(val: number): string {
  const roundVal = Math.round(val);
  if (roundVal < 0) return `-₹${Math.abs(roundVal).toLocaleString('en-IN')}`;
  return `₹${roundVal.toLocaleString('en-IN')}`;
}

/**
 * Formats in Lakhs / Crores with Indian notation
 */
export function formatINRLakhCrore(val: number): string {
  if (val >= 10000000) {
    const cr = val / 10000000;
    return `₹${cr.toFixed(2)} Cr`;
  } else if (val >= 100000) {
    const lakh = val / 100000;
    return `₹${lakh.toFixed(2)} Lakhs`;
  }
  return formatINR(val);
}
