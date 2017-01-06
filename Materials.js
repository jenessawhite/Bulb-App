import React, { Component } from 'react';
import {Alert, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

import styles from './styles';


export default class Materials extends Component {
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['Material 1', 'Material 2']),
      pressed: false,
    };
  }
  render() {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.pageTitle}>Materials</Text>
        <Text style={styles.pageDescription}>
          This is your current list of materials
        </Text>
        <View style ={styles.newProjectsHolder}>
          <Text style ={styles.newProjectsText}>NEW MATERIAL</Text>
          <Icon
            name='add'
            color='#212121'
            size={25}
            onPress={()=> {Actions.newMaterialModal()}}/>
        </View>
        <View>
        <ListView
          style={styles.projectsList}
          dataSource={this.state.dataSource}
          renderRow={
            (rowData) =>
            <View style={styles.projectsItemRow}>
              <Text style={styles.projectsItemRowText} onPress={()=> { Actions.singleProjecthold() }}>{rowData}</Text>
              <Icon
                style={styles.projectsItemRowButton}
                name='delete'
                size={25}
                color='#212121'/>
            </View>
        }/>
        <Button
          raised
          icon={{name: 'arrow-back'}}
          title='Back'
          backgroundColor= '#FFC107'
          onPress={()=> {Actions.pop()}}/>
        </View>
      </View>
    );
  }
}
