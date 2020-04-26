import React from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import DetectionHome from './det2.js'
import CameraClass from './camera.js'
import ImageSelected from './imagecontainer.js'

export default class Try extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		}
	}
	render(){
	const Stack = createStackNavigator();
		return(
			// <NavigationContainer>
      <Stack.Navigator initialRouteName="DetectionHome"  screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DetectionHome" component={DetectionHomeScreen} />
				<Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="ImageClicked" component={ImageScreen} />
      </Stack.Navigator>
    	// </NavigationContainer>
		)
	}
}

class CameraScreen extends React.Component {
	getImagefromCamera = (img) => {
	// this.setState({ imageUri: img.uri, openCamera: false, imageH: img.height, imageW: img.width });
	this.props.navigation.navigate('ImageClicked', { imageUri: img.uri, imageH: img.height, imageW: img.width })
	// console.log(img);
	}
	render(){
		return(
			<CameraClass onSnap={this.getImagefromCamera} />
		)
	}
}

class DetectionHomeScreen extends React.Component {
	handleSelectPhoto = async () => {
    try{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality:1,
      });
      if(!result.cancelled){
				// this.setState({ imageUri: result.uri, imageH: result.height, imageW: result.width });
				this.props.navigation.navigate('ImageClicked', { imageUri: result.uri, imageH: result.height, imageW: result.width })
			}
			// console.log(result);
    }catch(E){
      console.log(E);
    }
  }
	render(){
		return(
			<DetectionHome onSelect={this.handleSelectPhoto} {...this.props}/>
		)
	}
}

class ImageScreen extends React.Component {
	render(){
		// console.log(this.props)
		return(
			<ImageSelected {...this.props} />
		)
	}
}