import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import styles from './styles';


export default class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <View style={styles.buffer}>
        <Text style={styles.pageTitle}>Profile</Text>
        <Text style={styles.pageDescription}>
          This is the profile
        </Text>
        <Button
          raised
          iconRight
          icon={{name: 'navigate-next'}}
          title='SAVE'
          backgroundColor= '#FFC107'
          onPress={()=> {Actions.homeTab()}}/>
      </View>
    );
  }
}
