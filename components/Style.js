import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    apiContainer: {
      flex: 1,
      backgroundColor: '#397299',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      marginTop: 5,
    },
    item: {
      backgroundColor: '#1b2838',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 18,
      color: '#c7d5e0',
      fontWeight: "bold"
    },
  
    enterTitle: {
      fontSize: 20,
      margin: 80
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    homeContainer:{
      flex: 1,
    },

    profileContainer:{
      //flex: 1,
      marginTop: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    libraryContainer: {
      flex: 1,
      alignContent: "flex-start",
      justifyContent: 'flex-start',
      backgroundColor: '#404040'
    },
    libraryItem: {
      marginBottom: 17,
      height: '10%',
    },
    libraryItemImage: {
      height: 100,
      paddingBottom: 20
    },
  
    supportContainer: {
      textAlignVertical: 'top',
      paddingLeft: 15,
    },
    textbox: {
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderWidth: 1,
      borderBottomWidth: 0.8,
      borderColor: '#000000',
      paddingBottom: 8,
      width: 220,
      height: 42,
      marginTop: 50,
      marginBottom: 1
    },
    textbox2: {
      backgroundColor: '#FFFFFF',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderWidth: 1,
      borderBottomWidth: 0.8,
      borderColor: '#000000',
      paddingBottom: 8,
      width: 220,
      height: 42,
      marginBottom: 30,
    },
  
    loginbtn:{
      padding: 10,
      width: '50%',
      height: '50%',
      color: 'green',
  
    },
    logo: {
      marginLeft: 130,
      marginTop: 300,
      width:220,
      height:220,
    },
  
    username: {
      fontWeight: 'bold',
      fontSize: 16,
      paddingTop: 3,
      marginLeft: 58,
    },
  
    info: {
      width: 130,
      height: 130,
      marginLeft: 60,
      marginTop: 10,
    },
  
    signin: {
      marginLeft: 175,
      borderRadius: 10,
      width: 115,
      height: 42
    },
  
    menu: {
      marginTop: 55,
      marginLeft: 65,
      fontSize: 20
    },
  
    menuBtn: {
      flex: 1,
      width: 60,
      height: 60,
    },
    nextbtn:{
      width: 50,
      paddingTop: 50,
    },
  
    navBtnBG: {
      color: '#bfbfbf',
    },
  
    body: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    animatedBox: {
      flex: 1,
      backgroundColor: "#d9d9d9",
      padding: 9
    },
    customBtnText:{
      fontSize: 30,
    },
    customBtnBG:{
      paddingLeft: 10,
    }
  });

  export default styles;