import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Dimensions, Image, TouchableHighlight, FlatList } from 'react-native';
import * as base from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { getToken } from '../../utils/getToken';
import { requestAIResult } from '../../utils/shipInfoRequest';
import { requestDomain } from '../../utils/domain';
import { StackedBarChart } from 'react-native-svg-charts';
import ShowShip from './showShip';
var BUTTONS = [
  { text: "카메라로 등록하기", icon: "ios-camera", iconColor: "#2c8ef4" },
  { text: "갤러리에서 등록하기", icon: "ios-images", iconColor: "#f42ced" },
  { text: "취소", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 2;

const colors = ['#006eee', '#81d4fa']
const keys = [ 'value', 'remainder',]

export default class SearchAI extends Component{ 
	constructor(props) {
		super(props);
		this.state = {
			img: '0',
			base64: '0',
			data: [],
			percentage: [],
			functionOn: false,
			
			clicked: '',

			kinds: [], // true: CommonShip, false: WastedShip
		};
		this.pickPhoto = this.pickPhoto.bind(this);
		this.pickImage = this.pickImage.bind(this);
		this.getAIResult = this.getAIResult.bind(this);
		this.showShipDetail = this.showShipDetail.bind(this);
		
		this.showAIResult = this.showAIResult.bind(this);
		this.loading = this.loading.bind(this);
		this.waiting = this.waiting.bind(this);
	}
	
	async pickPhoto() {
		if(ImagePicker.getCameraPermissionsAsync()) ImagePicker.requestCameraPermissionsAsync()
		await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			base64: true,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		}).then((result) => {
			this.setState({img: result.uri})
			ImageManipulator.manipulateAsync(
				result.uri,
				[{resize: {width: 50, height: 50}}],
				{base64: true, format: ImageManipulator.SaveFormat.JPEG}
			).then((result) => {this.setState({base64: result.base64})})
	
		})
	}
	async pickImage() {
		await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			base64: true,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		}).then((result) => {
			this.setState({img: result.uri})
			ImageManipulator.manipulateAsync(
				result.uri,
				[{resize: {width: 50, height: 50}}],
				{base64: true, format: ImageManipulator.SaveFormat.JPEG}
			).then((result) => {
				this.setState({base64: result.base64})
			})
		})
	}
	getAIResult(){
		if(this.state.img == '') {
			alert('검색할 사진을 등록하세요')
		}
		else {
			this.setState({
				functionOn: true,
				percentage: [],
				data: [],
			})
			getToken().then((token) =>{
				requestAIResult(token, this.state.base64).then((response) => {
					this.setState({
						kinds: response.data.data.kinds,
						percentage: response.data.data.percent,
						data: response.data.data.result,
					})
				}) 
			})
		}
	}
	showShipDetail(kinds, idx){
		if(kinds){this.props.navigation.navigate('DetailCommonShip',{id: idx})}
		else{this.props.navigation.navigate('DetailWastedShip',{id: idx})}
	}
	showAIResult = () => {
		return(
			<FlatList
				sytle={{flex:1, height: '100%'}}
				data={this.state.data}
				horizontal={true}
				renderItem={({item, index}) => <ShowShip ship={item} percent={this.state.percentage[index]}
				kinds={this.state.kinds[index]} onPress={()=>this.showShipDetail(this.state.kinds[index], item.id)}/>}
			/>
		)
	}
	waiting = () => {
		return(
			<base.Card style={{flex: 1,}}>
				<base.Form style={{alignItems:'center', justifyContent: 'center', flex: 1, height: '100%'}}>
					<base.Icon name='ios-pulse' style={{color:'#006eee',fontSize: 150}}/>
					<base.Text style ={{fontFamily:'Nanum',fontSize: 30}}>AI 분석 대기 모드</base.Text>
				</base.Form>
			</base.Card>
		)
	}
	loading = () => {
		return(
			<base.Card style={{flex: 1,}}>
				<base.Form style={{alignItems:'center', justifyContent: 'center', flex: 1, height: '100%'}}>
					<base.Text style ={{fontFamily:'Nanum',fontSize: 30}}>선박 AI 데이터 분석 중</base.Text>
					<base.Spinner color='blue' />
				</base.Form>
			</base.Card>
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
				this.setState({clicked: null, img: ''});
				break;
			}
		}
		let AIResult
		if(this.state.data.length) { AIResult = this.showAIResult() }
		else if(this.state.functionOn) { AIResult = this.loading() }
		else { AIResult = this.waiting() }
		return(
			<base.Root>
				<base.Container>
						<base.Header style={{backgroundColor: 'white'}}>
							<base.Left>
							<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
								<base.Icon name='arrow-back' style={{color: 'black'}}/>
							</base.Button>
						</base.Left>
						<base.Right>
						</base.Right>
					</base.Header>
					<base.Content contentContainerStyle={{alignItems: 'center', justifyContent:'center', flex: 1,}}>
						<base.Form style={{width: '100%', alignItems: 'flex-start'}}>
							<base.Text style={{fontFamily:'Nanum', fontSize: 40, color: '#006eee', padding: 20}}>인공지능 검색</base.Text>
						</base.Form>
						<base.Form style={{flex: 1, width: '100%',height: '100%', borderBottomWidth: 1, borderColor: '#DDD', flexDirection: 'column',}}>
							<Image source={{uri:this.state.img}} style={{ flex: 1, width: '100%', height: '100%'}}/>
							<base.Button rounded
							style={{position: 'absolute', right: 10, bottom: '5%', backgroundColor: 'white', width: 60, height: 60,
								shadowColor: 'rgba(0, 0, 0, 0.1)', shadowOpacity: 0.8, elevation: 6, shadowRadius: 15 , shadowOffset : { width: 1, height: 13},}}  
								onPress={() =>
									base.ActionSheet.show(
									{
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
						<base.Form style={{flex: 2, width: '100%', height: '100%'}}>
							<base.Button block onPress={this.getAIResult} style={{backgroundColor: '#006eee', margin: 10}}>
								<base.Text style={{fontFamily:'Nanum',}}>인공지능 검색</base.Text>
							</base.Button>
							{AIResult}
						</base.Form>				
					</base.Content>
				</base.Container>
			</base.Root>
		);
	}
}