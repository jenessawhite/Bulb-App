import React, { Component } from 'react';
import {Image, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import {Actions, ActionConst} from 'react-native-router-flux';

import HomeNavigation from '../components/navigation';
import styles from '../styles/styles';


export default class SingleProject extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(props) {
    console.log('projectId: ' + this.props.id);
    console.log('project name: ' + this.props.name);
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        {/* Static banner */}
        <View style={styles.topBanner}>
          <Image
            style={{width: 100, height: 50}}
            source={{uri: 'https://s3.us-east-2.amazonaws.com/diy-app-tiy/bluebulblogo.png'}} />
        </View>


        <Text style={styles.pageTitle}>{this.props.name}</Text>

        <View style={styles.cards}>
            <Card containerStyle={styles.cardContainer}>
              <View style={styles.iconCircle}>
                <Icon
                  name='ios-hammer'
                  type='ionicon'
                  size={50}
                  color='#ff2e69'
                  onPress={()=> {Actions.tasks({id: this.props.id, name: this.props.name})}} />
              </View>
              <Button
                backgroundColor='transparent'
                buttonStyle={styles.cardButton}
                color='#242424'
                title='Tasks'
                onPress={()=> {Actions.tasks({id: this.props.id, name: this.props.name})}} />
            </Card>

            <Card containerStyle={styles.cardContainer}>
              <Icon
                name='ios-list-box'
                type='ionicon'
                size={50}
                color='#ff2e69'
                onPress={()=> {Actions.materials({id: this.props.id})}} />
              <Button
                backgroundColor='transparent'
                buttonStyle={styles.cardButton}
                color='#242424'
                title='Materials'
                onPress={()=> {Actions.materials({id: this.props.id})}} />
            </Card>

          <Card containerStyle={styles.cardContainer}>
            <Icon
              name='ios-cash'
              type='ionicon'
              size={50}
              color='#ff2e69'
              onPress={()=> {Actions.budget({id: this.props.id, estimated: this.props.estimated})}} />
            <Button
              backgroundColor='transparent'
              buttonStyle={styles.cardButton}
              color='#242424'
              title='Budget'
              onPress={()=> {Actions.budget({id: this.props.id})}} />
          </Card>

          <Card containerStyle={styles.cardContainer} onPress={()=> {Actions.photos({id: this.props.id})}} >
            <Icon
              name='photo'
              type='font-awesome'
              size={45}
              color='#ff2e69'
              onPress={()=> {Actions.photos({id: this.props.id})}} />
            <Button
              backgroundColor='transparent'
              buttonStyle={styles.cardButton}
              color='#242424'
              buttonStyle={{borderRadius: 0, marginTop: 10}}
              title='Photos'
              onPress={()=> {Actions.photos({id: this.props.id})}} />
          </Card>
        </View>

        <HomeNavigation />
      </View>
    );
  }
}
