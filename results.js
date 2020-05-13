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
				// console.log('here')
				let ans = doc.data().result
				// console.log(ans)
				if(((doc.data().type).split('__'))[0] === 'disease'){
					ans = (ans.split("___"))[1];
					ans = ans.replace(' ','-');
					ans = ans.replace(/_/g,' ');
				}
				else if(((doc.data().type).split('__'))[0] === 'rotton'){
					if(ans.charAt(0) === 'r') ans='rotten';
					else ans='fresh';
				}
				this.setState( prevState => ({ result: ans, wait4Result: !prevState.wait4Result }) )

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
		else div = <Text style={{ fontSize:15, fontWeight:'bold' }} > {this.state.result} </Text>
		return(
			<View style={ styles.container } >
				{div}
				<Button title='Go Back' onPress={() => this.props.navigation.navigate('DetectionHome')} />
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
	},
});
  