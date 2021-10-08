import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Dimensions, Image, FlatList,TouchableHighlight, Alert } from 'react-native';
import * as base from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ShowPlusDetail from './showPlusDetail';
import { requestDomain } from '../../utils/domain';
import { AntDesign, Feather } from '@expo/vector-icons'; 

import Loading from '../../utils/loading';
import { connect } from 'react-redux';
import { deleteWastedShipInfo, loadDetailWastedShip, resetDetailWastedShip } from '../../redux/detailWastedShip/action'
import { loadGalleryWastedShip, resetGalleryWastedShip } from '../../redux/galleryWastedShip/action'

const SIZE_TITLE = Dimensions.get('screen').height * 0.035
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.015
const SIZE_FONT = Dimensions.get('screen').height * 0.015
const SIZE_IMG = Dimensions.get('screen').height * 0.35
const SIZE_SUBIMG = Dimensions.get('screen').height * 0.15

const DetailWastedShip = (props) => {
	const [loadingVisible, set_loadingVisible] = useState(true)
	const [id, set_id] = useState(props.navigation.getParam('id'))

	useEffect(() => {
		props.loadDetailWastedShip(props.userInfo.token, id)
		props.loadGalleryWastedShip(props.userInfo.token, id)
		const timer = setTimeout(() => {
			set_loadingVisible(false)
		}, 1000)
		timer
		return () => {
			props.resetDetailWastedShip()
			props.resetGalleryWastedShip()
		}
	}, [])

	const updateShipInfo = () => {
		Alert.alert(
			'선박확인체계 알림',
			id + '번 유기선박 정보를 수정하시겠습니까?',
			[{
				text: "네",
				onPress: () => {
					if(props.userInfo.level > 1) {
						props.navigation.navigate('UpdateWastedShip',{id: id})
					}
					else {
						Alert.alert(
							'선박확인체계 알림',
							'선박 정보 수정 권한이 없습니다',
						)
					}
				}
				},{
				text: "아니오",
				onPress: () => console.log("Cancel Pressed"),
			}]
		);
	}
	const updateShipMImage = () => {
		Alert.alert(
			'선박확인체계 알림',
			id + '번 유기선박 대표사진을 수정하시겠습니까?',
			[{
				text: "네",
				onPress: () =>  {
					if(props.userInfo.level > 1){
						if(props.galleryWastedShip.gallery.length < 2) {
							Alert.alert(
								'선박확인체계 알림',
								'대표사진을 수정할 사진이 없습니다',
							)
						}
						else {
							props.navigation.navigate('UpdateWastedShipMImage',{id: id, main_img_id: props.detailWastedShip.main_img_id,})
						}
					}
					else {
						Alert.alert(
							'선박확인체계 알림',
							'대표사진 수정 권한이 없습니다',
						)
					}
				}
				},{
				text: "아니오",
				onPress: () => console.log("Cancel Pressed"),
			}]
		);
	}
	const deleteShipInfo = () => {
		Alert.alert(
			'선박확인체계 알림',
			id + '번 유기선박 정보를 삭제하시겠습니까?',
			[{
				text: "네",
				onPress: () => {
					if(props.userInfo.level > 1) {
						props.deleteWastedShipInfo(props.userInfo.token, id)
						Alert.alert(
							'선박확인체계 알림',
							id + '번 유기선박 정보가 삭제되었습니다',
						)
						props.navigation.pop();
					}
					else {
						Alert.alert(
							'선박확인체계 알림',
							'선박 정보 삭제 권한이 없습니다',
						)
					}
				}
				},{
				text: "아니오",
				onPress: () => console.log("Cancel Pressed"),
			}]
		);
	}
	let WastedShipGallery
	if(props.galleryWastedShip.gallery.length) { WastedShipGallery =
		<base.Form>
			<FlatList
				style={{flex: 1, height: SIZE_SUBIMG}}
				keyExtractor={(item)=> item.id.toString()}
				data={props.galleryWastedShip.gallery}
				horizontal={true}
				renderItem={({item, index}) => <ShowPlusDetail ship={item}
				onPress={() => props.navigation.navigate('ShipImgViewer',{address: requestDomain + item.img, id: id, flag: 'Wasted', img_id: item.id, index: index + 1})}/>}
				ListFooterComponent={
					<TouchableHighlight style={{flex: 1,}} onPress={() => props.navigation.navigate('RegisterWastedShipImages',{id: id})}>
						<base.Card style={{width: SIZE_SUBIMG, height: SIZE_SUBIMG, alignItems: 'center', justifyContent: 'center'}}>
							<base.Icon name='ios-add-circle' style={{color: '#006eee', fontSize: 60}}/>
						</base.Card>
					</TouchableHighlight>	
				}
			/>
		</base.Form>
	}
	return (
		<base.Container>
			<base.Header style={{backgroundColor: 'white'}}>
				<base.Left>
					<base.Button transparent onPress={() => props.navigation.goBack()}>
						<base.Icon name='arrow-back' size={25} style={{color: 'black'}}/>
					</base.Button>
				</base.Left>
				<base.Right>
				</base.Right>
			</base.Header>
			<base.Content>
				<Loading visible={loadingVisible} initialRoute={false} onPress={() => props.navigation.goBack()}/>
				<base.Form style={{width: '100%' ,height: SIZE_IMG,}}>
					<Image resizeMode='cover' source={{uri: requestDomain + props.detailWastedShip.main_img,}} style={{width: '100%', height: '100%',}}/>
					<base.Form style={{position: 'absolute', bottom: 10, right: 10, elevation: 6, backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 10, height: 25, width: 120,
						alignItems: 'center', justifyContent: 'center'}}>
						<base.Text style={{color: 'white'}}>등록사진 {props.detailWastedShip.img_cnt} 장</base.Text>
					</base.Form>
				</base.Form>
					{WastedShipGallery}
				<base.Form style={{width: '100%', flexDirection: 'row', borderBottomWidth: 1, borderColor: 'grey'}}>
					<base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
					onPress={updateShipMImage}>
						<AntDesign name="retweet" size={25} color="black"/>
					</base.Button>
					<base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
					onPress={() => props.navigation.navigate('DetailWastedShipGallery',{id: id, main_img_id: props.detailWastedShip.main_img_id})}>
						<AntDesign name="picture" size={25} color="black"/>
					</base.Button>
					<base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
					onPress={updateShipInfo}>
						<AntDesign name="edit" size={25} color="black"/>
					</base.Button>
					<base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
					onPress={() => props.navigation.navigate('RegisterWastedShipImages',{id: id,})}>
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
						<base.Text style={{fontFamily:'Nanum_Title', fontSize: SIZE_TITLE, color: '#006eee', marginBottom: 10,}}>{id}번 유기선박</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, color: 'grey',}}>{props.detailWastedShip.regit_date} {props.detailWastedShip.register} 등록 선박</base.Text>
					</base.Form>
					<base.Form style={{flex: 1, padding: 10,}}>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>관리번호</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{id}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start', fontWeight: 'bold'}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>선박종류</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.detailWastedShip.types}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>세부정보</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.detailWastedShip.info}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>위치지역</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.detailWastedShip.region}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>위도</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.detailWastedShip.latitude}</base.Text>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>경도</base.Text>
							<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.detailWastedShip.longitude}</base.Text>
						</base.Form>
					</base.Form>

					</base.Tab>
					<base.Tab heading={
						<base.TabHeading style={{backgroundColor: 'white'}}>
							<Feather name="map" size={25} color="black"/>
								<base.Text style={{color: 'black'}}>지형정보</base.Text>
							</base.TabHeading>}>

						<base.Form style={{flex: 1, padding: 10,}}>
							<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
								<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>위도</base.Text>
								<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.detailWastedShip.latitude}</base.Text>
							</base.Form>
							<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
								<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>경도</base.Text>
								<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.detailWastedShip.longitude}</base.Text>
							</base.Form>
						</base.Form>
						<base.Form style={{flex: 1, height: 400,}}>
							<MapView
								provider={PROVIDER_GOOGLE}
								style={{flex: 1, marginTop: 10, width: '100%', height: '100%'}}
								initialRegion={{
									latitude: parseFloat(props.detailWastedShip.latitude),
									longitude: parseFloat(props.detailWastedShip.longitude),
									latitudeDelta: 0.05,
									longitudeDelta: 0.05,
								}}>
								<Marker
								coordinate={{
									latitude: parseFloat(props.detailWastedShip.latitude),
									longitude: parseFloat(props.detailWastedShip.longitude),
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
        userInfo: state.userInfo,
		detailWastedShip: state.detailWastedShip,
		galleryWastedShip: state.galleryWastedShip,
	}
}

const mapDispatchToProps = {
	loadDetailWastedShip: (token, id) => loadDetailWastedShip(token, id),
	loadGalleryWastedShip: (token, id) => loadGalleryWastedShip(token, id),
	resetDetailWastedShip: () => resetDetailWastedShip(),
	resetGalleryWastedShip: () => resetGalleryWastedShip(),
	deleteWastedShipInfo: (token, id) => deleteWastedShipInfo(token, id),
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailWastedShip)