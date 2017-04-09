import React, { Component } from 'react';
import {Alert, Image, ListView, Text, TextInput, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import {Actions, ActionConst} from 'react-native-router-flux';
import axios from 'axios';

import Transactions from './Transactions';
import PageNavigation from './pageNavigation';
import api from './api';
import styles from './styles/styles';


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
    axios.get(api() + '/api/projects/' + this.props.id + '/budget')
    .then((response) => {
      console.log('budgetList' + response.data);
      let budgetList = response.data[0];
      this.setState ({budgetList})
      console.log(this.state.budgetList);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getTransactions() {
    axios.get(api() + '/api/projects/' + this.props.id + '/transactions')
    .then((response) => {
      console.log('actualList' + response.data);
      let actualList = (response.data);
      this.setState ({actualList})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  deleteTransaction(transaction) {
    console.log('working');
    console.log(transaction);
    axios.delete(api() + '/api/projects/' + transaction.projectId + '/transactions/' + transaction.id)
    .then((response) => {
      console.log('deleted');
      this.getTransactions()
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
    axios.patch(api() + '/api/projects/' + budget.projectId + '/budget/' + budget.id, budget)
    .then((response) => {
      console.log(budget);
      this.getBudget()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    let actual = this.state.actualList.map((item) => item.price).reduce((a, b) => {
      return (
        a + b
      );
    }, 0).toFixed(2);
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

        <Transactions id={this.props.id} getTransactions={this.getTransactions.bind(this)} deleteTransaction={this.deleteTransaction.bind(this)} transactions={this.state.actualList} style={styles.transactionContainer}/>

        <View style={styles.bottomContainer}>
          {/* Actual Transaction Info */}
          <View style={styles.budgetContainer}>
            <View style={styles.budgetRow}>
              <Text style={styles.budgetText}>Actual:</Text>
              <Text style={styles.budgetText}>${actual}</Text>
            </View>
          {/* Est. Budget Info */}
            <View style={styles.budgetRow}>
              <Text style={styles.budgetText}>
                Estimated:
              </Text>
              <Text style={{color:this.state.budgetList.estimated < actual ? '#de141e' : '#1ede14' ,fontSize:16, fontWeight: 'bold'}}>
                ${this.state.budgetList.estimated}
              </Text>
            </View>
          </View>

          <PageNavigation />
        </View>
      </View>
        );
  }
}
