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
      axios.post(api() + '/projects', newProject).then((response) => {
        console.log(newProject);
        Actions.singleProjectHold({id: newProject.id, name: newProject.name, description: newProject.description});
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.pageTitle}>New Project</Text>
          <Text style={styles.pageDescription}>This is a new project</Text>
        </View>
        <View>
          <ScrollView style={{paddingLeft:10,paddingTop:10, height:200}}>
            <TextInput
              style={{borderBottomWidth:200, borderColor: 'black' }}
              keyboardType='default'
              value={this.state.name}
              placeholder="Name"
              returnKeyType="done"
              onChangeText={(name) => this.setState({name})}
            />
          </ScrollView>
          <Button reverse iconRight backgroundColor= '#FFC107' icon={{name: 'navigate-next'}} title='SAVE'
            onPress={this.saveProject.bind(this)}/>
          <Text>{JSON.stringify(this.state.name)}</Text>
        </View>
    </View>
    );
  }
}
