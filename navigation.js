import React, { Component } from 'react';
import {Alert, Image, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import axios from 'axios';
import {Actions, ActionConst} from 'react-native-router-flux';


import api from './api';
import styles from './styles/styles';

export default class HomeNavigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.spTabs}>
        <Icon
          name='home'
          type='octicon'
          color='#242424'
          onPress={()=> {Actions.tabbar({type: ActionConst.RESET})}} />
      </View>
   );
  }
}
