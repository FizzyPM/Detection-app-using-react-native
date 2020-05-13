import React from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Svg, {Circle} from 'react-native-svg';
import * as ImageManipulator from "expo-image-manipulator";

export default class CameraClass extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hasPermission: null,
      type: Camera.Constants.Type.back,
      // image: null,
    }
  }
  async componentDidMount(){
    const {status} = await Camera.requestPermissionsAsync();
    this.setState({ hasPermission: status === 'granted' });
  }
  handleTakePhoto = async () => {
    if(this.camera){
      let photo = await this.camera.takePictureAsync({skipProcessing:true, quality:1, ratio:'4:3' });
      let reducedphoto = await ImageManipulator.manipulateAsync(
        photo.uri, [],
        { compress: 0.3 }
      );
      // this.setState({ image: photo.uri });
      // console.log(photo)
      this.props.onSnap(reducedphoto, this.props.route.params.leafType)
      // const ratios = await this.camera.getSupportedRatiosAsync();
      // console.log(ratios);
    }
  }
  render(){
    const { hasPermission } = this.state;
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);

    if(hasPermission === null) return <Text>Some random error!</Text>
    else if(hasPermission === false) return <Text>No access to camera</Text>;
    else return (
      <View style={{ flex:1, backgroundColor:'black' }}>
          <Camera ref={ ref => {this.camera = ref; }} 
            style={{ flex:1, width:screenWidth, height:screenHeight, marginTop:Constants.statusBarHeight }}
            type={this.state.type} ratio='16:9' useCamera2Api={true}
            whiteBalance={Camera.Constants.WhiteBalance.auto} 
            autoFocus={Camera.Constants.AutoFocus.on}>

            <View style={{ flex:1, justifyContent:"flex-end", alignItems:"center", position:'relative' }}>
              <TouchableOpacity style={{ backgroundColor:'transparent',paddingBottom:50 }} onPress={()=>this.handleTakePhoto()} >
                <MaterialCommunityIcons style={{ fontSize:50, color:'#fff' }} name="camera"/>
              </TouchableOpacity>
              <Svg height='25%' width='25%' viewBox='0 0 100 100' style={{ position:'absolute' }}>
                <Circle cx="50" cy="50" r="45" stroke='white' strokeWidth="3" fill='transparent' />
              </Svg>
            </View>
          </Camera>
      </View>
    );
  }
}
