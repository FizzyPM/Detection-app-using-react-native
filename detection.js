import React from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import DetectionHome from './detectionhome.js'
import CameraClass from './camera.js'
import ImageSelected from './imagecontainer.js'
import Results from './results.js'

const TypeContext = React.createContext({});
export default class Detection extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			type: this.props.type,
		}
	}
	render(){
	const Stack = createStackNavigator();
		return(
			// <NavigationContainer>
		<TypeContext.Provider value={this.state} > 
      <Stack.Navigator initialRouteName="DetectionHome"  screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DetectionHome" component={DetHomeScreen} />
				<Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="ImageClicked" component={ImageScreen} /> 
				<Stack.Screen name="ShowResults" component={ResultScreen} />
      </Stack.Navigator>
		</TypeContext.Provider>
    	// </NavigationContainer>
		)
	}
}

class CameraScreen extends React.Component {
	getImagefromCamera = (img,type) => {
	// this.setState({ imageUri: img.uri, openCamera: false, imageH: img.height, imageW: img.width });
	this.props.navigation.navigate('ImageClicked', { imageUri: img.uri, imageH: img.height, imageW: img.width,leafType: type })
	// console.log(img);
	}
	render(){
		return(
			<CameraClass onSnap={this.getImagefromCamera} {...this.props} />
		)
	}
}

class DetHomeScreen extends React.Component {
	handleSelectPhoto = async (type) => {
	// console.log(type)
    try{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality:0.4,
      });
      if(!result.cancelled){
				// this.setState({ imageUri: result.uri, imageH: result.height, imageW: result.width });
				this.props.navigation.navigate('ImageClicked', { imageUri: result.uri, imageH: result.height, imageW: result.width, leafType: type })
			}
			// console.log(result);
    }catch(E){
      console.log(E);
    }
  }
	render(){	
		return(
			<DetectionHome onSelect={this.handleSelectPhoto} {...this.props} info={this.context} />
		)
	}
}
DetHomeScreen.contextType = TypeContext;

class ImageScreen extends React.Component {
	// static contextType = TypeContext;
	render(){
		// console.log(this.context)
		// console.log(this.props)
		return(
			<ImageSelected {...this.props} info={this.context}/>
			// <View></View>
		)
	}
}
ImageScreen.contextType = TypeContext;

class ResultScreen extends React.Component {
	render(){
		return(
			<Results {...this.props} />
		)
	}
}