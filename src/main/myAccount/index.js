import React, { useEffect, useState } from 'react';
import { Image, Dimensions, Alert, TouchableOpacity } from 'react-native';
import * as base from 'native-base';
import { Picker } from 'native-base';
import { connect } from 'react-redux'
import { Feather } from '@expo/vector-icons';
import { requestCertification } from '../../utils/userInfoRequest';

import { KindsOfUnit } from '../../kindsOfData/kindsOfUnit';
import { KindsOfRank } from '../../kindsOfData/kindsOfRank';

import styles from './styles';

const SIZE_LOGO = Dimensions.get('screen').height * 0.3
const SIZE_TITLE = Dimensions.get('screen').height * 0.02
const SIZE_FONT = Dimensions.get('screen').height * 0.015
const SIZE_SUBFONT = Dimensions.get('screen').height * 0.015

const MyAccount = (props) => {
	const [edit, setEdit] = useState(false)
	const [rank, setRank] = useState(props.userInfo.rank)
	const [unit, setUnit] = useState(props.userInfo.unit)
	const [position, setPosition] = useState('')
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const [pwCertification, setPwCertification] = useState(false)
	const [newPassword, setNewPassword] = useState('')
	const [newPasswordCheck, setNewPasswordCheck] = useState('')
	const [passwordCheck, setPasswordCheck] = useState(false)

	const onBack = () => {
		Alert.alert(
			"선박확인체계 알림",
			"작성을 취소하시겠습니까?",
			[
				{
					text: "예",
					onPress: () => props.navigation.goBack(),
				},
				{ 
					text: "아니오"
				}
			]
		)
	}
	
	const onEdit = () => {
		setEdit(true)
		Alert.alert(
			'선박확인체계 알림',
			'수정할 정보를 입력하세요.'
		)
	}

	const onSave = () => {
		setEdit(false)
		Alert.alert(
			'선박확인체계 알림',
			'수정이 완료되었습니다.'
		)
	}

	const onCertification = () => {
		if(password == props.userInfo.password) {
			setPwCertification(true)
			Alert.alert(
				'선박확인체계 알림',
				'비밀번호가 인증되었습니다.'
			)
		}
		else {
			Alert.alert(
				'선박확인체계 알림',
				'비밀번호를 다시 확인해주시기 바랍니다.'
			)
		}
	}

	const checkPassword = () => {
		if(newPassword == newPasswordCheck) {
			setPasswordCheck(true)
			Alert.alert(
				'선박확인체계 알림',
				'비밀번호가 확인되었습니다.'
			)
		}
		else {
			Alert.alert(
				'선박확인체계 알림',
				'비밀번호가 일치하지 않습니다.'
			)
		}
	}

	const editUserInfo = () => {
		if(pwCertification == false) {
			Alert.alert(
				"선박확인체계 알림",
				"비밀번호를 제외한 수정된 정보를 저장하시겠습니까?",
				[
					{
						text: "예",
						// onPress: () => 
						// {
						// 	setEdit(false)
						// 	Alert.alert(
						// 	'선박확인체계 알림',
						// 	'저장이 완료되었습니다.'
						// 	)
						// },
					},
					{ 
						text: "아니오"
					}
				]
			)
		}
		else {

		}
	}

	if(edit == false) {
		return (
			<base.Container>
				<base.Header style={{backgroundColor: 'white'}}>
					<base.Left>
						<base.Button transparent onPress={() => props.navigation.goBack()}>
							<base.Icon name='arrow-back' style={{color: 'black'}}/>
						</base.Button>
					</base.Left>
					<base.Right>
						<base.Button transparent onPress={onEdit}>
							<Feather name="edit" size={25} color="black" />
						</base.Button>
					</base.Right>
				</base.Header>
				<base.Content padder>
					<base.Form style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', margin: 10}}>
						<base.Form style={{backgroundColor:'white', borderRadius: SIZE_LOGO / 2, justifyContent: 'center', alignItems: 'center', width: SIZE_LOGO, height: SIZE_LOGO, elevation: 6}}>
							<Image source={require('../../../assets/img/logo_Army.jpg')} style={{width: SIZE_LOGO / 3 * 2, height: SIZE_LOGO / 3 * 2}}/>
						</base.Form>
					</base.Form>
					<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
						<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>이름</base.Text>
						<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.userInfo.name}</base.Text>
					</base.Form>
					<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
						<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>ID</base.Text>
						<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.userInfo.srvno}</base.Text>
					</base.Form>
					<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
						<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>계급</base.Text>
						<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.userInfo.rank}</base.Text>
					</base.Form>
					<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
						<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>소속</base.Text>
						<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>제32보병사단 {props.userInfo.unit}</base.Text>
					</base.Form>
					<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
						<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>직책</base.Text>
						<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.userInfo.position}</base.Text>
					</base.Form>
					<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
						<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>연락처</base.Text>
						<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.userInfo.phone}</base.Text>
					</base.Form>
					<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
						<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>기기정보</base.Text>
						<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{props.userInfo.device_id}</base.Text>
					</base.Form>		
				</base.Content>
			</base.Container>
		)
	}
	else {
		return (
			<base.Container>
				<base.Header style={{backgroundColor: 'white'}}>
					<base.Left>
						<base.Button transparent onPress={onBack}>
							<base.Icon name='arrow-back' style={{color: 'black'}}/>
						</base.Button>
					</base.Left>
					<base.Right>
						<base.Button transparent onPress={onSave}>
							<Feather name="save" size={25} color="black" />
						</base.Button>
					</base.Right>
				</base.Header>
				<base.Content padder>
					<base.Form style={{marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
							<base.Text style={{fontSize: SIZE_TITLE, alignSelf:'flex-start'}}>계급</base.Text>
							<Picker
								selectedValue={rank}
								style={{height: 40, width: '100%'}}
								onValueChange={(itemValue) => setRank(itemValue) }>
								{ KindsOfRank.map((data)=>{ return <Picker.Item label={data.value} value={data.value} key={Math.random()} /> }) }
							</Picker>
						</base.Item>							
					</base.Form>
					<base.Form style={{marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
							<base.Text style={{fontSize: SIZE_TITLE, alignSelf:'flex-start'}}>소속부대 (제32보병사단)</base.Text>
							<Picker
								selectedValue={unit}
								style={{height: 50, width: '100%'}}
								onValueChange={(itemValue) => setUnit(itemValue) }>
								{ KindsOfUnit.map((data)=>{ return <Picker.Item label={data.label} value={data.value} key={Math.random()} /> }) }
							</Picker>				
						</base.Item>							
					</base.Form>
					<base.Form style={{marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
							<base.Text style={{fontSize: SIZE_TITLE, alignSelf:'flex-start'}}>직책</base.Text>
							<base.Input
								placeholder={props.userInfo.position}
								onChangeText={setPosition}
								style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
								placeholderStyle={{fontFamily:'Nanum'}}
								/>
						</base.Item>
					</base.Form>
					<base.Form style={{marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
							<base.Text style={{fontSize: SIZE_TITLE, alignSelf:'flex-start'}}>연락처</base.Text>
							<base.Input
								placeholder={props.userInfo.phone}
								onChangeText={setPhone}
								style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
								placeholderStyle={{fontFamily:'Nanum'}}
								keyboardType="number-pad"
								/>
						</base.Item>
					</base.Form>
					{pwCertification ||
					<base.Form style={{marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20}}>
							<base.Text style={{fontSize: SIZE_TITLE, alignSelf:'flex-start'}}>비밀번호 변경하기</base.Text>
							<base.Form style={{flexDirection: 'row'}}>
								<base.Input
									placeholder='현재 비밀번호를 입력해주시기 바랍니다.'
									onChangeText={setPassword}
									style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
									placeholderStyle={{fontFamily:'Nanum'}}
									secureTextEntry={ true }
									/>
								<TouchableOpacity style={{marginRight: 20}} onPress={onCertification}>
									<base.Text style={{fontFamily: 'Nanum', fontSize: SIZE_SUBFONT, color: 'skyblue', marginTop: '40%', marginRight: -10}}>인증하기</base.Text>
								</TouchableOpacity>
							</base.Form>
						</base.Item>
					</base.Form>}
					{pwCertification &&
						<base.Form style={{marginVertical: 15}}>
							<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
								<base.Text style={{fontSize: SIZE_TITLE, alignSelf:'flex-start'}}>비밀번호 변경하기</base.Text>
								<base.Input
									placeholder='새 비밀번호를 입력해주시기 바랍니다.'
									onChangeText={setNewPassword}
									style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
									placeholderStyle={{fontFamily:'Nanum'}}
									secureTextEntry={ true }
									/>
							</base.Item>
							<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
								<base.Text style={{fontSize: SIZE_TITLE,}}></base.Text>
								<base.Form style={{flexDirection: 'row'}}>
									<base.Input
										placeholder='비밀번호를 다시 입력해주시기 바랍니다.'
										onChangeText={setNewPasswordCheck}
										style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT, marginLeft: '-1%', marginTop: '-2%' }}
										placeholderStyle={{fontFamily:'Nanum'}}
										secureTextEntry={ true }
										/>
									<TouchableOpacity style={{marginRight: 20}} onPress={checkPassword}>
										<base.Text style={{fontFamily: 'Nanum', fontSize: SIZE_SUBFONT, color: 'skyblue', marginTop: '40%', marginRight: -10}}>확인하기</base.Text>
									</TouchableOpacity>
								</base.Form>
							</base.Item>
						</base.Form>}
				</base.Content>
			</base.Container>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps)(MyAccount);