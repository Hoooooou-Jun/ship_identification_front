import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Dimensions, Clipboard } from 'react-native';
import * as base from 'native-base'
import Constants from 'expo-constants';

import { requestPasswordReset } from '../../utils/userInfoRequest';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Loading from '../../utils/loading'

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_FONT = Dimensions.get('screen').height * 0.02

const Lost = (props) => {
	const [srvno, setSrvno] = useState('')
	const [device_id, setDevice_Id] = useState(Constants.deviceId)
	const [certification, setCertification] = useState(false)
	const [newPassword, setNewPassword] = useState('')
	const [loadingVisible, setLoadingVisible] = useState(false)

	const getPassword = () => {
		setLoadingVisible(true)
		requestPasswordReset(srvno, device_id).then((response) => {
			Alert.alert(
				'선박확인체계 알림',
				'비밀번호가 초기화되었습니다.'
			)
			setNewPassword(response.data.message)
			setCertification(true)
		}).catch((error) => {
			const msg = error.response.data.message
			console.log(msg)
			if(msg == "Srvno isn't exist" ) {
				Alert.alert(
					'선박확인체계 알림',
					'아이디가 존재하지 않습니다.'
				)
			}
			else if(msg == "Device_id isn't match") {
				Alert.alert(
					'선박확인체계 알림',
					'사용자와 기기가 일치하지 않습니다.'
				)
			}
		})
		setLoadingVisible(false)
	}
	
	const copyToClipboard = () => {
		Alert.alert(
			'선박확인체계 알림',
			'비밀번호가 복사되었습니다.'
		)
		Clipboard.setString(newPassword)
	}

	return (
		certification ? (
			<base.Container>
			<Loading visible={loadingVisible} initialRoute={false} onPress={()=>props.navigation.goBack()}/>
				<base.Header style={{backgroundColor: 'white'}}>
					<base.Left>
						<base.Button transparent onPress={()=>props.navigation.goBack()}>
							<base.Icon name='arrow-back' style={{color: 'black'}}/>
						</base.Button>
					</base.Left>
					<base.Right>
					</base.Right>
				</base.Header>
				<base.Content padder contentContainerStyle={{flex: 1}}>
					<base.Form>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee'}}>비밀번호 초기화</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey'}}>{srvno} 님의 비밀번호가 초기화되었습니다. 하단의 비밀번호를 확인해주시기 바랍니다.</base.Text>
					</base.Form>
					<base.Form style={{flex: 5, justifyContent: 'center', alignItems: 'center'}}>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE}}>{newPassword}</base.Text>
						<TouchableOpacity style={{marginTop: 5}}onPress={copyToClipboard}>
							<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_FONT, color: 'skyblue'}}>클립보드에 저장</base.Text>
						</TouchableOpacity>
					</base.Form>
					<base.Form style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						<base.Button block style={{backgroundColor: '#006eee', marginTop: 10,}} onPress={()=>{props.navigation.popToTop();}}>
							<base.Text style={{fontFamily: 'Nanum'}}>로그인 화면으로 이동</base.Text>
						</base.Button>
					</base.Form>
				</base.Content>
			<StatusBar hidden/>
			</base.Container>
 		) : (
			<base.Container>
				<Loading visible={loadingVisible} initialRoute={false} onPress={()=>props.navigation.goBack()}/>
				<base.Header style={{backgroundColor: 'white'}}>
					<base.Left>
						<base.Button transparent onPress={()=>props.navigation.goBack()}>
							<base.Icon name='arrow-back' style={{color: 'black'}}/>
						</base.Button>
					</base.Left>
					<base.Right>
					</base.Right>
				</base.Header>

				<base.Content padder contentContainerStyle={{ flex: 1,}}>
					<base.Form>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee'}}>비밀번호 초기화</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey'}}>계정에 귀속된 디바이스 아이디를 이용하여 비밀번호를 초기화합니다.</base.Text>
					</base.Form>
					
					<base.Form style={{width: '100%',}}>
						<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10}}>
							<base.Input
								placeholder='아이디'
								onChangeText={setSrvno}
								style={{fontFamily:'Nanum'}}
								placeholderStyle={{fontFamily:'Nanum'}} />
						</base.Item>
					</base.Form>
					<base.Text style={{fontFamily: 'Nanum', color: 'grey'}}>* 회원가입 시 등록했던 기기가 다를 경우(휴대폰을 변경했을 경우) 042-832-7691로 문의해주시기 바랍니다.</base.Text>
					<base.Button block style={{backgroundColor: '#006eee', marginTop: 10,}} onPress={getPassword}>
						<base.Text style={{fontFamily: 'Nanum'}}>비밀번호 초기화</base.Text>
					</base.Button>
				</base.Content>

			<StatusBar hidden/>
			</base.Container>
		)
	)
}

export default Lost;