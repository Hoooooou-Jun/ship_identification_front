import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Dimensions, Image, FlatList } from 'react-native';
import * as base from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { getToken } from '../../utils/getToken';
import { requestAIResult } from '../../utils/shipInfoRequest';
import ShowShip from './showShip';
import Loading from '../../utils/loading';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_IMG_HEIGHT = Dimensions.get('screen').height * 0.35

var BUTTONS = [
  { text: "카메라로 등록하기", icon: "ios-camera", iconColor: "#2c8ef4" },
  { text: "갤러리에서 등록하기", icon: "ios-images", iconColor: "#f42ced" },
  { text: "취소", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 2;

export default class SearchAI extends Component{ 
	constructor(props) {
		super(props);
		this.state = {
			img: '',
			data: [],
			percentage: [],
			functionOn: false,
			
			clicked: '',

			kinds: [], // true: CommonShip, false: WastedShip

			loadingVisible: false,
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
			allowsEditing: true,
			quality: 1,
		}).then((result) => {
			ImageManipulator.manipulateAsync(
				result.uri,
				[{resize: {width: 500, height: 500}}],
				{format: ImageManipulator.SaveFormat.JPEG}
			).then((result) => {
				this.setState({img: result.uri})
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
				this.setState({img: result.uri})
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
				loadingVisible: true,
			})
			getToken().then((token) =>{
				const formdata = new FormData()	
				formdata.append('image_data', {name:'ship.jpg', type:'image/jpeg', uri: this.state.img})
				requestAIResult(token, formdata).then((response) => {
					this.setState({
						kinds: response.data.data.kinds,
						percentage: response.data.data.percent,
						data: response.data.data.result,
						loadingVisible: false,
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
					<base.Content contentContainerStyle={{flex: 1,}}>
						<Loading visible={this.state.loadingVisible}/>
						<base.Form style={{padding: 10,}}>
							<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>AI 검색</base.Text>
							<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey',}}>인공지능을 이용하여 촬영한 선박을 검색합니다</base.Text>
						</base.Form>
						<base.Form style={{flex: 1, width: '100%',height: '100%', borderBottomWidth: 1, borderColor: '#DDD', flexDirection: 'column',}}>
							<Image source={{uri:this.state.img}} style={{ flex: 1, width: '100%', height: '100%'}}/>
							<base.Button rounded
							style={{position: 'absolute', right: 10, bottom: 10, backgroundColor: 'white', width: 60, height: 60, elevation: 6,}}  
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
							<base.Button block onPress={this.getAIResult} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
								<base.Text style={{color: 'black'}}>AI 검색</base.Text>
							</base.Button>
							{AIResult}
						</base.Form>				
					</base.Content>
				</base.Container>
			</base.Root>
		);
	}
}