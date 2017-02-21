import React, { Component } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Button, FormLabel, FormInput, Icon } from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';

import api from './api';
import styles from './styles';


export default class NewTransaction extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactionsList: [],
      store: '',
      item: '',
      price: null,
    }
  }

  componentDidMount(props) {
    console.log('projectId: ' + this.props.id);
    this.getTransactions()
  }

  getTransactions() {
    axios.get(api() + '/projects/' + this.props.id + '/transactions')
      .then((response) => {
        let transactionsList = response.data;
        console.log(transactionsList);
        this.setState ({transactionsList})
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleFormChange() {
    this.setState({
      store: this.state.store,
      item: this.state.item,
      price: this.state.price,
    })
  }

  handleFormFocus() {
    console.log('focused');
  }

  saveTransaction(props) {
    let newTransaction = {
      store: this.state.store,
      item: this.state.item,
      price: this.state.price,
      projectId: this.props.id
    };
    console.log('New transaction: ' + newTransaction);

    axios.post(api() + '/projects/' + this.props.id + '/transactions/', newTransaction).then((response) => {
      console.log('Transaction (after post): ' + newTransaction);
      console.log(response.data);
      Actions.budget({id: this.props.id})
    })
    .catch(function (error) {
      console.log('You have an ' + error);
    });
  }

  render() {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.pageTitle}> New Transaction</Text>
        <Text style={styles.pageDescription}>
          Add a new transaction to your budget
        </Text>
        {/* FORM */}
        <ScrollView style={{paddingLeft:10, paddingTop:10, height:400}}>
          <TextInput
            style={{borderBottomWidth:2, borderColor: 'black', paddingTop:10, height:40 }}
            keyboardType='default'
            value={this.state.item}
            placeholder="Item"
            returnKeyType="done"
            onChangeText={(item) => this.setState({item})}
          />
          <TextInput
            style={{borderBottomWidth:2, borderColor: 'black', paddingTop:10, height:40}}
            keyboardType='default'
            value={this.state.store}
            placeholder="Store"
            returnKeyType="done"
            onChangeText={(store) => this.setState({store})}
          />
          <TextInput
            style={{borderBottomWidth:2, borderColor: 'black', paddingTop:10, height:40 }}
            keyboardType='numeric'
            value={this.state.price}
            placeholder="Price"
            returnKeyType="done"
            onChangeText={(price) => this.setState({price})}
          />
        </ScrollView>

        <View>
          <Button
            reverse
            iconRight
            backgroundColor= '#FFC107'
            icon={{name: 'navigate-next'}}
            title='SAVE'
            onPress={this.saveTransaction.bind(this)}/>

          <Button
            iconRight
            backgroundColor= '#FFC107'
            icon={{name: 'navigate-next'}}
            title='Back'
            onPress={()=> {Actions.pop()}}/>
        </View>
      </View>
    );
  }
}
