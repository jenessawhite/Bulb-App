import React, { Component } from 'react';
import {Alert, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';


import api from './api';
import styles from './styles';

export default class Home extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      ds,
      projectsList: ds.cloneWithRows([])
    }
  }
  componentDidMount() {
    this.getProjects()
  }
  getProjects() {
    axios.get(api() + '/projects')
      .then((response) => {
        let projectsList = this.state.ds.cloneWithRows(response.data);
        console.log(projectsList);
        this.setState ({projectsList})
      }).catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.pageTitle}>Projects</Text>
        <Text style={styles.pageDescription}>
          This is your current list of projects
        </Text>
        <View style ={styles.newItemsHolder}>
          <Text style ={styles.newItemsText}>NEW PROJECT</Text>
          <Icon
            name='add'
            color='#212121'
            size={25}
            onPress={()=> {Actions.newProjectTab()}} />
        </View>
        <ScrollView style ={styles.itemsListHolder}>
          <ListView
            style={styles.itemsList}
            enableEmptySections={true}
            dataSource={this.state.projectsList}
            renderRow={
              (project) => {
                console.log(project);
                return (
                  <View style={styles.itemRow}>
                    <Text style={styles.itemRowText} onPress={()=> { Actions.singleProjectHold({id: project.id, name: project.name}) }}>{project.name}</Text>
                    <Icon
                      style={styles.itemRowButton}
                      name='delete'
                      size={25}
                      color='#212121'
                      onPress={()=> { Alert.alert('Are you sure you want to delete this project?') }}/>
                  </View>
                )
              }
            }
          />
        </ScrollView>
      </View>
    );
  }
}
