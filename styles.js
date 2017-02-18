import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height


export default StyleSheet.create({
  spTabs: {
    bottom: 0,
    right: 0,
    position: 'absolute',
    width: width,
    flexDirection: 'row',
    backgroundColor: '#FFC107',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleTab: {
    flex: 1,
  },
  singleTabText: {
    textAlign: 'center',
  },
  buffer: {
    flex: 1,
    marginTop: 20,
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'grey',
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
    marginTop: 15,
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
    width: width,
    backgroundColor: '#B2DFDB',
    height: 70,
  },
  //Tabs
  tabsBar: {
    height: 50,
    backgroundColor: '#B2DFDB',
  },
  //assets
  contentContainer: {
    height: height,
    // backgroundColor: '#B2DFDB',
  },
  topContainer: {
    marginTop: 20,
  },
  content: {
    flex: 1,
  },
  photoContent:{
    width: width,
  },
  backContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: width,
    paddingBottom: 10
  },
  backButton: {
    backgroundColor: '#FFC107',
  },
  //Home
  homeContainer: {
    // flex: 1,
    width: width,
    marginTop: 20,
  },
  itemsListHolder: {
    margin: 10,
  },
  newItemsHolder: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newItemsText: {
    fontSize: 20,
  },
  itemsList: {
    margin: 10,
  },
  itemRowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemRowText: {
    paddingLeft: 2,
    lineHeight: 25,
    fontSize: 16,
  },
  itemRowButton: {
    opacity: 0.5
  },
  //NewProject
  formContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#FFC107',
    backgroundColor: '#F6F7FB',
    marginBottom: 40,
    alignSelf: 'center',
  },
  formField: {
    height: 40
  },
  //Card containerStyle
  cardContainer: {
    borderRadius: 5,
    backgroundColor: '#FFC107',
    borderColor:'#FFC107',
    width:150,
    height:150,
    alignItems:'center',
    justifyContent: 'space-between'
  },
  //Modals
  modalContainer: {
    width: 300,
    height: 400,
    backgroundColor: 'gray',
    alignSelf: 'center',
  },
  //CheckBox
  checkboxContainer: {
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    // backgroundColor: '#fafafa',
    borderColor: '#ededed',
    borderWidth: 1,
    padding: 10,
    borderRadius: 3
  },
  checkbox: {
    backgroundColor: 'blue'
  },
  itemDelete: {
    backgroundColor: 'red'
  }
});
