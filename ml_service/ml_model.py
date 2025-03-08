import pandas as pd
import numpy as np

def analyze_data(data, prompt=None):
    try:
        df = pd.DataFrame(data)
        
        if df.empty:
            return {"error": "Dataset is empty."}
        
        # Default insights
        results = {
            "row_count": len(df),
            "column_count": len(df.columns),
            "columns": list(df.columns),
            "summary": df.describe(include='all').to_dict()
        }
        
        # Handle prompt-based analysis
        if prompt:
            prompt = prompt.lower()
            if "top 5" in prompt:
                numeric_cols = df.select_dtypes(include=[np.number]).columns
                if len(numeric_cols) > 0:
                    top_col = numeric_cols[0]  # Default to first numerical column
                    results["top_5"] = df.nlargest(5, top_col).to_dict(orient="records")
                else:
                    results["top_5"] = "No numerical column available for sorting."
            elif "correlation" in prompt:
                results["correlation"] = df.corr().to_dict()
            elif "summary" in prompt:
                results["summary_details"] = df.describe().to_dict()
            else:
                results["message"] = "Prompt not recognized. Showing default analysis."
        
        return results
    except Exception as e:
        return {"error": str(e)}
