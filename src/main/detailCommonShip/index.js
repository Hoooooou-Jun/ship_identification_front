import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Dimensions, FlatList, TouchableHighlight, Image, Alert } from 'react-native';
import * as base from 'native-base';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getToken } from '../../utils/getToken';
import ShowPlusDetail from './showPlusDetail';
import { requestDomain } from '../../utils/domain';
import { AntDesign, Feather } from '@expo/vector-icons'; 
import { requestPermission } from '../../utils/userInfoRequest';

import Loading from '../../utils/loading';
import { connect } from 'react-redux';
import { loadDetailShip } from '../../redux/detailCommonShip/action';
import { loadShipOwner } from '../../redux/shipOwner/action'
import { loadGalleryCommonShip } from '../../redux/galleryCommonShip/action';

const SIZE_TITLE = Dimensions.get('screen').height * 0.035
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.0175
const SIZE_FONT = Dimensions.get('screen').height * 0.015
const SIZE_IMG = Dimensions.get('screen').height * 0.35
const SIZE_OWNER_IMG = Dimensions.get('screen').width * 0.75
const SIZE_SUBIMG = Dimensions.get('screen').height * 0.15

const DetailCommonShip = (props) => {
	useEffect(() => {
		showCommonShipDetail()
	}, [])

	const showCommonShipDetail = () => {
		const id = props.navigation.getParam('id');
		props.loadDetailShip(props.token, id)
		props.loadShipOwner(props.token, id)
		props.loadGalleryCommonShip(props.token, id)
	}

	const updateShipInfo = () => {
		Alert.alert(
			'선박확인체계 알림',
			props.detailCommonShip.name + '의 선박 정보를 수정하시겠습니까?',
			[{
				text: "네",
				onPress: () => getToken().then((token) => {
					this.setState({loadingVisible: true})
					requestPermission(token).then((response) => {
						if(response.data.data.user_level > 1){
							this.setState({loadingVisible: false})
							this.props.navigation.navigate('UpdateCommonShip',{id: props.detailCommonShip.id})
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
				},{
				text: "아니오",
				onPress: () => console.log("Cancel Pressed"),
			}]
		);
	}
	const updateShipMImage = () => {
		Alert.alert(
			'선박확인체계 알림',
			props.detailCommonShip.name + '의 대표사진을 수정하시겠습니까?',
			[{
				text: "네",
				onPress: () => getToken().then((token) => {
					this.setState({loadingVisible: true})
					requestPermission(token).then((response) => {
						if(response.data.data.user_level > 1){
							if(props.detailCommonShip.data.length < 2){
								this.setState({loadingVisible: false})
								Alert.alert(
									'선박확인체계 알림',
									'대표사진을 수정할 사진이 없습니다',
								)
							}
							else{
								this.setState({loadingVisible: false})
								this.props.navigation.navigate('UpdateCommonShipMImage',{id: props.detailCommonShip.id, main_img_id: props.detailCommonShip.main_img_id,})
							}
						}
						else{
							this.setState({loadingVisible: false})
							Alert.alert(
								'선박확인체계 알림',
								'대표사진 수정 권한이 없습니다',
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
	const deleteShipInfo = () => {
		Alert.alert(
			'선박확인체계 알림',
			props.detailCommonShip.name + '의 선박 정보를 삭제하시겠습니까?',
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
										props.detailCommonShip.name + '의 선박 정보가 삭제되었습니다',
									)
									this.props.navigation.pop();
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

	let shipOwnerDetail
	if(props.shipOwner.privacyAgreement){ shipOwnerDetail =
		<base.Form style={{width: '100%'}}>
			<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start',}}>
				<base.Text style={{margin: 10, fontWeight: 'bold'}}>선주정보</base.Text>
				<Image source={{uri: requestDomain + props.shipOwner.own_img,}} style={{width: SIZE_OWNER_IMG, height: SIZE_OWNER_IMG, alignSelf: 'center'}}/>
				<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start'}}>
					<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>선주명</base.Text>
					<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.shipOwner.own_name}</base.Text>
				</base.Form>
				<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start'}}>
					<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>연락처</base.Text>
					<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.shipOwner.phone}</base.Text>
				</base.Form>
				<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start'}}>
					<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>거주지</base.Text>
					<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.shipOwner.address}</base.Text>
				</base.Form>
				<base.Button block onPress={() => props.navigation.navigate('ImgViewer', {address: requestDomain + props.shipOwner.agreement_paper})}
				style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
					<base.Text style={{color: 'black'}}>개인정보동의서 보기</base.Text>
				</base.Button>
			</base.Item>
		</base.Form>
	}
	else{ shipOwnerDetail =
		<base.Form style={{width:'100%'}}>
			<base.Form style={{width: '100%', alignItems: 'flex-end'}}>
				<base.Text style={{margin: 10, fontWeight: 'bold', color: 'red',}}>선주 개인정보 동의가 필요합니다</base.Text>
			</base.Form>
			
			<base.Button block onPress={() => props.navigation.navigate('RegisterShipOwner', {id: props.detailCommonShip.id, name: props.detailCommonShip.name})}
				style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
				<base.Text style={{color: 'black'}}>선주정보 등록하기</base.Text>
			</base.Button>
		</base.Form>
	}
	let CommonShipGallery
	if(props.galleryCommonShip.gallery.length){ CommonShipGallery =
		<base.Form>
			<FlatList
				style={{flex:1, height: SIZE_SUBIMG}}
				data={props.galleryCommonShip.gallery}
				horizontal={true}
				renderItem={({item, index}) => <ShowPlusDetail ship={item}
					onPress={() => props.navigation.navigate('ShipImgViewer', {address: requestDomain + item.img, flag: 'Normal', id: props.detailCommonShip.id, img_id: item.id, index: index + 1, main_img_id: props.detailCommonShip.main_img_id})}/>}
				ListFooterComponent={
					<TouchableHighlight style={{flex: 1,}} onPress={() => props.navigation.navigate('RegisterCommonShipImages',{id: props.detailCommonShip.id, name: props.detailCommonShip.name})}>
						<base.Card style={{width: SIZE_SUBIMG, height: SIZE_SUBIMG, alignItems: 'center', justifyContent: 'center'}}>
							<base.Icon name='ios-add-circle' style={{color: '#006eee', fontSize: 60}}/>
						</base.Card>
					</TouchableHighlight>	
				}
			/>
		</base.Form>
	}
	let Train_Btn
	if(props.detailCommonShip.is_train){ Train_Btn =
		<base.Button style={{height: SIZE_SUBTITLE, position: 'absolute', left: 10, top: 10, backgroundColor: 'white', height: 40, backgroundColor: 'green', borderRadius: 10, elevation: 6}}>
			<base.Text style={{fontSize: SIZE_SUBTITLE}}>AI 학습완료</base.Text>
		</base.Button>
	}
	else {Train_Btn =
		<base.Button style={{height: SIZE_SUBTITLE, position: 'absolute', left: 10, top: 10, backgroundColor: 'white', height: 40, backgroundColor: 'red', borderRadius: 10,elevation: 6}}>
			<base.Text style={{fontSize: SIZE_SUBTITLE}}>AI 학습대기</base.Text>
		</base.Button>
	}
	let request_train_label = <base.Text style={{fontSize: SIZE_SUBTITLE}}>AI 학습요청</base.Text>
	if (props.detailCommonShip.is_train_img) {
		request_train_label = <base.Text style={{fontSize: SIZE_SUBTITLE}}>AI 요청완료</base.Text>
	}
	let Train_request = 
		<base.Button style={{height: SIZE_SUBTITLE, position: 'absolute', left: 10, top: 60, backgroundColor: 'white', height: 40, backgroundColor: 'blue', borderRadius: 10, elevation: 6}} onPress={() => props.navigation.navigate("TrainGallery", {id: props.detailCommonShip.id})}>
			{request_train_label}
		</base.Button>

	return (
		<base.Container>
			<base.Header style={{backgroundColor: 'white'}}>
				<base.Left>
					<base.Button transparent onPress={() => props.navigation.pop()}>
						<base.Icon name='arrow-back' style={{color: 'black', fontSize: 25}}/>
					</base.Button>
				</base.Left>
				<base.Right>
				</base.Right>
			</base.Header>
			<base.Content>
			{/* <Loading visible={this.state.loadingVisible_shipDetail || this.state.loadingVisible_shipGallery || this.state.loadingVisible} initialRoute={false} onPress={()=>this.props.navigation.goBack()}/> */}
				<base.Form style={{width: '100%', height: SIZE_IMG,}}>
					<Image resizeMode='cover' source={{uri: requestDomain + props.detailCommonShip.main_img,}} style={{width: '100%', height: '100%',}}/>
					{Train_Btn}
					{Train_request}
					<base.Form style={{position: 'absolute', bottom: 10, right: 10, elevation: 6, backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 10, height: 25, width: 120,
						alignItems: 'center', justifyContent: 'center'}}>
						<base.Text style={{color: 'white'}}>등록사진 {props.detailCommonShip.img_cnt}장</base.Text>
					</base.Form>
				</base.Form>
				{CommonShipGallery}
				<base.Form style={{width: '100%', flexDirection: 'row', borderBottomWidth: 1, borderColor: 'grey'}}>
					<base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
					onPress={updateShipMImage}>
						<AntDesign name="retweet" size={25} color="black"/>
					</base.Button>
					<base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
					onPress={() => props.navigation.navigate('DetailCommonShipGallery', {id: props.detailCommonShip.id, main_img_id: props.detailCommonShip.main_img_id})}>
						<AntDesign name="picture" size={25} color="black"/>
					</base.Button>
					<base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
					onPress={updateShipInfo}>
						<AntDesign name="edit" size={25} color="black"/>
					</base.Button>
					<base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
					onPress={()=>props.navigation.navigate('RegisterCommonShipImages',{id: props.detailCommonShip.id, name: props.detailCommonShip.name})}>
						<AntDesign name="addfile" size={25} color="black"/>
					</base.Button>
					<base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
					onPress={deleteShipInfo}>
						<AntDesign name="delete" size={25} color="black"/>
					</base.Button>
				</base.Form>
				<base.Tabs>
					<base.Tab heading={
						<base.TabHeading style={{backgroundColor: 'white'}}>
							<AntDesign name="infocirlceo" size={25} color="black"/>
								<base.Text style={{color: 'black'}}>선박정보</base.Text>
							</base.TabHeading>}>

						<base.Form style={{padding: 20,}}>
							<base.Text style={{fontFamily:'Nanum_Title', fontSize: SIZE_TITLE, color: '#006eee', marginBottom: 10,}}>{props.detailCommonShip.name} </base.Text>
							<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, color: 'grey'}}>{props.detailCommonShip.regit_date} {props.detailCommonShip.register} 등록 선박</base.Text>
						</base.Form>
						<base.Form style={{justifyContent: 'center', margin: 10,}}>
							<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
								<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>등록번호</base.Text>
								<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.detailCommonShip.code}</base.Text>
							</base.Form>
							<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
								<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>선박종류</base.Text>
								<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.detailCommonShip.types}</base.Text>
							</base.Form>
							<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
								<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>선박길이</base.Text>
								<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.detailCommonShip.size}</base.Text>
							</base.Form>
							<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
								<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>선박무게</base.Text>
								<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.detailCommonShip.tons}</base.Text>
							</base.Form>
							<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
								<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>위치지역</base.Text>
								<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.detailCommonShip.region}</base.Text>
							</base.Form>
							<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
								<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>정박위치</base.Text>
								<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.detailCommonShip.port}</base.Text>
							</base.Form>
							<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
								<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>위도</base.Text>
								<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.detailCommonShip.lat}</base.Text>
							</base.Form>
							<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start'}}>
								<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>경도</base.Text>
								<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.detailCommonShip.lon}</base.Text>
							</base.Form>
							<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start',}}>
								<base.Text style={{margin: 10, fontWeight: 'bold'}}>식별장치</base.Text>
								<base.ListItem style={{width: '100%'}}>
									<base.CheckBox checked={props.detailCommonShip.is_ais} color="#006eee"/>
									<base.Body><base.Text>AIS</base.Text></base.Body>
									<base.CheckBox checked={props.detailCommonShip.is_vpass} color="#006eee"/>
									<base.Body><base.Text>V-Pass</base.Text></base.Body>
								</base.ListItem>
								<base.ListItem style={{width: '100%'}}>
									<base.CheckBox checked={props.detailCommonShip.is_vhf} color="#006eee"/>
									<base.Body><base.Text>VHF-DSC</base.Text></base.Body>
									<base.CheckBox checked={props.detailCommonShip.is_ff} color="#006eee"/>
									<base.Body><base.Text>FF-GPS</base.Text></base.Body>
								</base.ListItem>
							</base.Item>
						</base.Form>
					</base.Tab>
					<base.Tab heading={
						<base.TabHeading style={{backgroundColor: 'white'}}>
							<AntDesign name="user" size={25} color="black"/>
								<base.Text style={{color: 'black'}}>선주정보</base.Text>
							</base.TabHeading>}>
						{shipOwnerDetail}
					</base.Tab>
					<base.Tab heading={
						<base.TabHeading style={{backgroundColor: 'white'}}>
							<Feather name="map" size={25} color="black"/>
								<base.Text style={{color: 'black'}}>지형정보</base.Text>
							</base.TabHeading>}>

						<base.Form style={{justifyContent: 'center', margin: 10,}}>
							<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
								<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>위도</base.Text>
								<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.detailCommonShip.lat}</base.Text>
							</base.Form>
							<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start'}}>
								<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>경도</base.Text>
								<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.detailCommonShip.lon}</base.Text>
							</base.Form>
						</base.Form>
						<base.Form style={{flex: 1, height: 500,}}>
							<MapView
								provider={PROVIDER_GOOGLE}
								style={{flex: 1, marginTop: 10, width: '100%', height: '100%'}}
								initialRegion={{
									latitude: parseFloat(props.detailCommonShip.lat),
									longitude: parseFloat(props.detailCommonShip.lon),
									latitudeDelta: 0.05,
									longitudeDelta: 0.05,
								}}>
								<Marker
								coordinate={{
									latitude: parseFloat(props.detailCommonShip.lat),
									longitude: parseFloat(props.detailCommonShip.lon),
								}}/>
							</MapView>
						</base.Form>
					</base.Tab>
				</base.Tabs>
			</base.Content>			
		</base.Container>
	)	
}

const mapStateToProps = (state) => {
	return {
        token: state.userInfo.token,
		detailCommonShip: state.detailCommonShip,
		shipOwner: state.shipOwner,
		galleryCommonShip: state.galleryCommonShip,
	}
}

const mapDispatchToProps = {
	loadDetailShip: (token, id) => loadDetailShip(token, id),
	loadShipOwner: (token, id) => loadShipOwner(token, id),
	loadGalleryCommonShip: (token, id) => loadGalleryCommonShip(token, id),
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailCommonShip)