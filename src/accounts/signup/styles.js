import { StyleSheet, Dimensions } from 'react-native';

const SIZE_FONT = Dimensions.get('screen').height * 0.02

const styles = StyleSheet.create({
	itemBorder: {
		borderColor: '#006eee',
		height: 60,
		marginRight: 20,
	},
	itemTextLayout: {
		fontSize: SIZE_FONT,
		alignSelf:'flex-start'
	}
});

export default styles;