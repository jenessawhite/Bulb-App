import React, { Component } from 'react';
import {Alert, ListView, Text, TextInput, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';

import Transactions from './Transactions';
import api from './api';
import styles from './styles';


export default class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budgetList: []
    }
  }

  componentDidMount(props) {
    console.log(this.props.id);
    this.getBudget()
  }

  getBudget() {
    axios.get(api() + '/projects/' + this.props.id + '/budget')
      .then((response) => {
        console.log(response.data);
        let budgetList = response.data;
        this.setState ({budgetList})
      })
      .catch(function (error) {
        console.log(error);
      });
  }
//map then reduce
  updateBudget(budget) {
    console.log(budget.checked);
    var budgetChecked = budget.checked
    console.log(budgetChecked);
    axios.patch(api() + '/projects/' + budget.projectId + '/materials/' + budget.id, budget)
    .then((response) => {
      console.log(budget);
      this.getBudget()
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.pageTitle}>Budget</Text>
          <Text style={styles.pageDescription}>This is your current budget</Text>
        </View>

        <Transactions id={this.props.id} />

        <View style={styles.budgetNumbers}>
          {this.state.budgetList.map((budget, index) => {
            return (
              <View key={budget.id}>
                <Text>Estimated: ${budget.estimated}</Text>
                <Text>Actual: ${budget.actual}</Text>
              </View>
            )
          })}
        </View>

        <View style={styles.backContainer}>
          <Button
            raised
            icon={{name: 'arrow-back'}}
            title='Back'
            backgroundColor= '#FFC107'
            style={styles.backButton}
            onPress={()=> {Actions.pop()}}/>
        </View>
      </View>
        );
  }
}
