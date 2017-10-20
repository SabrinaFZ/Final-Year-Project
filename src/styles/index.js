import { StyleSheet } from 'react-native'

const common = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#F2F2F2',
  },

  center:{
    justifyContent:'center',
    alignItems: 'center'
  },

  start:{
    justifyContent:'flex-start',
  },

  end:{
    justifyContent: 'flex-end',
  },

  row:{
    flexDirection: 'row',
  },
  column:{
    flexDirection: 'column'
  },
  spaceBetween:{
    justifyContent:'space-between'
  },

  justifyContent: {
    justifyContent:'center',
  },

  alignItems: {
    alignItems: 'center'
  },

  scrollView: {
    backgroundColor:'#F2F2F2',
    marginTop:100,
  },

  textBold:{
    color: '#585858',
    fontSize: 20,
    fontWeight: 'bold',
  },

  textMedium:{
    color: '#585858',
    fontSize: 14,
    fontWeight: 'bold',
  },

  textLarge:{
    color: '#585858',
    fontSize: 24,
    fontWeight: 'bold',
  },

  title:{
    color: '#e9418b',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },

  buttonActive:{
    alignItems: 'center',
    backgroundColor:'#e9418b',
    width: '40%',
    borderRadius: 5,
  },

  buttonDisabled:{
    alignItems: 'center',
    backgroundColor:'#e5a5c1',
    width: '40%',
    borderRadius: 5,
  },

  buttonActiveLarge: {
    alignItems: 'center',
    backgroundColor:'#e9418b',
    width: '100%',
    borderRadius: 5,
  },

  buttonNext: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9418b',
    width: '40%',
    borderRadius: 5,
  },

  textButtonNext: {
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10,
    color: '#e9418b',
    textAlign: 'center'
  },

  textButton:{
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10,
    color: '#F2F2F2',
    textAlign: 'center'
  },

  input: {
    width: '90%',
    textAlign: 'left',
    fontSize: 14,
  },

  searchBar:{
    width: '100%',
    borderWidth: 1,
    borderColor: '#e9418b',
    borderRadius: 5,
    padding: 10,
  },

  errorCredentials:{
    alignItems: 'center',
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center'
  },

  marginTop10:{
    marginTop: 10
  },

  marginTop20:{
    marginTop: 20
  },

  marginTop30:{
    marginTop: 30
  },

  marginTop40:{
    marginTop: 40
  },

  marginTop50:{
    marginTop: 50
  },

  marginTop80: {
    marginTop: 80,
  },

  marginBottom20:{
    marginBottom: 20
  },
  marginBottom40:{
    marginBottom: 40
  },

  padding10:{
    padding: 10,
  },

  padding40:{
    padding: 40,
  },

  paddingLeftRight40:{
    paddingLeft: 40,
    paddingRight: 40
  },

  paddingTop40:{
      paddingTop: 40
  },

  paddingTop80:{
    paddingTop: 80
  },

  textCenter:{
    textAlign: 'center'
  },

  backgroundColor: {
    backgroundColor: '#F2F2F2'
  },

  box:{
    borderWidth: 2,
    borderColor: '#e9418b',
    borderRadius: 5,
    width:'60%',
  },

  spinner:{
    color: '#e9418b',
    marginTop: 10,
  },

})

export default common
