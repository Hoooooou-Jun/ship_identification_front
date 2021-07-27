import { StyleSheet, Dimensions } from 'react-native';

const SIZE_TITLE = Dimensions.get('screen').height * 0.02

const styles = StyleSheet.create({
	centeredView: {
	    flex: 1,
	    justifyContent: "center",
	    alignItems: "center",
	},
	modalView: {
	    backgroundColor: "white",
	    borderRadius: 10,
	    padding: 20,
	    alignItems: "center",
	    shadowColor: "#000",
	    shadowOffset: {
		    width: 0,
		    height: 2
	  },
	    shadowOpacity: 0.25,
	    shadowRadius: 4,
	    elevation: 5
	},
	button: {
	    borderRadius: 5,
	    padding: 8,
	},
	buttonOpen: {
	    backgroundColor: "#006eee",
	},
	buttonClose: {
	    backgroundColor: "#006eee",
	},
	textStyle: {
	    color: "white",
	    textAlign: "center"   
	},
	modalText: {
        fontSize: SIZE_TITLE,
	    textAlign: "center"
	}
  });

  export default styles;