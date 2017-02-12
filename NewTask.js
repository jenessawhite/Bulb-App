import React, { Component } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Button, FormLabel, FormInput, Icon } from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';

import api from './api';
import styles from './styles';


export default class NewTask extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tasksList: [],
      title: '',
      goalDate: '',
      completed: false
    }
  }

  componentDidMount(props) {
    console.log('projectId: ' + this.props.id);
    console.log('Scene name: ' + this.props.name);
    this.getTasks()
  }

  getTasks() {
    axios.get(api() + '/projects/' + this.props.id + '/tasks')
      .then((response) => {
        let tasksList = response.data;
        console.log('Tasks List: ' + tasksList);
        this.setState ({tasksList})
      })
      .catch(function (error) {
        console.log('Here is your error: ' + error);
      });
  }

  handleFormChange() {
    this.setState({
      title: this.state.title
    })
  }

  handleFormFocus() {
    console.log('focused');
  }

  saveTask(props) {
    let newTask = {
      title: this.state.title,
      goalDate: '2017-02-10',
      completed: false,
      projectId: this.props.id
    };
    console.log('New task: ' + newTask);

    axios.post(api() + '/projects/' + this.props.id + '/tasks', newTask).then((response) => {
      console.log('Task (after post): ' + newTask);
      console.log(response.data);
      Actions.tasks({id: this.props.id, name: this.props.name})
    })
    .catch(function (error) {
      console.log('You have an ' + error);
    });
  }

  render() {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.pageTitle}> New Task</Text>
        <Text style={styles.pageDescription}>
          Add a new task
        </Text>

        <ScrollView style={{paddingLeft:10,paddingTop:10, height:200}}>
          <TextInput
            style={{borderBottomWidth:200, borderColor: 'black' }}
            keyboardType='default'
            value={this.state.title}
            placeholder="Task Title"
            returnKeyType="done"
            onChangeText={(title) => this.setState({title})}
          />
        </ScrollView>

        <Button
          reverse
          iconRight
          backgroundColor= '#FFC107'
          icon={{name: 'navigate-next'}}
          title='SAVE'
          onPress={this.saveTask.bind(this)}/>

        <Button reverse iconRight backgroundColor= '#FFC107' icon={{name: 'navigate-next'}} title='Back'
            onPress={()=> {Actions.pop()}}/>

      </View>
    );
  }
}
