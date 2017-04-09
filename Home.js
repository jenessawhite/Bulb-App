import React, { Component } from 'react';
import {Alert, Image, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import axios from 'axios';
import {Actions, ActionConst} from 'react-native-router-flux';

import HomeNavigation from './navigation';
import api from './api';
import styles from './styles/styles';

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
    axios.get(api() + '/api/projects')
      .then((response) => {
        let projectsList = this.state.ds.cloneWithRows(response.data);
        console.log(projectsList);
        this.setState ({projectsList})
      }).catch(function (error) {
        console.log(error);
      });
  }

  deleteProject(project) {
    console.log('deleting');
    axios.delete(api() + '/api/projects/' + project.id)
    .then((response) => {
      console.log('deleted');
      this.getProjects()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        {/* Static banner */}
        <View style={styles.topBanner}>
          <Image
            style={{width: 100, height: 50}}
            source={{uri: 'https://s3.us-east-2.amazonaws.com/diy-app-tiy/bluebulblogo.png'}} />
        </View>

        <View style ={styles.newItemsHolder}>
          <Text style ={styles.newItemsText}>Projects</Text>
          <Button
            raised
            icon={{name: 'md-add', type: 'ionicon', buttonStyle: styles.newButton }}
            title='New Project'
            color='#fcfcfc'
            backgroundColor='#2ed2ff'
            buttonStyle= {styles.newButton}
            onPress={()=> {Actions.newProjectTab()}} />
        </View>

        <ScrollView style={styles.itemsListHolder}>
          <ListView
            // style={styles.projectsList}
            enableEmptySections={true}
            dataSource={this.state.projectsList}
            renderRow={
              (project) => {
                console.log(project);
                return (
                  <TouchableHighlight onPress={()=> { Actions.singleProjectHold({id: project.id, name: project.name})}} underlayColor='#FF2E69' style={styles.projectsList}>
                    <View style={styles.projectsRow}>
                      <Text style={styles.itemRowText}>{project.name}</Text>
                      <Icon
                        style={styles.itemRowButton}
                        name='delete'
                        size={25}
                        color='#212121'
                        onPress={()=> {
                          Alert.alert(
                            'Confirm Delete',
                            'Are you sure you want to delete this project? (This can\'t be undone)',
                            [
                              {text: 'Nope', onPress: () => console.log('canceled'), style: 'cancel'},
                              {text: 'Yes', style: 'destructive', onPress: () => this.deleteProject(project)},
                            ]
                          )
                        }}/>
                    </View>
                  </TouchableHighlight>
                )
              }
            }
          />
        </ScrollView>

        <HomeNavigation />
      </View>
    );
  }
}
