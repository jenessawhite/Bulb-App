import React, { Component } from 'react';
import { Alert, Modal, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Button, FormLabel, FormInput, Icon } from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';

import api from './api';
import styles from './styles';


export default class NewProject extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    }
  }

  handleFormChange() {
    this.setState({
      name: this.state.name,
      description: this.state.description
    })
  }

  handleFormFocus() {
    console.log('focused');
  }

  saveProject() {
    if (this.state.name === '') {
      Alert.alert(
        'Woah there',
        'Your project needs a name!',
      )
    } else {
      let newProject = {
        name: this.state.name,
        description: this.state.description
      };
      axios.post(api() + '/projects', newProject)
      .then((response) => {
        console.log(newProject);
        Actions.homeTab({type: ActionConst.RESET});
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  render() {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.pageTitle}> New Project</Text>
          <Text style={styles.pageDescription}>
            Let's start a new project
          </Text>
        </View>
        {/* FORM */}
        <View style={styles.modalForm}>
          <TextInput
            style={styles.formInput}
            value={this.state.name}
            multiline={true}
            placeholder="Project Name"
            placeholderTextColor="#242424"
            onChangeText={(name) => this.setState({name})} />
          <TextInput
            style={styles.formInput}
            value={this.state.description}
            placeholder="Project Description"
            placeholderTextColor="#242424"
            multiline={true}
            onChangeText={(description) => this.setState({description})} />
        </View>

        <View style={styles.modalControllers}>
          <Button
            raised
            iconLeft
            backgroundColor= '#2ed2ff'
            icon={{name:'md-arrow-back', type:'ionicon'}}
            buttonStyle= {styles.modalButtons}
            title='Back'
            onPress={()=> {Actions.homeTab({type: ActionConst.RESET})}}/>

          <Button
            raised
            iconRight
            backgroundColor= '#2ed2ff'
            icon={{name:'md-arrow-forward', type:'ionicon'}}
            buttonStyle= {styles.modalButtons}
            title='Save'
            onPress={this.saveProject.bind(this)}/>
        </View>
      </View>
    );
  }
}
