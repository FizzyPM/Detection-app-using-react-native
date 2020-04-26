import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import {decode, encode} from 'base-64'
// import App2 from './App2.js'
// import Detection from './det2.js' 
import Try from './try.js'
import * as firebase from 'firebase';
// import uuid from 'uuid-random';

// const userid = uuid();
// console.log(userid);

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function DetectionScreen() {
  return (
		<Try />
  );
}

function HelpScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>How can I help?</Text>
    </View>
  );
}

// if (!global.btoa) {  global.btoa = encode }
// if (!global.atob) { global.atob = decode }
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
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
	
  render(){
		const Tab = createBottomTabNavigator();
    return(
			<NavigationContainer>
				<Tab.Navigator>
      		<Tab.Screen name="Home" component={HomeScreen} options={{ 
          	tabBarIcon: ({ color, size }) => (
            	<MaterialCommunityIcons name="home" color={color} size={size} />
						), }} />
      		<Tab.Screen name="Detection" component={DetectionScreen} options={{ 
          	tabBarIcon: ({ color, size }) => (
            	<MaterialCommunityIcons name="image-search" color={color} size={size} />
						), }} />
					<Tab.Screen name="Help" component={HelpScreen} options={{ 
          	tabBarIcon: ({ color, size }) => (
            	<MaterialCommunityIcons name="help-circle" color={color} size={size} />
						), }} />
    		</Tab.Navigator>
			</NavigationContainer>
    )
  }
}