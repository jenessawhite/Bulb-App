import React, { Component } from 'react';
import {Alert, Image, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Icon, CheckBox } from 'react-native-elements';
import {Actions, ActionConst} from 'react-native-router-flux';
import axios from 'axios';

import api from './api';
import styles from './styles/styles';


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
    console.log('projectId: ' + this.props.id);
    console.log('project name: ' + this.props.name);
    this.getTasks()
  }

  getTasks() {
    axios.get(api() + '/api/projects/' + this.props.id + '/tasks')
    .then((response) => {
      let tasksList = this.state.ds.cloneWithRows(response.data);
      console.log(tasksList);
      this.setState ({tasksList})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  deleteTask(task) {
    console.log(task);
    axios.delete(api() + '/api/projects/' + task.projectId + '/tasks/' + task.id)
    .then((response) => {
      console.log('deleted');
      this.getTasks()
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  toggleChecked(task) {
    console.log(task.completed);
    var taskChecked = task.completed
    console.log(taskChecked);
    axios.patch(api() + '/api/projects/' + task.projectId + '/tasks/' + task.id, task)
    .then((response) => {
      console.log(task);
      this.getTasks()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        {/* Static banner */}
        <View style={styles.topBanner}>
          <Image
            style={{width: 100, height: 50}}
            source={{uri: 'https://s3.us-east-2.amazonaws.com/diy-app-tiy/bluebulblogo.png'}} />
        </View>

        <View style ={styles.newItemsHolder}>
          <Text style ={styles.newItemsText}>Tasks</Text>
          <Button
            raised
            icon={{name: 'md-add', type: 'ionicon'}}
            title='New Task'
            color='#fcfcfc'
            backgroundColor='#2ed2ff'
            buttonStyle= {styles.newButton}
            onPress={()=> {Actions.newTaskModal({projectId: this.props.id})}} />
        </View>

        <View style={styles.content}>
          <ListView
            style={styles.itemsList}
            enableEmptySections={true}
            dataSource={this.state.tasksList}
            renderRow={
              (task) => {
                console.log(task, task.id);
                return (
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      title= {task.title}
                      checked={task.completed}
                      checkedColor='#00CCFF'
                      onIconPress={()=> this.toggleChecked(task)}
                      onPress={()=> {Actions.taskModal({projectId: task.projectId, id: task.id, title: task.title})}}
                      style={styles.checkbox} />
                    <View style={styles.itemDelete}>
                      <Icon
                        style={styles.itemDelete}
                        name='delete'
                        size={22}
                        color='#242424'
                        onPress={()=> {
                          Alert.alert(
                            'Confirm Delete',
                            'Are you sure you want to delete this task? (This can\'t be undone)',
                            [
                              {text: 'Nope', onPress: () => console.log('canceled'), style: 'cancel'},
                              {text: 'Yes', style: 'destructive', onPress: () => this.deleteTask(task)},
                            ]
                          )
                        }} />
                    </View>
                  </View>
                )
              }
            }
          />
        </View>

        <View style={styles.spTabs}>
          <View style={styles.backTabButton}>
            <Icon
              name='md-arrow-back'
              type='ionicon'
              color='#242424'
              onPress={()=> {Actions.popTo('singleProject')}} />
          </View>
          <View style={styles.homeTabButton}>
            <Icon
              name='home'
              type='octicon'
              color='#242424'
              onPress={()=> {Actions.tabbar({type: ActionConst.RESET})}} />
          </View>
        </View>

      </View>
    );
  }
}
