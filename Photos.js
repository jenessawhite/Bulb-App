import React, { Component } from 'react';
import {Alert, Image, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import {Actions, ActionConst} from 'react-native-router-flux';
import axios from 'axios';

import api from './api';
import styles from './styles';


export default class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photosList: []
    }
  }
  componentDidMount(props) {
    console.log(this.props.id);
    this.getPhotos()
  }
  getPhotos() {
    axios.get(api() + '/projects/' + this.props.id + '/photos')
      .then((response) => {
        let photosList = response.data;
        console.log(response.data);
        console.log(photosList);
        this.setState ({photosList})
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.topBanner}>
          <Text style={styles.title}>BULB</Text>
        </View>

        <View style ={styles.newItemsHolder}>
          <Text style ={styles.newItemsText}>Photos</Text>
          <Button
            raised
            icon={{name: 'md-add', type: 'ionicon', buttonStyle: styles.newButton }}
            title='New Photo'
            color='#fcfcfc'
            backgroundColor='#2ed2ff'
            buttonStyle= {styles.newButton}
            onPress={()=> {Actions.newPhotoModal()}} />
        </View>

        <ScrollView horizontal style={styles.photoContent}>
          {this.state.photosList.map((photo, index) => {
            return (
              <View key={photo.id} style={{margin: 25}}>
                <Image source={{uri: photo.url}} style={{width: 300, height: 300}} />
                <Text style={styles.photoText}>{"\n"}{photo.title}</Text>
              </View>
            )
          })}
        </ScrollView>

        <View style={styles.spTabs}>
          <View style={styles.backTabButton}>
            <Icon
              name='md-arrow-back'
              type='ionicon'
              color='#242424'
              onPress={()=> {Actions.popTo('singleProject')}} />
          </View>
          <View style={styles.homeTabButton}>
            <Icon
              name='home'
              type='octicon'
              color='#242424'
              onPress={()=> {Actions.tabbar({type: ActionConst.RESET})}} />
          </View>
        </View>

      </View>
    );
  }
}
