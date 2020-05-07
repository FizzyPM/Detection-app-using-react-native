import React,{useState} from 'react';
import { StyleSheet, Text, View, Button, Picker, Dimensions } from 'react-native';
// import CameraClass from './camera.js';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


export default class DetectionHome extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			type: this.props.info.type,
			leafType: 'unknown',
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
		let list;
		if(this.state.type === 'disease') list = 
		<Picker
			selectedValue={this.state.leafType}
			style={{ height: 50, width: 140 }}
			onValueChange={(itemValue, itemIndex) => this.setState({ leafType: itemValue })}>
			<Picker.Item label="Unknown" value="unknown" />
			<Picker.Item label="Apple" value="apple" />
			<Picker.Item label="Banana" value="banana" />
			<Picker.Item label="Corn" value="corn" />
			<Picker.Item label="Grapes" value="grapes" />
			<Picker.Item label="Potato" value="potato" />
			<Picker.Item label="Rice" value="rice" />
			<Picker.Item label="Tomato" value="tomato" />
		</Picker>
	
		return(
			<View style={{ flex:1 }}>
				<View style={styles.container}>
					<Text>{this.state.type}</Text>
					{list}
				</View>
				<View style={ styles.buttons } >
					<Button title='Upload' onPress={() => this.props.onSelect(this.state.leafType)} />
					<Button title='Camera' onPress={() => this.props.navigation.navigate('Camera', { leafType: this.state.leafType })} />
				</View>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	buttons: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
	},
	container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
	},
});
  