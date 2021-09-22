import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, FlatList, Alert, Dimensions } from 'react-native';
import * as base from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { SliderBox } from "react-native-image-slider-box";
import { registerCommonShipImages } from '../../utils/shipInfoRequest';
import Loading from '../../utils/loading';

import { connect } from 'react-redux';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_IMG_HEIGHT = Dimensions.get('screen').height * 0.35
const SIZE_SUBFONT = Dimensions.get('screen').height * 0.015

let BUTTONS = [
  { text: "카메라로 등록하기", icon: "ios-camera", iconColor: "grey",},
  { text: "갤러리에서 등록하기", icon: "ios-images", iconColor: "grey" },
  { text: "취소", icon: "close", iconColor: "grey" }
];
let DESTRUCTIVE_INDEX = 2;
let CANCEL_INDEX = 2;

const RegisterCommonShipImages = (props) => {

	const [id, set_id] = useState(props.navigation.getParam('id'))
	const [name, set_name] = useState(props.navigation.getParam('name'))
	const [images, set_images] = useState([])
	const [clicked, set_clicked] = useState('')

	const [loadingVisible, set_loadingVisible] = useState(false)
	const [needLoadingPercent, set_needLoadingPercent] = useState(false)
	const [load, set_load] = useState(0)
	const [sum, set_sum] = useState(0)

	const pickPhoto = async () => {
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
					set_images(images.concat(result.uri))
				})
			})
	}
	
	const pickImage = async() => {
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
				set_images(images.concat(result.uri))
			})
		})
	}

	const registerImages = () => {
		if(images.length == 0) {
			Alert.alert(
				'선박확인체계 알림',
				'추가할 사진을 등록하세요',
			)	
		}
		else {
			set_loadingVisible(true)
			set_needLoadingPercent(true)
			set_sum(images.length)
			images.map((data, index) => {
				const formdata = new FormData()					
				formdata.append("id", id);
				formdata.append('image_data', {name: 'ship.jpg', type: 'image/jpeg', uri: data})
				registerCommonShipImages(props.token, formdata).then((response) => {
					set_load(load + 1)
					if(index + 1 == images.length){
						set_loadingVisible(false)
						Alert.alert(
							'선박확인체계 알림',
							name + ' 선박 사진 ' + images.length + '장이 추가등록되었습니다',
						)
						props.navigation.navigate('DetailCommonShip', {id: id})
					}
				}).catch((err) => {
					console.log('실패')
				})
			})
		}
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

	return (
		<base.Container>
			<base.Header style={{backgroundColor: 'white'}}>
				<base.Left>
					<base.Button transparent onPress={() => props.navigation.goBack()}>
						<base.Icon name='arrow-back' style={{color: 'black'}}/>
					</base.Button>
				</base.Left>
				<base.Right>
				</base.Right>
			</base.Header>
			<base.Content>
				<Loading visible={loadingVisible} needLoadingPercent={needLoadingPercent} load={load} sum={sum}  initialRoute={false} onPress={() => props.navigation.goBack()}/>
				<base.Root>
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
						style={{position: 'absolute', right: 10, bottom: 10, backgroundColor: 'white', width: 60, height: 60, elevation: 6}}  
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
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>선박사진 추가등록</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey',}}>추가할 선박의 사진을 등록하세요</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT, marginTop: 10, color: 'grey', fontWeight: 'bold'}}>* 여러 장의 사진 등록이 가능합니다</base.Text>
					</base.Form>
					<base.Button block onPress={registerImages} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
						<base.Text style={{color: 'black'}}>{images.length}장 등록하기</base.Text>
					</base.Button>
					<base.Form sylle={{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%',margin: 10,}}>
						<FlatList
							data={images}
							numColumns={3}
							renderItem={({item}) => <Image resizeMode='cover' source={{uri: item}} style={{flex: 1 / 3, width: '100%', height: 150,}}/>}
						/>
					</base.Form>
				</base.Root>
			</base.Content>
		</base.Container>
	)
}

const mapStateToProps = (state) => {
	return {
        token: state.userInfo.token,
		detailCommonShip: state.detailCommonShip,
	}
}

export default connect(mapStateToProps)(RegisterCommonShipImages)