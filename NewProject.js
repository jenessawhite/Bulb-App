import React, { Component } from 'react';
import { Modal, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Actions} from 'react-native-router-flux';
import { Form, Separator, InputField, LinkField, SwitchField, PickerField, DatePickerField, TimePickerField} from 'react-native-form-generator';
import styles from './styles';


export default class NewProject extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formData:{}
    }
  }
  handleFormChange(formData){
    /*
    formData will contain all the values of the form,
    in this example.
    formData = {
    project_name:"",
    description:"",
    goal_date: Date,
    }
    */
    this.setState({formData:formData})
    this.props.onFormChange && this.props.onFormChange(formData);
  }
  handleFormFocus(e, component){
    console.log(e, component);
  }
  resetForm(){
    this.refs.registrationForm.refs.project_name.setValue("");
    this.refs.registrationForm.refs.description.setValue("");
    this.refs.registrationForm.refs.goal_date.setDate(new Date());
  }
  render() {
    return (
      <View style={styles.buffer}>
        <Text style={styles.pageTitle}>New Project</Text>
        <Text style={styles.pageDescription}>
          This is a new project
        </Text>
        <View
          style={styles.formContainer}
          keyboardShouldPersistTaps={true}>
          <Form
            ref='newProjectForm'
            onFocus={this.handleFormFocus.bind(this)}
            onChange={this.handleFormChange.bind(this)}
            label="Project Information">
            <Separator />
            {/* Project Name Field */}
            <InputField
              ref='project_name'
              style={styles.formField}
              label='Project Name'
              placeholder='Project Name'
              helpText={((self)=>{
                if(Object.keys(self.refs).length !== 0){
                  if(!self.refs.registrationForm.refs.project_name.valid){
                    return self.refs.registrationForm.refs.project_name.validationErrors.join("\n");
                  }
                }
                // if(!!(self.refs && self.refs.project_name.valid)){
                // }
              })(this)}
              validationFunction={[(value)=>{
                /*
                you can have multiple validators in a single function or an array of functions
                 */
                if(value == '') return "Required";
                //Initial state is null/undefined
                if(!value) return true;
                var matches = value.match(/\d+/g);
                if (matches != null) {
                    return "Project Name can't contain numbers";
                }
                return true;
              }, (value)=>{
                if(!value) return true;
                if(value.indexOf('4')!=-1){
                  return "I can't stand number 4";
                }
                return true;
              }]}
            />
            {/* PROJECT DESCRIPTION */}
            <InputField
              multiline={true}
              ref='description'
              style={styles.formField}
              label='Project Description'
              placeholder='Project description' />
            <DatePickerField
              ref='goal_date'
              style={styles.formField}
              minimumDate={new Date('1/1/2017')}
              maximumDate={new Date()}
              placeholder='Goal Completion Date'/>
          </Form>
          </View>
          <Button
            reverse
            iconRight
            backgroundColor= '#FFC107'
            icon={{name: 'navigate-next'}}
            title='SAVE'
            onPress={()=> {Actions.singleProjecthold()}}/>

        <Text>{JSON.stringify(this.state.formData)}</Text>
    </View>
    );
  }
}
