import React, { Component } from 'react';
import { AppRegistry, Dimensions, Image, Text, ScrollView, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {Scene, Router} from 'react-native-router-flux';

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


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class diyApp extends Component {

  render() {
    // Simple component to render something in place of icon
    const HomeTabIcon = ({ selected, title }) => {
      return (
        <View>
          <Icon
            name='home'
            color='#212121'
            size={25}/>
          <Text style={{color: selected ? 'white' :'black', fontWeight: selected ? 'bold' :'normal'}}>{title}</Text>
        </View>
      );
    }
    const NewProjectTabIcon = ({ selected, title }) => {
      return (
        <View>
          <Icon
            name='add'
            color='#212121'
            size={25}/>
          <Text style={{color: selected ? 'white' :'black', fontWeight: selected ? 'bold' :'normal'}}>{title}</Text>
        </View>
      );
    }
    const ProfileTabIcon = ({ selected, title }) => {
      return (
        <View>
          <Icon
            name='person'
            color='#212121'
            size={25}/>
          <Text style={{color: selected ? 'white' :'black', fontWeight: selected ? 'bold' :'normal'}}>{title}</Text>
        </View>
      );
    }
    return (
      <Router>
        <Scene key="root">
          {/* Tab Container */}
          <Scene
            key="tabbar"
            tabs={true}
            tabBarStyle={{ backgroundColor: '#009688' }}
            hideNavBar>
            {/* Tab and it's scenes */}
            <Scene
              key="homeTab"
              title="Home"
              icon={HomeTabIcon}
              hideNavBar>
              <Scene
                key="home"
                component={Home}
                title="Home" />
            </Scene>
            {/* Tab and it's scenes */}
            <Scene
              key="newProjectTab"
              title="New Project"
              icon={NewProjectTabIcon}
              hideNavBar>
              <Scene
                key="newProject"
                component={NewProject}
                title="New Project" />
            </Scene>
            {/* Tab and it's scenes */}
            <Scene
              key="profileTab"
              title="Profile"
              icon={ProfileTabIcon}
              hideNavBar>
              <Scene
                key="profile"
                component={Profile}
                title="Profile" />
            </Scene>
            <Scene
              hideNavBar
              key="singleProjecthold">
              <Scene
                hideNavBar
                key="singleProject"
                component={SingleProject}/>
              <Scene
                hideNavBar
                key="materials"
                component={Materials} />
                <Scene
                  direction="vertical"
                  hideNavBar
                  key="newMaterialModal"
                  component={NewMaterial} />
              <Scene
                hideNavBar
                key="budget"
                component={Budget} />
              <Scene
                hideNavBar
                key="photos"
                component={Photos} />
                <Scene
                  direction="vertical"
                  hideNavBar
                  key="newPhotoModal"
                  component={NewPhoto} />
              <Scene
                hideNavBar
                key="tasks"
                component={Tasks} />
                <Scene
                  direction="vertical"
                  hideNavBar
                  key="newTaskModal"
                  component={NewTask} />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
}


AppRegistry.registerComponent('diyApp', () => diyApp);
