import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

export default class NewProject extends Component {
  constructor () {
    super()
    this.state = {
    }
  }
  render() {
    return (
      <View style={styles.buffer}>
        <Text style={styles.pageTitle}>New Project</Text>
        <Text style={styles.pageDescription}>
          This is a new project
        </Text>

        <Button
          reverse
          iconRight
          icon={{name: 'navigate-next'}}
          title='SAVE'
          onPress={()=> {
           Actions.singleProject()
          }}
        />
      </View>
    );
  }
}
