import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Alert, Dimensions } from 'react-native';
import * as base from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Location from 'expo-location';
import { getToken } from '../../utils/getToken';
import { registerCommonShip, registerWastedShip, registerCommonShipImages, registerWastedShipImages } from '../../utils/shipInfoRequest';
import { Picker } from '@react-native-picker/picker';
import { SliderBox } from "react-native-image-slider-box";
import { KindsOfPort } from '../../kindsOfData/kindsOfPort';
import { KindsOfShip } from '../../kindsOfData/kindsOfShip';
import { KindsOfRegion } from '../../kindsOfData/kindsOfRegion';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Loading from '../../utils/loading';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_SUBFONT = Dimensions.get('screen').height * 0.015
const SIZE_IMG_HEIGHT = Dimensions.get('screen').height * 0.35
const SIZE_FONT = Dimensions.get('screen').height * 0.02

var BUTTONS = [
  { text: "카메라로 등록하기", icon: "ios-camera", iconColor: "grey",},
  { text: "갤러리에서 등록하기", icon: "ios-images", iconColor: "grey" },
  { text: "취소", icon: "close", iconColor: "grey" }
];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 2;

export default class Register extends Component{
	constructor(props) {
		super(props);
		this.state = {
			img: '',
			flag: 'Normal',

			// Origin State
			types: '정보없음', region: '정보없음',
			// Common Ship States
			name: '무기명', code: '정보없음',  tons: '정보없음', size: '정보없음', port: '정보없음',
			is_ais: false, is_vpass: false, is_vhf: false, is_ff: false,
			// Wasted Ship states
			latitude: '0', longitude: '0', info: '정보없음',
			
			clicked: '',

			images: [],
			
			loadingVisible: false,
		};
		this.pickImage = this.pickImage.bind(this);
		this.pickPhoto = this.pickPhoto.bind(this);
		
		this.normalInput = this.normalInput.bind(this);
		this.wastedInput = this.wastedInput.bind(this);
		
		this.registerShip = this.registerShip.bind(this);
		
		this.getLocation = this.getLocation(this);

		this.checkAIS = this.checkAIS.bind(this);
		this.checkVPASS = this.checkVPASS.bind(this);
		this.checkVHF = this.checkVHF.bind(this);
		this.checkFF = this.checkFF.bind(this);

		this.moveCurrentLocation = this.moveCurrentLocation.bind(this);
	}
	checkAIS(){ (this.state.is_ais == true) ? this.setState({is_ais: false}) : this.setState({is_ais: true}) }
	checkVPASS(){ (this.state.is_vpass == true) ? this.setState({is_vpass: false}) : this.setState({is_vpass: true}) }
	checkVHF(){ (this.state.is_vhf == true) ? this.setState({is_vhf: false}) : this.setState({is_vhf: true}) }
	checkFF(){ (this.state.is_ff == true) ? this.setState({is_ff: false}) : this.setState({is_ff: true}) }
	async pickPhoto() {
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
				this.setState({ images: this.state.images.concat(result.uri)})
			})
		})
	}
	async pickImage() {
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
					this.setState({ images: this.state.images.concat(result.uri)})
				}
			)
		})
	}
	getLocation = async () => {
		try {
			await Location.requestPermissionsAsync();
			const location = await Location.getCurrentPositionAsync();
			console.log(location)
			this.setState({latitude: location.coords['latitude'], longitude: location.coords['longitude']})
		} catch (error) {
		  Alert.alert("Can't find you.", "Please Try Again!")
		}
		this.moveCurrentLocation();
	}
	moveCurrentLocation = async () => {
		const location = await Location.getCurrentPositionAsync();
		this.setState({latitude: location.coords['latitude'], longitude: location.coords['longitude']})
		let loc = {
			latitude: this.state.latitude,
			longitude: this.state.longitude,
			latitudeDelta: 0.5,
			longitudeDelta: 0.5,
		};
		this.mapView.animateToRegion(loc, 0);
	}
	registerShip(){
		this.setState({loadingVisible: true})
		getToken().then((token) =>{
			if(this.state.flag == 'Normal'){
				registerCommonShip(token, this.state.name, this.state.types, this.state.code, this.state.tons, 
				this.state.size, this.state.is_ais, this.state.is_vpass, this.state.is_vhf, this.state.is_ff, this.state.region, this.state.port,
				this.state.latitude, this.state.longitude).then((response) => {
					
					this.state.images.map((data, index)=>{
						const formdata = new FormData()					
						formdata.append("id",  response.data.data.id);
						formdata.append('image_data', {name:'ship.jpg', type:'image/jpeg', uri: data})
							registerCommonShipImages(token, formdata).then((response) =>{
								if(index + 1 == this.state.images.length){
									this.setState({loadingVisible: false})
									Alert.alert(
										'선박확인체계 알림',
										'일반선박 정보가 등록되었습니다',
									)
									this.props.navigation.popToTop()
								}
							}).catch((err) => {
								console.log('실패')
						})
					})
				})
			}
			else if (this.state.flag == 'Wasted'){
				registerWastedShip(token, this.state.types, this.state.latitude, this.state.longitude, this.state.info, this.state.region).then((response) => {
					this.state.images.map((data, index)=>{
						const formdata = new FormData()					
						formdata.append("id",  response.data.data.id);
						formdata.append('image_data', {name:'ship.jpg', type:'image/jpeg', uri: data})
							registerWastedShipImages(token, formdata).then((response) =>{
								if(index + 1 == this.state.images.length){
									this.setState({loadingVisible: false})
									Alert.alert(
										'선박확인체계 알림',
										'유기선박 정보가 등록되었습니다',
									)	
									this.props.navigation.popToTop()
								}
							}).catch((err) => {
								console.log('실패')
						})
					})
				})
			}
		})
	}

	normalInput = () => {
		return(
			<base.Form>
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박명</base.Text>
						<base.Input
							placeholder="선박명을 입력하세요"
							onChangeText={(name) => this.setState({name})}
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
							onChangeText={(code) => this.setState({code})}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum'}}
							keyboardType="number-pad"/>
					</base.Item>
				</base.Form>

				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박종류</base.Text>
						<Picker
							selectedValue={this.state.types}
							style={{height: 50, width: '100%',}}
							onValueChange={(itemValue) => this.setState({types: itemValue})}>
							{ KindsOfShip.map((data)=>{ return <Picker.Item label={data.value} value={data.value} /> }) }
						</Picker>							
					</base.Item>							
				</base.Form>
				
				<base.Form style={{marginHorizontal: 10,}}>
					<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start',}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start', padding: 10}}>식별장치</base.Text>
						<base.ListItem style={{width: '100%'}}>
							<base.CheckBox checked={this.state.is_ais} color="#006eee" onPress={() => this.checkAIS()}/>
							<base.Body><base.Text style={{fontSize: SIZE_SUBFONT}}>AIS</base.Text></base.Body>
							<base.CheckBox checked={this.state.is_vpass} color="#006eee" onPress={() => this.checkVPASS()}/>
							<base.Body><base.Text style={{fontSize: SIZE_SUBFONT}}>V-Pass</base.Text></base.Body>
						</base.ListItem>
						<base.ListItem style={{width: '100%'}}>
							<base.CheckBox checked={this.state.is_vhf} color="#006eee" onPress={() => this.checkVHF()}/>
							<base.Body><base.Text style={{fontSize: SIZE_SUBFONT}}>VHF-DSC</base.Text></base.Body>
							<base.CheckBox checked={this.state.is_ff} color="#006eee" onPress={() => this.checkFF()}/>
							<base.Body><base.Text style={{fontSize: SIZE_SUBFONT}}>FF-GPS</base.Text></base.Body>
						</base.ListItem>
					</base.Item>
				</base.Form>
				
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박길이</base.Text>
						<base.Input
							placeholder="선박길이를 숫자만 입력하세요 (단위 : m)"
							onChangeText={(size) => this.setState({size})}
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
							onChangeText={(tons) => this.setState({tons})}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							keyboardType="number-pad"/>
					</base.Item>
				</base.Form>
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>위치지역</base.Text>
						<Picker
							selectedValue={this.state.region}
							style={{height: 50, width: '100%'}}
							onValueChange={(itemValue) => this.setState({region: itemValue})}>
							{ KindsOfRegion.map((data)=>{ return <Picker.Item label={data.value} value={data.value} /> }) }
						</Picker>							
					</base.Item>							
				</base.Form>
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: 20, alignSelf:'flex-start'}}>정착항구</base.Text>
						<Picker
							selectedValue={this.state.region}
							style={{height: 50, width: '100%'}}
							onValueChange={(itemValue) => this.setState({region: itemValue})}>
							{ KindsOfPort.map((data)=>{ return <Picker.Item label={data.value} value={data.value} /> }) }
						</Picker>							
					</base.Item>							
				</base.Form>
				<base.Form style={{flex: 1, height: 300, padding: 10}}>
					<MapView
						ref = {(ref) => this.mapView=ref}
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
				<base.Form style={{flexDirection: 'row', alignItems: 'center', width: '100%', padding: 10,}}>
					<base.Form style={{flex: 7, flexDirection: 'column', width: '100%'}}>
						<base.Item regular style={{
							flex: 1,
							borderRadius: 10,
							width: '100%',
							height: 50,
							margin: 10
							}}><base.Text style={{fontFamily: 'Nanum', color: 'grey', fontSize: SIZE_SUBFONT, padding: 10}}>위도 : {this.state.latitude}</base.Text></base.Item>
						<base.Item regular style={{
							flex: 1,
							borderRadius: 10,
							width: '100%',
							height: 50,
							margin: 10
						}}><base.Text style={{fontFamily: 'Nanum', color: 'grey', fontSize: SIZE_SUBFONT, padding: 10}}>경도 : {this.state.longitude}</base.Text></base.Item>
					</base.Form>
					<base.Form style={{flex: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
						<base.Icon onPress={this.getLocation} name='ios-compass' style={{color:'#006eee',fontSize: 40}}/>
						<base.Text style={{fontFamily: 'Nanum', fontSize: SIZE_SUBFONT}}>위치정보{'\n'}불러오기</base.Text>
					</base.Form>
				</base.Form>
				<base.Button block onPress={this.registerShip} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
					<base.Text style={{color: 'black'}}>등록하기</base.Text>
				</base.Button>
			</base.Form>
		)
	}
	wastedInput = () => {
		return(
			<base.Form>
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박종류</base.Text>
						<Picker
							selectedValue={this.state.types}
							style={{height: 50, width: '100%',}}
							onValueChange={(itemValue) => this.setState({types: itemValue})}>
							{ KindsOfShip.map((data)=>{ return <Picker.Item label={data.value} value={data.value} /> }) }
						</Picker>							
					</base.Item>							
				</base.Form>
				<base.Form style={{marginVertical: 15, paddingHorizontal: 10}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>세부정보 및 특이사항</base.Text>
						<base.Textarea rowSpan={5} bordered
							onChangeText={(info) => this.setState({info})} placeholder="해당 선박에 대해 구체적으로 작성해주세요"
							style={{fontFamily: 'Nanum', marginVertical: 10, borderRadius: 10, padding: 10, fontSize: SIZE_SUBFONT}}/>
				</base.Form>

				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>위치지역</base.Text>
						<Picker
							selectedValue={this.state.region}
							style={{height: 50, width: '100%'}}
							onValueChange={(itemValue) => this.setState({region: itemValue})}>
							{ KindsOfRegion.map((data)=>{ return <Picker.Item label={data.value} value={data.value} /> }) }
						</Picker>							
					</base.Item>							
				</base.Form>

				<base.Form style={{flex: 1, height: 300, padding: 10}}>
					<MapView
						ref = {(ref) => this.mapView=ref}
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

				<base.Form style={{flexDirection: 'row', alignItems: 'center', width: '100%', padding: 10,}}>
					<base.Form style={{flex: 7, flexDirection: 'column', width: '100%'}}>
						<base.Item regular style={{
							flex: 1,
							borderRadius: 10,
							width: '100%',
							height: 50,
							margin: 10
							}}><base.Text style={{fontFamily: 'Nanum', color: 'grey', fontSize: SIZE_SUBFONT, padding: 10}}>위도 : {this.state.latitude}</base.Text></base.Item>
						<base.Item regular style={{
							flex: 1,
							borderRadius: 10,
							width: '100%',
							height: 50,
							margin: 10
						}}><base.Text style={{fontFamily: 'Nanum', color: 'grey', fontSize: SIZE_SUBFONT, padding: 10}}>경도 : {this.state.longitude}</base.Text></base.Item>
					</base.Form>
					<base.Form style={{flex: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
						<base.Icon onPress={this.getLocation} name='ios-compass' style={{color:'#006eee',fontSize: 40}}/>
						<base.Text style={{fontFamily: 'Nanum', fontSize: SIZE_SUBFONT}}>위치정보{'\n'}불러오기</base.Text>
					</base.Form>
				</base.Form>
				<base.Button block onPress={this.registerShip} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
					<base.Text style={{color: 'black'}}>등록하기</base.Text>
				</base.Button>
			</base.Form>
		)
	}
	
	render(){
		switch(this.state.clicked){
			case 0:{
				this.pickPhoto();
				this.setState({clicked: null});
				break;
			}
			case 1:{
				this.pickImage();
				this.setState({clicked: null});
				break;
			}
			case 2:{
				this.setState({clicked: null});
				break;
			}
		}
		let detailInput
		if(this.state.flag == 'Normal') {
			detailInput = this.normalInput()
		}
		else if(this.state.flag == 'Wasted') {
			detailInput = this.wastedInput()
		}
		return(
			<base.Root>
				<base.Container>
					<base.Header style={{backgroundColor: 'white'}}>
						<base.Left style={{flex: 1,}}>
							<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
								<base.Icon name='arrow-back' style={{color: 'black'}}/>
							</base.Button>
						</base.Left>
						<base.Form style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center',}}>
							<base.Segment style={{backgroundColor: '#006eee', borderRadius: 10, width: '100%'}}>
								<base.Button first active={this.state.flag == 'Normal'} onPress={() => this.setState({flag: 'Normal'})}>
									<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}>일반선박</base.Text>
								</base.Button>
								<base.Button last active={this.state.flag == 'Wasted'} onPress={() => this.setState({flag: 'Wasted'})}>
									<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}>유기선박</base.Text>
								</base.Button>
							</base.Segment>
						</base.Form>
					</base.Header>
					<base.Content>
				    	<Loading visible={this.state.loadingVisible}/>
						<base.Form style={{width:'100%', height: SIZE_IMG_HEIGHT, borderBottomWidth: 1, borderColor: '#DDD', flexDirection: 'column',}}>
							<base.Form style={{flex: 1, height: SIZE_IMG_HEIGHT, width:'100%',}}>
								<SliderBox
									images={this.state.images}
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
									buttonIndex => {this.setState({ clicked: buttonIndex });}
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
		);
	}
}