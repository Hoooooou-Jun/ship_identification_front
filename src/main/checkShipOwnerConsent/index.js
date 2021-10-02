import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Image, Dimensions, Alert } from 'react-native';
import * as base from 'native-base';
import ViewShot from 'react-native-view-shot';
import { registerShipOwner } from '../../utils/shipInfoRequest';
import { Asset } from 'expo-asset';
import Loading from '../../utils/loading';
import { connect } from 'react-redux';

const SIZE_TITLE = Dimensions.get('screen').height * 0.02
const SIZE_FONT = Dimensions.get('screen').height * 0.015
const SIZE_IMG = Dimensions.get('screen').width * 0.75

const CheckShipOwnerConsent = (props) => {
	const [name, set_name] = useState(props.navigation.getParam('name'))
	const [ship_id, set_ship_id] = useState(props.navigation.getParam('ship_id'))
	const [privacy_agree, set_privacy_agree] = useState(1)
	const [own_name, set_own_name] = useState(props.navigation.getParam('own_name'))
	const [phone, set_phone] = useState(props.navigation.getParam('phone'))
	const [address, set_address] = useState(props.navigation.getParam('address'))
	const [agreement_paper, set_agreement_paper] = useState('')
	const [own_img, set_own_img] = useState(props.navigation.getParam('own_img'))
	const [year, set_year] = useState(props.navigation.getParam('year'))
	const [month, set_month] = useState(props.navigation.getParam('month'))
	const [day, set_day] = useState(props.navigation.getParam('day'))
	const [signature, set_signature] = useState(props.navigation.getParam('signature'))
	const [loadingVisible, set_loadingVisible] = useState(false)

	const captureRef = useRef()

	const registerShipOwnerInfo = () => {
		set_loadingVisible(true)
		captureRef.current.capture()
		.then(uri => {
			const formdata = new FormData()
			formdata.append("ship_id", ship_id);
			formdata.append("own_name", own_name);
			formdata.append("phone", phone);
			formdata.append("address", address);
			formdata.append("privacy_agree", privacy_agree);
			const image = Asset.fromModule(require('../../../assets/img/empty.jpg'));
			if (own_img !== "") {
				formdata.append('own_img', {name:'ship.jpg', type:'image/jpeg', uri: own_img});
			} else {
				formdata.append('own_img', {name:'ship.jpg', type:'image/jpeg', uri: image.uri});
			}
			formdata.append('agreement_paper', {name:'ship.jpg', type:'image/jpeg', uri: uri});
			registerShipOwner(props.token, formdata).then((response)=>{
				set_loadingVisible(false)
				Alert.alert(
					'선박확인체계 알림',
					'선주정보가 등록되었습니다',
				)
				props.navigation.navigate('DetailCommonShip', {id: ship_id})
			}).catch((err) => {
				console.log(err)
				console.log('실패')
			})
		});
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
				<Loading visible={loadingVisible} initialRoute={false} onPress={() => props.navigation.goBack()}/>
				<ViewShot ref = {captureRef} options={{ format: 'jpg', quality: 0.9 }} style={{backgroundColor: 'white'}}>
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
								<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{name}</base.Text>
							</base.Form>
							<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start'}}>
								<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>선주명</base.Text>
								<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{own_name}</base.Text>
							</base.Form>
							<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start'}}>
								<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>연락처</base.Text>
								<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{phone}</base.Text>
							</base.Form>
							<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start'}}>
								<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>거주지</base.Text>
								<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{address}</base.Text>
							</base.Form>
							<base.Form style={{width: '100%', height: SIZE_IMG,  flexDirection: 'column', justifyContent: 'center', paddingBottom: 10}}>
								<base.Text style={{color: 'black', margin: 10, fontSize: SIZE_FONT, fontWeight: 'bold'}}>선주 사진</base.Text>
								<Image source={own_img ? {uri: own_img} : null} style={{flex: 1, width: SIZE_IMG, height: SIZE_IMG, borderWidth: 1, borderColor: '#DDD', alignSelf: 'center'}}/>
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
					<base.Form style={{padding: 10,}}>
						<base.Text style={{fontWeight: 'bold'}}>서명란</base.Text>
						<base.Form>
							<base.Form style={{width: 200, transform: [{ rotate: '90deg' }], justifyContent: 'center', alignSelf: 'center'}}>
								<Image resizeMode={"contain"} style={{ width: 200, height: 300, }} source={signature ? {uri: signature} : null} />
							</base.Form>
						</base.Form>
					</base.Form>
				</ViewShot>
				<base.Button block onPress={registerShipOwnerInfo} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
					<base.Text style={{color: 'black'}}>선주정보 등록하기</base.Text>
				</base.Button>
			</base.Content>
		</base.Container>
	)
}

const mapStateToProps = (state) => {
	return {
        token: state.userInfo.token
    }
}

export default connect(mapStateToProps)(CheckShipOwnerConsent)