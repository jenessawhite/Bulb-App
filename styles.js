import {StyleSheet, Dimensions} from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


export default StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  header: {
    backgroundColor: '#B2DFDB',
    height: 70,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLogo: {
    height: 45,
    width: 90,
  },
  headerTextContainer: {
    height: 30,
    backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#212121',
    fontSize: 20,
  },
  headerIcon: {
    color: '#212121',
  },
  pageTitle: {
    fontSize: 26,
    textAlign: 'center',
    margin: 10,
  },
  footer: {
    bottom: 0,
    backgroundColor: '#B2DFDB',
    height: 70,
    width: width,
  },
  //Tabs
  tabsBar: {
    height: 50,
    backgroundColor: '#B2DFDB',
  },
  titleStyle: {

  },
  tabSelectedstyle: {

  },
  titleSelected: {

  },
  //Home
  homeContainer: {
    height: height,
    width: width,
  },
});
