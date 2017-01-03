import React, { Component } from 'react';
import {Alert, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, ButtonGroup, SocialIcon, Tabs, Tab, Icon } from 'react-native-elements';

import styles from './styles';


export default class Materials extends Component {
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
        <Text style={styles.pageTitle}>Materials</Text>
        {/* {'/n'} */}
        <ScrollView>
          <Text style={styles.pageDescription}>
            This is your current list of materials
          </Text>
          <View style ={styles.projectsListHolder}>
            <View style ={styles.newProjectsHolder}>
              <Text style ={styles.newProjectsText}>NEW PROJECT</Text>
              <Icon
                name='add-circle'
                color='#212121'
                onPress={()=> {
                  Alert.alert(`You clicked this button`)
                }}
              />
            </View>
            <ListView
              style={styles.projectsList}
              dataSource={this.state.dataSource}
              renderRow={
                (rowData) =>
                <View style={styles.projectsItemRow}>
                  <Text style={styles.projectsItemRowText}>{rowData}</Text>
                  <Icon
                    style={styles.projectsItemRowButton}
                    name='cancel'
                    size={25}
                    color='#212121'
                   />
                </View>
              }
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
