import React from 'react';
import { Image, TouchableHighlight, Dimensions } from 'react-native';
import * as base from 'native-base';
import { requestDomain } from '../../utils/domain';
import { AntDesign } from '@expo/vector-icons'; 

const SIZE_IMG = Dimensions.get('screen').width
const SIZE_STAR = Dimensions.get('screen').width * 0.06

const ShowPlusDetail = (props) => {
	let main_img
	const address = props.ship.img
	const img = requestDomain + address
	if(props.main_img_id == props.ship.id){ main_img =
		<base.Form style={{position: 'absolute', top: 10, right: 10, justifyContent: 'center', alignItems: 'center'}}>
			<AntDesign name="star" size={SIZE_STAR} color="#EFDC05" />
		</base.Form>
	}
	return (
		<TouchableHighlight style={{flex: 1 / 3,}} onPress={props.onPress}>
			<base.Form style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%',}}>
				<Image resizeMode='cover' source={{uri:img}} style={{width: SIZE_IMG / 3, height: SIZE_IMG / 3,}}/>
				<base.Form style={{position: 'absolute', bottom: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.5)', width: 40, height: 40,
				borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
					<base.Text style={{fontSize:15, color: 'white'}}>{props.idx}</base.Text>
				</base.Form>
				{main_img}
			</base.Form>
		</TouchableHighlight>
	)
}

export default ShowPlusDetail