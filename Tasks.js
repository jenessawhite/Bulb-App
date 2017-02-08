import React, { Component } from 'react';
import {Alert, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';

import api from './api';
import styles from './styles';


export default class Tasks extends Component {
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
    console.log(this.props);
    console.log(this.props.id);
    console.log(this.props.name);
    this.getTasks()
  }

  getTasks() {
    axios.get(api() + '/projects/' + this.props.id + '/tasks')
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
      <View style={styles.contentContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.pageTitle}>Tasks</Text>
          <Text style={styles.pageDescription}>These are your tasks</Text>
        </View>
        <View style ={styles.newItemsHolder}>
          <Text style ={styles.newItemsText}>NEW TASK</Text>
          <Icon
            name='add'
            color='#212121'
            size={25}
            onPress={()=> {Actions.newTaskModal({id: this.props.id})}} />
        </View>

        <View style={styles.content}>
          <ListView
            style={styles.itemsList}
            enableEmptySections={true}
            dataSource={this.state.tasksList}
            renderRow={
              (task) => {
                console.log(task);
                return (
                  <View style={styles.itemRow}>
                    <Text style={styles.itemRowText}>{task.title}</Text>
                    <Icon
                      style={styles.itemRowButton}
                      name='delete'
                      size={25}
                      color='#212121'
                      onPress={()=> { Alert.alert('Are you sure you want to delete this task?') }}/>
                  </View>
                )
              }
            }
          />
        </View>
        <View style={styles.backContainer}>
          <Button
            raised
            icon={{name: 'arrow-back'}}
            title='Back'
            backgroundColor= '#FFC107'
            style={styles.backButton}
            onPress={()=> {Actions.pop()}}/>
        </View>
      </View>
    );
  }
}
