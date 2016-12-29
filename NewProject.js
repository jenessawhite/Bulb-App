import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';


export default class NewProject extends Component {
  constructor () {
    super()
    this.state = {
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          This is a new project
        </Text>
      </View>
    );
  }
}
