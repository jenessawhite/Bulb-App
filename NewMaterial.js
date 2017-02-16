import React, { Component } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Button, FormLabel, FormInput, Icon } from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';

import api from './api';
import styles from './styles';


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
    console.log('projectId: ' + this.props.id);
    console.log('Scene name: ' + this.props.name);
    this.getMaterials()
  }

  getMaterials() {
    axios.get(api() + '/projects/' + this.props.id + '/tasks')
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
    let newMaterial = {
      name: this.state.name,
      description: this.state.description,
      quantity: this.state.quantity,
      checked: false,
      projectId: this.props.id
    };
    console.log('New material: ' + newMaterial);

    axios.post(api() + '/projects/' + this.props.id + '/materials', newMaterial).then((response) => {
      console.log('Material (after post): ' + newMaterial);
      console.log(response.data);
      Actions.materials({id: this.props.id, name: this.props.name})
    })
    .catch(function (error) {
      console.log('You have an ' + error);
    });
  }

  render() {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.pageTitle}> New Material</Text>
        <Text style={styles.pageDescription}>
          Add a new material to your list
        </Text>
        {/* FORM */}
        <ScrollView style={{paddingLeft:10, paddingTop:10, height:400}}>
          <TextInput
            style={{borderBottomWidth:2, borderColor: 'black', paddingTop:10, height:40 }}
            keyboardType='default'
            value={this.state.name}
            placeholder="Material Name"
            returnKeyType="done"
            onChangeText={(name) => this.setState({name})}
          />
          <TextInput
            style={{borderBottomWidth:2, borderColor: 'black', paddingTop:10, height:40 }}
            keyboardType='numeric'
            value={this.state.quantity}
            placeholder="quantity"
            returnKeyType="done"
            onChangeText={(quantity) => this.setState({quantity})}
          />
          <TextInput
            style={{borderBottomWidth:2, borderColor: 'black', paddingTop:10, height:40}}
            keyboardType='default'
            value={this.state.description}
            placeholder="Material Description"
            multiline={true}
            returnKeyType="done"
            onChangeText={(description) => this.setState({description})}
          />
        </ScrollView>

        <Button
          reverse
          iconRight
          backgroundColor= '#FFC107'
          icon={{name: 'navigate-next'}}
          title='SAVE'
          onPress={this.saveMaterial.bind(this)}/>

        <Button
          iconRight
          backgroundColor= '#FFC107'
          icon={{name: 'navigate-next'}}
          title='Back'
          onPress={()=> {Actions.pop()}}/>
      </View>
    );
  }
}
