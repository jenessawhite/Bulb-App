import React, { Component } from 'react';
import {Alert, Image, ListView, Text, TextInput, ScrollView, TouchableHighlight, View } from 'react-native';
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
      budgetList: [],
      actualList: []
    }
  }

  componentDidMount(props) {
    console.log(this.props.id);
    this.getBudget()
    this.getTransactions()
  }

  getBudget() {
    axios.get(api() + '/projects/' + this.props.id + '/budget')
    .then((response) => {
      console.log('budgetList' + response.data);
      let budgetList = response.data;
      this.setState ({budgetList})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getTransactions() {
    axios.get(api() + '/projects/' + this.props.id + '/transactions')
      .then((response) => {
        console.log('actualList' + response.data);
        let actualList = (response.data);
        this.setState ({actualList})
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
    axios.patch(api() + '/projects/' + budget.projectId + '/budget/' + budget.id, budget)
    .then((response) => {
      console.log(budget);
      this.getBudget()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  let actual = this.state.actualList.reduce(function(a, b) {
    return (
      a + b
    );
  }, 0);


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
          <Text style ={styles.newItemsText}>Budget</Text>
          <Button
            raised
            icon={{name: 'md-add', type: 'ionicon', buttonStyle: styles.newButton }}
            title='New Transaction'
            color='#fcfcfc'
            backgroundColor='#2ed2ff'
            buttonStyle= {styles.newButton}
            onPress={()=> {Actions.newTransactionModal({projectId: this.props.id})}} />
        </View>

        <Transactions id={this.props.id}  style={styles.transactionContainer}/>

        <View style={styles.bottomContainer}>
          {/* Actual Transaction Info */}
            <View style={styles.budgetContainer} key={budget.id}>
              <View style={styles.budgetRow}>
                <Text>Actual:</Text>
                <Text>${budget.actual}</Text>
              </View>
            </View>

          {/* Est. Budget Info */}
          {this.state.budgetList.map((budget, index) => {
            return (
              <View style={styles.budgetContainer} key={budget.id}>
                <View style={styles.budgetRow}>
                  <Text>Estimated:</Text>
                  <Text>${budget.estimated}</Text>
                  <Icon
                    name='pencil'
                    type='octicon'
                    size={14}
                    color='#242424'
                    onPress={()=> {Actions.updateBudget({projectId: budget.projectId, id: budget.id, current: budget.estimated})}} />
                </View>
              </View>
            )
          })}

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
