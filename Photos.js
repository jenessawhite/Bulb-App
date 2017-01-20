import React, { Component } from 'react';
import {Alert, Image, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
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
    console.log(this.props);
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
        <View style={styles.topContainer}>
          <Text style={styles.pageTitle}>Photos</Text>
          <Text style={styles.pageDescription}>
            These are your photos
          </Text>
        </View>
        <View style ={styles.newItemsHolder}>
          <Text style ={styles.newItemsText}>UPLOAD PHOTOS</Text>
          <Icon
            name='add'
            color='#212121'
            size={25}
            onPress={()=> {Actions.newPhotoModal({id: this.props.id})}}/>
        </View>
        <ScrollView horizontal style={styles.photoContent}>
          {this.state.photosList.map((photo, index) => {
            return (
              <View key={photo.id} style={{margin: 25}}>
                <Image source={{uri: photo.url}} style={{width: 300, height: 300}} />
                <Text>{photo.title}</Text>
              </View>
            )
          })}
        </ScrollView>
        <View style={styles.backContainer}>
          <Button
            raised
            icon={{name: 'arrow-back'}}
            title='Back'
            backgroundColor= '#FFC107'
            style={styles.backButton}
            onPress={()=> {Actions.pop()}}/>
        </View>
      </View>
    );
  }
}
