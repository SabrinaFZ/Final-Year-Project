import { StyleSheet } from 'react-native'

const common = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F2F2F2',
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    fontSize: 48,
    color: '#444e55'
  },

  spinner:{
    color: '#e9418b',
    marginTop: 50,
  },

  scrollView: {
    backgroundColor:'#F2F2F2',
    marginTop:100,
  },

  menuContainer: {
    flex:1,
    backgroundColor:'#F2F2F2',
    justifyContent: 'flex-start'
  },


  textMenu1:{
    color: '#F2F2F2',
    fontSize: 40,
    marginLeft: 30,
    fontWeight: '100'
  },

  textMenu2:{
    color: '#F2F2F2',
    fontSize: 40,
    marginLeft: 30,
    fontWeight: '100'
  },

  containerMenu1: {
    backgroundColor:'#045FB4',
    flex:1,
    flexDirection: 'row',
    padding:20,
    alignItems:'center',
    justifyContent:'center',

  },
  containerMenu2: {
    backgroundColor:'#0174DF',
    flex:1,
    flexDirection: 'row',
    padding:20,
    alignItems:'center',
    justifyContent:'center'
  },
  containerMenu3: {
    backgroundColor:'#0080FF',
    flex:1,
    flexDirection: 'row',
    padding:20,
    alignItems:'center',
    justifyContent:'center'
  },
  containerMenu4: {
    backgroundColor:'#01A9DB',
    flex:1,
    flexDirection: 'row',
    padding:20,
    alignItems:'center',
    justifyContent:'center'
  },

  header:{
    backgroundColor: '#01A9DB',
  },

  headerText: {
    fontWeight: '300',
    fontSize: 20,
    color: '#F2F2F2',
    textAlign: 'center'
  },

  containerForm: {
    flex:1,
    backgroundColor:'#F2F2F2',
    justifyContent:'center',
    padding: 40,
    paddingTop: 100
  },

  textBold:{
    color: '#585858',
    fontSize: 20,
    fontWeight: 'bold'
  },

  submit:{
    alignItems: 'center',
    marginTop: 10,
    backgroundColor:'#0174DF',
    width: '100%',
    borderRadius: 5,
  },
  textSubmit:{
    fontWeight: '300',
    fontSize: 20,
    padding: 10,
    color: '#F2F2F2',
    textAlign: 'center'
  },

  input: {
    width: '100%',
    textAlign: 'left',
    marginBottom: 20,
    fontSize: 14,
  },

  errorCredentials:{
    alignItems: 'center',
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center'
  }
})

export default common
