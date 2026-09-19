# AI / ML Modeling Engine - UrbanFlood AI

This directory encapsulates all machine learning research, data preprocessing scripts, training workflows, evaluation suites, and serialized model artifacts.

## Structure
- `data/raw/`: Raw external datasets (DEM tiles, historical flood CSVs, rain gauge telemetry).
- `data/processed/`: Standardized feature matrices ready for model consumption.
- `notebooks/`: Jupyter notebooks for exploratory data analysis (EDA) and experimental feature validation.
- `preprocessing/`: Modular Python scripts for calculating hydrological metrics (e.g. antecedent rainfall index, slope, flow accumulation).
- `models/train.py`: Main model training script producing cross-validated XGBoost classifiers.
- `models/predict.py`: Inference helper class used by the FastAPI backend.
- `models/evaluate.py`: Performance metrics computation (Precision, Recall, ROC-AUC, Brier score).
- `models/saved/`: Serialized model binaries (`.joblib`, `.json`).

## Model Approach
We implement a calibrated Gradient Boosted Decision Tree (XGBoost) model. The target is flood susceptibility probability $P(\text{Flood} \mid X)$ categorized into:
- 🟢 **LOW**: $P < 0.30$
- 🟡 **MODERATE**: $0.30 \le P < 0.60$
- 🟠 **HIGH**: $0.60 \le P < 0.85$
- 🔴 **CRITICAL**: $P \ge 0.85$
