import { StyleSheet, Dimensions } from 'react-native';

const SIZE_TITLE = Dimensions.get('screen').height * 0.02
const SIZE_FONT = Dimensions.get('screen').height * 0.015

const styles = StyleSheet.create({
	formLayout: {
		width:'100%',
		flexDirection: 'row',
		alignItems: 'flex-start'
	},
	formTextMain: {
		flex: 1,
		color: 'black',
		margin: 10,
		fontSize: SIZE_FONT
	},
	formTextSub: {
		flex: 3, 
		fontFamily:'Nanum',
		margin: 10,
		fontSize: SIZE_FONT
	},
	itemBorder: {
		borderColor: '#006eee',
		height: 60,
		marginRight: 20,
	},
	itemTextLayout: {
		fontSize: SIZE_TITLE,
		alignSelf:'flex-start'
	}
});

export default styles;