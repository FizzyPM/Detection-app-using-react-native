import React from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, ActivityIndicator } from 'react-native';
// import Constants from 'expo-constants';
import * as firebase from 'firebase';
import '@firebase/firestore';

export default class Results extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			uid: this.props.route.params.uid,
			uri: this.props.route.params.uri,
			result: 'null',
			wait4Result: true,
		}
	}
	componentDidMount(){
		const firedb = firebase.firestore()
		let listener = firedb.collection("models").doc(`${this.state.uid}`)
		.onSnapshot((doc) => {
			// console.log("User data:", doc.data());
			if(doc.data().result != undefined && doc.data().result != 'null'){
				console.log('here')
				this.setState( prevState => ({ result: doc.data().result, wait4Result: !prevState.wait4Result }) )

				listener();
				let deleteDoc = firedb.collection("models").doc(`${this.state.uid}`).delete();
			}
		});
	}
	render(){
		// if(this.state.result != 'null'){
		// 	console.log('here2')
		// 	listener(); // Stop listening for changes
		// 	let deleteDoc = firedb.collection("models").doc(`${this.state.uid}`).delete();
		// }
		let div;
		if(this.state.wait4Result) div = <ActivityIndicator size="large" color="#0000ff" animating={this.state.wait4Result} />
		else div = <Text> {this.state.result} </Text>
		return(
			<View style={ styles.container } >
				{div}
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
  