from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app=Flask(__name__)
model=joblib.load('venv/logisticmodel.pkl')

CORS(app, origins='http://localhost:3000', methods=['GET', 'POST', 'PUT', 'DELETE'], allow_headers=['Content-Type'])

@app.route('/')

def response():
    response_body={
        "data":"regards from the backend"
    }

    return response_body

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json  # Get the input_data list from the JSON request
        print(input_data)
        input_data = [float(item) for item in input_data]
        input_data = np.array(input_data).reshape(1, -1) 
        result = model.predict(input_data)
        print(result)
        return jsonify({"predictions": str(result)})
    except Exception as e:
        return jsonify({"error":str(e)})
    
if __name__ == '__main__':
    app.run(debug=True)