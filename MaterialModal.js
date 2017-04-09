import React, { Component } from 'react';
import {Alert, ListView, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Icon, CheckBox, Text } from 'react-native-elements';
import {Actions, ActionConst} from 'react-native-router-flux';
import axios from 'axios';

import api from './api';
import styles from './styles/styles';

export default class MaterialModal extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      ds,
      materialsList: ds.cloneWithRows([])
    }
  }

  componentDidMount(props) {
    console.log('projectId: ' + this.props.projectId);
    console.log('material id: ' + this.props.id);
    console.log('material name: ' + this.props.name);
    this.getMaterial()
  }

  getMaterial() {
    axios.get(api() + '/api/projects/' + this.props.projectId + '/materials/' + this.props.id)
    .then((response) => {
      let materialsList = this.state.ds.cloneWithRows(response.data);
      console.log(materialsList);
      this.setState ({materialsList})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.pageTitle}>{this.props.name}</Text>
          <Text style={styles.pageDescription}>
            Here are the details of this material
          </Text>
        </View>
        <View style={styles.modalContent}>
          <ListView
            style={styles.itemsList}
            enableEmptySections={true}
            dataSource={this.state.materialsList}
            renderRow={
              (material) => {
                console.log(material, material.id);
                return (
                  <View style={styles.singleModalInfo}>
                    <Text style={styles.singleModalText}>Details: {material.description}</Text>
                    <Text>{"\n"}</Text>
                    <Text style={styles.singleModalText}>Quantity: {material.quantity}</Text>
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
