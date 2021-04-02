import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Dimensions, Image, FlatList,TouchableHighlight, Alert } from 'react-native';
import * as base from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getToken } from '../../utils/getToken';
import { requestWastedShipDetail } from '../../utils/shipInfoRequest';
import ShowPlusDetail from './showPlusDetail';
import { requestDomain } from '../../utils/domain';
import { requestWastedShipGallery } from '../../utils/shipInfoRequest';
import { deleteWastedShip } from '../../utils/shipInfoRequest';
import { AntDesign } from '@expo/vector-icons'; 
import { requestPermission } from '../../utils/userInfoRequest';

import Loading from '../../utils/loading';

const SIZE_TITLE = Dimensions.get('screen').height * 0.035
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.015
const SIZE_FONT = Dimensions.get('screen').height * 0.015
const SIZE_IMG = Dimensions.get('screen').height * 0.35
const SIZE_SUBIMG = Dimensions.get('screen').height * 0.15

export default class DetailWastedShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			latitude: '',
			longitude: '',
			types: '',
			img: '',
			info: '',
			register: '',
			regit_date: '',
			region: '',

			data: [],
			loadingVisible_shipDetail: true,
			loadingVisible_shipGallery: true,
			loadingVisible: false,
		};
		this.showWastedShipDetail = this.showWastedShipDetail(this);
		this.showWastedShipGallery = this.showWastedShipGallery(this);
		this.deleteShipInfo = this.deleteShipInfo.bind(this);
		this.updateShipInfo = this.updateShipInfo.bind(this);
	}
	updateShipInfo(){
		this.setState({loadingVisible: true})
		getToken().then((token) => {
			requestPermission(token).then((response) => {
				if(response.data.data.user_level > 1){
					this.setState({loadingVisible: false})
					this.props.navigation.navigate('UpdateWastedShip',{id: this.state.id})
				}
				else{
					this.setState({loadingVisible: false})
					Alert.alert(
						'선박확인체계 알림',
						'선박 정보 수정 권한이 없습니다',
					)
				}
			})
		})
	}
	deleteShipInfo(){
		Alert.alert(
			'선박확인체계 알림',
			this.state.id + '번 유기선박 정보를 삭제하시겠습니까?',
			[{
				text: "네",
				onPress: () => getToken().then((token) => {
					this.setState({loadingVisible: true})
					requestPermission(token).then((response) => {
						if(response.data.data.user_level > 1){
							const id = this.props.navigation.getParam('id');
							deleteWastedShip(token, id).then((response) => {
								if(response.status == 200){
									this.setState({loadingVisible: false})
									Alert.alert(
										'선박확인체계 알림',
										this.state.id + ' 유기선박 정보가 삭제되었습니다',
									)
									this.props.navigation.popToTop();
								}
							})
						}
						else{
							this.setState({loadingVisible: false})
							Alert.alert(
								'선박확인체계 알림',
								'선박 정보 삭제 권한이 없습니다',
							)
						}
					})
				})
				},{
				text: "아니오",
				onPress: () => console.log("Cancel Pressed"),
			}]
		);
	}
	showWastedShipDetail(){
		getToken().then((token) => {
			const id = this.props.navigation.getParam('id');
			requestWastedShipDetail(token, id).then((ship) =>{
				this.setState({
					id: ship.data.data.id,
					latitude: ship.data.data.lat,
					longitude: ship.data.data.lon,
					img: ship.data.data.main_img,
					info: ship.data.data.info,
					types: ship.data.data.types,
					region: ship.data.data.region,
					register: ship.data.data.register,
					regit_date: ship.data.data.regit_date,
					img_cnt: ship.data.data.img_cnt,

					loadingVisible_shipDetail: false,
				})
			})
        })
	}
	showWastedShipGallery(){
		getToken().then((token) => {
			const id = this.props.navigation.getParam('id');
			requestWastedShipGallery(token, id).then((response) => {
				if(response.status == 200){
					this.setState({
						data: this.state.data.concat(response.data.data),
						loadingVisible_shipGallery: false,
					})
				}
			})
        })
	}
	render(){
		let WastedShipGallery
		if(this.state.data.length){ WastedShipGallery =
			<base.Form>
				<FlatList
					sytle={{flex:1, height: 150}}
					data={this.state.data}
					horizontal={true}
					renderItem={({item}) => <ShowPlusDetail ship={item} onPress={()=>this.props.navigation.navigate('ImgViewer',{address: requestDomain + item.img})}/>}
					ListFooterComponent={
						<TouchableHighlight style={{flex: 1,}} onPress={()=>this.props.navigation.navigate('RegisterWastedShipImages',{id: this.state.id})}>
							<base.Card style={{width: 150, height: 150, alignItems: 'center', justifyContent: 'center'}}>
								<base.Icon name='ios-add-circle' style={{color: '#006eee', fontSize: 60}}/>
							</base.Card>
						</TouchableHighlight>	
					}
				/>
			</base.Form>
		}
		return(
			<base.Container>
				<base.Header style={{backgroundColor: 'white'}}>
					<base.Left>
						<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
							<base.Icon name='arrow-back' size={25} style={{color: 'black'}}/>
						</base.Button>
					</base.Left>
					<base.Right>
					</base.Right>
				</base.Header>
				<base.Content>
					<Loading visible={this.state.loadingVisible_shipDetail || this.state.loadingVisible_shipGallery || this.state.loadingVisible}/>
					<base.Form style={{width: '100%' ,height: SIZE_IMG,}}>
						<Image resizeMode='cover' source={{uri: requestDomain + this.state.img,}} style={{width: '100%', height: '100%',}}/>
						<base.Form style={{position: 'absolute', bottom: 10, right: 10, elevation: 6, backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 10, height: 25, width: 120,
							alignItems: 'center', justifyContent: 'center'}}>
							<base.Text style={{color: 'white'}}>등록사진 {this.state.img_cnt} 장</base.Text>
						</base.Form>
					</base.Form>
						{WastedShipGallery}
					<base.Form style={{width: '100%', flexDirection: 'row', borderBottomWidth: 1, borderColor: 'grey'}}>
						<base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
						onPress={()=>this.props.navigation.navigate('DetailWastedShipGallery',{id: this.state.id,})}>
							<AntDesign name="picture" size={25} color="black"/>
						</base.Button>
						<base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
						onPress={this.updateShipInfo}>
							<AntDesign name="edit" size={25} color="black"/>
						</base.Button>
						<base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
						onPress={()=>this.props.navigation.navigate('RegisterWastedShipImages',{id: this.state.id,})}>
							<AntDesign name="addfile" size={25} color="black"/>
						</base.Button>
						<base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
						onPress={this.deleteShipInfo}>
							<AntDesign name="delete" size={25} color="black"/>
						</base.Button>
					</base.Form>
					<base.Form style={{padding: 20,}}>
						<base.Text style={{fontFamily:'Nanum_Title', fontSize: SIZE_TITLE, color: '#006eee', marginBottom: 10,}}>{this.state.id}번 유기선박</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, color: 'grey',}}>{this.state.regit_date} {this.state.register} 등록 선박</base.Text>
					</base.Form>
					<base.Form style={{flex: 1, padding: 10,}}>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>관리번호</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{this.state.id}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>선박종류</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{this.state.types}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>세부정보</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{this.state.info}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>위치지역</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{this.state.region}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>위도</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{this.state.latitude}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>경도</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{this.state.longitude}</base.Text>
						</base.Form>
					</base.Form>
					<base.Form style={{flex: 1, height: 300,}}>
						<MapView
							provider={PROVIDER_GOOGLE}
							style={{flex: 1, marginTop: 10, width: '100%', height: '100%'}}
							initialRegion={{
								latitude: parseFloat(this.state.latitude),
								longitude: parseFloat(this.state.longitude),
								latitudeDelta: 0.05,
								longitudeDelta: 0.05,
							}}>
							<Marker
							coordinate={{
								latitude: parseFloat(this.state.latitude),
								longitude: parseFloat(this.state.longitude),
							}}/>
						</MapView>
					</base.Form>
				</base.Content>				
			</base.Container>
		);
	}
}