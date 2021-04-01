import React, { Component } from 'react';
import { Image, TouchableHighlight, Dimensions } from 'react-native';
import * as base from 'native-base';
import { requestDomain } from '../../utils/domain';

import { StackedBarChart } from 'react-native-svg-charts';


const SIZE_TITLE = Dimensions.get('screen').height * 0.025
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.015
const SIZE_FONT = Dimensions.get('screen').height * 0.015
const SIZE_PERCENT = Dimensions.get('screen').height * 0.02
const SIZE_IMG = Dimensions.get('screen').height * 0.35
const SIZE_SUBIMG = Dimensions.get('screen').height * 0.15

const colors = ['#006eee', '#81d4fa']
const keys = [ 'value', 'remainder',]

export default class ShowShip extends Component{
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		let kinds
		console.log(this.props.ship)
		if(this.props.kinds){ kinds =
			<TouchableHighlight onPress={this.props.onPress} style={{flex: 1, width: 400, margin: 5, height: '100%'}}>
				<base.Form sytle={{flex: 1, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center',}}>
					<base.Form style={{width: '100%', height: 250, alignItems: 'center', justifyContent: 'center',}}>
						<Image source={{uri: requestDomain + this.props.ship.main_img}} style={{width: '100%', height: 200,}}/>
						<base.Form style={{position: 'absolute', bottom: 10, right: 10, elevation: 6, backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 10, height: 25, width: 120,
							alignItems: 'center', justifyContent: 'center'}}>
							<base.Text style={{color: 'white'}}>등록사진 {this.props.ship.img_cnt} 장</base.Text>
						</base.Form>
						<base.Form style={{position: 'absolute', top: 10, left: 10, elevation: 6, backgroundColor: 'rgba(255, 255, 255, 1)', borderRadius: 10, height: 25, width: 120,
							alignItems: 'center', justifyContent: 'center'}}>
							<base.Text style={{fontFamily: 'Nanum', fontSize: SIZE_PERCENT, color: 'red',}}>{this.props.percent} 유사</base.Text>
						</base.Form>
					</base.Form>
					<base.Form style={{width: '100%', padding: 10, marginLeft: 10}}>
						<base.Text style={{fontFamily:'Nanum_Title', fontSize: SIZE_TITLE, color: '#006eee', marginBottom: 10,}}>{this.props.ship.name} </base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, color: 'grey'}}>{this.props.ship.regit_date}</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, color: 'grey'}}>{this.props.ship.register} 등록 선박</base.Text>
					</base.Form>
					<base.Form style={{width: '100%', padding: 10, marginLeft: 10}}>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', fontSize: SIZE_FONT}}>등록번호</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', fontSize: SIZE_FONT}}>{this.props.ship.code}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', fontSize: SIZE_FONT}}>위치지역</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', fontSize: SIZE_FONT}}>{this.props.ship.region}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', fontSize: SIZE_FONT}}>정착항구</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', fontSize: SIZE_FONT}}>{this.props.ship.port}</base.Text>
						</base.Form>
					</base.Form>
				</base.Form>
			</TouchableHighlight>
		}
		else { kinds =
			<TouchableHighlight onPress={this.props.onPress} style={{flex: 1, width: 400, margin: 10, elevation: 6, backgroundColor: 'white'}}>
				<base.Form sytle={{flex: 1, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center',}}>
					<base.Form style={{width: '100%', height: 200, alignItems: 'center', justifyContent: 'center',}}>
						<Image source={{uri: requestDomain + this.props.ship.main_img}} style={{width: '100%', height: 200,}}/>
						<base.Form style={{position: 'absolute', bottom: 10, right: 10, elevation: 6, backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 10, height: 25, width: 120,
							alignItems: 'center', justifyContent: 'center'}}>
							<base.Text style={{color: 'white'}}>등록사진 {this.props.ship.img_cnt} 장</base.Text>
						</base.Form>
						<base.Form style={{position: 'absolute', top: 10, left: 10, elevation: 6, backgroundColor: 'rgba(255, 255, 255, 1)', borderRadius: 10, height: 25, width: 120,
							alignItems: 'center', justifyContent: 'center'}}>
							<base.Text style={{fontFamily: 'Nanum', fontSize: SIZE_PERCENT, color: 'red',}}>{this.props.percent} 유사</base.Text>
						</base.Form>
					</base.Form>
					<base.Form style={{width: '100%', padding: 10, marginLeft: 10}}>
						<base.Text style={{fontFamily:'Nanum_Title', fontSize: SIZE_TITLE, color: '#006eee', marginBottom: 10,}}>{this.props.ship.id}번 유기선박</base.Text>
							<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, color: 'grey'}}>{this.props.ship.regit_date}</base.Text>
							<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, color: 'grey'}}>{this.props.ship.register} 등록 선박</base.Text>
					</base.Form>
					<base.Form style={{width: '100%', padding: 10, marginLeft: 10}}>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start', marginVertical: 5}}>
							<base.Text style={{flex: 1, color: 'black', fontSize: SIZE_FONT}}>위도</base.Text>
							<base.Text style={{flex: 1, fontFamily:'Nanum', fontSize: SIZE_FONT}}>{this.props.ship.lat}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start', marginVertical: 5}}>
							<base.Text style={{flex: 1, color: 'black', fontSize: SIZE_FONT}}>경도</base.Text>
							<base.Text style={{flex: 1, fontFamily:'Nanum',  fontSize: SIZE_FONT}}>{this.props.ship.lon}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start', marginVertical: 5}}>
							<base.Text style={{flex: 1, color: 'black', fontSize: SIZE_FONT}}>세부정보</base.Text>
							<base.Text style={{flex: 1, fontFamily:'Nanum', fontSize: SIZE_FONT}}>{this.state.info}</base.Text>
						</base.Form>
					</base.Form>
				</base.Form>
			</TouchableHighlight>
		}
		return(
			<base.Form>
				{kinds}
			</base.Form>
			
		)
	}
}
