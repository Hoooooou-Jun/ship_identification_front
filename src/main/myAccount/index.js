import React, { useEffect, useState } from 'react';
import { Image, Dimensions, Alert, TouchableOpacity } from 'react-native';
import * as base from 'native-base';
import { Picker } from 'native-base';
import { connect } from 'react-redux'
import { Feather } from '@expo/vector-icons';

import { editUserInfo } from '../../redux/userInfo/action';
import { requestEditUserData } from '../../utils/userInfoRequest';

import { KindsOfUnit_div, KindsOfUnit_31, KindsOfUnit_32, KindsOfUnit_35, KindsOfUnit_37, KindsOfUnit_39, KindsOfUnit_50, KindsOfUnit_53, KindsOfUnit_2 } from '../../kindsOfData/kindsOfUnit';
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
	const [div, setDiv] = useState('31')
	const [position, setPosition] = useState(props.userInfo.position)
	const [phone, setPhone] = useState(props.userInfo.phone)
	const [oldPassword, setOldPassword] = useState('')
	const [pwCertification, setPwCertification] = useState(false)
	const [newPassword, setNewPassword] = useState('')
	const [newPasswordCheck, setNewPasswordCheck] = useState('')
	const [passwordCheck, setPasswordCheck] = useState(false)

	useEffect(() => {
		setPasswordCheck(false)
	}, [newPassword, newPasswordCheck])

	useEffect(() => {
		switch(div) {
			case '31': {
				setUnit('31직할대')
				break;
			}
			case '32': {
				setUnit('직할대')
				break;
			}
			case '35': {
				setUnit('35직할대')
				break;
			}
			// case '37': {
			// 	setUnit('37직할대')
			// 	break;
			// }
			case '39': {
				setUnit('39직할대')
				break;
			}
			case '50': {
				setUnit('50직할대')
				break;
			}
			case '53': {
				setUnit('53직할대')
				break;
			}
			case '2': {
				setUnit('2직할대')
				break;
			}
		}
	}, [div])

	const onBack = () => {
		Alert.alert(
			"선박확인체계 알림",
			"작성을 취소하시겠습니까?",
			[
				{
					text: "예",
					onPress: () =>
					{
						onReset()
					},
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

	const onReset = () => {
		setEdit(false)
		setRank(props.userInfo.rank)
		setUnit(props.userInfo.unit)
		setPosition(props.userInfo.position)
		setPhone(props.userInfo.phone)
		setOldPassword('')
		setPwCertification(false)
		setNewPassword('')
		setNewPasswordCheck('')
		setPasswordCheck(false)
	}

	const onSave = () => {
		if(pwCertification == false) {
			Alert.alert(
				"선박확인체계 알림",
				"비밀번호가 인증되지 않았습니다. 비밀번호를 제외한 수정된 정보를 저장하시겠습니까?",
				[
					{
						text: "예",
						onPress: () => 
						{
							console.log(props.userInfo.device_id)
							requestEditUserData(props.userInfo.token, props.userInfo.device_id, rank, unit, position, phone, props.userInfo.password)
							.then((response) => {
								Alert.alert(
								'선박확인체계 알림',
								'저장이 완료되었습니다.'
								)
								setEdit(false)
								props.editUserInfo(
									props.userInfo.srvno,
									props.userInfo.password,
									props.userInfo.device_id,
									props.userInfo.token,
									props.userInfo.version,
									props.userInfo.name,
									rank,
									position,
									unit,
									phone,
									props.userInfo.level,
									)
								onReset()
							}).catch((error) => {
								const msg = error.response.data.message
								console.log(msg)
								if(msg == "Device_id isn't match") {
									Alert.alert(
										'선박확인체계 알림',
										'계정에 귀속된 디바이스 아이디가 일치하지 않습니다.'
									)
								}
								else {
									Alert.alert(
										'선박확인체계 알림',
										'잘못된 접근입니다.'
									)
								}
							})
						},
					},
					{ 
						text: "아니오"
					}
				]
			)
		}
		else {
			Alert.alert(
				"선박확인체계 알림",
				"비밀번호를 포함한 수정된 정보를 저장하시겠습니까?",
				[
					{
						text: "예",
						onPress: () => 
						{
							if(passwordCheck == true) {
								requestEditUserData(props.userInfo.token, props.userInfo.device_id, rank, unit, position, phone, newPassword)
								.then((response) => {
									Alert.alert(
										'선박확인체계 알림',
										'저장이 완료되었습니다.'
										)
									setEdit(false)
									props.editUserInfo(
										props.userInfo.srvno,
										newPassword,
										props.userInfo.device_id,
										props.userInfo.token,
										props.userInfo.version,
										props.userInfo.name,
										rank,
										position,
										unit,
										phone,
										props.userInfo.level,
										)
									onReset()
								}).catch((error) => {
									const msg = error.response.data.message
									console.log(msg)
									if(msg == "Device_id isn't match") {
										Alert.alert(
											'선박확인체계 알림',
											'계정에 귀속된 디바이스 아이디가 일치하지 않습니다.'
										)
									}
									else {
										Alert.alert(
											'선박확인체계 알림',
											'비밀번호 생성 조건에 충족하지 않습니다. 다시 입력해주시기 바랍니다.'
										)
									}
								})
							}
							else {
								Alert.alert(
									'선박확인체계 알림',
									'비밀번호 일치 여부를 확인해주시기 바랍니다.'
								)
							}
						},
					},
					{ 
						text: "아니오"
					}
				]
			)
		}
	}

	const onCertification = () => {
		if(oldPassword == props.userInfo.password) {
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
		if(newPassword == '') {
			Alert.alert(
				'선박확인체계 알림',
				'비밀번호를 입력해주시기 바랍니다.'
			)
		}
		else if(newPasswordCheck == '') {
			Alert.alert(
				'선박확인체계 알림',
				'비밀번호를 입력해주시기 바랍니다.'
			)
		}
		else if(newPassword == newPasswordCheck) {
			setPasswordCheck(true)
			Alert.alert(
				'선박확인체계 알림',
				'비밀번호 확인이 완료되었습니다.'
			)
		}
		else {
			Alert.alert(
				'선박확인체계 알림',
				'비밀번호가 일치하지 않습니다.'
			)
		}
	}

	let unitField
	if(div == '31') {
		unitField =
		<Picker
			selectedValue={unit}
			style={{height: 50, width: '100%'}}
			onValueChange={(itemValue) => setUnit(itemValue) }>
			{ KindsOfUnit_31.map((data)=>{ return <Picker.Item label={data.label} value={data.value} key={data.value.toString()} /> }) }
		</Picker>
	}
	else if(div == '32') {
		unitField =
		<Picker
			selectedValue={unit}
			style={{height: 50, width: '100%'}}
			onValueChange={(itemValue) => setUnit(itemValue) }>
			{ KindsOfUnit_32.map((data)=>{ return <Picker.Item label={data.label} value={data.value} key={data.value.toString()} /> }) }
		</Picker>
	}
	else if(div == '35') {
		unitField = 
		<Picker
			selectedValue={unit}
			style={{height: 50, width: '100%'}}
			onValueChange={(itemValue) => setUnit(itemValue) }>
			{ KindsOfUnit_35.map((data)=>{ return <Picker.Item label={data.label} value={data.value} key={data.value.toString()} /> }) }
		</Picker>
	}
	// else if(div == '37') {
	// 	unitField =
	// 	<Picker
	// 		selectedValue={unit}
	// 		style={{height: 50, width: '100%'}}
	// 		onValueChange={(itemValue) => setUnit(itemValue) }>
	// 		{ KindsOfUnit_37.map((data)=>{ return <Picker.Item label={data.label} value={data.value} key={data.value.toString()} /> }) }
	// 	</Picker>
	// }
	else if(div == '39') { 
		unitField =
		<Picker
			selectedValue={unit}
			style={{height: 50, width: '100%'}}
			onValueChange={(itemValue) => setUnit(itemValue) }>
			{ KindsOfUnit_39.map((data)=>{ return <Picker.Item label={data.label} value={data.value} key={data.value.toString()} /> }) }
		</Picker>
	}
	else if(div == '50') {
		unitField =
		<Picker
			selectedValue={unit}
			style={{height: 50, width: '100%'}}
			onValueChange={(itemValue) => setUnit(itemValue) }>
			{ KindsOfUnit_50.map((data)=>{ return <Picker.Item label={data.label} value={data.value} key={data.value.toString()} /> }) }
		</Picker>
	}
	else if(div == '53') {
		unitField =
		<Picker
			selectedValue={unit}
			style={{height: 50, width: '100%'}}
			onValueChange={(itemValue) => setUnit(itemValue) }>
			{ KindsOfUnit_53.map((data)=>{ return <Picker.Item label={data.label} value={data.value} key={data.value.toString()} /> }) }
		</Picker>
	}
	else if(div == '해병대') {
		unitField =
		<Picker
			selectedValue={unit}
			style={{height: 50, width: '100%'}}
			onValueChange={(itemValue) => setUnit(itemValue) }>
			{ KindsOfUnit_2.map((data)=>{ return <Picker.Item label={data.label} value={data.value} key={data.value.toString()} /> }) }
		</Picker>
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
					<base.Form style={styles.formLayout}>
						<base.Text style={styles.formTextMain}>이름</base.Text>
						<base.Text style={styles.formTextSub}>{props.userInfo.name}</base.Text>
					</base.Form>
					<base.Form style={styles.formLayout}>
						<base.Text style={styles.formTextMain}>ID</base.Text>
						<base.Text style={styles.formTextSub}>{props.userInfo.srvno}</base.Text>
					</base.Form>
					<base.Form style={styles.formLayout}>
						<base.Text style={styles.formTextMain}>계급</base.Text>
						<base.Text style={styles.formTextSub}>{props.userInfo.rank}</base.Text>
					</base.Form>
					<base.Form style={styles.formLayout}>
						<base.Text style={styles.formTextMain}>소속</base.Text>
						<base.Text style={styles.formTextSub}>{props.userInfo.div} {props.userInfo.unit}</base.Text>
					</base.Form>
					<base.Form style={styles.formLayout}>
						<base.Text style={styles.formTextMain}>직책</base.Text>
						<base.Text style={styles.formTextSub}>{props.userInfo.position}</base.Text>
					</base.Form>
					<base.Form style={styles.formLayout}>
						<base.Text style={styles.formTextMain}>연락처</base.Text>
						<base.Text style={styles.formTextSub}>{props.userInfo.phone}</base.Text>
					</base.Form>
					<base.Form style={styles.formLayout}>
						<base.Text style={styles.formTextMain}>기기정보</base.Text>
						<base.Text style={styles.formTextSub}>{props.userInfo.device_id}</base.Text>
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
						<base.Item stackedLabel style={styles.itemBorder}>
							<base.Text style={styles.itemTextLayout}>계급</base.Text>
							<Picker
								selectedValue={rank}
								style={{height: 40, width: '100%'}}
								onValueChange={(itemValue) => setRank(itemValue) }>
								{ KindsOfRank.map((data)=>{ return <Picker.Item label={data.value} value={data.value} key={Math.random()} /> }) }
							</Picker>
						</base.Item>							
					</base.Form>
					<base.Form style={{marginVertical: 15}}>
						<base.Item stackedLabel style={styles.itemBorder}>
							<base.Text style={styles.itemTextLayout}>소속부대</base.Text>
							<Picker
								selectedValue={div}
								style={{height: 50, width: '100%'}}
								onValueChange={(itemValue) => setDiv(itemValue) }>
								{ KindsOfUnit_div.map((data)=>{ return <Picker.Item label={data.label} value={data.value} key={Math.random()} /> }) }
							</Picker>				
						</base.Item>							
					</base.Form>

					<base.Form style={{marginVertical: 15}}>
						<base.Item stackedLabel style={styles.itemBorder}>
							<base.Text style={styles.itemTextLayout}>여단·대대</base.Text>
							{unitField}			
						</base.Item>							
					</base.Form>	
				
					<base.Form style={{marginVertical: 15}}>
						<base.Item stackedLabel style={styles.itemBorder}>
							<base.Text style={styles.itemTextLayout}>직책</base.Text>
							<base.Input
								placeholder={props.userInfo.position}
								onChangeText={setPosition}
								style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
								placeholderStyle={{fontFamily:'Nanum'}}
								/>
						</base.Item>
					</base.Form>
					<base.Form style={{marginVertical: 15}}>
						<base.Item stackedLabel style={styles.itemBorder}>
							<base.Text style={styles.itemTextLayout}>연락처</base.Text>
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
						<base.Item stackedLabel style={styles.itemBorder}>
							<base.Text style={styles.itemTextLayout}>비밀번호 변경하기</base.Text>
							<base.Form style={{flexDirection: 'row', marginTop: '-0%'}}>
								<base.Input
									placeholder='현재 비밀번호를 입력해주시기 바랍니다.'
									onChangeText={setOldPassword}
									style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT, marginLeft: '-1%', marginTop: '-1%'}}
									placeholderStyle={{fontFamily:'Nanum'}}
									secureTextEntry={ true }
									/>
								<TouchableOpacity style={{marginRight: 20}} onPress={onCertification}>
									<base.Text style={{fontFamily: 'Nanum', fontSize: SIZE_SUBFONT, color: 'skyblue', marginTop: '20%', marginRight: -10}}>인증하기</base.Text>
								</TouchableOpacity>
							</base.Form>
						</base.Item>
					</base.Form>}
					{pwCertification &&
						<base.Form style={{marginVertical: 15}}>
							<base.Item stackedLabel style={styles.itemBorder}>
								<base.Text style={styles.itemTextLayout}>비밀번호 변경하기</base.Text>
								<base.Input
									placeholder='새 비밀번호를 입력해주시기 바랍니다.'
									onChangeText={setNewPassword}
									style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
									placeholderStyle={{fontFamily:'Nanum'}}
									secureTextEntry={ true }
									/>
							</base.Item>
							<base.Item stackedLabel style={styles.itemBorder}>
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
										<base.Text style={{fontFamily: 'Nanum', fontSize: SIZE_SUBFONT, color: 'skyblue', marginTop: '20%', marginRight: -10}}>확인하기</base.Text>
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

const mapDispatchToProps = {
	editUserInfo: (srvno, password, device_id, token, version, name, rank, position, unit, phone) => editUserInfo(srvno, password, device_id, token, version, name, rank, position, unit, phone)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);