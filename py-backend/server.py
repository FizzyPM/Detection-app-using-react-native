import firebase_admin
from firebase_admin import firestore, credentials
import time
import datetime
from firebase import Firebase
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


# result = 'zero'
def on_snapshot(doc_snapshot, changes, read_time):
    # for doc in doc_snapshot:
    #     print(u'Received document snapshot: {}'.format(doc.id))
    #     print(doc.to_dict())
    # global result
    for change in changes:
        if change.type.name == 'ADDED':
            print(u'New : {}'.format(change.document.id))
            storage.child('images/'+ str(change.document.id) +'.jpg').download(str(change.document.id)+".jpg")
            data = db.collection(u'models').document(str(change.document.id)).get()
            print(data.to_dict())
            predict_info = data.to_dict()
            print('-------------------------------------GETTING RESULT-----------------------------------')
            if(predict_info['type']=='disease__unknown' or predict_info['type']=='disease__rice' or predict_info['type']=='disease__banana' or predict_info['type']=='disease__tomato' or predict_info['type']=='flower__unknown' or predict_info['type']=='rotton__unknown'):
                result = T2Detection(change.document.id, predict_info['type'], 128)
            elif( predict_info['type']=='disease__apple' or predict_info['type']=='disease__corn' or predict_info['type']=='disease__grapes' or predict_info['type']== 'disease__potato' ):
                result = T1Detection(change.document.id, predict_info['type'], 128)
            else:
                result = T2Detection(change.document.id, predict_info['type'], 128)
            print('--------------------------------------GOT THE RESULT------------------------------------')
            # print(result)
            
            doc_ref = db.collection(u'models').document(str(change.document.id)).update({
                u'result': str(result),
            })
        elif change.type.name == 'MODIFIED':
            print(u'Modified : {}'.format(change.document.id))
        elif change.type.name == 'REMOVED':
            print(u'Removed : {}'.format(change.document.id))

config = {
    'apiKey': "AIzaSyBviHEF7roxU6OekscYn5t4c1sjod_Mu2A",
    'authDomain': "detection-app-9aa0a.firebaseapp.com",
    'databaseURL': "https://detection-app-9aa0a.firebaseio.com",
    'projectId': "detection-app-9aa0a",
    'storageBucket': "detection-app-9aa0a.appspot.com",
    'messagingSenderId': "549157011301",
    'appId': "1:549157011301:web:0feac46631551b57df2b8c",
    'measurementId': "G-9KS4PVTKPD"
}
print('---------------------------------BACKEND SERVER RUNNING---------------------------------')
firebase = Firebase(config)
storage = firebase.storage()

cred = credentials.Certificate("AdminSDK.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
doc_ref = db.collection(u'models').on_snapshot(on_snapshot)

# Keep the app running
while True:
    time.sleep(1)
    # print('Running')
