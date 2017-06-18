import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height


export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  photoContainer: {
    flex: 1,
    marginBottom:50,
  },
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
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
    height: 70,
  },
  //assets
  contentContainer: {
    height: height,
    flex: 1,
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
  cameraContainer: {
    marginTop:25,
    height: height,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  photoContent:{
    width: width,
    backgroundColor: '#212121'
  },
  photoText: {
    color: '#fafafa',
    fontSize: 16,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: width,
    paddingBottom: 10,
    marginBottom: 50,
  },
  budgetContainer: {
    width: width,
    height: 60,
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  budgetNumbers: {
    width: width,
    marginBottom: 50,
  },
  budgetRow:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  budgetText:{
    fontSize: 16,
  },
  transactionContainer:{
    width: width,
    flex: 0.5,
    backgroundColor: '#90FFFF',
  },
  transactionList: {
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'transparent',
    borderBottomColor: '#FF2E69',
    borderBottomWidth: 1,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  transactionPrice: {
    flex: 0.15,
  },
  transactionInfo: {
    flex: 0.85,
  },
  transactionItem: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  transactionStore: {
    fontSize: 13,
    textAlign: 'center',
  },
  transactionDelete: {
    alignSelf: 'flex-end',
    // flex: 0.22,
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
    height: 50,
  },
  projectsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
  formInput: {
    borderBottomWidth:1,
    borderBottomColor: '#FF2E69',
    paddingTop:10,
    height:40,
    margin:10,
    fontSize: 16,
  },
  detailedInput: {
    borderBottomWidth:1,
    paddingTop:10,
    height:40,
    margin:10,
  },
  modalContainer: {
    width: width,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    // margin: 20,
    justifyContent: 'center',
  },
  modalHeader: {
    marginTop: 20,
    // width: width,
    flex: .25,
    justifyContent: 'flex-end',
  },
  modalForm: {
    width: width,
    flex: .5,
  },
  modalControllers: {
    // width: width,
    flex: .25,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  modalButtons: {
    width: 150,
    height: 40,
    borderRadius: 5,
  },
  singleModal: {
    width: width,
    flex: .25,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  modalContent: {
    width: width,
    flex: .5,
  },
  modalSingleButton: {
    width: 200,
    height: 40,
    borderRadius: 5,
  },
  singleModalText: {
    fontSize: 16,
  },
});
