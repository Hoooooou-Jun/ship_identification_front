import React, { Component } from 'react';
import { Image, TouchableHighlight, Dimensions } from 'react-native';
import * as base from 'native-base';
import { requestDomain } from '../../utils/domain';

const SIZE_SUBIMG = Dimensions.get('screen').height * 0.15

export default class ShipImage extends Component{

	constructor(props) {
		super(props)
		this.state = {
			checked: false,
		}
	}

	render() {
		let showImage;
		if(this.state.checked == 0) {
			showImage = <Image resizeMode='cover' source={{uri: requestDomain + this.props.ship.img}} style={{width: SIZE_SUBIMG, height: SIZE_SUBIMG, borderRadius: 5,}}/>
		} else {
			showImage = <Image resizeMode='cover' source={{uri: requestDomain + this.props.ship.img}} style={{width: SIZE_SUBIMG, height: SIZE_SUBIMG, borderRadius: 5, opacity: 0.4}}/>
		}
		return(
			<TouchableHighlight onPress={()=>this.setState({checked: !this.state.checked}, this.props.onPress)}>
				<base.Card style={{width: SIZE_SUBIMG, height: SIZE_SUBIMG}}>
					<base.CardItem>
						<base.Form style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
							{showImage}
						</base.Form>
					</base.CardItem>
				</base.Card>
			</TouchableHighlight>
		)
	}
}
