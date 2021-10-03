import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, Alert, TouchableOpacity } from 'react-native';
import * as base from 'native-base'
import { Picker } from 'native-base';
import Constants from 'expo-constants';
import { requestSignup } from '../../utils/userInfoRequest/';

import { KindsOfUnit_31 } from '../../kindsOfData/kindsOfUnit/kindsOfUnit_31';
import { KindsOfUnit_32 } from '../../kindsOfData/kindsOfUnit/kindsOfUnit_32';
import { KindsOfUnit_35 } from '../../kindsOfData/kindsOfUnit/kindsOfUnit_35';
import { KindsOfUnit_37 } from '../../kindsOfData/kindsOfUnit/kindsOfUnit_37';
import { KindsOfUnit_39 } from '../../kindsOfData/kindsOfUnit/kindsOfUnit_39';
import { KindsOfUnit_50 } from '../../kindsOfData/kindsOfUnit/kindsOfUnit_50';
import { KindsOfUnit_53 } from '../../kindsOfData/kindsOfUnit/kindsOfUnit_53';
import { KindsOfUnit_div } from '../../kindsOfData/kindsOfUnit/kindsOfUnit_div';

import { KindsOfRank } from '../../kindsOfData/kindsOfRank';

import Loading from '../../utils/loading';

import styles from './styles'

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_FONT = Dimensions.get('screen').height * 0.02
const SIZE_SUBFONT = Dimensions.get('screen').height * 0.015

const Signup = (props) => {
	const [srvno, setSrvno] = useState('')
	const [password, setPassword] = useState('')
	const [passwordCheck, setPasswordCheck] = useState('')
	const [check, setCheck] = useState(false)
	const [name, setName] = useState('')
	const [rank, setRank] = useState('이병')
	const [position, setPosition] = useState('')
	const [unit, setUnit] = useState('')
	const [div, setDiv] = useState('32')
	const [phone, setPhone] = useState('')
	const [device_id, setDevice_Id] = useState(Constants.deviceId)
	const [loadingVisible, setLoadingVisible] = useState(false)

	useEffect(() => {
		setCheck(false)
	}, [passwordCheck]) 

	useEffect(() => {
		switch(div) {
			case '31': {
				setUnit('31-div')
				break;
			}
			case '32': {
				setUnit('사령부')
				break;
			}
			case '35': {
				setUnit('35-div')
				break;
			}
			case '37': {
				setUnit('37-div')
				break;
			}
			case '39': {
				setUnit('39-div')
				break;
			}
			case '50': {
				setUnit('50-div')
				break;
			}
			case '53': {
				setUnit('53-div')
				break;
			}
		}
	}, [div])

	const executeSignup = () => {
		if(srvno != '' && password != '' && name != '' && rank != '' && position != '' && phone != '') {
			setLoadingVisible(true)
			if(check == true) {
				requestSignup(srvno, password, name, rank, position, unit, phone, device_id)
				.then((response) => {
					if(response.status == 200) {
						Alert.alert(
							'선박확인체계 알림',
							name + '님 환영합니다.',
						)
						setLoadingVisible(false)
						props.navigation.popToTop();
					}
					else {
						console.log('signup fail')
						setLoadingVisible(false)
					}
				}).catch((error) => {
					const msg = error.response.data.message
					setLoadingVisible(false)
					console.log(msg)
					if(msg == 'Already exist serviceNum'){
						Alert.alert(
							'선박확인체계 알림',
							'이미 존재하는 계정입니다.',
						)
					}
					else if(msg == 'Already regist device'){
						Alert.alert(
							'선박확인체계 알림',
							'이미 등록된 단말기입니다.',
						)
					}
					else if(msg == 'Not special character in password'){
						Alert.alert(
							'선박확인체계 알림',
							'비밀번호에 특수문자를 포함시키시기 바랍니다.',
						)
					}
					else if(msg == 'Password with sequence'){
						Alert.alert(
							'선박확인체계 알림',
							'연속적인 오름차순이나 내림차순인 비밀번호는 사용할 수 없습니다.',
						)
					}
					else if(msg == 'Repeat the same character 3 times'){
						Alert.alert(
							'선박확인체계 알림',
							'3번 이상 연속으로 중복된 문자가 들어가 비밀번호는 사용할 수 없습니다.',
						)
					}
				})
			}
			else {
				Alert.alert(
					'선박확인체계 알림',
					'비밀번호를 확인해주시기 바랍니다.',
				)
				setLoadingVisible(false)
			}
		}
		else {
			Alert.alert(
				'선박확인체계 알림',
				'모든 정보를 입력해주시기 바랍니다.',
			)
		}
	}

	const checkPassword = () => {
		if(password == '' && passwordCheck == '') {
			Alert.alert(
				'선박확인체계 알림',
				'비밀번호를 입력해주시기 바랍니다.'
			)
		}
		else if(password == passwordCheck) {
			Alert.alert(
				'선박확인체계 알림',
				'비밀번호 확인이 완료되었습니다.'
			)
			setCheck(true)
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
	else if(div == '37') {
		unitField =
		<Picker
			selectedValue={unit}
			style={{height: 50, width: '100%'}}
			onValueChange={(itemValue) => setUnit(itemValue) }>
			{ KindsOfUnit_37.map((data)=>{ return <Picker.Item label={data.label} value={data.value} key={data.value.toString()} /> }) }
		</Picker>
	}
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
				<Loading visible={loadingVisible} initialRoute={false} onPress={() => props.navigation.goBack()}/>
				
				<base.Form style={{padding: 10,}}>
					<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>회원가입</base.Text>
					<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey',}}>하단의 정보를 입력해주시기 바랍니다.</base.Text>
				</base.Form>

				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={styles.itemBorder}>
						<base.Text style={styles.itemTextLayout}>아이디</base.Text>
						<base.Input
							placeholder="'-'를 포함한 군번을 입력해주시기 바랍니다."
							onChangeText={setSrvno}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum'}}
							keyboardType="number-pad"/>
					</base.Item>
				</base.Form>


				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={styles.itemBorder}>
						<base.Text style={styles.itemTextLayout}>비밀번호</base.Text>
						<base.Input
							placeholder='영문, 숫자, 특수문자를 포함시켜주시기 바랍니다.'
							onChangeText={setPassword}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum'}}
							secureTextEntry={ true }
							/>
					</base.Item>
					<base.Item stackedLabel style={styles.itemBorder}>
						<base.Text style={{fontSize: SIZE_TITLE}}></base.Text>
						<base.Form style={{flexDirection: 'row'}}>
							<base.Input
								placeholder='비밀번호를 다시 입력해주시기 바랍니다.'
								onChangeText={setPasswordCheck}
								style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT, marginLeft: '-1%', marginTop: '-7%' }}
								placeholderStyle={{fontFamily:'Nanum'}}
								secureTextEntry={ true }
								/>
							<TouchableOpacity style={{marginRight: 20, marginTop: '-7%'}} onPress={checkPassword}>
								<base.Text style={{fontFamily: 'Nanum', fontSize: SIZE_SUBFONT, color: 'skyblue', marginTop: '40%', marginRight: -10}}>확인하기</base.Text>
							</TouchableOpacity>
						</base.Form>
					</base.Item>
				</base.Form>

				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={styles.itemBorder}>
						<base.Text style={styles.itemTextLayout}>이름</base.Text>
						<base.Input
							placeholder='실명을 입력해주시기 바랍니다.'
							onChangeText={setName}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum'}}
							/>
					</base.Item>
				</base.Form>

				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={styles.itemBorder}>
						<base.Text style={styles.itemTextLayout}>연락처 (휴대폰 번호)</base.Text>
						<base.Input
							placeholder="'-'를 제외한 11자리를 입력하시기 바랍니다."
							onChangeText={setPhone}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum'}}
							keyboardType="number-pad"
							/>
					</base.Item>
				</base.Form>

				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={styles.itemBorder}>
						<base.Text style={styles.itemTextLayout}>계급</base.Text>
						<Picker
							selectedValue={rank}
							style={{height: 40, width: '100%'}}
							onValueChange={(itemValue) => setRank(itemValue) }>
							{ KindsOfRank.map((data)=>{ return <Picker.Item label={data.value} value={data.value} key={data.value.toString()} /> }) }
						</Picker>
					</base.Item>							
				</base.Form>

				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={styles.itemBorder}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>소속부대</base.Text>
						<Picker
							selectedValue={div}
							style={{height: 50, width: '100%'}}
							onValueChange={(itemValue) => setDiv(itemValue) }>
						{ KindsOfUnit_div.map((data)=>{ return <Picker.Item label={data.label} value={data.value} key={data.value.toString()} /> }) }
						</Picker>				
					</base.Item>							
				</base.Form>

				<base.Form style={{marginVertical: 15}}>
						<base.Item stackedLabel style={styles.itemBorder}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>여단·대대</base.Text>
							{unitField}			
						</base.Item>							
				</base.Form>	
				
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={styles.itemBorder}>
						<base.Text style={styles.itemTextLayout}>직책</base.Text>
						<base.Input
							placeholder="직책을 입력해주시기 바랍니다."
							onChangeText={setPosition}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum'}}
							/>
					</base.Item>
				</base.Form>
				<base.Button block onPress={executeSignup} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
					<base.Text style={{color: 'black'}}>회원가입</base.Text>
				</base.Button>
			</base.Content>
		<StatusBar hidden/>
		</base.Container>
	)
}

export default Signup;
