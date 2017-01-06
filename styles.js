import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height


export default StyleSheet.create({

  buffer: {
    flex: 1,
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
    marginTop: 20,
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
  pageDescription: {
    padding: 10,
    textAlign: 'center',
  },
  ListHolder: {
    height: 200,
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
    marginTop: 20,
  },
  projectsListHolder: {
    margin: 10,
  },
  newProjectsHolder: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newProjectsText: {
    fontSize: 20,
  },
  projectsList: {
    margin: 10,
  },
  projectsItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  projectsItemRowText: {
    paddingLeft: 2,
    lineHeight: 25,
    fontSize: 16,
  },
  projectsItemRowButton: {
  },
  //NewProject
  formContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#FFC107',
    backgroundColor: '#F6F7FB',
    width: 350,
    height: 350,
    marginBottom: 40,
    alignSelf: 'center',
  },
  formField: {
    height: 40
  },
});
