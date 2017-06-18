import React, { Component } from 'react';
import { Alert, AppRegistry, Dimensions, Image, Text, ScrollView, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Tabs from 'react-native-tabs';
import { ActionConst, Scene, Router} from 'react-native-router-flux';

//Screens
import Home from './screens/Home';
import Profile from './screens/Profile';
import Budget from './screens/Budget';
import Tasks from './screens/Tasks';
import Photos from './screens/Photos';
import Materials from './screens/Materials';
import SingleProject from './screens/SingleProject';

//Components
import NewProject from './components/NewProject';
import ChangeBudgetModal from './components/ChangeBudgetModal';
import Transactions from './components/Transactions';
import NewTransaction from './components/NewTransaction';
import NewTask from './components/NewTask';
import TaskModal from './components/TaskModal';
import NewPhoto from './components/NewPhoto';
import NewMaterial from './components/NewMaterial';
import MaterialModal from './components/MaterialModal';
import CameraView from './components/Camera';

import Example from '../Example';


var width = Dimensions.get('window').width; //get width of screen
var height = Dimensions.get('window').height; //get height of screen

export default class bulbApp extends Component {

  render() {
    return (
      <Router>
        <Scene key="root">

          {/* Tab Container */}
          {/* <Scene key="tabbar" tabs={true} tabBarStyle={{height: 0,  backgroundColor: 'transparent'}} type={ActionConst.REPLACE} > */}
          <Scene key="tabbar" type={ActionConst.REPLACE} >
            {/* Tab and it's scenes */}
            {/* <Scene key="camera" component={CameraApp} /> */}
            <Scene key="homeTab" title="Home" hideNavBar>
              <Scene key="home" component={Home} title="Home"/>
            </Scene>
            {/* Tab and it's scenes */}
            <Scene key="newProjectTab" title="New Project" hideNavBar>
              <Scene key="newProject" component={NewProject} title="New Project"/>
            </Scene>
            {/* Tab and it's scenes */}
            <Scene key="profileTab" hideNavBar title="Profile">
              <Scene key="profile" component={Profile} title="Profile" />
            </Scene>
          </Scene>
          <Scene hideNavBar key="singleProjectHold">
            <Scene key="singleProject" component={SingleProject} />
            <Scene key="materials" component={Materials} />
            <Scene key="newMaterialModal" component={NewMaterial} />
            <Scene key="materialModal" component={MaterialModal} />
            <Scene key="budget" component={Budget} />
            <Scene key="updateBudget" component={ChangeBudgetModal} />
            <Scene key="newTransactionModal" component={NewTransaction} />
            <Scene key="photos" component={Photos} />
            <Scene direction="vertical" key="takePhoto" component={CameraView} hideNavBar/>
            <Scene key="tasks" component={Tasks} />
            <Scene direction="vertical" key="newTaskModal" component={NewTask}/>
            <Scene key="taskModal" component={TaskModal} />
          </Scene>
        </Scene>
      </Router>
    );
  }
}
