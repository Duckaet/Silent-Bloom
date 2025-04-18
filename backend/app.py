from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import hashlib

app = Flask(__name__)
CORS(app)

model = load_model('./model/cancer_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files.get('file')
    if not file:
        return jsonify({"error": "No file provided!"}), 400

    image_bytes = file.read()
    import numpy as np
    image_array = np.frombuffer(image_bytes, dtype=np.uint8)  
    image_array = np.expand_dims(image_array, axis=0)        

    prediction = model.predict(image_array)[0][0]
    label = "Malignant" if prediction > 0.5 else "Benign"

    image_hash = hashlib.sha256(image_bytes).hexdigest()

    return jsonify({
        "image_hash": image_hash,
        "prediction": label,
        "confidence_score": round(float(prediction), 2),
        "model_version": "DL_v1.3",
        "diagnosis_by": "AI_Model"
    })

if __name__ == '__main__':
    app.run(debug=True)
