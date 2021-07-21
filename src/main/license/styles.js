import { StyleSheet, Dimensions } from 'react-native';

const SIZE_ICON = Dimensions.get('screen').height * 0.1
const SIZE_TITLE = Dimensions.get('screen').width * 0.11
const SIZE_SUBTITLE = Dimensions.get('screen').width * 0.035
const SIZE_BASE = Dimensions.get('screen').width * 0.06
const SIZE_MARGIN = Dimensions.get('screen').width * 0.03
const SIZE_ITEM = Dimensions.get('screen').width * 0.05

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      margin: SIZE_BASE,
    },
    logo: {
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: '#fff',
      marginBottom: SIZE_MARGIN
    },
    logoMain: {
      marginTop: 5,
      fontSize: SIZE_TITLE,
      fontFamily:'Nanum_Title'
    },
    logoSub: {
      fontSize: SIZE_SUBTITLE,
      color: 'grey',
      
    },
    titleContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      borderRadius: 20,
      backgroundColor: "#006eee",
      width: SIZE_ICON,
      height: SIZE_ICON
    },
    listMain: {
      margin: SIZE_MARGIN
    },
    listSub: {
      margin: SIZE_MARGIN,
    },
    item: {
      marginBottom: SIZE_ITEM
    },
    itemUrl: {
      fontSize: 13,
      color: 'skyblue',
      textDecorationLine: 'underline',
      fontFamily:'Nanum'
    },
    itemName: {
        fontSize: 20,
        color: '#3f3f3f',
        fontFamily:'Nanum'
    },
    itemLicense: {
        fontSize: 16,
        color: '#3f3f3f',
        fontFamily:'Nanum'
    }
  });
  
  export default styles;