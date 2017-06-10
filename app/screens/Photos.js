import React, { Component } from 'react';
import {Alert, Image, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import {Actions, ActionConst} from 'react-native-router-flux';
import ImageCarousell from 'react-native-image-carousell';
import axios from 'axios';

// import Example from '../../Example.js';
import PageNavigation from '../components/pageNavigation';
import api from '../components/api';
import styles from '../styles/styles';


export default class Photos extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      bathroomSource: dataSource.cloneWithRows([
        require('../images/bathroom1.jpg'),
        require('../images/bathroom2.jpg'),
        require('../images/bathroom4.jpg'),
        require('../images/bathroom3.jpg'),
      ]),
      kitchenSource: dataSource.cloneWithRows([
        require('../images/kitchen1.jpg'),
        require('../images/kitchen2.jpg'),
        require('../images/kitchen4.jpeg'),
        require('../images/kitchen3.jpg'),
      ]),
    }
  }

  componentDidMount(props) {
    console.log('projectId: ' + this.props.id);
    this.getPhotos()
  }

  getPhotos() {
    axios.get(api() + '/api/projects/' + this.props.id + '/photos')
    .then((response) => {
      let photosList = response.data;      console.log(photosList);
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
          <Image
            style={{width: 100, height: 50}}
            source={{uri: 'https://s3.us-east-2.amazonaws.com/diy-app-tiy/bluebulblogo.png'}} />
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
            onPress={()=> {Actions.takePhoto({projectId: this.props.id})}} />
        </View>
        <View style={styles.photoContainer}>
          <ImageCarousell
            dataSource={this.props.id == 1 ? this.state.kitchenSource : this.state.bathroomSource}
            height= {400}
          />
        </View>

        {/* <Example /> */}

        {/* <ScrollView horizontal style={styles.photoContent}>
          {this.state.photosList.map((photo, index) => {
            return (
              <View key={photo.id} style={{margin: 25}}>
                <Image source={{uri: photo.url}} style={{width: 300, height: 300}} />
                <Text style={styles.photoText}>{"\n"}{photo.title}</Text>
              </View>
            )
          })}
        </ScrollView> */}

        <PageNavigation />

      </View>
    );
  }
}
