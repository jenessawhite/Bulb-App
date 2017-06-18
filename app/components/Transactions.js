import React, { Component } from 'react';
import {Alert, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Icon, CheckBox } from 'react-native-elements';
import {Actions, ActionConst} from 'react-native-router-flux';
import axios from 'axios';

import api from './api';
import styles from '../styles/styles';

var alertMessage = 'Are you sure that you want to delete this transaction? ';

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      ds,
      transactionsList: ds.cloneWithRows([])
    }
  }
  componentWillReceiveProps(newprops, props) {
    let transactionsList = this.state.ds.cloneWithRows(newprops.transactions);
    this.setState ({transactionsList})
  }
  componentDidMount(props) {
    console.log('projectId: ' + this.props.id);
    this.props.getTransactions()
  }

  getTransactions() {
    axios.get(api() + '/api/projects/' + this.props.id + '/transactions')
      .then((response) => {
        let transactionsList = this.state.ds.cloneWithRows(response.data);
        this.setState ({transactionsList})
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updatePrice(transaction) {
    console.log(transaction.price);
    var transactionChecked = transaction.checked
    console.log(transactionChecked);
    axios.patch(api() + '/api/projects/' + transaction.projectId + '/transactions/' + transaction.id, transaction)
    .then((response) => {
      console.log(transaction);
      this.getTransactions()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <View>
        <ListView
          style={styles.itemsList}
          enableEmptySections={true}
          dataSource={this.state.transactionsList}
          renderRow={
            (transaction) => {
              return (
                  <View style={styles.transactionList} onPress={()=> {Actions.transactionModal({projectId: this.props.id, id: transaction.id})}}>
                    <View style={styles.transactionPrice}>
                      <Text>{transaction.price}</Text>
                    </View>
                    <View style={styles.transactionInfo}>
                      <Text style={styles.transactionItem}>{transaction.item}</Text>
                      <Text style={styles.transactionStore}>{transaction.store}</Text>
                    </View>
                    <View style={styles.transactionDelete}>
                      <Icon
                        name='delete'
                        size={22}
                        color='#242424'
                        onPress={()=> {
                          Alert.alert(
                            'Confirm Delete',
                            'Are you sure you want to delete this task? (This can\'t be undone)',
                            [
                              {text: 'Nope', onPress: () => console.log('canceled'), style: 'cancel'},
                              {text: 'Yes', style: 'destructive', onPress: () => this.props.deleteTransaction(transaction)},
                            ]
                          )
                        }}/>
                    </View>

                  </View>
              )
            }
          } />
      </View>
    );
  }
}
