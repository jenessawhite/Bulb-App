import React, { Component } from 'react';
import {Alert, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';

import api from './api';
import styles from './styles';


export default class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: []
    }
  }
  componentDidMount(props) {
    console.log(this.props);
    console.log(this.props.id);
    this.getBudget()
  }
  getBudget() {
    axios.get(api() + '/projects/' + this.props.id + '/budget')
      .then((response) => {
        console.log(response.data);
        let budget = response.data;
        console.log(budget.estimated);
        this.setState ({budget})
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.pageTitle}>Budget</Text>
        <Text style={styles.pageDescription}>
          This is your current budget
        </Text>
        <View>
          <Text>Estimated: ${this.props.estimated}</Text>
        </View>
        <Button
          raised
          icon={{name: 'arrow-back'}}
          title='Back'
          backgroundColor= '#FFC107'
          onPress={()=> {Actions.pop()}}/>
      </View>    );
  }
}
