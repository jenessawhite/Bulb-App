import React, { Component } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
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
    axios.get(api() + '/projects/' + this.props.id + '/materials')
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
  }

  render() {
    return (
      <View style={styles.modalContainer}>
        <Text style={styles.pageTitle}> New Material</Text>
        <Text style={styles.pageDescription}>
          Add a new material to your list
        </Text>
        {/* FORM */}
        <ScrollView style={{paddingLeft:10, paddingTop:10, height:400}}>
          <View style={styles.formInput}>
            <TextInput
              keyboardType='default'
              value={this.state.name}
              placeholder="Material Name"
              returnKeyType="done"
              onChangeText={(name) => this.setState({name})} />
          </View>
          <View style={styles.formInput}>
            <TextInput
              keyboardType='numeric'
              value={this.state.quantity}
              placeholder="Quantity"
              returnKeyType="done"
              onChangeText={(quantity) => this.setState({quantity})} />
          </View>
          <TextInput
            style={styles.detailedInput}
            keyboardType='default'
            value={this.state.description}
            placeholder="Material Description"
            multiline={true}
            returnKeyType="done"
            onChangeText={(description) => this.setState({description})}
          />
        </ScrollView>

        <View style={styles.modalControllers}>
          <Button
            raised
            iconLeft
            backgroundColor= '#2ed2ff'
            icon={{name:'md-arrow-back', type:'ionicon'}}
            title='Back'
            onPress={()=> {Actions.pop()}}/>

            <Button
              raised
              iconRight
              backgroundColor= '#2ed2ff'
              icon={{name:'md-arrow-forward', type:'ionicon', buttonStyle: styles.modalButtons }}
              title='SAVE'
              onPress={this.saveMaterial.bind(this)}/>

        </View>
      </View>
    );
  }
}
