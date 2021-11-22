import { StyleSheet, Dimensions } from 'react-native';

const SIZE_FONT = Dimensions.get('screen').width * 0.035
const SIZE_LAYOUT = Dimensions.get('screen').width * 0.2

const styles = StyleSheet.create({
	contentContainer: {
		// flex: 1,
		alignItems: 'center', 
		justifyContent:'center',
	},
	// cardButton: {
	// 	flex: 1,
	// 	flexDirection: 'column', 
	// 	alignItems: 'center', 
	// 	justifyContent: 'center', 
	// 	backgroundColor:'rgba(0,0,0,0)'
	// },
	// cardText: {
	// 	fontFamily:'Nanum', 
	// 	fontSize: SIZE_FONT, 
	// 	color: 'black', 
	// 	marginTop: 10
	// },
	// baseItemText: {
	// 	fontFamily:'Nanum',
	// 	marginTop: 10,
	// 	fontSize: SIZE_FONT
	// },
	// baseIcon: { 
	// 	backgroundColor: '#EDF5FE', 
	// 	width: SIZE_LAYOUT, 
	// 	height: SIZE_LAYOUT, 
	// 	borderRadius: 20, 
	// 	alignItems: 'center', 
	// 	justifyContent: 'center', 
	// 	elevation: 6
	// },
	// baseDirection: { 
	// 	flexDirection: 'column',
	// 	flex: 1
	// }
});

export default styles;