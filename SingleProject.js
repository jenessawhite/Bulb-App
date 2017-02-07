import React, { Component } from 'react';
import {Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import {Actions, ActionConst} from 'react-native-router-flux';

import styles from './styles';


export default class SingleProject extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(props) {
    console.log(this.props);
    console.log(this.props.id);
    console.log(this.props.name);
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.pageTitle}>{this.props.name}</Text>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          <Card containerStyle={styles.cardContainer}>
            <Icon
              name='checklist'
              type='octicon'
              size={50}
              color='#212121'
              underlayColor='#FFC107'
              onPress={()=> {Actions.materials({id: this.props.id})}} />
            <Button
              backgroundColor='#00796B'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0}}
              title='Materials'
              onPress={()=> {Actions.materials({id: this.props.id})}} />
          </Card>
          <Card containerStyle={{borderRadius: 5, backgroundColor: '#FFC107', borderColor:'#FFC107', width:150, height:150, alignItems:'center', justifyContent: 'space-between'}}>
            <Icon
              name='tools'
              type='octicon'
              size={50}
              color='#212121'
              underlayColor='#FFC107'
              onPress={()=> {Actions.tasks({id: this.props.id, name: this.props.name})}} />
            <Button
              backgroundColor='#00796B'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0}}
              title='Tasks'
              onPress={()=> {Actions.tasks({id: this.props.id, name: this.props.name})}} />
          </Card>
          <Card containerStyle={{borderRadius: 5, backgroundColor: '#FFC107', borderColor:'#FFC107', width:150, height:150, alignItems:'center', justifyContent: 'space-between'}}>
            <Icon
              name='credit-card'
              type='octicon'
              size={50}
              color='#212121'
              underlayColor='#FFC107'
              onPress={()=> {Actions.budget({id: this.props.id, estimated: this.props.estimated})}} />
            <Button
              backgroundColor= 'transparent'
              fontWeight= 'bold'
              fontSize= {26}
              color='#00796B'
              buttonStyle={{borderRadius: 5}}
              title='Budget'
              onPress={()=> {Actions.budget({id: this.props.id, estimated: this.props.estimated})}} />
          </Card>
          <Card containerStyle={{borderRadius: 5, backgroundColor: '#FFC107', borderColor:'#FFC107', width:150, height:150, alignItems:'center', justifyContent: 'space-between'}}>
            <Icon
              name='photo'
              type='font-awesome'
              size={45}
              color='#212121'
              underlayColor='#FFC107'
              onPress={()=> {Actions.photos({id: this.props.id})}} />
            <Button
              backgroundColor='#00796B'
              buttonStyle={{borderRadius: 0, marginTop: 10}}
              title='Photos'
              onPress={()=> {Actions.photos({id: this.props.id})}} />
          </Card>
        </View>
        <View style={styles.spTabs}>
          {/* <Icon
            name='home'
            size={25}
            iconStyle={{color: '#FFC107'}}/> */}
          <Button
            backgroundColor='#00796B'
            buttonStyle={{borderRadius: 0}}
            title='Home'
            onPress={()=> {Actions.tabbar()}} />
        </View>
      </View>
    );
  }
}
