import React, { Component } from 'react';
import {Alert, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Icon, CheckBox } from 'react-native-elements';
import {Actions, ActionConst} from 'react-native-router-flux';
import axios from 'axios';

import api from './api';
import styles from './styles';

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

  componentDidMount(props) {
    console.log('projectId: ' + this.props.id);
    this.getTransactions()
  }

  getTransactions() {
    axios.get(api() + '/projects/' + this.props.id + '/transactions')
      .then((response) => {
        let transactionsList = this.state.ds.cloneWithRows(response.data);
        console.log(transactionsList);
        this.setState ({transactionsList})
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteTransaction(transaction) {
    console.log('working');
    console.log(transaction);
    axios.delete(api() + '/projects/' + transaction.projectId + '/transactions/' + transaction.id)
    .then((response) => {
      console.log('deleted');
      this.getTransactions()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updatePrice(transaction) {
    console.log(transaction.price);
    var transactionChecked = transaction.checked
    console.log(transactionChecked);
    axios.patch(api() + '/projects/' + transaction.projectId + '/transactions/' + transaction.id, transaction)
    .then((response) => {
      console.log(transaction);
      this.getTransactions()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    var br = <Text>{"\n"}</Text>
    const deleteIcon = <Icon
      style={styles.itemRowButton}
      name='delete'
      size={25}
      color='#242424'
      onPress={()=> this.deleteTransaction(transaction)
    }/>

    return (
      <View style={styles.transactionContainer}>
        <ListView
          style={styles.itemsList}
          enableEmptySections={true}
          dataSource={this.state.transactionsList}
          renderRow={
            (transaction) => {
              console.log(transaction);
              return (
                // <TouchableHighlight onPress={()=> {Actions.transactionModal({projectId: this.props.id, id: transaction.id})}}> style={styles.content} style={styles.itemsList}

                  <View style={styles.checkboxContainer} onPress={()=> {Actions.transactionModal({projectId: this.props.id, id: transaction.id})}} >
                    <Text h3>{transaction.item}</Text>
                    <Text>{transaction.store}</Text>

                    <Icon
                      style={styles.itemDelete}
                      name='delete'
                      size={22}
                      color='#242424'
                      onPress={()=> {
                        Alert.alert(
                          'Confirm Delete',
                          'Are you sure you want to delete this task? (This can\'t be undone)',
                          [
                            {text: 'Nope', onPress: () => console.log('canceled'), style: 'cancel'},
                            {text: 'Yes', style: 'destructive', onPress: () => this.deleteTransaction(task)},
                          ]
                        )
                      }} />
                  </View>
                // </TouchableHighlight>

              )
            }
          } />
      </View>
    );
  }
}
