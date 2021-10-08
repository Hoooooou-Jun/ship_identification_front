import { StyleSheet, Dimensions } from 'react-native';

const SIZE_WARNING = Dimensions.get('screen').width * 0.04
const SIZE_TITLE = Dimensions.get('screen').width * 0.11
const SIZE_SUBTITLE = Dimensions.get('screen').width * 0.035

const styles = StyleSheet.create({
    title: {
        fontSize: SIZE_TITLE, 
        color: 'black', 
        fontFamily: 'Nanum_Title'
    },
    sub: {
        color: 'grey', 
        fontSize: SIZE_SUBTITLE
    },
    version: {
        fontSize: SIZE_WARNING + 10,
        color: '#006eee'
    },
    devTitle: {
        fontSize: SIZE_WARNING, 
        margin: 10,
    },
    devSub: {
        fontSize: SIZE_WARNING + 5,
        margin: 10,
    },
    register: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        marginTop: 10,
    },
    loginButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#006eee',
        elevation: 6,
        height: SIZE_TITLE + 10,
    },
});

export default styles;