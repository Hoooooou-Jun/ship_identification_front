import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Image, Modal, Dimensions } from 'react-native';
import * as base from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import Loading from '../../utils/loading';

import SignatureScreen from 'react-native-signature-canvas-fixed';
import * as FileSystem from 'expo-file-system';

const SIZE_TITLE = Dimensions.get('screen').height * 0.02
const SIZE_FONT = Dimensions.get('screen').height * 0.015
const SIZE_IMG = Dimensions.get('screen').width * 0.75

let BUTTONS = [
  { text: "카메라로 등록하기", icon: "ios-camera", iconColor: "grey",},
  { text: "갤러리에서 등록하기", icon: "ios-images", iconColor: "grey" },
  { text: "취소", icon: "close", iconColor: "grey" }
];
let DESTRUCTIVE_INDEX = 2;
let CANCEL_INDEX = 2;
let currentDay = new Date()

const RegisterShipOwner = (props) => {
	const [name, set_name] = useState(props.navigation.getParam('name'))
	const [ship_id, set_ship_id] = useState(props.navigation.getParam('id'))
	const [privacy_agree, set_privacy_agree] = useState(false)
	const [own_name, set_own_name] = useState('     ')
	const [phone, set_phone] = useState('')
	const [address, set_address] = useState('')
	const [agreement_paper, set_agreement_paper] = useState('')
	const [own_img, set_own_img] = useState('')
	const [year, set_year] = useState(currentDay.getFullYear())
	const [month, set_month] = useState(currentDay.getMonth())
	const [day, set_day] = useState(currentDay.getDate())
	const [clicked, set_clicked] = useState(null)
	const [visible, set_visible] = useState(false)
	const [signature, set_signature] = useState(null)

	const sign = useRef()
	
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
					set_own_img(own_img.concat(result.uri))
				})
			})
	}
	
	const pickImage = async () => {
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
				set_own_img(own_img.concat(result.uri))
			})
		})
	}

	const handleSignature = signature => {
		set_signature(signature)
		const path = FileSystem.cacheDirectory + 'sign.png';
		FileSystem.writeAsStringAsync(path, signature.replace('data:image/png;base64,', ''), {encoding: FileSystem.EncodingType.Base64})
			.then(res => {
				console.log(res);
				FileSystem.getInfoAsync(path, {size: true, md5: true}).then(file => {
					console.log(file);
				})
			}).catch(err => {
				console.log("err", err);
			})
		set_visible(false)
	};

	switch(clicked) {
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
			set_clicked(null)
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
			<base.Content padder>
			<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
					<base.Text style={{color: 'black', margin: 10, fontSize: SIZE_TITLE, fontWeight: 'bold'}}>개인정보 수집ㆍ활용 동의서</base.Text>
				</base.Form>
				<base.Form style={{width: '100%'}}>
					<base.Form style={{ width:'100%', flexDirection: 'column', alignItems: 'flex-start'}}>
						<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT,}}>
							『 개인정보보호법 』등 관련 법규에 의거하여 앱 선박확인체계는 선주님의 개인정보 수집 및 활용에 대해 개인정보 수집ㆍ활용 동의서를 받고 있습니다
						</base.Text>
						<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT,}}>
							개인정보 제공자가 동의한 내용 외의 다른 목적으로 활용하지 않으며, 제공된 개인정보의 이용을 거부하고자 할 때에는 개인정보 관리책임자를 통해 
							열람, 정정, 삭제를 요구할 수 있습니다.
						</base.Text>
						
						<base.Text style={{flex: 1, margin: 10, fontSize: SIZE_FONT, color: 'red'}}>
							제공된 개인정보는 앱 선박확인체계 내에서 제한된 범위에서만 활용합니다
						</base.Text>
					</base.Form>
					<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start', elevation: 6, backgroundColor: 'white'}}>
						<base.Text style={{margin: 10, fontWeight: 'bold'}}>개인정보항목</base.Text>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start'}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>선박명</base.Text>
							<base.Text style={{flex: 4, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{name}</base.Text>
						</base.Form>
						<base.Form style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start'}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>선주명</base.Text>
							<base.Item style={{flex: 4, borderColor: '#006eee', marginRight: 10}}>
								<base.Input
									placeholder="선주명을 입력하세요"
									onChangeText={set_own_name}
									style={{fontFamily:'Nanum', fontSize: SIZE_FONT}}
									placeholderStyle={{fontFamily:'Nanum'}}
									/>
							</base.Item>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start'}}>
							<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>연락처</base.Text>
							<base.Item style={{flex: 4, borderColor: '#006eee', marginRight: 10}}>
								<base.Input
									placeholder="선주 연락처을 입력하세요"
									onChangeText={set_phone}
									style={{fontFamily:'Nanum', fontSize: SIZE_FONT}}
									placeholderStyle={{fontFamily:'Nanum'}}
									keyboardType="number-pad"/>
							</base.Item>
						</base.Form>
						<base.Form style={{ width:'100%', flexDirection: 'column', alignItems: 'flex-start'}}>
							<base.Text style={{color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>거주지</base.Text>
							<base.Form style={{width: '100%', paddingHorizontal: 10}}>
								<base.Textarea rowSpan={3} bordered onChangeText={set_address} placeholder="선주 거주지를 입력하세요"
									style={{width: '100%', fontFamily: 'Nanum', borderRadius: 10, padding: 10, fontSize: SIZE_FONT}}/>
							</base.Form>
						</base.Form>
						<base.Form style={{width: '100%', height: SIZE_IMG,  flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingBottom: 10}}>
							<base.Form style={{width: '100%'}}>
								<base.Text style={{color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>선주 사진</base.Text>
							</base.Form>
							<base.Root>
								<Image source={own_img ? {uri: own_img} : null} style={{flex: 1, width: SIZE_IMG, height: SIZE_IMG, borderWidth: 1, borderColor: '#DDD',}}/>
								<base.Button rounded
								style={{position: 'absolute', right: 10, bottom: 10, backgroundColor: 'white', width: 60, height: 60, elevation: 6,}}  
									onPress={() =>
										base.ActionSheet.show(
										{
											options: BUTTONS,
											cancelButtonIndex: CANCEL_INDEX,
											destructiveButtonIndex: DESTRUCTIVE_INDEX,
											title: "선주 사진 등록"
										},
										buttonIndex => {set_clicked(buttonIndex)}
								)}>
									<base.Icon name='ios-images' style={{color:'#006eee', fontSize: 25}}/>
								</base.Button>
							</base.Root>
						</base.Form>
					</base.Item>
					<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start', elevation: 6, backgroundColor: 'white'}}>
						<base.Text style={{margin: 10, fontWeight: 'bold'}}>개인정보 수집ㆍ활용 목적</base.Text>
						<base.Form style={{padding: 10, marginHorizontal: 10}}>
							<base.Text style={{fontWeight: 'bold', fontSize: SIZE_FONT}}>[ 개인정보 수집 항목 ]</base.Text>
							<base.Text style={{fontSize: SIZE_FONT, marginLeft: 10}}>선박정보, 선주명, 선주 연락처, 선주 거주지, 선주 사진</base.Text>
						</base.Form>
						<base.Form style={{padding: 10, marginHorizontal: 10}}>
							<base.Text style={{fontWeight: 'bold', fontSize: SIZE_FONT}}>[ 개인정보 이용목적 ]</base.Text>
							<base.Text style={{fontSize: SIZE_FONT, marginHorizontal: 10}}>● 지역 안보 목적으로 적 침투 및 밀입국 선박과 비교하기 위한 사진자료 확보</base.Text>
							<base.Text style={{fontSize: SIZE_FONT, marginHorizontal: 10}}>
								● 조업하고 계신 지역에 위치추적장비 미장착선박 또는 미상선박이 발견되면 군부대에서 선주님께 전화드려 
								선박의 위치추적장치가 정상작동되는지 문의드리기 위함
							</base.Text>
							<base.Text style={{fontSize: SIZE_FONT, marginHorizontal: 10}}>● 미상선박 근처에 계실 때 가능하실 경우 접근하여 선박의 형태를 확인요청드리기 위함</base.Text>
						</base.Form>
					</base.Item>
					
					<base.Form style={{ width:'100%', flexDirection: 'column', alignItems: 'center', marginVertical: 10}}>
						<base.Text style={{flex: 1, color: 'black', fontSize: SIZE_FONT,}}>
							『 개인정보보호법 』등 관련 법규에 의거하여
						</base.Text>
						<base.Text style={{flex: 1, color: 'black', fontSize: SIZE_FONT,}}>
							상기 본인은 위와 같이 개인정보 수집 및 활용에 동의합니다
						</base.Text>
					</base.Form>
					<base.Form style={{ width:'100%', flexDirection: 'column', alignItems: 'flex-end', margin: 10}}>
						<base.Text style={{fontSize: SIZE_FONT, marginRight: 20}}>{year}년 {month}월 {day}일</base.Text>
					</base.Form>
					<base.Form style={{ width:'100%', flexDirection: 'column', alignItems: 'flex-end', margin: 10}}>
						<base.Text style={{fontSize: SIZE_FONT, marginRight: 20}}>선주명 : {own_name}</base.Text>
					</base.Form>
				</base.Form>
				<Modal transparent={true} visible={visible}>
					<SignatureScreen
						ref={sign}
						onOK={handleSignature}
						rotated={true}
					/>
				</Modal>
				<base.Form style={{marginTop: 20}}>
					<base.Text style={{margin: 10, fontWeight: 'bold'}}>서명란</base.Text>
						<base.Text style={{flex: 1, margin: 10, fontSize: SIZE_FONT, color: 'red'}}>
							* 서명 시, 시계방향으로 90도 돌려 서명하세요
						</base.Text>
					<base.Form style={{flex: 1, height: 200, justifyContent: 'center', alignItems: 'center', padding: 10, }}>
							{signature ? (
							<base.Form style={{transform: [{ rotate: '90deg' }] }}>
								<Image
									resizeMode={"contain"}
									style={{ width: 200, height: 300, }}
									source={{ uri: signature }}
								/>
							</base.Form>

						) : <base.Form style={{ width: 300, height: 200, backgroundColor: 'gray',}}/>}
					</base.Form>
				</base.Form>
				<base.Button block onPress={() => set_visible(true)} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
					<base.Text style={{color: 'black'}}>서명하기</base.Text>
				</base.Button>
				<base.Button block style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}
					onPress={() => props.navigation.navigate('CheckShipOwnerConsent', {
						name: name,
						ship_id: ship_id,
						own_name: own_name,
						own_img: own_img,
						phone: phone,
						address: address,
						year: year, month: month, day: day,
						signature: signature,
					})} >
					<base.Text style={{color: 'black'}}>선주정보 등록하기</base.Text>
				</base.Button>
			</base.Content>
		</base.Container>
	)
}

export default RegisterShipOwner