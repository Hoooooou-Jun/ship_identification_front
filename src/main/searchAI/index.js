import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Dimensions, Image, FlatList, Alert } from 'react-native';
import * as base from 'native-base';
import { Picker } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { requestAIResult, registerCommonShipImages, registerWastedShipImages } from '../../utils/shipInfoRequest';
import ShowShip from './showShip';
import Loading from '../../utils/loading';
import { KindsOfSearchUnit } from '../../kindsOfData/kindsOfSearchUnit';
import { connect } from 'react-redux';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02

let BUTTONS = [
  { text: "카메라로 등록하기", icon: "ios-camera", iconColor: "#2c8ef4" },
  { text: "갤러리에서 등록하기", icon: "ios-images", iconColor: "#f42ced" },
  { text: "취소", icon: "close", iconColor: "#25de5b" }
];
let DESTRUCTIVE_INDEX = 2;
let CANCEL_INDEX = 2;

const SearchAI = (props) => {
	const [img, set_img] = useState('')
	const [data, set_data] = useState([])
	const [percentage, set_percentage] = useState([])
	const [functionOn, set_fuctionOn] = useState(false)
	const [clicked, set_clicked] = useState('')
	const [kinds, set_kinds] = useState([])
	const [unit, set_unit] = useState('2162')
	const [loadingVisible, set_loadingVisible] = useState(false)

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
				set_img(result.uri)
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
				set_img(result.uri)
			})
		})
	}
	const getAIResult = () => {
		if(img == '') {
			alert('검색할 사진을 등록하세요')
		}
		else {
			set_fuctionOn(true)
			set_percentage([])
			set_data([])
			set_loadingVisible(true)
			const formdata = new FormData()
			formdata.append('image_data', {name:'ship.jpg', type:'image/jpeg', uri: img})
			formdata.append('unit' , unit)
			requestAIResult(props.token, formdata).then((response) => {
				set_kinds(response.data.data.kinds)
				set_percentage(response.data.data.percent)
				set_data(response.data.data.result)
				set_loadingVisible(false)
			}) 
		}
	}
	const showShipDetail = (kinds, idx) => {
		if(kinds) { props.navigation.navigate('DetailCommonShip',{id: idx}) }
		else { props.navigation.navigate('DetailWastedShip',{id: idx}) }
	}
	const showAIResult = () => {
		return(
			<FlatList
				keyExtractor={(item, index) => index.toString()}
				style={{flex: 1, height: '100%'}}
				data={data}
				horizontal={true}
				renderItem=
				{({item, index}) => 
					<ShowShip ship={item} percent={percentage[index]}
					kinds={kinds[index]} onPress={() => showShipDetail(kinds[index], item.id)}
					onPress_registerIMG={() => registerImage(kinds[index], item)}/>
				}
			/>
		)
	}
	const registerImage = (flag, ship) => {
		Alert.alert(
			'선박확인체계 알림',
			'해당 사진을 추가등록하시겠습니까?',
			[{
				text: "네",
				onPress: () => {
					set_loadingVisible(true)
					const formdata = new FormData()	
					if(flag) {				
						formdata.append("id",  ship.id);
						formdata.append('image_data', {name:'ship.jpg', type:'image/jpeg', uri: img})
						registerCommonShipImages(props.token, formdata).then((response) =>{
							set_loadingVisible(false)
							Alert.alert(
								'선박확인체계 알림',
								ship.name + ' 선박 사진으로 추가등록되었습니다',
							)
							props.navigation.popToTop()
						}).catch((err) => {
							console.log('실패')
						})
					}
					else {				
						formdata.append("id", ship.id);
						formdata.append('image_data', {name:'ship.jpg', type:'image/jpeg', uri: img})
							registerWastedShipImages(props.token, formdata).then((response) =>{
								set_loadingVisible(false)
								Alert.alert(
									'선박확인체계 알림',
									ship.id + '번 유기선박 사진으로 추가등록되었습니다',
								)
								props.navigation.popToTop()
							}).catch((err) => {
								console.log('실패')
						})
					}
				}
				},{
				text: "아니오",
				onPress: () => console.log("Cancel Pressed"),
			}]
		);
	}
	const waiting = () => {
		return (
			<base.Card style={{flex: 1,}}>
				<base.Form style={{alignItems:'center', justifyContent: 'center', flex: 1, height: '100%'}}>
					<base.Icon name='ios-pulse' style={{color:'#006eee',fontSize: 150}}/>
					<base.Text style ={{fontFamily:'Nanum',fontSize: 30}}>AI 분석 대기 모드</base.Text>
				</base.Form>
			</base.Card>
		)
	}
	const loading = () => {
		return (
			<base.Card style={{flex: 1,}}>
				<base.Form style={{alignItems:'center', justifyContent: 'center', flex: 1, height: '100%'}}>
					<base.Text style ={{fontFamily:'Nanum',fontSize: 30, margin: 10}}>선박 AI 데이터 분석 중</base.Text>
					<base.Text style ={{fontFamily:'Nanum',fontSize: 15}}>최대 45초 내외로 시간이 소요될 수 있습니다. </base.Text>
					<base.Spinner color='blue' />
				</base.Form>
			</base.Card>
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
	let AIResult
	if(data.length) { AIResult = showAIResult() }
	else if(functionOn) { AIResult = loading() }
	else { AIResult = waiting() }
	return (
		<base.Root>
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
				<base.Content contentContainerStyle={{flex: 1,}}>
					<Loading visible={loadingVisible} initialRoute={false} onPress={() => props.navigation.goBack()}/>
					<base.Form style={{padding: 10,}}>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>AI 검색</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, color: 'grey',}}>인공지능을 이용하여 촬영한 선박을 검색합니다.</base.Text>
					</base.Form>
					<base.Form style={{flex: 1, width: '100%', height: '100%', borderBottomWidth: 1, borderColor: '#DDD', flexDirection: 'column',}}>
					
						<Image source={img ? {uri: img} : null} style={{ flex: 1, width: '100%', height: '100%'}}/>
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
								buttonIndex => {set_clicked(buttonIndex)}
						)}>
							<base.Icon name='ios-images' style={{color:'#006eee', fontSize: 25}}/>
						</base.Button>
					</base.Form>
					<base.Form style={{alignItems: 'center'}}>
						<Picker
							selectedValue={unit}
							style={{width: '95%', height: '5%'}}
							onValueChange={(item) => set_unit(item)}>
							{ KindsOfSearchUnit.map((data) => { return <Picker.Item label={data.label} value={data.value} key={Math.random()}/> }) }
						</Picker>
					</base.Form>
					<base.Button block onPress={getAIResult} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6, height: '6%'}}>
						<base.Text style={{color: 'black'}}>AI 검색</base.Text>
					</base.Button>	
					<base.Form style={{flex: 2, width: '100%', height: '100%',}}>
						{AIResult}
					</base.Form>				
				</base.Content>
			<StatusBar hidden/>
			</base.Container>
		</base.Root>
	)
}

const mapStateToProps = (state) => {
	return {
        token: state.userInfo.token
    }
}

export default connect(mapStateToProps)(SearchAI)