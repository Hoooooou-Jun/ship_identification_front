import { StyleSheet, Dimensions } from 'react-native';

const SIZE_FONT = Dimensions.get('screen').width * 0.027
const SIZE_LAYOUT = Dimensions.get('screen').width * 1
const SEGMENT_MARGIN = Dimensions.get('screen').width * 0.02

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		alignItems: 'center', 
		justifyContent:'center',
	},
	map: {
		flex: 1,
		width: SIZE_LAYOUT,
		height: SIZE_LAYOUT
	},
	shipCardView: {
		alignItems: 'center', 
		justifyContent:'center',
		width: 200,
		height: 250,
		margin: 20,
		backgroundColor: 'white',
		elevation: 5,
	},
	shipImage: {
		width: 120, 
		height: 120,
		margin: 10, 
		borderRadius: 100, 
		backgroundColor: 'lightgrey',
		elevation: 5
	},
	segment: {
		position: 'absolute',
		backgroundColor: '#006eee',
		borderRadius: 10,
		width: '40%',
		margin: SEGMENT_MARGIN
	}, 
	segmentText: {
		fontFamily:'Nanum',
		fontSize: SIZE_FONT,
	}

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