import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Detection from './detection.js'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return(
      // <View style={ styles.container }>
      //   <Text> Main Screen </Text>
      // </View>
        <Detection/>
    )
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
