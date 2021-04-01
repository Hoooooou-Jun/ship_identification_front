import React, { Component } from 'react';
import { Image, TouchableHighlight, Dimensions } from 'react-native';
import * as base from 'native-base';
import { requestDomain } from '../../utils/domain';

const SIZE_SUBIMG = Dimensions.get('screen').height * 0.15

export default class ShowPlusDetail extends Component{
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return(
			<TouchableHighlight style={{flex: 1,}} onPress={this.props.onPress}>
				<base.Card style={{width: SIZE_SUBIMG, height: SIZE_SUBIMG}}>
					<base.CardItem>
						<base.Form style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
							<Image resizeMode='cover' source={{uri: requestDomain + this.props.ship.img}} style={{width: SIZE_SUBIMG, height: SIZE_SUBIMG,}}/>
						</base.Form>
					</base.CardItem>
				</base.Card>
			</TouchableHighlight>
		)
	}
}
