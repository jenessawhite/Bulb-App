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
    backgroundColor: '#FAFAFA',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backTabButton: {
    flex: 1,
  },
  homeTabButton: {
    flex: 1,
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
    fontSize: 24,
    textAlign: 'center',
    marginTop: 10,
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
    flex: 1,
    backgroundColor: '#b2dfdb',
  },
  topBanner: {
    paddingTop: 10,
    height: 60,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems:'center',
    width: width,
  },
  title: {
    color: '#2ed2ff',
    textAlign: 'center',
    fontSize: 24,
  },
  topContainer: {
    marginTop: 20,
  },
  content: {
    flex: 1,
  },
  photoContent:{
    width: width,
    backgroundColor: '#B2DFDB',
  },
  budgetContainer: {
    width: width,
    height: height,
    backgroundColor: '#555',
    // justifyContent: 'space-between'
  },
  transactionContainer:{
    width: width,
    flex: 1,
    backgroundColor: '#90FFFF',
  },
  budgetNumbers: {
    width: width,
    backgroundColor: '#B2DFDB',
    marginBottom: 50,
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
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newItemsText: {
    fontSize: 20,
  },
  itemsList: {
    margin: 10,
  },
  projectsList: {

  },
  projectsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderBottomColor: '#FF2E69',
    borderBottomWidth: 1,
    padding: 10,
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
  newButton: {
    height: 35,
    borderRadius: 2,
  },
  formContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#F6F7FB',
    backgroundColor: '#F6F7FB',
    marginBottom: 40,
    alignSelf: 'center',
  },
  formField: {
    height: 40
  },
  //cards
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  indCards: {
    padding: 0,
    borderRadius: 5,
    borderWidth:0,
    backgroundColor: '#FFFFFF',
    width:150,
    height:150,
  },
  cardContainer: {
    padding: 0,
    borderRadius: 5,
    borderWidth:0,
    backgroundColor: '#FFFFFF',
    width:150,
    height:150,
    alignItems:'center',
    justifyContent: 'center',
    shadowColor: '#A6BFC6',
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowRadius: 2,
  },
  cardButton : {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0
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
    backgroundColor: 'transparent',
    borderBottomColor: '#FF2E69',
    borderBottomWidth: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemDelete: {
  }
});
