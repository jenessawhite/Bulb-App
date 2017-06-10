'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';

import styles from '../styles/styles';


export default class CameraView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(props) {
    console.log('projectId: ' + this.props.id);
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        {/* Static banner */}
        <View style={styles.topBanner}>
          <Image
            style={{width: 100, height: 50}}
            source={{uri: 'https://s3.us-east-2.amazonaws.com/diy-app-tiy/bluebulblogo.png'}} />
        </View>
        <Text onPress={()=> {Actions.popTo('singleProject')}}> Just testing it out</Text>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }
}
