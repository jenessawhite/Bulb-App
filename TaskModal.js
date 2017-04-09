import React, { Component } from 'react';
import {Alert, ListView, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Icon, CheckBox, Text } from 'react-native-elements';
import {Actions, ActionConst} from 'react-native-router-flux';
import axios from 'axios';

import api from './api';
import styles from './styles/styles';

export default class TaskModal extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      ds,
      tasksList: ds.cloneWithRows([])
    }
  }

  componentDidMount(props) {
    console.log('projectId: ' + this.props.projectId);
    console.log('task id: ' + this.props.id);
    console.log('task title: ' + this.props.title);
    this.getTask()
  }

  getTask() {
    axios.get(api() + '/api/projects/' + this.props.projectId + '/tasks/' + this.props.id)
    .then((response) => {
      let tasksList = this.state.ds.cloneWithRows(response.data);
      console.log(tasksList);
      this.setState ({tasksList})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.pageTitle}>{this.props.title}</Text>
          <Text style={styles.pageDescription}>
            Here are the details of this task
          </Text>
        </View>
        <View style={styles.modalContent}>
          <ListView
            style={styles.itemsList}
            enableEmptySections={true}
            dataSource={this.state.tasksList}
            renderRow={
              (task) => {
                console.log(task, task.id);
                return (
                  <View style={styles.singleModalInfo}>
                    <Text style={styles.singleModalText}>Description: {task.description}</Text>
                    <Text>{"\n"}</Text>
                    <Text style={styles.singleModalText}>Goal finish date: {task.goalDate}</Text>
                  </View>

                )
              }
            }
          />
        </View>

        <View style={styles.singleModal}>
          <Button
            raised
            iconLeft
            backgroundColor= '#2ed2ff'
            icon={{name:'md-arrow-back', type:'ionicon'}}
            buttonStyle= {styles.modalSingleButton}
            title='Back'
            onPress={()=> {Actions.pop()}}/>
        </View>
      </View>
    );
  }
}
