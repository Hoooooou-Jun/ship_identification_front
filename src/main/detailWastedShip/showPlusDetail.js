import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import * as base from 'native-base';
import { requestDomain } from '../../utils/domain';

export default class ShowPlusDetail extends Component{
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return(
			<TouchableHighlight style={{flex: 1,}} onPress={this.props.onPress}>
				<base.Card style={{width: 150, height: 150}}>
					<base.CardItem>
						<base.Form style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
							<Image resizeMode='cover' source={{uri: requestDomain + this.props.ship.img}} style={{width: 150, height: 150,}}/>
						</base.Form>
					</base.CardItem>
				</base.Card>
			</TouchableHighlight>
		)
	}
}
