import React, { Component } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Button, FormLabel, FormInput, Icon } from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';

import api from './api';
import styles from './styles/styles';

var rightNow = new Date();

export default class NewTask extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tasksList: [],
      title: '',
      description: '',
      goalDate: '',
      completed: false
    }
  }

  componentDidMount(props) {
    console.log('projectId: ' + this.props.projectId);
    console.log('Scene name: ' + this.props.name);
    this.getTasks()
  }

  getTasks() {
    axios.get(api() + '/api/projects/' + this.props.projectId + '/tasks')
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
      title: this.state.title,
      description: this.state.description,
      goalDate: this.state.goalDate
    })
  }

  handleFormFocus() {
    console.log('focused');
  }

  saveTask(props) {
    if (this.state.title === '') {
      Alert.alert(
        'Woah there',
        'Your task needs a title!',
      )
    } else {
      let newTask = {
        title: this.state.title,
        description: this.state.description,
        goalDate: this.state.goalDate,
        completed: false,
        projectId: this.props.projectId
      };
      console.log('New task: ' + newTask);

      axios.post(api() + '/api/projects/' + this.props.projectId + '/tasks', newTask).then((response) => {
        console.log('Task (after post): ' + newTask);
        console.log(response.data);
        Actions.tasks({id: this.props.projectId, name: this.props.name})
      })
      .catch(function (error) {
        console.log('You have an ' + error);
      });
    }
  }

  render() {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.pageTitle}> New Task</Text>
          <Text style={styles.pageDescription}>
            What task do we need to add?
          </Text>
        </View>
        {/* FORM */}
        <View style={styles.modalForm}>
          <TextInput
            style={styles.formInput}
            value={this.state.title}
            multiline={true}
            placeholder="Task Title"
            onChangeText={(title) => this.setState({title})} />
          <TextInput
            style={styles.formInput}
            value={this.state.description}
            placeholder="Task Description"
            multiline={true}
            onChangeText={(description) => this.setState({description})} />
          <TextInput
            style={styles.formInput}
            value={this.state.goalDate}
            placeholder="When do you want to be finished? (Month Day)"
            multiline={true}
            onChangeText={(goalDate) => this.setState({goalDate})} />
        </View>

        <View style={styles.modalControllers}>
          <Button
            raised
            iconLeft
            backgroundColor= '#2ed2ff'
            icon={{name:'md-arrow-back', type:'ionicon'}}
            buttonStyle= {styles.modalButtons}
            title='Back'
            onPress={()=> {Actions.pop()}}/>

          <Button
            raised
            iconRight
            backgroundColor= '#2ed2ff'
            icon={{name:'md-arrow-forward', type:'ionicon'}}
            buttonStyle= {styles.modalButtons}
            title='Save'
            onPress={this.saveTask.bind(this)}/>
        </View>

      </View>
    );
  }
}
