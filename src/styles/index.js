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
    marginTop: 20
  },

  textMedium:{
    color: '#585858',
    fontSize: 14,
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

  marginBottom20:{
    marginBottom: 20
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
  }

})

export default common
