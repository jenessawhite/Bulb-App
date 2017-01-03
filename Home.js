import React, { Component } from 'react';
import {Alert, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

import styles from './styles';


export default class Home extends Component {
  constructor () {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      pressed: false,
    };  }
  render() {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.pageTitle}>Projects</Text>
        {/* {'/n'} */}
        <Text style={styles.pageDescription}>
          This is your current list of projects
        </Text>
        <View style ={styles.newProjectsHolder}>
          <Text style ={styles.newProjectsText}>NEW PROJECT</Text>
          <Icon
            raised
            name='add'
            color='#212121'
            size={25}
            onPress={()=> Actions.newProjectTab() } />
        </View>
        <ScrollView style ={styles.projectsListHolder}>
          <ListView
            style={styles.projectsList}
            dataSource={this.state.dataSource}
            renderRow={
              (rowData) =>
              <View style={styles.projectsItemRow}>
                <Text style={styles.projectsItemRowText} onPress={()=> { Actions.singleProject() }}>{rowData}</Text>
                <Icon
                  style={styles.projectsItemRowButton}
                  name='cancel'
                  size={25}
                  color='#212121'
                />
              </View>
            }
          />
        </ScrollView>
      </View>
    );
  }
}
