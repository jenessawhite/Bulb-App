import React, { Component } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Button, FormLabel, FormInput, Icon } from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';

import api from './api';
import styles from './styles';


export default class ChangeBudgetModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      budgetList: [],
      transactionsList: [],
      estimate: null,
    }
  }

  componentDidMount(props) {
    console.log('projectId: ' + this.props.projectId);
    console.log('id: ' + this.props.id);
    console.log('current: ' + this.props.current);
    this.getTransactions()
    this.getBudget()
  }

  getBudget() {
    axios.get(api() + '/api/projects/' + this.props.projectId + '/budget/' + this.props.id)
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
    axios.get(api() + '/projects/' + this.props.projectId + '/transactions')
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
      estimate: this.state.estimate,
    })
  }

  handleFormFocus() {
    console.log('focused');
  }

  updateBudget(budget) {
    console.log(budget);
    var budgetEstimate = budget.estimated
    console.log(budgetEstimate);
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
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.pageTitle}> Update Estimated Budget</Text>
          <Text style={styles.pageDescription}>
            Enter your new budget estimate
          </Text>
        </View>
        {/* FORM */}
        <View style={styles.modalForm}>
          {this.state.budgetList.map((budget, index) => {
            return (
              <View style={styles.budgetContainer} key={budget.id}>
                <View style={styles.budgetRow}>
                  <Text>Your Current Estimated Budget:</Text>
                  <Text>${budget.estimated}</Text>
                </View>
              </View>
            )
          })}

          <TextInput
            style={styles.formInput}
            multiline={true}
            value={this.state.estimate}
            placeholder="Estimated Budget"
            onChangeText={(estimate) => this.setState({estimate})} />
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
            onPress={this.updateBudget.bind(this)}/>
        </View>
      </View>
    );
  }
}
