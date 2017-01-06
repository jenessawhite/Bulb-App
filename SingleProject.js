import React, { Component } from 'react';
import {Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

import styles from './styles';


export default class SingleProject extends Component {
  constructor () {
    super()
  }
  render() {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.pageTitle}>Name of Project</Text>
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
              onPress={()=> {Actions.tasks()}}/>
            <Button
              backgroundColor='#00796B'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0}}
              title='Tasks'
              onPress={()=> {Actions.tasks()}} />
          </Card>
          <Card
            containerStyle={{borderRadius: 5, backgroundColor: '#FFC107', borderColor:'#FFC107', width:150, height:150, alignItems:'center', justifyContent: 'space-between'}}>
            <Icon
              name='credit-card'
              type='octicon'
              size={50}
              color='#212121'
              underlayColor='#FFC107'
              onPress={()=> {Actions.budget()}} />
            <Button
              backgroundColor='transparent'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0}}
              title='Budget'
              color='#212121'
              onPress={()=> {Actions.budget()}} />
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
      </View>
    );
  }
}
