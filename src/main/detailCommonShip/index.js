import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Dimensions, FlatList, TouchableHighlight, Image, Alert } from 'react-native';
import * as base from 'native-base';
import { getToken } from '../../utils/getToken';
import { requestCommonShipDetail } from '../../utils/shipInfoRequest';
import ShowPlusDetail from './showPlusDetail';
import { requestDomain } from '../../utils/domain';
import { requestCommonShipGallery } from '../../utils/shipInfoRequest';
import { deleteCommonShip } from '../../utils/shipInfoRequest';
import { AntDesign } from '@expo/vector-icons'; 
import { requestPermission } from '../../utils/userInfoRequest';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Loading from '../../utils/loading';

const SIZE_TITLE = Dimensions.get('screen').height * 0.035
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.0175
const SIZE_FONT = Dimensions.get('screen').height * 0.015
const SIZE_IMG = Dimensions.get('screen').height * 0.35
const SIZE_SUBIMG = Dimensions.get('screen').height * 0.15

export default class DetailCommonShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			img: '',
			name: '', types: '',
			code: '',  tons: '', size: '', region: '', register: '',
			is_ais: false, is_vpass: false, is_vhf: false, is_ff: false,
			is_train: false,
			img_cnt: 0,
			latitude: '',
			longitude: '',
			data: [],
			loadingVisible_shipDetail: true,
			loadingVisible_shipGallery: true,
			loadingVisible: false,
		};
		this.showCommonShipDetail = this.showCommonShipDetail(this);
		this.showCommonShipGallery = this.showCommonShipGallery(this);
		this.updateShipInfo = this.updateShipInfo.bind(this);
		this.deleteShipInfo = this.deleteShipInfo.bind(this);
	}
	updateShipInfo(){
		this.setState({loadingVisible: true})
		getToken().then((token) => {
			requestPermission(token).then((response) => {
				if(response.data.data.user_level > 1){
					this.setState({loadingVisible: false})
					this.props.navigation.navigate('UpdateCommonShip',{id: this.state.id})
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
			this.state.name + ' 선박 정보를 삭제하시겠습니까?',
			[{
				text: "네",
				onPress: () => getToken().then((token) => {
					this.setState({loadingVisible: true})
					requestPermission(token).then((response) => {
						if(response.data.data.user_level > 1){
							const id = this.props.navigation.getParam('id');
							deleteCommonShip(token, id).then((response) => {
								if(response.status == 200){
									this.setState({loadingVisible: false})
									Alert.alert(
										'선박확인체계 알림',
										this.state.name + ' 선박 정보가 삭제되었습니다',
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
	showCommonShipDetail(){
		getToken().then((token) => {
			const id = this.props.navigation.getParam('id');
			requestCommonShipDetail(token, id).then((response) => {
				if(response.status == 200){
					this.setState({
						id: id,
						img: response.data.data.main_img,
						name: response.data.data.name,
						code: response.data.data.code,
						types: response.data.data.types,
						is_ais: response.data.data.is_ais,
						is_vpass: response.data.data.is_vpass,
						is_vhf: response.data.data.is_vhf,
						is_ff: response.data.data.is_ff,
						port: response.data.data.port,
						region: response.data.data.region,
						tons: response.data.data.tons,
						size: response.data.data.size,
						register: response.data.data.register,
						regit_date: response.data.data.regit_date,
						is_train: response.data.data.is_train,
						img_cnt: response.data.data.img_cnt,
						latitude: response.data.data.lat,
						longitude: response.data.data.lon,

						loadingVisible_shipDetail: false,
					})
				}
				else{
					console.log('fail')
				}
			})
        })
	}
	showCommonShipGallery(){
		getToken().then((token) => {
			const id = this.props.navigation.getParam('id');
			requestCommonShipGallery(token, id).then((response) => {
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
		let CommonShipGallery
		if(this.state.data.length){ CommonShipGallery =
			<base.Form>
				<FlatList
					sytle={{flex:1, height: SIZE_SUBIMG}}
					data={this.state.data}
					horizontal={true}
					renderItem={({item}) => <ShowPlusDetail ship={item} onPress={()=>this.props.navigation.navigate('ImgViewer',{address: requestDomain + item.img})}/>}
					ListFooterComponent={
						<TouchableHighlight style={{flex: 1,}} onPress={()=>this.props.navigation.navigate('RegisterCommonShipImages',{id: this.state.id, name: this.state.name})}>
							<base.Card style={{width: SIZE_SUBIMG, height: SIZE_SUBIMG, alignItems: 'center', justifyContent: 'center'}}>
								<base.Icon name='ios-add-circle' style={{color: '#006eee', fontSize: 60}}/>
							</base.Card>
						</TouchableHighlight>	
					}
				/>
			</base.Form>
		}
		let Train_Btn
		if(this.state.is_train){ Train_Btn =
			<base.Button style={{height: SIZE_SUBTITLE, position: 'absolute', left: 10, top: 10, backgroundColor: 'white', height: 40, backgroundColor: 'green', borderRadius: 10,
			shadowColor: 'rgba(0, 0, 0, 0.1)', shadowOpacity: 0.8, elevation: 6, shadowRadius: 15 , shadowOffset : { width: 1, height: 13},}}>
				<base.Text style={{fontSize: SIZE_SUBTITLE}}>AI 학습완료</base.Text>
			</base.Button>
		}
		else {Train_Btn =
			<base.Button style={{height: SIZE_SUBTITLE, position: 'absolute', left: 10, top: 10, backgroundColor: 'white', height: 40, backgroundColor: 'red', borderRadius: 10,
			shadowColor: 'rgba(0, 0, 0, 0.1)', shadowOpacity: 0.8, elevation: 6, shadowRadius: 15 , shadowOffset : { width: 1, height: 13},}}>
				<base.Text style={{fontSize: SIZE_SUBTITLE}}>AI 학습대기</base.Text>
			</base.Button>
		}
		return(
			<base.Container>
				<base.Header style={{backgroundColor: 'white'}}>
					<base.Left>
						<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
							<base.Icon name='arrow-back' style={{color: 'black', fontSize: 25}}/>
						</base.Button>
					</base.Left>
					<base.Right>
					</base.Right>
				</base.Header>
				<base.Content>
					<Loading visible={this.state.loadingVisible_shipDetail || this.state.loadingVisible_shipGallery || this.state.loadingVisible}/>
					<base.Form style={{width: '100%', height: SIZE_IMG,}}>
						<Image resizeMode='cover' source={{uri: requestDomain + this.state.img,}} style={{width: '100%', height: '100%',}}/>
						{Train_Btn}
						<base.Form style={{position: 'absolute', bottom: 10, right: 10, elevation: 6, backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 10, height: 25, width: 120,
							alignItems: 'center', justifyContent: 'center'}}>
							<base.Text style={{color: 'white'}}>등록사진 {this.state.img_cnt} 장</base.Text>
						</base.Form>
					</base.Form>
					{CommonShipGallery}
					<base.Form style={{width: '100%', flexDirection: 'row', borderBottomWidth: 1, borderColor: 'grey'}}>
						<base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
						onPress={()=>this.props.navigation.navigate('DetailCommonShipGallery',{id: this.state.id,})}>
							<AntDesign name="picture" size={25} color="black"/>
						</base.Button>
						<base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
						onPress={()=>this.props.navigation.navigate('UpdateCommonShip',{id: this.state.id})}>
							<AntDesign name="edit" size={25} color="black"/>
						</base.Button>
						<base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
						onPress={()=>this.props.navigation.navigate('RegisterCommonShipImages',{id: this.state.id,})}>
							<AntDesign name="addfile" size={25} color="black"/>
						</base.Button>
						<base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
						onPress={this.deleteShipInfo}>
							<AntDesign name="delete" size={25} color="black"/>
						</base.Button>
					</base.Form>
					<base.Form style={{padding: 20,}}>
						<base.Text style={{fontFamily:'Nanum_Title', fontSize: SIZE_TITLE, color: '#006eee', marginBottom: 10,}}>{this.state.name} </base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, color: 'grey'}}>{this.state.regit_date} {this.state.register} 등록 선박</base.Text>
					</base.Form>
					<base.Form style={{justifyContent: 'center', margin: 10,}}>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>등록번호</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{this.state.code}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>선박종류</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{this.state.types}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>선박길이</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{this.state.size}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>선박무게</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{this.state.tons}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>위치지역</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{this.state.region}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>정착항구</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{this.state.port}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>위도</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{this.state.latitude}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>경도</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{this.state.longitude}</base.Text>
						</base.Form>
						<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start',}}>
							<base.Text style={{margin: 10,}}>식별장치</base.Text>
							<base.ListItem style={{width: '100%'}}>
								<base.CheckBox checked={this.state.is_ais} color="#006eee"/>
								<base.Body><base.Text>AIS</base.Text></base.Body>
							</base.ListItem>
							<base.ListItem style={{width: '100%'}}>
								<base.CheckBox checked={this.state.is_vpass} color="#006eee"/>
								<base.Body><base.Text>V-Pass</base.Text></base.Body>
							</base.ListItem>
							<base.ListItem style={{width: '100%'}}>
								<base.CheckBox checked={this.state.is_vhf} color="#006eee"/>
								<base.Body><base.Text>VHF-DSC</base.Text></base.Body>
							</base.ListItem>
							<base.ListItem style={{width: '100%'}}>
								<base.CheckBox checked={this.state.is_ff} color="#006eee"/>
								<base.Body><base.Text>FF-GPS</base.Text></base.Body>
							</base.ListItem>
						</base.Item>
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
