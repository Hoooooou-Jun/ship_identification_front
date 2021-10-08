import React from 'react';
import { Image, TouchableHighlight, Dimensions } from 'react-native';
import * as base from 'native-base';
import { requestDomain } from '../../utils/domain';

const SIZE_SUBIMG = Dimensions.get('screen').height * 0.15

const ShowPlusDetail = (props) => {
	return (
		<TouchableHighlight style={{flex: 1,}} onPress={props.onPress}>
			<base.Card style={{width: SIZE_SUBIMG, height: SIZE_SUBIMG}}>
				<base.CardItem>
					<base.Form style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
						<Image resizeMode='cover' source={{uri: requestDomain + props.ship.img}} style={{width: SIZE_SUBIMG, height: SIZE_SUBIMG,}}/>
					</base.Form>
				</base.CardItem>
			</base.Card>
		</TouchableHighlight>
	)
}

export default ShowPlusDetail