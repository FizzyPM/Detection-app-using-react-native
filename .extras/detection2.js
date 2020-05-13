import React from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, Alert } from 'react-native';
import CameraClass from '../camera.js';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import '@firebase/firestore';
import uuid from 'uuid-random';

export default class Detection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openCamera: false,
      imageUri: null,
      imageH: 0,
      imageW:0,
      userid: uuid(),
    }
  }
  async componentDidMount(){
    if(Constants.platform.ios){
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if(status !== 'granted'){
        alert('Sorry, we need permissions');
      }
    }
  }
  handleSelectPhoto = async () => {
    try{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality:1,
      });
      if(!result.cancelled) this.setState({ imageUri: result.uri, imageH: result.height, imageW: result.width });
      // console.log(result);
    }catch(E){
      console.log(E);
    }
  }
  getImagefromCamera = (img) => {
    this.setState({ imageUri: img.uri, openCamera: false, imageH: img.height, imageW: img.width });
    // console.log(img);
  }
  callDisplayResult = () => {
    this.props.onSelectImage(this.state.userid);
  }
  photoSelected = () =>{
    let that = this;
    //BACKEND QUERY
    // console.log('Photo Selected');
    that.uploadImage(that.state.imageUri)
    .then(()=>{
      // console.log('Photo successfully uploaded');
      const firedb = firebase.firestore()
      firedb.collection("models").doc(`${that.state.userid}`).set({
        photo:`gs://detection-app-9aa0a.appspot.com/images/${that.state.userid}`,
        height: `${that.state.imageH}`,
        width: `${that.state.imageW}`,
        result: '',
      })
      .then(function() {
          // console.log("Document successfully written!");
        that.callDisplayResult();
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
    }) 
    .catch((error)=>{
      console.log(error);
    });
  }
  uploadImage = async(uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();  
    var ref = firebase.storage().ref().child(`images/${this.state.userid}.jpg`);
    return ref.put(blob);
  }
  render(){
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);
    // console.log(screenWidth)
    const welcomeContent = <View style={ styles.container } >
                            <Button title='Upload' onPress={this.handleSelectPhoto}/>
                            <Button title='Camera' onPress={()=>this.setState({ openCamera: true })}/>
                          </View>
    const imageContainer =<View style={{ flex:1, backgroundColor:'black', }}>
                            <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
                              <Image source={{ uri: this.state.imageUri  }} 
                                style={{ flex:1, marginTop:Constants.statusBarHeight, width:screenWidth, height:screenHeight, resizeMode:'contain' }}/>
                            </View>
                            <View style={{ paddingVertical:30, flexDirection:"row", justifyContent:"space-around"}}>
                              <Button title="It's great" onPress={this.photoSelected} />
                              <Button title="I'll do better" onPress={()=>this.setState({ imageUri: null, openCamera: false })}/>
                            </View>
                          </View>
                          
    if(this.state.imageUri != null) return(imageContainer)
    else if(!this.state.openCamera) return(welcomeContent)
    else return <CameraClass onSnap={this.getImagefromCamera} />
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
