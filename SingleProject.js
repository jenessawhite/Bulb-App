import React, { Component } from 'react';
import {Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

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
      <View style={styles.homeContainer}>
        <Text style={styles.pageTitle}>{this.props.name}</Text>
        <View
          style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          <Card
            containerStyle={{borderRadius: 5, backgroundColor: '#FFC107', borderColor:'#FFC107', width:150, height:150, alignItems:'center', justifyContent: 'space-between'}}>
            <Icon
              name='checklist'
              type='octicon'
              size={50}
              color='#212121'
              underlayColor='#FFC107'
              onPress={()=> {Actions.materials()}} />
            <Button
              backgroundColor='#00796B'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0}}
              title='Materials'
              onPress={()=> {Actions.materials()}} />
          </Card>
          <Card
            containerStyle={{borderRadius: 5, backgroundColor: '#FFC107', borderColor:'#FFC107', width:150, height:150, alignItems:'center', justifyContent: 'space-between'}}>
            <Icon
              name='tools'
              type='octicon'
              size={40}
              color='#212121'
              underlayColor='#FFC107'
              onPress={()=> {Actions.tasks({id: this.props.id, name: this.props.name})}} />
            <Button
              backgroundColor='#00796B'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0}}
              title='Tasks'
              onPress={()=> {Actions.tasks({id: this.props.id, name: this.props.name})}} />
          </Card>
          <Card
            containerStyle={{borderRadius: 5, backgroundColor: '#FFC107', borderColor:'#FFC107', width:150, height:150, alignItems:'center', justifyContent: 'space-between'}}>
            <Icon
              name='credit-card'
              type='octicon'
              size={50}
              color='#212121'
              underlayColor='#FFC107'
              onPress={()=> {Actions.budget({id: this.props.id, estimated: this.props.estimated})}} />
            <Button
              backgroundColor='transparent'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0}}
              title='Budget'
              color='#212121'
              onPress={()=> {Actions.budget({id: this.props.id, estimated: this.props.estimated})}} />
          </Card>
          <Card
            containerStyle={{borderRadius: 5, backgroundColor: '#FFC107', borderColor:'#FFC107', width:150, height:150, alignItems:'center', justifyContent: 'space-between'}}>
            <Icon
              name='photo'
              type='font-awesome'
              size={40}
              color='#212121'
              underlayColor='#FFC107'
              onPress={()=> {Actions.photos()}} />
            <Button
              backgroundColor='#00796B'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0}}
              title='Photos'
              onPress={()=> {Actions.photos()}} />
          </Card>
        </View>
        <Button
          raised
          backgroundColor= '#FFC107'
          title='BACK'
          onPress={()=> {Actions.pop()}}/>
      </View>
    );
  }
}
