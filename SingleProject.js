import React, { Component } from 'react';
import {Alert, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';

import styles from './styles';


export default class SingleProject extends Component {
  constructor () {
    super()
  }
  render() {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.pageTitle}>Name of Project</Text>
      </View>
    );
  }
}
