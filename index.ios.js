import React, { Component } from 'react';
import { AppRegistry, Dimensions, Image, Text, ScrollView, View } from 'react-native';
import styles from './styles';
import { Button, ButtonGroup, SocialIcon, Tabs, Tab, Icon } from 'react-native-elements';
import logo from './images/logo-holder.png';
import Home from './Home';
import NewProject from './NewProject';
import Profile from './Profile';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class diyApp extends Component {
  constructor () {
    super()
    this.state = {
    }
  }

  changeTab (selectedTab) {
    this.setState({selectedTab})
  }

  render() {
    const { selectedTab } = this.state
    return (
      <View style={styles.maincontainer}>
        <View style={styles.header}>
          <Image source={logo} style={styles.headerLogo}/>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Username</Text>
            <Icon
              name='more-vert'
              style={styles.headerIcon} />
          </View>
        </View>
        <ScrollView>
          <Home />
        </ScrollView>
        <View style={styles.footer}>
          <Text>
            This is where the Tabs will go
          </Text>
        </View>
      </View>
    );
  }
}


AppRegistry.registerComponent('diyApp', () => diyApp);
