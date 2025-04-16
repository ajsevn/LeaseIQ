import pandas as pd
import numpy as np

def clean_data_for_json(data):
    """ Converts NaN, NaT, and other non-JSON-friendly values to None """
    if isinstance(data, dict):
        return {k: clean_data_for_json(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [clean_data_for_json(v) for v in data]
    elif isinstance(data, (np.float64, np.int64, float)) and np.isnan(data):  # Fix
        return None  # Convert NaN to None
    elif isinstance(data, pd.Timestamp):  
        return str(data)  # Convert timestamps to string
    return data

def analyze_data(df, prompt=None):
    try:
        if df.empty:
            return {"error": "Dataset is empty."}

        # Basic Info
        preview_data = df.head(min(len(df), 5)).to_dict(orient="records")
        results = {
            "row_count": len(df),
            "column_count": len(df.columns),
            "columns": list(df.columns),
            "missing_values": df.isnull().sum().to_dict(),
            "preview": preview_data
        }

        # Numeric Data Analysis
        numeric_cols = df.select_dtypes(include=[np.number])
        if not numeric_cols.empty:
            results["numeric_summary"] = numeric_cols.describe().to_dict()

            # Identify highest value fields
            max_values = numeric_cols.max().to_dict()
            if max_values:  # Ensure max_values is not empty
                max_field = max(max_values, key=lambda k: max_values[k] if not np.isnan(max_values[k]) else float('-inf'))
                results["highest_value_field"] = {
                    "field": max_field,
                    "max_value": max_values[max_field] if not np.isnan(max_values[max_field]) else None
                }

            # Find correlation between fields (Drop NaNs)
            correlation_matrix = numeric_cols.corr().fillna(0).to_dict()
            results["correlation_matrix"] = correlation_matrix

        # Categorical Data Analysis
        categorical_cols = df.select_dtypes(exclude=[np.number])
        if not categorical_cols.empty:
            mode_values = {
                col: (categorical_cols[col].mode().iloc[0] if not categorical_cols[col].mode().empty else None)
                for col in categorical_cols
            }
            results["most_frequent_categories"] = mode_values

        # If prompt is given, include it in the output
        if prompt:
            results["analysis_note"] = f"User prompt: {prompt}"

        # Clean Data for JSON
        return clean_data_for_json(results)

    except Exception as e:
        return {"error": str(e)}
