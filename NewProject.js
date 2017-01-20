import React, { Component } from 'react';
import { Modal, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Actions} from 'react-native-router-flux';
import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';
import axios from 'axios';

import api from './api';
import styles from './styles';


export default class NewProject extends Component {
  constructor (props) {
    super(props);
    this.state = {
      formData:{}
    }
  }
  handleFormChange(formData) {
    /*
    formData will contain all the values of the form,
    in this example.

    formData = {
    first_name:"",
    last_name:"",
    gender: '',
    birthday: Date,
    has_accepted_conditions: bool
    }
    */

    this.setState({formData:formData})
    this.props.onFormChange && this.props.onFormChange(formData);
  }
  handleFormFocus(e, component) {
    console.log(e, component);
  }
  saveProject() {
    axios.post(api() + '/projects', this.state.formData).then(
      ()=> {Actions.singleProjecthold()}
    ).catch(err => {})
  }
  render() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.pageTitle}>New Project</Text>
          <Text style={styles.pageDescription}>This is a new project</Text>
        </View>
         {/* style={styles.formContainer} */}
        <View>
          <ScrollView keyboardShouldPersistTaps={true} style={{paddingLeft:10,paddingRight:10, height:200}}>
            <Form ref='registrationForm' onFocus={this.handleFormFocus.bind(this)} onChange={this.handleFormChange.bind(this)} label="Personal Information">
              <InputField ref='projectName' label='Project Title' placeholder='Project Title' validationFunction={[(value)=>{
                  if(value == '') return "Required";
                  //Initial state is null/undefined
                  if(!value) return true;
                  // Check if Project Title Contains Numbers
                  var matches = value.match(/\d+/g);
                  if (matches != null) {
                      return "Project Title can't contain numbers";
                  }
                  return true;
                }]} />
              <InputField ref='last_name' placeholder='Last Name'/>
              <InputField
                multiline={true}
                ref='description'
                placeholder='Description'
                helpText='this is an helpful text it can be also very very long and it will wrap' />
            </Form>
          </ScrollView>
          <Button reverse iconRight backgroundColor= '#FFC107' icon={{name: 'navigate-next'}} title='SAVE'
            onPress={this.saveProject.bind(this)}/>
          <Text>{JSON.stringify(this.state.formData)}</Text>

 {/* style={styles.saveContainer} */}
        </View>

    </View>
    );
  }
}
