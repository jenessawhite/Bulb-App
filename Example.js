import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  ListView,
  StyleSheet,
} from 'react-native';
import ImageCarousell from 'react-native-image-carousell';

import styles from './styles';


export default class Example extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: dataSource.cloneWithRows([
        require('./images/bathroom1.jpg'),
        require('./images/bathroom2.jpg'),
        require('./images/bathroom4.jpg'),
        require('./images/bathroom3.jpg'),
      ]),
    };
  }

  componentDidMount(props) {
    console.log('projectId: ' + this.props.id);
    console.log('scene name: ' + this.props.name);
  }

  render() {
    return (
      <View style={styles.photoContainer}>
        <ImageCarousell
          dataSource={this.state.dataSource}
        />
      </View>
    );
  }
}
