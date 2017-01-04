import React, { Component } from 'react';
import {Alert, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

import styles from './styles';


export default class Tasks extends Component {
  constructor () {
    super()
  }
  render() {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.pageTitle}>Tasks</Text>
        <Text style={styles.pageDescription}>
          These are your tasks
        </Text>
        <Button
          raised
          icon={{name: 'arrow-back'}}
          title='Back'
          backgroundColor= '#FFC107'
          onPress={()=> {Actions.pop()}}/>
      </View>    );
  }
}
