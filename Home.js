import React, { Component } from 'react';
import { Text, ScrollView,View } from 'react-native';
import styles from './styles';


export default class Home extends Component {
  constructor () {
    super()
    this.state = {
    }
  }
  render() {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.pageTitle}>Projects</Text>
        {/* {'/n'} */}
        <ScrollView>
          <Text style={styles.welcome}>
            
          </Text>
        </ScrollView>
      </View>
    );
  }
}
