import React, { Component } from 'react';
import {Alert, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';

import api from './api';
import styles from './styles';


export default class MaterialModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      materialsList: {}
    }
  }

  componentDidMount(props) {
    console.log('projectId: ' + this.props.projectId);
    console.log('materialId: ' + this.props.id);
    console.log('project name: ' + this.props.name);
    this.getMaterial()
  }

  getMaterial() {
    axios.get(api() + '/projects/' + this.props.projectId + '/materials' + this.props.id)
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.pageTitle}>Single Material</Text>
        </View>
        <View style ={styles.newItemsHolder}>
          <Icon
            name='add'
            color='#212121'
            size={25}/>
        </View>
        <View style={styles.content}>
          {/* <ListView
            style={styles.itemsList}
            enableEmptySections={true}
            dataSource={this.state.materialsList}
            renderRow={
              (material) => {
                console.log(material);
                return (
                  <View style={styles.itemRow}>
                    <Text style={styles.itemRowText}>{material.quantity}</Text>
                    <Text style={styles.itemRowText}>{material.name}</Text>
                    <Icon
                      style={styles.itemRowButton}
                      name='delete'
                      size={25}
                      color='#212121'
                      onPress={()=> { Alert.alert('Are you sure you want to delete this material?') }}/>
                  </View>
                )
              }
            }
          /> */}
        </View>
        <View style={styles.backContainer}>
          <Button
            raised
            icon={{name: 'arrow-back'}}
            title='Back'
            backgroundColor= '#FFC107'
            style={styles.backButton}
            onPress={()=> {Actions.popTo('singleProject')}}/>
        </View>
      </View>
    );
  }
}
