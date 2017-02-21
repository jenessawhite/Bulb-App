import React, { Component } from 'react';
import {Alert, ListView, Text, TextInput, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import {Actions, ActionConst} from 'react-native-router-flux';
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
      <View style={styles.budgetContainer}>
        <View style={styles.topBanner}>
          <Text style={styles.title}>BULB</Text>
        </View>

        <View style ={styles.newItemsHolder}>
          <Text style ={styles.newItemsText}>Budget</Text>
          <Button
            raised
            icon={{name: 'md-add', type: 'ionicon', buttonStyle: styles.newButton }}
            title='New Transaction'
            color='#fcfcfc'
            backgroundColor='#2ed2ff'
            buttonStyle= {styles.newButton}
            onPress={()=> {Actions.newTransactionModal()}} />
        </View>

        <Transactions id={this.props.id} />

        <View style={styles.bottomContainer}>
          <View style={styles.budgetNumbers}>
            {this.state.budgetList.map((budget, index) => {
              return (
                <View key={budget.id}>
                  <View>
                    <Text>Estimated:</Text>
                    <Text>${budget.estimated}</Text>
                  </View>
                  <View>
                    <Text>Actual:</Text>
                    <Text>${budget.actual}</Text>
                  </View>
                </View>
              )
            })}
          </View>

          <View style={styles.spTabs}>
            <View style={styles.backTabButton}>
              <Icon
                name='md-arrow-back'
                type='ionicon'
                color='#242424'
                onPress={()=> {Actions.popTo('singleProject')}} />
            </View>
            <View style={styles.homeTabButton}>
              <Icon
                name='home'
                type='octicon'
                color='#242424'
                onPress={()=> {Actions.tabbar({type: ActionConst.RESET})}} />
            </View>
          </View>

        </View>
      </View>
        );
  }
}
