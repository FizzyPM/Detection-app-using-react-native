import firebase_admin
from firebase_admin import firestore, credentials
import time
import datetime
from firebase import Firebase
from typepkl import T1Detection
from typenpy import T2Detection
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
