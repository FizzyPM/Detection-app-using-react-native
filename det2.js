import React from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, Alert } from 'react-native';
// import CameraClass from './camera.js';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import '@firebase/firestore';
import uuid from 'uuid-random';

export default class DetectionHome extends React.Component {
	constructor(props){
		super(props);
		this.state = {
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

	render(){
		return(
			<View style={ styles.container } >
				<Button title='Upload' onPress={this.props.onSelect} />
				<Button title='Camera' onPress={() => this.props.navigation.navigate('Camera')} />
			</View>
		)
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
  