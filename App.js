import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Detection from './detection.js'
import * as firebase from 'firebase';
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      results: false,
      userid: null,
    }
    if(!firebase.apps.length){
      firebase.initializeApp({
        apiKey: "AIzaSyBviHEF7roxU6OekscYn5t4c1sjod_Mu2A",
        authDomain: "detection-app-9aa0a.firebaseapp.com",
        databaseURL: "https://detection-app-9aa0a.firebaseio.com",
        projectId: "detection-app-9aa0a",
        storageBucket: "detection-app-9aa0a.appspot.com",
        messagingSenderId: "549157011301",
        appId: "1:549157011301:web:0feac46631551b57df2b8c",
        measurementId: "G-9KS4PVTKPD"
      });
    }
  }
  displayResults = (uid) => {
    this.setState({ results: true, userid: uid });
  }
  render(){
      // <View style={ styles.container }>
      //   <Text> Main Screen </Text>
      // </View>
      if(this.state.results) return <View style={ styles.container }><Text>Results here</Text></View>
      else return <Detection onSelectImage={this.displayResults}/>
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
