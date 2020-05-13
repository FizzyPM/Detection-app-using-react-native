import React from 'react';
import { Text, View,ImageBackground, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Detection from './detection.js'
import * as firebase from 'firebase';

function HomeScreen() {
  return (
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Home!</Text></View>
    <ImageBackground source={require('./assets/HS1.jpg')} style={{width: '100%', height: '100%'}}></ImageBackground>
  );
}

function DetectionScreen() {
  return (
		<Detection type="disease" />
  );
}

function FlowerScreen() {
  return (
		<Detection type="flower" />
  );
}

function RottonScreen() {
  return (
		<Detection type="rotton" />
  );
}

function HelpScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Text>How can I help?</Text> */}
        <Text>HELPLINES:</Text>
        <Text></Text>
        <Text>PM-Kisan Helpline No. 155261 / 1800115526 (Toll Free),</Text>
        <Text> 0120-6025109 </Text>
      </View>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <Text>IMPORTANT LINKS:</Text>
        <Text></Text>
        <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://pmkisan.gov.in/')}>https://pmkisan.gov.in/</Text>
        <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://dackkms.gov.in/')}>https://dackkms.gov.in/</Text>
        <Text style={{color: 'blue'}} onPress={() => Linking.openURL('http://agriculture.gov.in/')}>http://agriculture.gov.in/</Text>
      </View>
    </View>
  );
}

// if (!global.btoa) {  global.btoa = encode }
// if (!global.atob) { global.atob = decode }
export default class MainApp extends React.Component {
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
          <Tab.Screen name="Flower" component={FlowerScreen} options={{ 
          	tabBarIcon: ({ color, size }) => (
            	<MaterialCommunityIcons name="flower" color={color} size={size} />
						), }} />
          <Tab.Screen name="Rotten or Not" component={RottonScreen} options={{ 
          	tabBarIcon: ({ color, size }) => (
            	<MaterialCommunityIcons name="food-apple" color={color} size={size} />
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