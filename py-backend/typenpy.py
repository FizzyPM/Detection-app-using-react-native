import keras
import numpy as np
import cv2
from sklearn.preprocessing import LabelEncoder
from keras.models import load_model

def T2Detection(id,info,imgsize):
    encoder = LabelEncoder()
    l = info.split('__')
    print(l[0])
    if(l[0] == 'disease'):
        plantinfo = str(l[1])
        if(plantinfo == 'apple' or plantinfo == 'banana' or plantinfo == 'corn' or plantinfo == 'grape' or plantinfo == 'potato' or plantinfo == 'rice' or plantinfo == 'tomato' ):
            print(plantinfo)
            model = load_model('./models/diseases/' + plantinfo + '/model.h5')
            encoder.classes_ = np.load('./models/diseases/' + plantinfo + '/classes.npy')
        else:
            print('generic')
            model = load_model('./models/diseases/generic/model.h5')
            encoder.classes_ = np.load('./models/diseases/generic/classes.npy')
    elif(l[0] == 'flower'):
        model = load_model('./models/flowers/model.h5')
        encoder.classes_ = np.load('./models/flowers/classes.npy')
    elif(l[0] == 'rotton'):
        model = load_model('./models/rotton/model.h5')
        encoder.classes_ = np.load('./models/rotton/classes.npy')
    X = []
    IMG_SIZE = imgsize
    image_directory = './'+ str(id) +'.jpg'
    img = cv2.imread(image_directory,cv2.IMREAD_COLOR)
    img = cv2.resize(img, (IMG_SIZE,IMG_SIZE))
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    X.append(img)
    X=np.array(X)
    X=X/255
    pred=model.predict(X)
    # print(pred)
    pred_digits=np.argmax(pred,axis=1)
    # print(pred_digits)
    dis = (encoder.inverse_transform([pred_digits[0]]))[0]
    ans = str(dis)
    try:
        ans = ans.split("___")[1]
    except:
        pass
    return(ans)