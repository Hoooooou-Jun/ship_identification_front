import React, { Component } from 'react';
import { Image, TouchableHighlight, Dimensions } from 'react-native';
import * as base from 'native-base';
import { requestDomain } from '../../utils/domain';
import { AntDesign } from '@expo/vector-icons'; 

const SIZE_IMG = Dimensions.get('screen').width

export default class ShowPlusDetail extends Component{
	render() {
		let main_img
		const address = this.props.ship.img
		const img = requestDomain + address
		if(this.props.main_img_id == this.props.ship.id){ main_img =
			<base.Form style={{position: 'absolute', top: 10, right: 10, justifyContent: 'center', alignItems: 'center'}}>
				<AntDesign name="star" size={40} color="yellow" />
			</base.Form>
		}
		return(
			<TouchableHighlight style={{flex: 1 / 3,}} onPress={this.props.onPress}>
				<base.Form style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%',}}>
					<Image resizeMode='cover' source={{uri:img}} style={{width: SIZE_IMG / 3, height: SIZE_IMG / 3,}}/>
					<base.Form style={{position: 'absolute', bottom: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.5)', width: 40, height: 40,
					borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
						<base.Text style={{fontSize:15, color: 'white'}}>{this.props.idx}</base.Text>
					</base.Form>
					{main_img}
				</base.Form>
			</TouchableHighlight>
		)
	}
}
