import React from 'react';
import { Image, TouchableHighlight, Dimensions } from 'react-native';
import * as base from 'native-base';
import { requestDomain } from '../../utils/domain';

const SIZE_TITLE = Dimensions.get('screen').height * 0.025
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.015
const SIZE_FONT = Dimensions.get('screen').height * 0.015
const SIZE_PERCENT = Dimensions.get('screen').height * 0.02

const SIZE_IMG_HEIGHT = Dimensions.get('screen').height * 0.2
const SIZE_IMG_WIDTH = Dimensions.get('screen').width * 0.75

const ShowShip = (props) => {
	let kinds
	if(props.kinds){ kinds =
		<TouchableHighlight onPress={props.onPress} style={{flex: 1, width: SIZE_IMG_WIDTH, margin: 5, height: '100%'}}>
			<base.Form sytle={{flex: 1, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center',}}>
				<base.Form style={{width: '100%', alignItems: 'center', justifyContent: 'center',}}>
					<Image source={{uri: requestDomain + props.ship.main_img}} style={{width: '100%', height: SIZE_IMG_HEIGHT,}}/>
					<base.Form style={{position: 'absolute', bottom: 10, right: 10, elevation: 6, backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 10, height: 25, width: 120,
						alignItems: 'center', justifyContent: 'center'}}>
						<base.Text style={{color: 'white'}}>등록사진 {props.ship.img_cnt} 장</base.Text>
					</base.Form>
					<base.Form style={{position: 'absolute', top: 10, left: 10, elevation: 6, backgroundColor: 'rgba(255, 255, 255, 1)', borderRadius: 10, height: 25, width: 120,
						alignItems: 'center', justifyContent: 'center'}}>
						<base.Text style={{fontFamily: 'Nanum', fontSize: SIZE_PERCENT, color: 'red',}}>{props.percent}</base.Text>
					</base.Form>
				</base.Form>
				<base.Form style={{width: '100%', padding: 10, marginLeft: 10}}>
					<base.Text style={{fontFamily:'Nanum_Title', fontSize: SIZE_TITLE, color: '#006eee'}}>{props.ship.name} </base.Text>
					<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, color: 'grey'}}>{props.ship.regit_date} {props.ship.register} 등록 선박</base.Text>
				</base.Form>
				<base.Form style={{width: '100%', paddingHorizontal: 10, marginLeft: 10}}>
					<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
						<base.Text style={{flex: 1, color: 'black', fontSize: SIZE_FONT}}>등록번호</base.Text>
						<base.Text style={{flex: 3, fontFamily:'Nanum', fontSize: SIZE_FONT}}>{props.ship.code}</base.Text>
					</base.Form>
					<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
						<base.Text style={{flex: 1, color: 'black', fontSize: SIZE_FONT}}>위치지역</base.Text>
						<base.Text style={{flex: 3, fontFamily:'Nanum', fontSize: SIZE_FONT}}>{props.ship.region}</base.Text>
					</base.Form>
					<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
						<base.Text style={{flex: 1, color: 'black', fontSize: SIZE_FONT}}>정착항구</base.Text>
						<base.Text style={{flex: 3, fontFamily:'Nanum', fontSize: SIZE_FONT}}>{props.ship.port}</base.Text>
					</base.Form>
				</base.Form>
			</base.Form>
		</TouchableHighlight>
	}
	else { kinds =
		<TouchableHighlight onPress={props.onPress} style={{flex: 1, width: SIZE_IMG_WIDTH, margin: 10, elevation: 6, backgroundColor: 'white'}}>
			<base.Form sytle={{flex: 1, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center',}}>
				<base.Form style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center',}}>
					<Image source={{uri: requestDomain + props.ship.main_img}} style={{width: '100%', height: SIZE_IMG_HEIGHT,}}/>
					<base.Form style={{position: 'absolute', bottom: 10, right: 10, elevation: 6, backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 10, height: 25, width: 120,
						alignItems: 'center', justifyContent: 'center'}}>
						<base.Text style={{color: 'white'}}>등록사진 {props.ship.img_cnt} 장</base.Text>
					</base.Form>
					<base.Form style={{position: 'absolute', top: 10, left: 10, elevation: 6, backgroundColor: 'rgba(255, 255, 255, 1)', borderRadius: 10, height: 25, width: 120,
						alignItems: 'center', justifyContent: 'center'}}>
						<base.Text style={{fontFamily: 'Nanum', fontSize: SIZE_PERCENT, color: 'red',}}>{props.percent}</base.Text>
					</base.Form>
				</base.Form>
				<base.Form style={{width: '100%', padding: 10, marginLeft: 10}}>
					<base.Text style={{fontFamily:'Nanum_Title', fontSize: SIZE_TITLE, color: '#006eee'}}>{props.ship.id}번 유기선박</base.Text>
					<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, color: 'grey'}}>{props.ship.regit_date} {props.ship.register} 등록 선박</base.Text>
				</base.Form>
				<base.Form style={{width: '100%', paddingHorizontal: 10, marginLeft: 10}}>
					<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start', marginVertical: 5}}>
						<base.Text style={{flex: 1, color: 'black', fontSize: SIZE_FONT}}>위도</base.Text>
						<base.Text style={{flex: 1, fontFamily:'Nanum', fontSize: SIZE_FONT}}>{props.ship.lat}</base.Text>
					</base.Form>
					<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start', marginVertical: 5}}>
						<base.Text style={{flex: 1, color: 'black', fontSize: SIZE_FONT}}>경도</base.Text>
						<base.Text style={{flex: 1, fontFamily:'Nanum',  fontSize: SIZE_FONT}}>{props.ship.lon}</base.Text>
					</base.Form>
					<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start', marginVertical: 5}}>
						<base.Text style={{flex: 1, color: 'black', fontSize: SIZE_FONT}}>세부정보</base.Text>
						<base.Text style={{flex: 1, fontFamily:'Nanum', fontSize: SIZE_FONT}}>{this.state.info}</base.Text>
					</base.Form>
				</base.Form>
			</base.Form>
		</TouchableHighlight>
	}
	return (
		<base.Form>
			{kinds}
			<base.Form style={{width: SIZE_IMG_WIDTH, padding: 10}}>
				<base.Button onPress={props.onPress_registerIMG}
					style={{justifyContent: 'center', alignItems: 'center', width: '100%', borderRadius: 10, backgroundColor: 'white', elevation: 6}}>
					<base.Text style={{color: 'black'}}>{props.ship.name} 선박사진으로 추가등록하기</base.Text>
				</base.Button>
			</base.Form>
		</base.Form>
	)
}

export default ShowShip;