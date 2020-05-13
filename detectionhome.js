import React from 'react';
import { StyleSheet, Text, View, Button, Picker, Dimensions, ImageBackground } from 'react-native';
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
		let list, bgimg;
		if(this.state.type === 'rotton') bgimg = require('./assets/RS1.jpg');
		else if(this.state.type === 'flower') bgimg = require('./assets/FS1.jpg');
		else if(this.state.type === 'disease'){
			bgimg = require('./assets/DS1.jpg');
			list = 
			<View style={ styles.container }>
				<Text style={{ fontSize:16 }}>Select the type of plant if known:</Text>
				<Picker
					selectedValue={this.state.leafType}
					style={{ height: 50, width: 100 }}
					onValueChange={(itemValue, itemIndex) => this.setState({ leafType: itemValue })}>
					<Picker.Item label="Unknown" value="unknown" />
					<Picker.Item label="Apple" value="apple" />
					<Picker.Item label="Banana" value="banana" />
					<Picker.Item label="Blueberry" value="blueberry" />
					<Picker.Item label="Capsicum " value="bell-pepper" />
					<Picker.Item label="Cherry" value="cherry" />
					<Picker.Item label="Corn" value="corn" />
					<Picker.Item label="Grapes" value="grapes" />
					<Picker.Item label="Orange" value="orange" />
					<Picker.Item label="Peach" value="peach" />
					<Picker.Item label="Potato" value="potato" />
					<Picker.Item label="Raspberry" value="raspberry" />
					<Picker.Item label="Rice" value="rice" />
					<Picker.Item label="Soyabean" value="soyabean" />
					<Picker.Item label="Squash" value="squash" />
					<Picker.Item label="Strawberry" value="strawberry" />
					<Picker.Item label="Tomato" value="tomato" />
				</Picker>
			</View>
		}
		return(
			<View style={{ flex:1 }}>
				{/* <View style={styles.container}>
					<Text>{this.state.type}</Text>
				</View> */}
		    <ImageBackground source={bgimg} style={{width: '100%', height: '100%'}}>
				{/* <View style={{ flex:2 }}></View> */}
				{list}
				<View style={ styles.buttons } >
					<Button title='Upload' onPress={() => this.props.onSelect(this.state.leafType)} />
					<Button title='Camera' onPress={() => this.props.navigation.navigate('Camera', { leafType: this.state.leafType })} />
				</View>
				</ImageBackground>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	buttons: {
    flex: 1,
		flexDirection:'row',
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
	},
	container: {
    flex: 3,
		// backgroundColor: '#fff',
		// paddingTop: 230,
    alignItems: 'center',
    justifyContent: 'center',
	},
});
  