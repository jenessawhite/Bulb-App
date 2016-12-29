import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';


export default class Profile extends Component {
  constructor () {
    super()
    this.state = {
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          This is the profile
        </Text>
      </View>
    );
  }
}
