import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import {decode, encode} from 'base-64'

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function DetectionScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Which Disease?</Text>
    </View>
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