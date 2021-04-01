import React, { Component } from 'react';
import { Image, TouchableHighlight, Dimensions } from 'react-native';
import * as base from 'native-base';
import { requestDomain } from '../../utils/domain';

const SIZE_TITLE = Dimensions.get('screen').height * 0.025
const SIZE_FONT = Dimensions.get('screen').height * 0.015

const SIZE_IMG = Dimensions.get('screen').height * 0.15

export default class ShowShip extends Component{
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return(
			<TouchableHighlight onPress={this.props.onPress}
			style={{ borderRadius: 10, marginTop: 5, marginBottom: 5, borderColor: 'grey',
			shadowColor: 'rgba(0, 0, 0, 0.1)', shadowOpacity: 0.8, elevation: 6, shadowRadius: 15 , shadowOffset : { width: 1, height: 13},}}>
				<base.CardItem cardBody>
					<base.Left style={{alignItems: 'center',width: SIZE_IMG, height: SIZE_IMG, flex: 2, padding: 10,}}>
						<Image resizeMode='cover' source={{uri: requestDomain + this.props.ship.main_img, }} style={{width: '100%', height: '100%',}}/>
					</base.Left>
					<base.Body style={{flex: 3,}}>
						<base.Form style={{flex: 1, padding: 10,}}>
							<base.Form style={{flex: 1, justifyContent: 'center'}}>
								<base.Text style={{fontFamily:'Nanum_Title', fontSize: 25, color: '#006eee', fontSize: SIZE_TITLE,}}>{this.props.ship.id}번 유기선박</base.Text>
								<base.Text style={{fontFamily:'Nanum', flex: 1, fontSize: SIZE_FONT,}}>{this.props.ship.regit_date} 등록</base.Text>
							</base.Form>
							<base.Form style={{flex: 1,}}>
								<base.Text style={{fontFamily:'Nanum', flex: 1, fontSize: SIZE_FONT,}}>위도 : {this.props.ship.lat} </base.Text>
								<base.Text style={{fontFamily:'Nanum', flex: 1, fontSize: SIZE_FONT,}}>경도 : {this.props.ship.lon} </base.Text>
							</base.Form>
							{/* <base.Form style={{flex: 1, flexDirection: 'row'}}>
								<base.Button rounded
									style={{ backgroundColor: 'white', backgroundColor: 'black', height: 30,
									shadowColor: 'rgba(0, 0, 0, 0.1)', shadowOpacity: 0.8, elevation: 6, shadowRadius: 15 , shadowOffset : { width: 1, height: 13},
									alignItems: 'center', justifyContent: 'center'}}>
									<base.Text>일부 파손</base.Text>
								</base.Button>

								<base.Button rounded
									style={{ backgroundColor: 'white', backgroundColor: 'red', height: 30,
									shadowColor: 'rgba(0, 0, 0, 0.1)', shadowOpacity: 0.8, elevation: 6, shadowRadius: 15 , shadowOffset : { width: 1, height: 13},
									alignItems: 'center', justifyContent: 'center', marginLeft: 10}}>
									<base.Text>유실상태</base.Text>
								</base.Button>
							</base.Form> */}
						</base.Form>
					</base.Body>
				</base.CardItem>
			</TouchableHighlight>
		)
	}
}
