import React, { Component } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Button, FormLabel, FormInput, Icon } from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';

import api from './api';
import styles from './styles/styles';


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
    console.log('projectId: ' + this.props.projectId);
    this.getTransactions()
  }

  getTransactions() {
    axios.get(api() + '/api/projects/' + this.props.projectId + '/transactions')
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

    axios.post(api() + '/api/projects/' + this.props.projectId + '/transactions/', newTransaction).then((response) => {
      console.log('Transaction (after post): ' + newTransaction);
      console.log(response.data);
      Actions.budget({id: this.props.projectId})
    })
    .catch(function (error) {
      console.log('You have an ' + error);
    });
  }

  render() {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.pageTitle}> New Transaction</Text>
          <Text style={styles.pageDescription}>
            What transaction do we need to add?
          </Text>
        </View>
        {/* FORM */}
        <View style={styles.modalForm}>
          <TextInput
            style={styles.formInput}
            multiline={true}
            value={this.state.item}
            placeholder="Item"
            onChangeText={(item) => this.setState({item})} />
          <TextInput
            style={styles.formInput}
            multiline={true}
            value={this.state.store}
            placeholder="Store"
            onChangeText={(store) => this.setState({store})}
          />
          <TextInput
            style={styles.formInput}
            multiline={true}
            value={this.state.price}
            placeholder="Price"
            onChangeText={(price) => this.setState({price})}
          />
        </View>

        <View style={styles.modalControllers}>
          <Button
            raised
            iconLeft
            backgroundColor= '#2ed2ff'
            icon={{name:'md-arrow-back', type:'ionicon'}}
            buttonStyle= {styles.modalButtons}
            title='Back'
            onPress={()=> {Actions.pop()}}/>

          <Button
            raised
            iconRight
            backgroundColor= '#2ed2ff'
            icon={{name:'md-arrow-forward', type:'ionicon'}}
            buttonStyle= {styles.modalButtons}
            title='Save'
            onPress={this.saveTransaction.bind(this)}/>
        </View>
      </View>
    );
  }
}
