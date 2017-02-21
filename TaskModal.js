import React, { Component } from 'react';
import {Alert, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';

import api from './api';
import styles from './styles';


export default class TaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {}
    }
  }

  componentDidMount(props) {
    console.log('projectId: ' + this.props.projectId);
    console.log('taskId: ' + this.props.id);
    console.log('project name: ' + this.props.name);
    this.getTask()
  }

  getTask() {
    axios.get(api() + '/projects/' + this.props.projectId + '/tasks/' + this.props.id)
      .then((response) => {
        console.log(response.data[0]);
        let task = response.data[0]
        console.log(task);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.pageTitle}>Single Task</Text>
        </View>
        <View style={styles.content}>
          {/* <ListView
            style={styles.itemsList}
            enableEmptySections={true}
            dataSource={this.state.materialsList}
            renderRow={
              (material) => {
                console.log(material);
                return (
                  <View style={styles.itemRow}>
                    <Text style={styles.itemRowText}>{material.quantity}</Text>
                    <Text style={styles.itemRowText}>{material.name}</Text>
                    <Icon
                      style={styles.itemRowButton}
                      name='delete'
                      size={25}
                      color='#212121'
                      onPress={()=> { Alert.alert('Are you sure you want to delete this material?') }}/>
                  </View>
                )
              }
            }
          /> */}
        </View>
        <View style={styles.backContainer}>
          <Button
            raised
            icon={{name: 'arrow-back'}}
            title='Back'
            backgroundColor= '#FFC107'
            style={styles.backButton}
            onPress={()=> {Actions.popTo('singleProject')}}/>
        </View>
      </View>
    );
  }
}
