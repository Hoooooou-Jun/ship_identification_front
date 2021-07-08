import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Image, FlatList, Alert, Dimensions } from 'react-native';
import * as base from 'native-base';
import { getToken } from '../../utils/getToken';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { SliderBox } from "react-native-image-slider-box";
import { registerWastedShipImages } from '../../utils/shipInfoRequest';
import Loading from '../../utils/loading';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_IMG_HEIGHT = Dimensions.get('screen').height * 0.35
const SIZE_SUBFONT = Dimensions.get('screen').height * 0.015

var BUTTONS = [
  { text: "카메라로 등록하기", icon: "ios-camera", iconColor: "grey",},
  { text: "갤러리에서 등록하기", icon: "ios-images", iconColor: "grey" },
  { text: "취소", icon: "close", iconColor: "grey" }
];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 2;

export default class RegisterWastedShipImages extends Component{
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			images: [],
			clicked: '',
			loadingVisible: false,
			
			needLoadingPercent: false,
			load: 0, sum: 0,
		};
		this.pickImage = this.pickImage.bind(this);
		this.pickPhoto = this.pickPhoto.bind(this);

		this.registerImages = this.registerImages.bind(this);
	}
	componentDidMount(){
		this.setState({id: this.props.navigation.getParam('id')})
	}

	async pickPhoto() {
		if(ImagePicker.getCameraPermissionsAsync()) ImagePicker.requestCameraPermissionsAsync()
		await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			base64: true,
			allowsEditing: true,
			quality: 1,
		}).then((result) => {
			ImageManipulator.manipulateAsync(
				result.uri,
				[{resize: {width: 400, height: 400}}],
				{base64: true, format: ImageManipulator.SaveFormat.JPEG}
			).then((result) => {
				this.setState({ images: this.state.images.concat(result.uri)})
			})
		})
	}
	
	async pickImage() {
		await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			base64: true,
			allowsEditing: true,
			quality: 1,
		}).then((result) => {
			ImageManipulator.manipulateAsync(
				result.uri,
				[{resize: {width: 400, height: 400}}],
				{base64: true, format: ImageManipulator.SaveFormat.JPEG}
			).then((result) => {
				this.setState({ images: this.state.images.concat(result.uri)})
			})
		})
	}

	registerImages(){
		if(this.state.images.length == 0){
			Alert.alert(
				'선박확인체계 알림',
				'추가할 사진을 등록하세요',
			)	
		}
		else{
			getToken().then((token) =>{
				this.setState({
					loadingVisible: true,
					needLoadingPercent: true,
					sum: this.state.images.length,
				})
				this.state.images.map((data, index)=>{
					const formdata = new FormData()					
					formdata.append("id", this.state.id);
					formdata.append('image_data', {name:'ship.jpg', type:'image/jpeg', uri: data})
						registerWastedShipImages(token, formdata).then((response) =>{
							this.setState({load: this.state.load + 1})
							if(index + 1 == this.state.images.length){
								this.setState({loadingVisible: false})
								Alert.alert(
									'선박확인체계 알림',
									this.state.id + '번 유기선박 사진 ' + this.state.images.length + '장이 추가등록되었습니다',
								)
								this.props.navigation.popToTop()
								this.props.navigation.navigate('DetailWastedShip',{id: this.state.id})
							}
						}).catch((err) => {
							console.log('실패')
					})
				})
			})
		}
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
		return(
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
				<base.Content>
					<Loading visible={this.state.loadingVisible} needLoadingPercent={this.state.needLoadingPercent} load={this.state.load} sum={this.state.sum}  initialRoute={false} onPress={()=>this.props.navigation.goBack()}/>
					<base.Root>
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
							style={{position: 'absolute', right: 10, bottom: 10, backgroundColor: 'white', width: 60, height: 60, elevation: 6}} 
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
							<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>선박사진 추가등록</base.Text>
							<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey',}}>추가할 선박의 사진을 등록하세요</base.Text>
							<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT, marginTop: 10, color: 'grey', fontWeight: 'bold'}}>* 여러 장의 사진 등록이 가능합니다</base.Text>
						</base.Form>
						<base.Button block onPress={this.registerImages} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
							<base.Text style={{color: 'black'}}>{this.state.images.length}장 등록하기</base.Text>
						</base.Button>
						<base.Form sytle={{justifyContent: 'center', alignItems: 'center', width: '100%', margin: 10,}}>
							<FlatList
								sytle={{flex:1, width: '100%', height: 250, justifyContent: 'center', alignItems: 'center',}}
								data={this.state.images}
								numColumns={3}
								renderItem={({item}) => <Image resizeMode='cover' source={{uri:item}} style={{flex: 1 / 3, width: '100%', height: 150,}}/>}
							/>
						</base.Form>
					</base.Root>
				</base.Content>
			</base.Container>
		);
	}
}