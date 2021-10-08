import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, Linking } from 'react-native';
import styles from './styles';
import * as base from 'native-base';
import Constants from 'expo-constants';
import * as Font from 'expo-font';

import { connect } from 'react-redux';
import { loginUserInfo } from '../../redux/userInfo/action.js'

import { requestLogin } from '../../utils/userInfoRequest/';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { requestVersion } from '../../utils/additionalInfoRequest';

import Loading from '../../utils/loading';
import { AppVersion, UnderInspection } from '../../utils/version';

const SIZE_ICON = Dimensions.get('screen').height * 0.1
const SIZE_SPLASHICON = Dimensions.get('screen').height * 0.3
const SIZE_TITLE = Dimensions.get('screen').width * 0.11

const SIZE_FOOTER = Dimensions.get('screen').width * 0.03

const SIZE_FONT = Dimensions.get('screen').width * 0.035

const SIZE_WARNING = Dimensions.get('screen').width * 0.04

const Login = (props) => {
	const [srvno, setSrvno] = useState('');
	const [password, setPassword] = useState('');
	const [device_id, setDevice_Id] = useState('');
	const [version, setVersion] = useState(AppVersion);
	const [version_server, setVersion_Server] = useState('');
	const [server_status, setServer_Status] = useState('');
	const [server_mount, setServer_Mount] = useState(false);
	const [font_load, setFont_Load] = useState(false);

	const loadFont = async () => {
		await Font.loadAsync({
			'Roboto': require('../../../node_modules/native-base/Fonts/Roboto.ttf'),
			'Roboto_medium': require('../../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
			Nanum: require('../../../assets/fonts/Nanum.ttf'),
			Nanum_Title: require('../../../assets/fonts/Nanum_Title.ttf'),
		})
		await setFont_Load(true);  
	}

	const loadData = async () => {
		await requestVersion().then((response) => {
			try {
				setServer_Mount(true)
				setVersion_Server(response.data.data.version)
				setServer_Status(response.data.data.server_status)
			}
			catch(err) {
				console.log(err)
			}
		})
		await setDevice_Id(Constants.deviceId)
	}

	const executeLogin = () => {
		if(srvno == '') {
			Alert.alert(
				'선박확인체계 알림',
				'아이디를 입력하세요',
			)
		}
		else if(password == '') {
			Alert.alert(
				'선박확인체계 알림',
				'비밀번호를 입력하세요',
			)
		}
		else {
			requestLogin(srvno, password, device_id).then((response) => {
				Alert.alert(
					'선박확인체계 알림',
					srvno + '님 반갑습니다',
				)
				props.loginUserInfo(srvno, password, device_id, response.data.data.token, version)
				props.navigation.navigate('Home', {token: response.data.data.token})
			}).catch((error) => {
				const msg = error.response.data.message
				console.log(msg)
				if(msg == 'Unauthenticated user') {
					Alert.alert(
						'선박확인체계 알림',
						'가입되지 않은 계정입니다',
					)
				}
				else if(msg == 'Waiting for login approval') {
					Alert.alert(
						'선박확인체계 알림',
						'접속 승인되지 않은 계정입니다',
					)
				}
				else if(msg == 'Not connected 3months Blocked user') {
					Alert.alert(
						'선박확인체계 알림',
						'장기간 미접속하여 접속 승인되지 않은 계정입니다',
					)
				}
				else if(msg == 'Login fail Blocked user') {
					Alert.alert(
						'선박확인체계 알림',
						'정지된 계정입니다',
					)
				}
				else if(msg == 'Device mismatch') {
					Alert.alert(
						'선박확인체계 알림',
						'해당 계정과 일치하지 않은 단말기입니다',
					)
				}
				else if(msg == 'Incorrect password') {
					Alert.alert(
						'선박확인체계 알림',
						'비밀번호가 틀렸습니다',
					)
				}
			})
		}
	}

	useEffect(() => {
		loadFont()
		loadData()
	}, []);

	
	if(font_load == true && server_mount) {
		if(server_status == UnderInspection) {
			return (
				<base.Form style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
					<base.Form style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
						<base.Form style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
							<base.Form style={{backgroundColor: '#006eee', borderRadius: 20, margin: 5}}>
								<MaterialCommunityIcons name="sail-boat" size={SIZE_ICON} color="white" />
							</base.Form>
						</base.Form>
						<base.Form style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
							<base.Text style={styles.title}>선박확인체계</base.Text>
							<base.Text style={styles.sub}>Ship_Identification {this.state.version}</base.Text>
						</base.Form>
					</base.Form>
					<base.Form style={{justifyContent: 'center', alignItems: 'center', margin: 20, flexDirection: 'column'}}>
						<base.Text style ={{fontSize: SIZE_WARNING + 10, margin: 10, color: '#006eee', fontStyle: 'italic'}}>서버 점검 중입니다.</base.Text>
					</base.Form>
					<base.Form style={{justifyContent: 'center', alignItems: 'flex-start', margin: 10, flexDirection: 'column',}}>
						<base.Text style ={{fontSize: SIZE_WARNING, margin: 10, fontWeight: 'bold'}}>담당자 연락처</base.Text>
						<base.Form style={{alignItems: 'flex-end', backgroundColor: 'white', elevation: 6, borderRadius: 20,}}>
							<base.Text style={styles.devTitle}>제32보병사단 정보통신대대 선박확인체계 개발TF</base.Text>
							<base.Text style={styles.devSub}>042-832-7681</base.Text>
						</base.Form>
					</base.Form>
				</base.Form>
			);
		}
		else if(!(version == version_server)) {
			return (
				<base.Form style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
					<base.Form style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
						<base.Form style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
							<base.Form style={{backgroundColor: '#006eee', borderRadius: 20, margin: 5}}>
								<MaterialCommunityIcons name="sail-boat" size={SIZE_ICON} color="white" />
							</base.Form>
						</base.Form>
						<base.Form style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
							<base.Text style={styles.title}>선박확인체계</base.Text>
						</base.Form>
					</base.Form>
					<base.Form style={{justifyContent: 'center', alignItems: 'center', margin: 20, flexDirection: 'column'}}>
						<base.Form>
							<base.Text style={styles.version}>* 현재버전 : {version}</base.Text>
						</base.Form>
						<base.Form>
							<base.Text style={styles.version}>* 운용버전 : {version_server}</base.Text>
						</base.Form>
						<base.Text style ={{fontSize: SIZE_WARNING, margin: 10}}>업데이트가 필요합니다</base.Text>
					</base.Form>
					<base.Button block onPress={()=>Linking.openURL('http://211.236.124.151:2162/Ships/download/')}
						style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#006eee', elevation: 6,
						height: SIZE_TITLE + 10, margin: 10}}>
						<base.Text style={{color: 'white',}}>업데이트 페이지로 이동하기</base.Text>
					</base.Button>
				</base.Form>
			)
		}
		else {
			return (
				<base.Container>
					<base.Content contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

						<StatusBar hidden/>
						
						<base.Form style={{flex: 3, width: '100%', borderRadius: 20, backgroundColor: 'white', elevation: 6,}}>
							
							<base.Form style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
							</base.Form>
							
							<base.Form style={{flex: 2, justifyContent: 'center', alignItems: 'center' }}>
								<base.Form style={{flexDirection: 'row', justifyContent: 'flex-end', height: '100%'}}>
									<base.Form style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
										<base.Form style={{backgroundColor: '#006eee', borderRadius: 20, margin: 5}}>
											<MaterialCommunityIcons name="sail-boat" size={SIZE_ICON} color="white" />
										</base.Form>
									</base.Form>
									<base.Form style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
										<base.Text style={styles.title}>선박확인체계</base.Text>
										<base.Text style={styles.sub}>Ship_Identification {version}</base.Text>
									</base.Form>
								</base.Form>
							</base.Form>

							<base.Form style={{flex: 2, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
								<base.Form style={{width: '100%', height: '100%'}}>
									<base.Item floatingLabel style={{ marginRight: 10, height: 60,}}>
									<base.Label style={{fontSize: SIZE_FONT}}>아이디</base.Label>
										<base.Input keyboardType="number-pad" onChangeText={(srvno) => setSrvno(srvno)}></base.Input>
									</base.Item>
									<base.Item floatingLabel style={{ marginRight: 10, height: 60,}}>
										<base.Label style={{fontSize: SIZE_FONT}}>비밀번호</base.Label>
										<base.Input secureTextEntry={ true } onChangeText={(password) => setPassword(password)}></base.Input>
									</base.Item>
								</base.Form>
							</base.Form>

							<base.Form style={{flex: 1, padding: 20,}}>
								<base.Button block onPress={executeLogin} style={styles.loginButton}>
									<base.Text style={{color: 'white',}}>로그인</base.Text>
								</base.Button>
							</base.Form>

						</base.Form>

						<base.Form style={{flex: 1, flexDirection: 'column', width: '100%',}}>
							<base.Form style={{flexDirection: 'row'}}>
								<base.Button transparent style={styles.register} onPress={() => props.navigation.navigate('Signup')}>
										<base.Text style={{fontSize: SIZE_FONT, color: 'black'}}>회원가입</base.Text>
								</base.Button>
								<base.Button transparent style={styles.register} onPress={() => props.navigation.navigate('Lost')}>
									<base.Text style={{fontSize: SIZE_FONT, color: 'black'}}>비밀번호 초기화</base.Text>
								</base.Button>
							</base.Form>
						</base.Form>

						<base.Form style={{height: 50}}>
							<base.Text style={{color: 'grey', fontSize: SIZE_FOOTER}}>Copyright ⓒ 2021. 32DIVISION. All rights reserved.</base.Text>
						</base.Form>

					</base.Content>
				</base.Container>
			)
		}
	}
	else {
		return (
			<base.Container style={{justifyContent: 'center', alignItems: 'center'}}>
				<StatusBar hidden/>
				<base.Form>
					<base.Form style={{backgroundColor: '#006eee', borderRadius: 20}}>
						<MaterialCommunityIcons name="sail-boat" size={SIZE_SPLASHICON} color="white" />
					</base.Form>
				</base.Form>
					{/* <base.Form style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<base.Text></base.Text>
					</base.Form> */}
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
	loginUserInfo: (srvno, password, device_id, token, version) => loginUserInfo(srvno, password, device_id, token, version)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);