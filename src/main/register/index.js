import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Alert, Dimensions } from 'react-native';
import * as base from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Location from 'expo-location';
import { registerCommonShip, registerWastedShip, registerCommonShipImages, registerWastedShipImages } from '../../utils/shipInfoRequest';
import { Picker } from 'native-base';
import { SliderBox } from "react-native-image-slider-box";
import { KindsOfShip } from '../../kindsOfData/kindsOfShip';
import { KindsOfRegion } from '../../kindsOfData/kindsOfRegion';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Loading from '../../utils/loading';
import { connect } from 'react-redux'

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_SUBFONT = Dimensions.get('screen').height * 0.015
const SIZE_IMG_HEIGHT = Dimensions.get('screen').height * 0.35
const SIZE_FONT = Dimensions.get('screen').height * 0.02

let BUTTONS = [
  { text: "카메라로 등록하기", icon: "ios-camera", iconColor: "grey",},
  { text: "갤러리에서 등록하기", icon: "ios-images", iconColor: "grey" },
  { text: "취소", icon: "close", iconColor: "grey" }
];
let DESTRUCTIVE_INDEX = 2;
let CANCEL_INDEX = 2;

const Register = (props) => {
	const [flag, set_flag] = useState('Normal')

	// Origin State
	const [types, set_types] = useState('정보없음')
	const [region, set_region] = useState('정보없음')

	// Common Ship State
	const [name, set_name] = useState('무기명')
	const [code, set_code] = useState('정보없음')
	const [tons, set_tons] = useState('정보없음')
	const [size, set_size] = useState('정보없음')
	const [port, set_port] = useState('정보없음')
	const [is_ais, set_is_ais] = useState(false)
	const [is_vpass, set_is_vpass] = useState(false)
	const [is_vhf, set_is_vhf] = useState(false)
	const [is_ff, set_is_ff] = useState(false)

	// Wasted Ship State
	const [latitude, set_latitude] = useState('0')
	const [longitude, set_longitude] = useState('0')
	const [info, set_info] = useState('정보없음')

	const [clicked, set_clicked] = useState('')

	const [images, set_images] = useState([])

	const [loadingVisible, set_loadingVisible] = useState(false)
	const [needLoadingPercent, set_needLoadingPercent] = useState(false)
	const [load, set_load] = useState(0)
	const [sum, set_sum] = useState(0)

	const mapView = useRef()

	useEffect(() => {

	}, [])

	const checkAIS = () => { (is_ais == true) ? set_is_ais(false) : set_is_ais(true) }
	const checkVPASS = () => { (is_vpass == true) ? set_is_vpass(false) : set_is_vpass(true) }
	const checkVHF = () => { (is_vhf == true) ? set_is_vhf(false) : set_is_vhf(true) }
	const checkFF = () => { (is_ff == true) ? set_is_ff(false) : set_is_ff(true) }

	const pickPhoto = async () => {
		if(ImagePicker.getCameraPermissionsAsync()) ImagePicker.requestCameraPermissionsAsync()
		await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			quality: 1,
		}).then((result) => {
			ImageManipulator.manipulateAsync(
				result.uri,
				[{resize: {width: 500, height: 500}}],
				{format: ImageManipulator.SaveFormat.JPEG}
			).then((result) => {
				set_images(images.concat(result.uri))
			})
		})
	}
	const pickImage = async () => {
		await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			quality: 1,
		}).then((result) => {
			ImageManipulator.manipulateAsync(
				result.uri,
				[{resize: {width: 500, height: 500}}],
				{format: ImageManipulator.SaveFormat.JPEG}
				).then((result) => {
					set_images(images.concat(result.uri))
				}
			)
		})
	}
	const getLocation = async () => {
		try {
			await Location.requestPermissionsAsync();
			const location = await Location.getCurrentPositionAsync();
			console.log(location)
			set_latitude(location.coords['latitude'])
			set_longitude(location.coords['longitude'])
		} catch (error) {
			Alert.alert(
				'선박확인체계 알림',
				'위치정보를 가져올 수 없습니다',
			)
		}
		moveCurrentLocation();
	}
	const moveCurrentLocation = async () => {
		const location = await Location.getCurrentPositionAsync();
		set_latitude(location.coords['latitude'])
		set_longitude(location.coords['longitude'])
		let loc = {
			latitude: latitude,
			longitude: longitude,
			latitudeDelta: 0.5,
			longitudeDelta: 0.5,
		};
		mapView.current.animateToRegion(loc, 0);
	}
	const registerShip = () => {
		set_loadingVisible(true)
		if(images.length != 0) {
			set_needLoadingPercent(true)
			set_sum(images.length)
		}
		if(flag == 'Normal') {
			registerCommonShip(props.token, name, types, code, tons, size, is_ais, is_vpass, is_vhf, is_ff, region, port, latitude, longitude)
			.then((response) => {
				if(images.length == 0){
					set_loadingVisible(false)
					Alert.alert(
						'선박확인체계 알림',
						'일반선박 정보가 등록되었습니다, 추가로 선주 정보를 등록하시겠습니까?',
						[{
							text: "네",
							onPress: () => props.navigation.navigate('RegisterShipOwner', {id: response.data.data.id, name: name})
							},{
							text: "아니오",
							onPress: () => {
								props.navigation.popToTop(),
								props.navigation.navigate('DetailCommonShip', {id: response.data.data.id})
							}
						}]
					);
				}
				else {
					images.map((data, index)=>{
						const formdata = new FormData()					
						formdata.append("id",  response.data.data.id);
						formdata.append('image_data', {name:'ship.jpg', type:'image/jpeg', uri: data})
						registerCommonShipImages(props.token, formdata).then((response) => {
							set_load(load + 1)
							if(index + 1 == images.length) {
								set_loadingVisible(false)
								Alert.alert(
									'선박확인체계 알림',
									'일반선박 정보가 등록되었습니다, 추가로 선주 정보를 등록하시겠습니까?',
									[{
										text: "네",
										onPress: () => props.navigation.navigate('RegisterShipOwner', {id: id, name: name})
										},{
										text: "아니오",
										onPress: () => {
											props.navigation.popToTop(),
											props.navigation.navigate('DetailCommonShip', {id: response.data.data.id})
										}
									}]
								);
							}
						}).catch((err) => {
							console.log('실패')
						})
					})
				}
			})
		}
		else if(flag == 'Wasted') {
			registerWastedShip(props.token, types, latitude, longitude, info, region).then((response) => {
				if(images.length == 0){
					set_loadingVisible(false)
					Alert.alert(
						'선박확인체계 알림',
						'유기선박 정보가 등록되었습니다',
					)	
					props.navigation.popToTop()
					props.navigation.navigate('DetailWastedShip',{id: response.data.data.id})
				}
				else {
					images.map((data, index)=>{
						const formdata = new FormData()					
						formdata.append("id",  response.data.data.id);
						formdata.append('image_data', {name:'ship.jpg', type:'image/jpeg', uri: data})
						registerWastedShipImages(props.token, formdata).then((response) => {
							set_load(load + 1)
							if(index + 1 == images.length){
								set_loadingVisible(false)
								Alert.alert(
									'선박확인체계 알림',
									'유기선박 정보가 등록되었습니다',
								)	
								props.navigation.popToTop()
								props.navigation.navigate('DetailWastedShip',{id: response.data.data.id})
							}
						}).catch((err) => {
							console.log('실패')
						})
					})
				}
			})
		}
	}

	const normalInput = () => {
		return(
			<base.Form>
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박명</base.Text>
						<base.Input
							placeholder="선박명을 입력하세요"
							onChangeText={set_name}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum'}}
							/>
					</base.Item>
				</base.Form>

				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>등록번호</base.Text>
						<base.Input
							placeholder="등록번호 14자리를 입력하세요"
							onChangeText={set_code}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum'}}
							keyboardType="number-pad"/>
					</base.Item>
				</base.Form>

				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박종류</base.Text>
						<Picker
							selectedValue={types}
							style={{height: 50, width: '100%',}}
							onValueChange={(itemValue) => set_types(itemValue)}>
							{ KindsOfShip.map((data)=>{ return <Picker.Item key={data.value.toString()} label={data.value} value={data.value} /> }) }
						</Picker>							
					</base.Item>							
				</base.Form>
			
				<base.Form style={{marginHorizontal: 10,}}>
					<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start',}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start', padding: 10}}>식별장치</base.Text>
						<base.ListItem style={{width: '100%'}}>
							<base.CheckBox checked={is_ais} color="#006eee" onPress={() => checkAIS()}/>
							<base.Body><base.Text style={{fontSize: SIZE_SUBFONT}}>AIS</base.Text></base.Body>
							<base.CheckBox checked={is_vpass} color="#006eee" onPress={() => checkVPASS()}/>
							<base.Body><base.Text style={{fontSize: SIZE_SUBFONT}}>V-Pass</base.Text></base.Body>
						</base.ListItem>
						<base.ListItem style={{width: '100%'}}>
							<base.CheckBox checked={is_vhf} color="#006eee" onPress={() => checkVHF()}/>
							<base.Body><base.Text style={{fontSize: SIZE_SUBFONT}}>VHF-DSC</base.Text></base.Body>
							<base.CheckBox checked={is_ff} color="#006eee" onPress={() => checkFF()}/>
							<base.Body><base.Text style={{fontSize: SIZE_SUBFONT}}>FF-GPS</base.Text></base.Body>
						</base.ListItem>
					</base.Item>
				</base.Form>
			
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박길이</base.Text>
						<base.Input
							placeholder="선박길이를 숫자만 입력하세요 (단위 : m)"
							onChangeText={set_size}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum'}}
							keyboardType="number-pad"/>
					</base.Item>
				</base.Form>
			
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박무게</base.Text>
						<base.Input
							placeholder="선박무게를 숫자만 입력하세요 (단위 : t)"
							onChangeText={set_tons}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							keyboardType="number-pad"/>
					</base.Item>
				</base.Form>
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>위치지역</base.Text>
						<Picker
							selectedValue={region}
							style={{height: 50, width: '100%'}}
							onValueChange={(itemValue) => set_region(itemValue)}>
							{ KindsOfRegion.map((data)=>{ return <Picker.Item key={data.value.toString()} label={data.value} value={data.value} /> }) }
						</Picker>							
					</base.Item>							
				</base.Form>
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>정박위치</base.Text>
						<base.Input
							placeholder="정박된 항구나 포구를 입력하세요"
							onChangeText={set_port}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum'}}
							/>
					</base.Item>
				</base.Form>
				<base.Form style={{flex: 1, height: 400, padding: 10}}>
					<MapView
						ref = {mapView}
						provider={PROVIDER_GOOGLE}
						style={{flex: 1, marginTop: 10, width: '100%', height: '100%'}}
						initialRegion={{
							latitude: parseFloat(latitude),
							longitude: parseFloat(longitude),
							latitudeDelta: 0.05,
							longitudeDelta: 0.05,
						}}>
						<Marker
						coordinate={{
							latitude: parseFloat(latitude),
							longitude: parseFloat(longitude),
						}}/>
					</MapView>
				</base.Form>
				<base.Form style={{flexDirection: 'row', alignItems: 'center', width: '100%', padding: 10,}}>
					<base.Form style={{flex: 7, flexDirection: 'column', width: '100%'}}>
						<base.Item regular style={{
							flex: 1,
							borderRadius: 10,
							width: '100%',
							height: 50,
							margin: 10
							}}><base.Text style={{fontFamily: 'Nanum', color: 'grey', fontSize: SIZE_SUBFONT, padding: 10}}>위도 : {latitude}</base.Text></base.Item>
						<base.Item regular style={{
							flex: 1,
							borderRadius: 10,
							width: '100%',
							height: 50,
							margin: 10
						}}><base.Text style={{fontFamily: 'Nanum', color: 'grey', fontSize: SIZE_SUBFONT, padding: 10}}>경도 : {longitude}</base.Text></base.Item>
					</base.Form>
					<base.Form style={{flex: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
						<base.Icon onPress={getLocation} name='ios-compass' style={{color:'#006eee',fontSize: 40}}/>
						<base.Text style={{fontFamily: 'Nanum', fontSize: SIZE_SUBFONT}}>위치정보{'\n'}불러오기</base.Text>
					</base.Form>
				</base.Form>
				<base.Button block onPress={registerShip} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
					<base.Text style={{color: 'black'}}>등록하기</base.Text>
				</base.Button>
			</base.Form>
		)
	}
	const wastedInput = () => {
		return(
			<base.Form>
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박종류</base.Text>
						<Picker
							selectedValue={types}
							style={{height: 50, width: '100%',}}
							onValueChange={(itemValue) => set_types(itemValue)}>
							{ KindsOfShip.map((data)=>{ return <Picker.Item key={data.value.toString()} label={data.value} value={data.value} /> }) }
						</Picker>							
					</base.Item>							
				</base.Form>
				<base.Form style={{marginVertical: 15, paddingHorizontal: 10}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>세부정보 및 특이사항</base.Text>
						<base.Textarea rowSpan={5} bordered
							onChangeText={set_info} placeholder="해당 선박에 대해 구체적으로 작성해주세요"
							style={{fontFamily: 'Nanum', marginVertical: 10, borderRadius: 10, padding: 10, fontSize: SIZE_SUBFONT}}/>
				</base.Form>

				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>위치지역</base.Text>
						<Picker
							selectedValue={region}
							style={{height: 50, width: '100%'}}
							onValueChange={(itemValue) => set_region(itemValue)}>
							{ KindsOfRegion.map((data)=>{ return <Picker.Item key={data.value.toString()} label={data.value} value={data.value} /> }) }
						</Picker>							
					</base.Item>							
				</base.Form>
				<base.Form style={{flex: 1, height: 400, padding: 10}}>
					<MapView
						ref = {mapView}
						provider={PROVIDER_GOOGLE}
						style={{flex: 1, marginTop: 10, width: '100%', height: '100%'}}
						initialRegion={{
							latitude: parseFloat(latitude),
							longitude: parseFloat(longitude),
							latitudeDelta: 0.05,
							longitudeDelta: 0.05,
						}}>
						<Marker
						coordinate={{
							latitude: parseFloat(latitude),
							longitude: parseFloat(longitude),
						}}/>
					</MapView>
				</base.Form>
				<base.Form style={{flexDirection: 'row', alignItems: 'center', width: '100%', padding: 10,}}>
					<base.Form style={{flex: 7, flexDirection: 'column', width: '100%'}}>
						<base.Item regular style={{
							flex: 1,
							borderRadius: 10,
							width: '100%',
							height: 50,
							margin: 10
							}}><base.Text style={{fontFamily: 'Nanum', color: 'grey', fontSize: SIZE_SUBFONT, padding: 10}}>위도 : {latitude}</base.Text></base.Item>
						<base.Item regular style={{
							flex: 1,
							borderRadius: 10,
							width: '100%',
							height: 50,
							margin: 10
						}}><base.Text style={{fontFamily: 'Nanum', color: 'grey', fontSize: SIZE_SUBFONT, padding: 10}}>경도 : {longitude}</base.Text></base.Item>
					</base.Form>
					<base.Form style={{flex: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
						<base.Icon onPress={getLocation} name='ios-compass' style={{color:'#006eee',fontSize: 40}}/>
						<base.Text style={{fontFamily: 'Nanum', fontSize: SIZE_SUBFONT}}>위치정보{'\n'}불러오기</base.Text>
					</base.Form>
				</base.Form>
				<base.Button block onPress={registerShip} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
					<base.Text style={{color: 'black'}}>등록하기</base.Text>
				</base.Button>
			</base.Form>
		)
	}

	switch(clicked){
		case 0:{
			pickPhoto();
			set_clicked(null);
			break;
		}
		case 1:{
			pickImage();
			set_clicked(null);
			break;
		}
		case 2:{
			set_clicked(null);
			break;
		}
	}
	let detailInput
	if(flag == 'Normal') {
		detailInput = normalInput()
	}
	else if(flag == 'Wasted') {
		detailInput = wastedInput()
	}
	return (
		<base.Root>
			<base.Container>
				<base.Header style={{backgroundColor: 'white'}}>
					<base.Left style={{flex: 1,}}>
						<base.Button transparent onPress={() => props.navigation.goBack()}>
							<base.Icon name='arrow-back' style={{color: 'black'}}/>
						</base.Button>
					</base.Left>
					<base.Form style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center',}}>
						<base.Segment style={{backgroundColor: '#006eee', borderRadius: 10, width: '100%'}}>
							<base.Button first active={flag == 'Normal'} onPress={() => set_flag('Normal')}>
								<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}>일반선박</base.Text>
							</base.Button>
							<base.Button last active={flag == 'Wasted'} onPress={() => set_flag('Wasted')}>
								<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}>유기선박</base.Text>
							</base.Button>
						</base.Segment>
					</base.Form>
				</base.Header>
				<base.Content>
					<Loading visible={loadingVisible} needLoadingPercent={needLoadingPercent} load={load} sum={sum} initialRoute={false} onPress={() => props.navigation.goBack()}/>
					<base.Form style={{width:'100%', height: SIZE_IMG_HEIGHT, borderBottomWidth: 1, borderColor: '#DDD', flexDirection: 'column',}}>
						<base.Form style={{flex: 1, height: SIZE_IMG_HEIGHT, width:'100%',}}>
							<SliderBox
								images={images}
								sliderBoxHeight={300}
								autoplay
								circleLoop
								resizeMethod={'resize'}
								resizeMode={'cover'}
							/>
						</base.Form>
						<base.Button rounded
							style={{position: 'absolute', right: 10, bottom: 10, backgroundColor: 'white', width: 60, height: 60, elevation: 6,}} 
							onPress={() =>
								base.ActionSheet.show({
									options: BUTTONS,
									cancelButtonIndex: CANCEL_INDEX,
									destructiveButtonIndex: DESTRUCTIVE_INDEX,
									title: "선박 사진 등록"
								},
								buttonIndex => {set_clicked(buttonIndex)}
						)}>
							<base.Icon name='ios-images' style={{color:'#006eee', fontSize: 25}}/>
						</base.Button>
					</base.Form>
					<base.Form style={{padding: 10,}}>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>선박등록</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey',}}>등록할 선박의 정보를 입력하세요</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT, marginTop: 10, color: 'grey', fontWeight: 'bold'}}>* 여러 장의 사진 등록이 가능합니다</base.Text>
					</base.Form>
					{detailInput}
				</base.Content>
			<StatusBar hidden/>
			</base.Container>
		</base.Root>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.userInfo.token,
	}
}

export default connect(mapStateToProps)(Register)