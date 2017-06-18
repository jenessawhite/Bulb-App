import React, { Component } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Button, FormLabel, FormInput, Icon } from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';

import api from './api';
import styles from '../styles/styles';


export default class NewMaterial extends Component {
  constructor (props) {
    super(props)
    this.state = {
      materialsList: [],
      name: '',
      description: '',
      quantity: null,
      checked: false,
    }
  }

  componentDidMount(props) {
    console.log('projectId: ' + this.props.projectId);
    console.log('Scene name: ' + this.props.name);
    this.getMaterials()
  }

  getMaterials() {
    axios.get(api() + '/api/projects/' + this.props.projectId + '/materials')
      .then((response) => {
        let materialsList = response.data;
        console.log('Materials List: ' + materialsList);
        this.setState ({materialsList})
      })
      .catch(function (error) {
        console.log('Here is your error: ' + error);
      });
  }

  handleFormChange() {
    this.setState({
      name: this.state.name,
      description: this.state.description,
      quantity: this.state.quantity,
    })
  }

  handleFormFocus() {
    console.log('focused');
  }

  saveMaterial(props) {
    if (this.state.name === '') {
      Alert.alert(
        'Woah there',
        'Your material needs a name!',
      )
    } else {
      let newMaterial = {
        name: this.state.name,
        description: this.state.description,
        quantity: this.state.quantity,
        checked: false,
        projectId: this.props.projectId
      };
      console.log('New material: ' + newMaterial);

      axios.post(api() + '/api/projects/' + this.props.projectId + '/materials', newMaterial).then((response) => {
        console.log('Material (after post): ' + newMaterial);
        console.log(response.data);
        Actions.materials({id: this.props.projectId, name: this.props.name})
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
          <Text style={styles.pageTitle}> New Material</Text>
          <Text style={styles.pageDescription}>
            What material do we need to add?
          </Text>
        </View>
        {/* FORM */}
        <View style={styles.modalForm}>
          <TextInput
            style={styles.formInput}
            keyboardType='default'
            value={this.state.name}
            placeholder="Material Name"
            multiline={true}
            onChangeText={(name) => this.setState({name})} />
          <TextInput
            style={styles.formInput}
            keyboardType='numeric'
            value={this.state.quantity}
            placeholder="Quantity"
            multiline={true}
            onChangeText={(quantity) => this.setState({quantity})} />
          <TextInput
            style={styles.formInput}
            value={this.state.description}
            placeholder="Material Details"
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
            onPress={()=> {Actions.pop()}}/>

          <Button
            raised
            iconRight
            backgroundColor= '#2ed2ff'
            icon={{name:'md-arrow-forward', type:'ionicon'}}
            buttonStyle= {styles.modalButtons}
            title='Save'
            onPress={this.saveMaterial.bind(this)}/>
        </View>

      </View>
    );
  }
}
