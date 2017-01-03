import React, { Component } from 'react';
import {Text, ScrollView, View } from 'react-native';
import { Button, ButtonGroup, SocialIcon, Tabs, Tab, Icon } from 'react-native-elements';

import styles from './styles';


export default class Home extends Component {
  constructor () {
    super()
    this.state = {
    };
  }
  render() {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.pageTitle}>Photos</Text>
        {/* {'/n'} */}
        <ScrollView>
          <Text style={styles.pageDescription}>
            Upload pictures of your project!
          </Text>
        </ScrollView>
      </View>
    );
  }
}
