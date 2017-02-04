import React, { Component } from 'react';
import { AppRegistry, Dimensions, Image, Text, ScrollView, View } from 'react-native';
import Tabs from 'react-native-tabs';

import styles from './styles';
import logo from './images/logo-holder.png';

import Home from './Home';
import NewProject from './NewProject';
import Profile from './Profile';
import SingleProject from './SingleProject';
import Budget from './Budget';
import Tasks from './Tasks';
import NewTask from './NewTask';
import Photos from './Photos';
import NewPhoto from './NewPhoto';
import Materials from './Materials';
import NewMaterial from './NewMaterial';

import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icon name="rocket" size={30} color="#900" />

export default class Navigation extends Component {
  constructor(props){
    super(props);
    this.state = {
      page:'Home',
    };
  }
  renderPage() {
      switch (this.state.page) {
      case 'Home':
        return <View><Home /></View>;

      case 'NewProject':
        return <View><NewProject /></View>;

      case 'Profile':
        return <View><Profile /></View>;

      default:
        return <View><Home /></View>;
      }
    };

  onTabSelect(e) {
    console.log(e.props.name);
    this.setState({page:e.props.name})
  }
  render() {
    return (
      <View>
        <View style={{borderBottomColor:'#88B467'}}></View>
        <View style={styles.navContent}>
          <Tabs selected={this.state.page} style={{backgroundColor:'#BAD0AB'}}
                onSelect={this.onTabSelect.bind(this)} selectedStyle={styles.navSelected}>
              <Text style={styles.navIcons} name="Home">Home</Text>
              <Text style={styles.navIcons} name="NewProject">New Project</Text>
              <Text style={styles.navIcons} name="Profile">Profile</Text>
          </Tabs>
        </View>
        {this.renderPage()}
      </View>
   );
  }
}
