import numpy as np
import cv2
import pickle
import keras
from os import listdir
from sklearn.preprocessing import LabelBinarizer
from keras.models import Sequential
from keras.layers.normalization import BatchNormalization
from keras.layers.convolutional import Conv2D
from keras.layers.convolutional import MaxPooling2D
from keras.layers.core import Activation, Flatten, Dropout, Dense
from keras import backend as K
from keras.preprocessing.image import ImageDataGenerator
# from keras.optimizers import Adam
from keras.preprocessing import image
from keras.preprocessing.image import img_to_array
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

default_image_size = tuple((256, 256))
image_size = 0
directory_root = './input/Diseases/'
# directory_root = './input/Flowers/'
width=256
height=256
depth=3

def convert_image_to_array(image_dir):
    try:
        image = cv2.imread(image_dir)
        if image is not None :
            image = cv2.resize(image, default_image_size)   
            return img_to_array(image)
        else :
            return np.array([])
    except Exception as e:
        print(f"Error : {e}")
        return None


image_list, label_list = [], []
try:
    print("[INFO] Loading images ...")
    root_dir = listdir(directory_root)
    for directory in root_dir :
        # remove .DS_Store from list
        if directory == ".DS_Store" :
            root_dir.remove(directory)

    for plant_folder in root_dir :
#         if plant_folder.startswith('Potato'):
        plant_disease_folder_list = listdir(f"{directory_root}/{plant_folder}")
        for single_plant_disease_image in plant_disease_folder_list :
            if single_plant_disease_image == ".DS_Store" :
                plant_disease_folder_list.remove(single_plant_disease_image)

        for image in plant_disease_folder_list:
            image_directory = f"{directory_root}/{plant_folder}/{image}"
            if image_directory.endswith(".jpg") == True or image_directory.endswith(".JPG") == True:
                image_list.append(convert_image_to_array(image_directory))
                label_list.append(plant_folder)
    print("[INFO] Image loading completed")  
except Exception as e:
    print(f"Error : {e}")

image_size = len(image_list)
print(image_size)
# print(type(image_list))
# print(image_list)


label_binarizer = LabelBinarizer()
image_labels = label_binarizer.fit_transform(label_list)
del label_list
pickle.dump(label_binarizer,open('label_transform-flowers.pkl', 'wb'))
n_classes = len(label_binarizer.classes_)
print(label_binarizer.classes_)
# print(image_list)
np_image_list = np.array(image_list, dtype=np.float16) / 225.0
del image_list
# print(np_image_list)


print("[INFO] Spliting data to train, test")
x_train, x_test, y_train, y_test = train_test_split(np_image_list, image_labels, test_size=0.2, random_state = 13)


gen = ImageDataGenerator(rotation_range=8, width_shift_range=0.08, shear_range=0.3,
                               height_shift_range=0.08, zoom_range=0.08)
batches = gen.flow(x_train, y_train, batch_size=128)
val_batches = gen.flow(x_test, y_test, batch_size=128)



inputShape = (height, width, depth)
model = Sequential()
model.add(Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=inputShape))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))

model.add(Conv2D(64, kernel_size=(3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.4))
model.add(Conv2D(128, kernel_size=(3, 3), activation='relu'))
model.add(Dropout(0.4))

model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dense(n_classes, activation='softmax'))

# opt = Adam(lr=INIT_LR, decay=INIT_LR / EPOCHS)
# distribution
# model.compile(loss="binary_crossentropy", optimizer = keras.optimizers.Adam(), metrics=["accuracy"])
model.compile(loss=keras.losses.categorical_crossentropy,
              optimizer=keras.optimizers.Adam(),
              metrics=['accuracy'])

# train the network
# print("[INFO] training network...")
# history1 = model.fit(x_train, y_train,
#           batch_size=128,
#           epochs=10,
#           verbose=1,
#           validation_data=(x_test, y_test))



history1 = model.fit_generator(batches, steps_per_epoch=1156//128, epochs=50,
                    validation_data=val_batches, validation_steps=290//128, use_multiprocessing=True)


# print("[INFO] Saving model...")
# # pickle.dump(model,open('plant-village-model.pkl', 'wb'))
# model.save('model-flowers.h5')


# print("[INFO] Calculating model accuracy")
# scores = model.evaluate(x_test, y_test)
# print(f"Test Accuracy: {scores[1]*100}")
