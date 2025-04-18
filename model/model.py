import pandas as pd
import shutil
import os
from sklearn.model_selection import train_test_split
import tensorflow

# Path Setup
metadata = pd.read_csv('dataset/HAM10000_metadata.csv')
image_dir_1 = 'dataset/HAM10000_images_part_1/'
image_dir_2 = 'dataset/HAM10000_images_part_2/'
output_dir = 'dataset/sorted/'

# Create folder for each class
for label in metadata['dx'].unique():
    os.makedirs(os.path.join(output_dir, 'train', label), exist_ok=True)
    os.makedirs(os.path.join(output_dir, 'test', label), exist_ok=True)

# Train-Test Split
train_df, test_df = train_test_split(metadata, test_size=0.2, stratify=metadata['dx'], random_state=42)

def copy_images(df, set_type):
    for index, row in df.iterrows():
        file_name = row['image_id'] + '.jpg'
        label = row['dx']

        src = os.path.join(image_dir_1, file_name) if os.path.exists(os.path.join(image_dir_1, file_name)) \
            else os.path.join(image_dir_2, file_name)

        dest = os.path.join(output_dir, set_type, label, file_name)

        if os.path.exists(src):
            shutil.copy(src, dest)

# Copy Images
copy_images(train_df, 'train')
copy_images(test_df, 'test')

print("✅ Images copied and sorted!")
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras import layers, models

def create_model(num_classes):
    base_model = MobileNetV2(input_shape=(224, 224, 3), include_top=False, weights='imagenet')
    base_model.trainable = False

    model = models.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dense(num_classes, activation='softmax')
    ])

    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    return model

import os

# Check where images actually went
for root, dirs, files in os.walk("dataset/sorted/train"):
    print(root, "->", len(files), "files")
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
#
# Step 1: Load and preprocess the images
datagen = ImageDataGenerator(rescale=1. / 255)

train_data = datagen.flow_from_directory(
    'dataset/sorted/train',
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical'
)

val_data = datagen.flow_from_directory(
    'dataset/sorted/test',
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical'
)

Step 2: Create the CNN model
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
    MaxPooling2D(2, 2),
#
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),

    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(7, activation='softmax')  # 7 classes
])

# Step 3: Compile the model
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Step 4: Train the model
model.fit(
    train_data,
    epochs=10,
    validation_data=val_data
)

# Step 5 (optional): Save the model
model.save("skin_disease_model.h5")

Save in recommended .keras format
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from tensorflow.keras.optimizers import Adam
#
Define a simple CNN model (replace with your custom model)
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
    MaxPooling2D(pool_size=(2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(7, activation='softmax')  # Assuming 7 classes
])

Compile the model
model.compile(optimizer=Adam(), loss='categorical_crossentropy', metrics=['accuracy'])
#
 # Now, if you already trained the model, save it
model.save("skin_cancer_model.keras")  # Saves the model in the recommended Keras format

print("Model saved successfully!")


from tensorflow.keras.models import load_model
model = load_model('skin_cancer_model.keras')




model = load_model('skin_cancer_model.keras', compile=False)

# Recompile the model if you need to resume training
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
#
#

 # Ensure the correct path

#Now evaluate the model on your test data
val_data = datagen.flow_from_directory(
    'dataset/sorted/test',  # Path to your test images
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical'
)

# Evaluate the model
evaluation = model.evaluate(val_data)
print(f"Test Loss: {evaluation[0]}, Test Accuracy: {evaluation[1]}")



#
#
# 🔽 Load your trained model first
model = load_model('skin_cancer_model.keras')

# 🔽 Then compile it (this step is optional for inference, but useful if you plan to re-train or evaluate)


model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])



from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np

# Load the saved model
model = load_model('skin_cancer_model.keras')

# Load and preprocess the image
img_path = r"E:\sug cancer\pythonProject1\dataset\sorted\test\akiec\ISIC_0024450.jpg"  # <-- Replace with your image path
img = image.load_img(img_path, target_size=(224, 224))  # Adjust size as per your model
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)  # Model expects batch dimension
img_array = img_array / 255.0  # Normalize if the model was trained on normalized images

# Predict
prediction = model.predict(img_array)
print("Prediction (raw output):", prediction)

# Optional: Get the predicted class
predicted_class = np.argmax(prediction, axis=1)[0]
print("Predicted class:", predicted_class)
#
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# Load your trained model
model = load_model('skin_cancer_model.keras')



import numpy as np

img_path = r'C:\Users\LENOVO\Downloads\skin cancer.jpg'  # or any other image path
img = image.load_img(img_path, target_size=(224, 224))  # Load the image
img_array = image.img_to_array(img)                     # Convert image to array
img_array = np.expand_dims(img_array, axis=0)           # Add batch dimension
img_array = img_array / 255.0                           # Normalize


Class labels
class_labels = [
    'actinic_keratoses',
    'basal_cell_carcinoma',
    'benign_keratosis',
    'dermatofibroma',
    'melanoma',
    'nevus',
    'vascular_lesion'
]

# Make prediction
prediction = model.predict(img_array)

# Get predicted class index and label
predicted_index = np.argmax(prediction)
predicted_class = class_labels[predicted_index]

# Print all class probabilities
print("\n📊 Class Probabilities:")
for i, label in enumerate(class_labels):
    print(f"{label}: {prediction[0][i]*100:.2f}%")

# Print final predicted class
print(f"\n🧠 Predicted Class: {predicted_class}")