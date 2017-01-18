import React, { Component } from 'react';
import { AppRegistry, Dimensions, Image, Text, ScrollView, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Tabs from 'react-native-tabs';
import styles from './styles';
import Home from './Home';
import NewProject from './NewProject';
import Profile from './Profile';
import logo from './images/logo-holder.png';


export default class Navigation extends Component {
  constructor () {
    super()
    this.state = {
      page:'Home'
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
          <View style={styles.header}>
            <Image source={logo} style={styles.headerLogo}/>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Username</Text>
              <Icon
                name='more-vert'
                style={styles.headerIcon} />
            </View>
          </View>
          <View style={styles.footer}>
            <Tabs selected={this.state.page}        style={{backgroundColor:'white'}}
                selectedStyle={{color:'red'}} onSelect={this.onTabSelect.bind(this)}>
              <Text name="Home">Home</Text>
              <Text name="NewProject"> New Project</Text>
              <Text name="Profile">Profile</Text>
            </Tabs>
          </View>
          {this.renderPage()}
        </View>
      );
    }
  }
