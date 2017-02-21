import React, { Component } from 'react';
import { Alert, AppRegistry, Dimensions, Image, Text, ScrollView, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Tabs from 'react-native-tabs';
import { ActionConst, Scene, Router} from 'react-native-router-flux';

import colors from './colors';
import styles from './styles';

import Home from './Home';
import NewProject from './NewProject';
import Profile from './Profile';
import SingleProject from './SingleProject';
import Budget from './Budget';
import Transactions from './Transactions';
import NewTransaction from './NewTransaction';
import Tasks from './Tasks';
import NewTask from './NewTask';
import TaskModal from './TaskModal';
import Photos from './Photos';
import NewPhoto from './NewPhoto';
import Materials from './Materials';
import NewMaterial from './NewMaterial';
import MaterialModal from './MaterialModal';

import CameraApp from './CameraApp';


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class diyApp extends Component {

  render() {
    // Simple component to render something in place of icon
    const HomeTabIcon = ({ selected, title }) => {
      return (
        <View>
          {/* <Icon
            name='home'
            size={25}
            iconStyle={{color: selected ? '#FFC107' :'#212121', fontWeight: selected ? 'bold' :'normal'}}/>
          <Text style={{color: selected ? 'white' :'black', fontWeight: selected ? 'bold' :'normal'}}>{title}</Text> */}
        </View>
      );
    }
    const NewProjectTabIcon = ({ selected, title }) => {
      return (
        <View>
          {/* <Icon
            name='add'
            size={25}
            iconStyle={{color: selected ? '#FFC107' :'#212121', fontWeight: selected ? 'bold' :'normal'}}/>
          <Text style={{color: selected ? 'white' :'black', fontWeight: selected ? 'bold' :'normal'}}>{title}</Text> */}
        </View>
      );
    }
    const ProfileTabIcon = ({ selected, title }) => {
      return (
        <View>
          {/* <Icon
            name='person'
            size={25}
            iconStyle={{color: selected ? '#FFC107' :'#212121', fontWeight: selected ? 'bold' :'normal'}}/>
          <Text style={{color: selected ? 'white' :'black', fontWeight: selected ? 'bold' :'normal'}}>{title}</Text> */}
        </View>
      );
    }
    return (
      <Router>
        <Scene key="root">
          {/* Tab Container */}
          <Scene key="tabbar" tabs={true} tabBarStyle={{height: 0,  backgroundColor: 'transparent'}} type={ActionConst.REPLACE} >
            {/* Tab and it's scenes */}
            {/* <Scene key="camera" component={CameraApp} /> */}
            <Scene key="homeTab" title="Home" icon={HomeTabIcon} hideNavBar>
              <Scene key="home" component={Home} title="Home"/>
            </Scene>
            {/* Tab and it's scenes */}
            <Scene key="newProjectTab" title="New Project" icon={NewProjectTabIcon} hideNavBar>
              <Scene key="newProject" component={NewProject} title="New Project"/>
            </Scene>
            {/* Tab and it's scenes */}
            <Scene key="profileTab" hideNavBar title="Profile" icon={ProfileTabIcon}>
              <Scene key="profile" component={Profile} title="Profile" />
            </Scene>
          </Scene>
          <Scene hideNavBar key="singleProjectHold">
            <Scene key="singleProject" component={SingleProject} />
            <Scene key="materials" component={Materials} />
            <Scene key="newMaterialModal" component={NewMaterial} />
            <Scene key="materialModal" component={MaterialModal} />
            <Scene key="budget" component={Budget} />
            <Scene key="newTransactionModal" component={NewTransaction} />
            <Scene key="photos" component={Photos} />
            <Scene direction="vertical" key="newPhotoModal" component={NewPhoto} />
            <Scene key="tasks" component={Tasks} />
            <Scene direction="vertical" key="newTaskModal" component={NewTask}/>
            <Scene key="taskModal" component={TaskModal} />
          </Scene>
        </Scene>
      </Router>
    );
  }
}



AppRegistry.registerComponent('diyApp', () => diyApp);
