import React, { Component } from 'react';
import {Alert, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Icon, CheckBox, List, ListItem } from 'react-native-elements';
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

  renderRow (rowData, sectionID) {
    return (
      <ListItem
        roundAvatar
        key={sectionID}
        title={rowData.name}
        subtitle={rowData.subtitle}
        avatar={{uri:rowData.avatar_url}}
      />
    )
  }

  render () {
    return (
      <List>
        <ListView
          renderRow={this.renderRow}
          dataSource={this.state.dataSource}
        />
      </List>
    )
  }

  // render() {
  //   return (
  //     <ScrollView style={styles.transactionContainer}>
  //       <List>
  //         {
  //           transactionsList.map((transaction, i) => (
  //             <ListItem
  //               key={i}
  //               title={transaction.item}
  //               leftIcon={{name: 'flight-takeoff'}}
  //             />
  //           ))
  //         }
  //       </List>
  //       {/* <ListView
  //         style={styles.itemsList}
  //         enableEmptySections={true}
  //         dataSource={this.state.transactionsList}
  //         renderRow={
  //           (transaction) => {
  //             console.log(transaction);
  //             return (
  //               // <TouchableHighlight onPress={()=> {Actions.transactionModal({projectId: this.props.id, id: transaction.id})}}> style={styles.content} style={styles.itemsList}
  //
  //                 <View style={styles.checkboxContainer} onPress={()=> {Actions.transactionModal({projectId: this.props.id, id: transaction.id})}} >
  //                   <Text h3>{transaction.item}</Text>
  //                   <Text>{transaction.store}</Text>
  //
  //                   <Icon
  //                     style={styles.itemDelete}
  //                     name='delete'
  //                     size={22}
  //                     color='#242424'
  //                     onPress={()=> this.deleteTransaction(transaction)} />
  //                 </View>
  //               // </TouchableHighlight>
  //
  //             )
  //           }
  //         } /> */}
  //     </ScrollView>
  //   );
  // }
}
