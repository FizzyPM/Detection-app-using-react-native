import React from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, Alert } from 'react-native';
// import Constants from 'expo-constants';
import * as firebase from 'firebase';
import '@firebase/firestore';

export default class Results extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			uid: this.props.route.params.uid,
			uri: this.props.route.params.uri,
			result:'',
		}
	}
	componentDidMount(){
		const firedb = firebase.firestore()
		firedb.collection("models").doc(`${this.state.uid}`)
		.onSnapshot((doc) => {
				// console.log("User data:", doc.data());
				if(doc.data().result != undefined)
					this.setState({ result: doc.data().result })
		});
	}
	render(){
		return(
			<View style={ styles.container } >
				<Text> {this.state.result} </Text>
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
  