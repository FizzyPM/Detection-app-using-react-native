import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MainApp from './MainApp.js'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
		}
	}
  render(){
    return(
			<MainApp/>
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