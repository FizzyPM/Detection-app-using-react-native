import React from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, Alert } from 'react-native';
import CameraClass from './camera.js';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import '@firebase/firestore';

export default class Detection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openCamera: false,
      imageDisplay: null,
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
      if(!result.cancelled) this.setState({ imageDisplay: result.uri });
      // console.log(result);
    }catch(E){
      console.log(E);
    }
  }
  getImagefromCamera = (img) => {
    this.setState({ imageDisplay: img.uri, openCamera: false });
    // console.log(img);
  }
  photoSelected = () =>{
    //BACKEND QUERY
    console.log('Photo Selected');
    const firedb = firebase.firestore()
      firedb.collection("models").doc("uid2").set({
        photo:'images/test2',
        type: 'type2',
      })
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
    // console.log(this.state.imageDisplay);
    // console.log(firedb);
    // console.log(storageRef);
    // storageRef.put(`${this.state.imageDisplay}`).then(function(snapshot) {
    //   console.log('Uploaded a blob or file!');
    // }); 
    this.uploadImage(this.state.imageDisplay)
    .then(()=>{
      console.log('Successfully Uploaded');
    }) 
    .catch((error)=>{
      console.log(error);
    });
  }
  uploadImage = async(uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();  
    var ref = firebase.storage().ref().child("images/test");
    return ref.put(blob);
  }
  render(){
    const screenWidth = Math.round(Dimensions.get('window').width);
    const welcomeContent = <View style={ styles.container } >
                            <Button title='Upload' onPress={this.handleSelectPhoto}/>
                            <Button title='Camera' onPress={()=>this.setState({ openCamera: true })}/>
                          </View>
    const imageContainer =<View style={{ flex:1, backgroundColor:'black', }}>
                            <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
                              <Image source={{ uri: this.state.imageDisplay }} 
                                style={{ flex:1, width:screenWidth, marginTop:Constants.statusBarHeight }}/>
                            </View>
                            <View style={{ paddingVertical:30, flexDirection:"row", justifyContent:"space-around"}}>
                              <Button title="It's great" onPress={this.photoSelected} />
                              <Button title="I'll do better" onPress={()=>this.setState({ imageDisplay: null, openCamera: false })}/>
                            </View>
                          </View>
                          
    if(this.state.imageDisplay != null) return(imageContainer)
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
