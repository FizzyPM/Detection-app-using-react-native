import React from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as firebase from 'firebase';
import '@firebase/firestore';
import uuid from 'uuid-random';

export default class ImageSelected extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			imageUri: this.props.route.params.imageUri,
			imageH: this.props.route.params.imageH,
			imageW: this.props.route.params.imageW,
			type: this.props.info.type,
			leafType: this.props.route.params.leafType,
			userid: uuid(),
		}
	}
	uploadImage = async(uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();  
    var ref = firebase.storage().ref().child(`images/${this.state.userid}.jpg`);
    return ref.put(blob);
  }
	photoSelected = () =>{
    let that = this;
    that.uploadImage(that.state.imageUri)
    .then(()=>{
      // console.log('Photo successfully uploaded');
      const firedb = firebase.firestore()
      firedb.collection("models").doc(`${that.state.userid}`).set({
        photo:`gs://detection-app-9aa0a.appspot.com/images/${that.state.userid}`,
        height: `${that.state.imageH}`,
				width: `${that.state.imageW}`,
				type: `${that.state.type}` + '__' + `${that.state.leafType}`,
        result: 'null',
      })
      .then(function() {
				that.props.navigation.navigate('ShowResults', { uri: that.state.imageUri, height: that.state.imageH, width: that.state.imageW, uid: that.state.userid })
				// console.log("Document successfully written!");
      })
      .catch(function(error) {
				console.error("Error writing document: ", error);
      });
    }) 
    .catch((error)=>{
      console.log(error);
    });
  }
	render(){
		// console.log(this.state.type)
		const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);
		return(
			<View style={{ flex:1, backgroundColor:'black', }}>
				<View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
					<Image source={{ uri: this.state.imageUri  }} 
						style={{ flex:1, marginTop:Constants.statusBarHeight, width:screenWidth, height:screenHeight, resizeMode:'contain' }}/>
				</View>
				<View style={{ paddingVertical:30, flexDirection:"row", justifyContent:"space-around"}}>
					<Button title="It's great" onPress={this.photoSelected} />
				</View>
			</View>
		)
	}
}  