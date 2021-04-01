import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Image, FlatList, Alert } from 'react-native';
import * as base from 'native-base';
import { getToken } from '../../utils/getToken';
import {} from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { SliderBox } from "react-native-image-slider-box";
import { registerCommonShipImages } from '../../utils/shipInfoRequest';
var BUTTONS = [
  { text: "카메라로 등록하기", icon: "ios-camera", iconColor: "grey",},
  { text: "갤러리에서 등록하기", icon: "ios-images", iconColor: "grey" },
  { text: "취소", icon: "close", iconColor: "grey" }
];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 2;

export default class RegisterCommonShipImages extends Component{
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			images: [],
			base64: [],
			clicked: '',
		};
		this.pickImage = this.pickImage.bind(this);
		this.pickPhoto = this.pickPhoto.bind(this);

		this.registerImages = this.registerImages.bind(this);
	}
	componentDidMount(){
		this.setState({
			id: this.props.navigation.getParam('id'),
			name: this.props.navigation.getParam('name'),
		})
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
			ImageManipulator.manipulateAsync(
				result.uri,
				[{resize: {width: 400, height: 400}}],
				{base64: true, format: ImageManipulator.SaveFormat.JPEG}
			).then((result) => 
			{
				this.setState({ images: this.state.images.concat(result.uri)})
				this.setState({ base64: this.state.base64.concat(result.base64)})
			}
			)
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
			ImageManipulator.manipulateAsync(
				result.uri,
				[{resize: {width: 400, height: 400}}],
				{base64: true, format: ImageManipulator.SaveFormat.JPEG}
				).then((result) => 
				{
					this.setState({ images: this.state.images.concat(result.uri)})
					this.setState({ base64: this.state.base64.concat(result.base64)})
				}
			)
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
				registerCommonShipImages(token, this.state.id, this.state.base64).then((response) => {
					if(response.status == 200){
						Alert.alert(
							'선박확인체계 알림',
							this.state.name + ' 선박사진 ' + this.state.images.length + '장이 추가등록되었습니다',
						)
						this.props.navigation.popToTop()
					}
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
				<base.Header style={{backgroundColor: '#006eee'}}>
					<base.Left>
						<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
							<base.Icon name='arrow-back'/>
						</base.Button>
					</base.Left>
					<base.Right>
						<base.Title style={{fontFamily:'Nanum'}}>{this.state.name} 선박 사진 추가등록</base.Title>
					</base.Right>
				</base.Header>
				<base.Content>
					<base.Root>
						<base.Form style={{margin: 10,}}>
							<base.Text style={{fontFamily:'Nanum', fontSize: 40, color: '#006eee', margin: 5}}>선박사진 추가등록</base.Text>
							<base.Text style={{fontFamily:'Nanum', fontSize: 20, margin: 5}}>추가할 선박의 사진을 등록하세요</base.Text>
							<base.Text style={{fontFamily:'Nanum', fontSize: 15, margin: 5}}>* 여러 장의 사진 등록이 가능합니다</base.Text>
						</base.Form>
						<base.Form style={{width:'100%', height: 300, borderBottomWidth: 1, borderColor: '#DDD', flexDirection: 'column',}}>
							<base.Form style={{flex: 1, height: 300, width:'100%',}}>
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
							style={{position: 'absolute', right: 10, bottom: '5%', backgroundColor: 'white', width: 60, height: 60,
								shadowColor: 'rgba(0, 0, 0, 0.1)', shadowOpacity: 0.8, elevation: 6, shadowRadius: 15 , shadowOffset : { width: 1, height: 13},}}  
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
						<base.Button block onPress={this.registerImages} style={{backgroundColor: '#006eee', margin: 10,}}>
							<base.Text style={{fontFamily: 'Nanum'}}>선박사진 {this.state.images.length}장 추가등록하기</base.Text>
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