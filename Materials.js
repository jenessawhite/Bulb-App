import React, { Component } from 'react';
import {Alert, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';

import api from './api';
import styles from './styles';

var alertMessage = 'Are you sure that you want to delete this material? ';

export default class Materials extends Component {
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
    console.log('projectId: ' + this.props.id);
    console.log('scene name: ' + this.props.name);
    this.getMaterials()
  }

  getMaterials() {
    axios.get(api() + '/projects/' + this.props.id + '/materials')
      .then((response) => {
        let materialsList = this.state.ds.cloneWithRows(response.data);
        console.log(materialsList);
        this.setState ({materialsList})
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteMaterial(material) {
    console.log('working');
    console.log(material);
    axios.delete(api() + '/projects/' + material.projectId + '/materials/' + material.id)
      .then((response) => {
        console.log('deleted');
        this.getMaterials()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.pageTitle}>Materials</Text>
          <Text style={styles.pageDescription}>This is your current list of materials</Text>
        </View>
        <View style ={styles.newItemsHolder}>
          <Text style ={styles.newItemsText}>NEW MATERIAL</Text>
          <Icon
            name='add'
            color='#212121'
            size={25}
            onPress={()=> {Actions.newMaterialModal({id: this.props.id})}}/>
        </View>
        <View style={styles.content}>
          <ListView
            style={styles.itemsList}
            enableEmptySections={true}
            dataSource={this.state.materialsList}
            renderRow={
              (material) => {
                console.log(material);
                return (

                  <TouchableHighlight onPress={()=> {Actions.materialModal({projectId: this.props.id, id: material.id})}}>
                    <View style={styles.itemRow}>
                    {/* Actions.materialModal({id: this.props.id}) */}
                      <Text style={styles.itemRowText}>{material.quantity}</Text>
                      <Text style={styles.itemRowText}>{material.name}</Text>
                      <Icon
                        style={styles.itemRowButton}
                        name='delete'
                        size={25}
                        color='#212121'
                        onPress={()=> this.deleteMaterial(material)
                      }/>
                    </View>
                  </TouchableHighlight>

                )
              }
            }
          />
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
