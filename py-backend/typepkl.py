import keras
import numpy as np
import cv2
from sklearn.preprocessing import LabelEncoder
from keras.models import load_model
import pickle

def T1Detection(id,info,imgsize):
    l = info.split('__')
    print(l[0])
    if(l[0] == 'disease'):
        plantinfo = str(l[1])
        if(plantinfo == 'apple' or plantinfo == 'banana' or plantinfo == 'corn' or plantinfo == 'grapes' or plantinfo == 'potato' or plantinfo == 'rice' or plantinfo == 'tomato' ):
            print(plantinfo)
            model = load_model('./models/diseases/' + plantinfo + '/model.h5')
            infile = open('./models/diseases/' + plantinfo + '/classes.pkl','rb')
        else:
            print('generic')
            model = load_model('./models/diseases/generic/model.h5')
            infile = open('./models/diseases/generic/classes.pkl','rb')
    elif(l[0] == 'flower'):
        model = load_model('./models/flowers/model.h5')
        infile = open('./models/flowers/classes.pkl','rb')
    elif(l[0] == 'rotton'):
        model = load_model('./models/rotton/model.h5')
        infile = open('./models/rotton/classes.pkl','rb')
    new_dict = pickle.load(infile)
    infile.close()
    X = []
    IMG_SIZE = imgsize
    image_directory = './'+ str(id) +'.jpg'
    img = cv2.imread(image_directory)
    img = cv2.resize(img, (IMG_SIZE,IMG_SIZE))
    X.append(img)
    X=np.array(X, dtype=np.float16)
    X=X/255
    pred=model.predict(X)
    # print(pred)
    dis = (new_dict.inverse_transform(pred))[0]
    ans = str(dis)
    try:
        ans = ans.split("___")[1]
    except:
        pass
    return(ans)