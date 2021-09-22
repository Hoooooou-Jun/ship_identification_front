import React from 'react'
import { Image, TouchableHighlight, Dimensions } from 'react-native';
import * as base from 'native-base';
import { requestDomain } from '../../utils/domain';

const SIZE_TITLE = Dimensions.get('screen').height * 0.025
const SIZE_FONT = Dimensions.get('screen').height * 0.015
const SIZE_IMG = Dimensions.get('screen').height * 0.175

const ShowShip = (props) => {
	console.log(props)
	const detailCommonShip = () => {
		let Train_Btn
		if(props.ship.is_train){ Train_Btn =
			<base.Button rounded
				style={{ backgroundColor: 'white', backgroundColor: '#5CAB7D', height: 20,
				shadowColor: 'rgba(0, 0, 0, 0.1)', shadowOpacity: 0.8, elevation: 6, shadowRadius: 15 , shadowOffset : { width: 1, height: 13},
				alignItems: 'center', justifyContent: 'center'}}>
				<base.Text style={{fontSize: SIZE_FONT}}>AI 학습완료</base.Text>
			</base.Button>
		}
		else { Train_Btn =
			<base.Button rounded
				style={{ backgroundColor: 'white', backgroundColor: '#E53A40', height: 20,
				shadowColor: 'rgba(0, 0, 0, 0.1)', shadowOpacity: 0.8, elevation: 6, shadowRadius: 15 , shadowOffset : { width: 1, height: 13},
				alignItems: 'center', justifyContent: 'center'}}>
				<base.Text style={{fontSize: SIZE_FONT}}>AI 학습대기</base.Text>
			</base.Button>
		}
		return(
			<TouchableHighlight onPress={props.onPress} style={{borderRadius: 20, marginHorizontal: 10, marginVertical: 5, borderColor: 'grey', elevation: 6,}}>
				<base.CardItem cardBody>
					<base.Left style={{alignItems: 'center',width: SIZE_IMG, height: SIZE_IMG, flex: 2, padding: 10,}}>
						<base.Form style={{width: '100%', height: '100%'}}>
							<Image resizeMode='cover' source={{uri: requestDomain + props.ship.main_img,}} style={{width: '100%', height: '100%',}}/>
							<base.Form style={{position: 'absolute', bottom: 10, right: 10, elevation: 6, backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 10, height: 20, width: 45,
							alignItems: 'center', justifyContent: 'center'}}>
								<base.Text style={{color: 'white', fontSize: SIZE_FONT}}>{props.ship.img_cnt}장</base.Text>
							</base.Form>
						</base.Form>					
					</base.Left>
					<base.Body style={{flex: 3,}}>
						<base.Form style={{flex: 1, padding: 10,}}>
							<base.Form style={{flex: 1, justifyContent: 'center'}}>
								<base.Text style={{fontFamily:'Nanum_Title', fontSize: SIZE_TITLE, color: '#006eee'}}>{props.ship.name}</base.Text>
								<base.Text style={{fontFamily:'Nanum', flex: 1, fontSize: SIZE_FONT,}}>{props.ship.regit_date} 등록</base.Text>
							</base.Form>
							<base.Form style={{flex: 1,}}>
								<base.Text style={{fontFamily:'Nanum', flex: 1, fontSize: SIZE_FONT,}}>등록번호 : {props.ship.code} </base.Text>
								<base.Text style={{fontFamily:'Nanum', flex: 1, fontSize: SIZE_FONT,}}>선박종류 : {props.ship.types} </base.Text>
							</base.Form>
							<base.Form style={{flex: 1, justifyContent: 'center',}}>
								{Train_Btn}
							</base.Form>
						</base.Form>
					</base.Body>
				</base.CardItem>
			</TouchableHighlight>
		)
	}
	const detailWastedShip = () => {
		return(
			<TouchableHighlight onPress={props.onPress} style={{borderRadius: 20, marginHorizontal: 10, marginVertical: 5, borderColor: 'grey', elevation: 6,}}>
				<base.CardItem cardBody>
					<base.Left style={{alignItems: 'center',width: SIZE_IMG, height: SIZE_IMG, flex: 2, padding: 10,}}>
						<Image resizeMode='cover' source={{uri: requestDomain + props.ship.main_img, }} style={{width: '100%', height: '100%',}}/>
					</base.Left>
					<base.Body style={{flex: 3,}}>
						<base.Form style={{flex: 1, padding: 10,}}>
							<base.Form style={{flex: 1, justifyContent: 'center'}}>
								<base.Text style={{fontFamily:'Nanum_Title', fontSize: 25, color: '#006eee', fontSize: SIZE_TITLE,}}>{props.ship.id}번 유기선박</base.Text>
								<base.Text style={{fontFamily:'Nanum', flex: 1, fontSize: SIZE_FONT,}}>{props.ship.regit_date} 등록</base.Text>
							</base.Form>
							<base.Form style={{flex: 1,}}>
								<base.Text style={{fontFamily:'Nanum', flex: 1, fontSize: SIZE_FONT,}}>위도 : {props.ship.lat} </base.Text>
								<base.Text style={{fontFamily:'Nanum', flex: 1, fontSize: SIZE_FONT,}}>경도 : {props.ship.lon} </base.Text>
							</base.Form>
						</base.Form>
					</base.Body>
				</base.CardItem>
			</TouchableHighlight>
		)
	}

	let detailShip = props.flag == 'Normal' ? detailCommonShip() : detailWastedShip()
	return (
		<base.Form>
			{detailShip}
		</base.Form>
	)
}

export default ShowShip



// import React, { Component } from 'react';
// import { Image, TouchableHighlight, Dimensions } from 'react-native';
// import * as base from 'native-base';
// import { requestDomain } from '../../utils/domain';

// const SIZE_TITLE = Dimensions.get('screen').height * 0.025
// const SIZE_FONT = Dimensions.get('screen').height * 0.015
// const SIZE_IMG = Dimensions.get('screen').height * 0.175

// export default class ShowShip extends Component{
// 	constructor(props) {
// 		super(props);
// 		this.state = {};

// 		this.detailCommonShip = this.detailCommonShip(this);
// 		this.detailWastedShip = this.detailWastedShip(this);
// 	}
// 	detailCommonShip = () => {
// 		let Train_Btn
// 		if(this.props.ship.is_train){ Train_Btn =
// 			<base.Button rounded
// 				style={{ backgroundColor: 'white', backgroundColor: 'green', height: 20,
// 				shadowColor: 'rgba(0, 0, 0, 0.1)', shadowOpacity: 0.8, elevation: 6, shadowRadius: 15 , shadowOffset : { width: 1, height: 13},
// 				alignItems: 'center', justifyContent: 'center'}}>
// 				<base.Text style={{fontSize: SIZE_FONT}}>AI 학습완료</base.Text>
// 			</base.Button>
// 		}
// 		else {Train_Btn =
// 			<base.Button rounded
// 				style={{ backgroundColor: 'white', backgroundColor: 'red', height: 20,
// 				shadowColor: 'rgba(0, 0, 0, 0.1)', shadowOpacity: 0.8, elevation: 6, shadowRadius: 15 , shadowOffset : { width: 1, height: 13},
// 				alignItems: 'center', justifyContent: 'center'}}>
// 				<base.Text style={{fontSize: SIZE_FONT}}>AI 학습대기</base.Text>
// 			</base.Button>
// 		}
// 		return(
// 			<TouchableHighlight onPress={this.props.onPress} style={{borderRadius: 20, marginHorizontal: 10, marginVertical: 5, borderColor: 'grey', elevation: 6,}}>
// 				<base.CardItem cardBody>
// 					<base.Left style={{alignItems: 'center',width: SIZE_IMG, height: SIZE_IMG, flex: 2, padding: 10,}}>
// 						<base.Form style={{width: '100%', height: '100%'}}>
// 							<Image resizeMode='cover' source={{uri: requestDomain + this.props.ship.main_img,}} style={{width: '100%', height: '100%',}}/>
// 							<base.Form style={{position: 'absolute', bottom: 10, right: 10, elevation: 6, backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 10, height: 20, width: 45,
// 							alignItems: 'center', justifyContent: 'center'}}>
// 								<base.Text style={{color: 'white', fontSize: SIZE_FONT}}>{this.props.ship.img_cnt}장</base.Text>
// 							</base.Form>
// 						</base.Form>					
// 					</base.Left>
// 					<base.Body style={{flex: 3,}}>
// 						<base.Form style={{flex: 1, padding: 10,}}>
// 							<base.Form style={{flex: 1, justifyContent: 'center'}}>
// 								<base.Text style={{fontFamily:'Nanum_Title', fontSize: SIZE_TITLE, color: '#006eee'}}>{this.props.ship.name}</base.Text>
// 								<base.Text style={{fontFamily:'Nanum', flex: 1, fontSize: SIZE_FONT,}}>{this.props.ship.regit_date} 등록</base.Text>
// 							</base.Form>
// 							<base.Form style={{flex: 1,}}>
// 								<base.Text style={{fontFamily:'Nanum', flex: 1, fontSize: SIZE_FONT,}}>등록번호 : {this.props.ship.code} </base.Text>
// 								<base.Text style={{fontFamily:'Nanum', flex: 1, fontSize: SIZE_FONT,}}>선박종류 : {this.props.ship.types} </base.Text>
// 							</base.Form>
// 							<base.Form style={{flex: 1, justifyContent: 'center',}}>
// 								{Train_Btn}
// 							</base.Form>
// 						</base.Form>
// 					</base.Body>
// 				</base.CardItem>
// 			</TouchableHighlight>
// 		)
// 	}
// 	detailWastedShip = () => {
// 		return(
// 			<TouchableHighlight onPress={this.props.onPress} style={{borderRadius: 20, marginHorizontal: 10, marginVertical: 5, borderColor: 'grey', elevation: 6,}}>
// 				<base.CardItem cardBody>
// 					<base.Left style={{alignItems: 'center',width: SIZE_IMG, height: SIZE_IMG, flex: 2, padding: 10,}}>
// 						<Image resizeMode='cover' source={{uri: requestDomain + this.props.ship.main_img, }} style={{width: '100%', height: '100%',}}/>
// 					</base.Left>
// 					<base.Body style={{flex: 3,}}>
// 						<base.Form style={{flex: 1, padding: 10,}}>
// 							<base.Form style={{flex: 1, justifyContent: 'center'}}>
// 								<base.Text style={{fontFamily:'Nanum_Title', fontSize: 25, color: '#006eee', fontSize: SIZE_TITLE,}}>{this.props.ship.id}번 유기선박</base.Text>
// 								<base.Text style={{fontFamily:'Nanum', flex: 1, fontSize: SIZE_FONT,}}>{this.props.ship.regit_date} 등록</base.Text>
// 							</base.Form>
// 							<base.Form style={{flex: 1,}}>
// 								<base.Text style={{fontFamily:'Nanum', flex: 1, fontSize: SIZE_FONT,}}>위도 : {this.props.ship.lat} </base.Text>
// 								<base.Text style={{fontFamily:'Nanum', flex: 1, fontSize: SIZE_FONT,}}>경도 : {this.props.ship.lon} </base.Text>
// 							</base.Form>
// 						</base.Form>
// 					</base.Body>
// 				</base.CardItem>
// 			</TouchableHighlight>
// 		)
// 	}
// 	render() {
// 		let detailShip = this.props.flag == 'Normal' ? this.detailCommonShip : this.detailWastedShip
// 		return(
// 			<base.Form>
// 				{detailShip}
// 			</base.Form>
// 		)
// 	}
// }
