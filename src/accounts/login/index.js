import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Alert, Dimensions, TouchableHighlight, Linking, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import * as base from 'native-base';
import Constants from 'expo-constants';
import * as Font from 'expo-font';

import { requestLogin } from '../../utils/userInfoRequest/';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { requestVersion } from '../../utils/additionalInfoRequest';

import Loading from '../../utils/loading';
import { AppVersion, UnderInspection } from '../../utils/version';

const SIZE_ICON = Dimensions.get('screen').height * 0.1
const SIZE_TITLE = Dimensions.get('screen').width * 0.11

const SIZE_FOOTER = Dimensions.get('screen').width * 0.03

const SIZE_FONT = Dimensions.get('screen').width * 0.035

const SIZE_WARNING = Dimensions.get('screen').width * 0.04

export default class Login extends Component{
	constructor(props){
		super(props)
		this.state={
			srvno: '',
			password: '',
			device_id: '',
			version: AppVersion,
			version_server: '',

			server_status: 'running',
			is_version_right : true,

			loadingVisible_CDM: true,
			loadingVisible_Font: true,
			loadingVisible_login: false,
		}
		this.loadFont = this.loadFont(this);
		this.executeLogin = this.executeLogin.bind(this);
	}
	componentDidMount(){
		requestVersion().then((response) =>{
            if(response.status == 200){
				this.setState({
					loadingVisible_CDM: false,
					version_server: response.data.data.version,
					server_status: response.data.data.server_status,
				})
				if(response.data.data.version == this.state.version){
					this.setState({is_version_right: true})
				}
				else{
					this.setState({is_version_right: false})
				}
			}
		})
		this.setState({device_id: Constants.deviceId})
		
	}
	async loadFont(){
		await Font.loadAsync({
			'Roboto': require('../../../node_modules/native-base/Fonts/Roboto.ttf'),
			'Roboto_medium': require('../../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
			Nanum: require('../../../assets/fonts/Nanum.ttf'),
			Nanum_Title: require('../../../assets/fonts/Nanum_Title.ttf'),
		});
		this.setState({loadingVisible_Font: false})
	}
	async executeLogin(){
		if(this.state.srvno == ''){
			Alert.alert(
				'선박확인체계 알림',
				'아이디를 입력하세요',
			)
		}
		else if(this.state.password == ''){
			Alert.alert(
				'선박확인체계 알림',
				'비밀번호를 입력하세요',
			)
		}
		else{
			this.setState({loadingVisible_login: true})
			requestLogin(this.state.srvno, this.state.password, this.state.device_id).then((response) => {
				this.setState({loadingVisible_login: false})
				AsyncStorage.setItem('token', response.data['data']['token'])
				Alert.alert(
					'선박확인체계 알림',
					this.state.srvno + '님 반갑습니다',
				)
				this.props.navigation.navigate('Home')
			}).catch((error) =>{
				this.setState({loadingVisible_login: false})
				const msg = error.response.data.message
				console.log(msg)
				if(msg == 'Unauthenticated user'){
					Alert.alert(
						'선박확인체계 알림',
						'가입되지 않은 계정입니다',
					)
				}
				else if(msg == 'Waiting for login approval'){
					Alert.alert(
						'선박확인체계 알림',
						'접속 승인되지 않은 계정입니다',
					)
				}
				else if(msg == 'Not connected 3months Blocked user'){
					Alert.alert(
						'선박확인체계 알림',
						'장기간 미접속하여 접속 승인되지 않은 계정입니다',
					)
				}
				else if(msg == 'Login fail Blocked user'){
					Alert.alert(
						'선박확인체계 알림',
						'정지된 계정입니다',
					)
				}
				else if(msg == 'Device mismatch'){
					Alert.alert(
						'선박확인체계 알림',
						'해당 계정과 일치하지 않은 단말기입니다',
					)
				}
				else if(msg == 'Incorrect password'){
					Alert.alert(
						'선박확인체계 알림',
						'비밀번호가 틀렸습니다',
					)
				}
			})
		}
	}
	
	render(){
		if(this.state.server_status == UnderInspection){
			return(
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
						<base.Text style ={{fontSize: SIZE_WARNING + 10, margin: 10, color: '#006eee'}}>서버 점검 중</base.Text>
					</base.Form>
					<base.Form style={{justifyContent: 'center', alignItems: 'flex-start', margin: 10, flexDirection: 'column',}}>
						<base.Text style ={{fontSize: SIZE_WARNING, margin: 10, fontWeight: 'bold'}}>담당자 연락처</base.Text>
						<base.Form style={{alignItems: 'flex-end', backgroundColor: 'white', elevation: 6, borderRadius: 20,}}>
							<base.Text style={styles.devTitle}>32보병사단 정보통신대대 상병 김호준</base.Text>
							<base.Text style={styles.devSub}>010-6433-4083</base.Text>
							<base.Text style={styles.devTitle}>32보병사단 정보통신대대 일병 최재영</base.Text>
							<base.Text style={styles.devSub}>010-4584-7486</base.Text>
						</base.Form>
					</base.Form>
				</base.Form>
			)
		}
		else if(!this.state.is_version_right){
            return(
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
							<base.Text style={styles.version}>* 현재버전 : {this.state.version}</base.Text>
						</base.Form>
						<base.Form>
							<base.Text style={styles.version}>* 운용버전 : {this.state.version_server}</base.Text>
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
		else{
			return(
				<base.Container>
					<base.Content contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<Loading visible={this.state.loadingVisible_CDM || this.state.loadingVisible_Font || this.state.loadingVisible_login} initialRoute={true}/>
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
										<base.Text style={styles.sub}>Ship_Identification Beta TEST {this.state.version}</base.Text>
									</base.Form>
								</base.Form>
							</base.Form>
	
							<base.Form style={{flex: 2, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
								<base.Form style={{width: '100%', height: '100%'}}>
									<base.Item floatingLabel style={{ marginRight: 10, height: 60,}}>
									<base.Label style={{fontSize: SIZE_FONT}}>아이디</base.Label>
										<base.Input keyboardType="number-pad" onChangeText={(srvno) => this.setState({srvno})}></base.Input>
									</base.Item>
									<base.Item floatingLabel style={{ marginRight: 10, height: 60,}}>
										<base.Label style={{fontSize: SIZE_FONT}}>비밀번호</base.Label>
										<base.Input secureTextEntry={ true } onChangeText={(password) => this.setState({password})}></base.Input>
									</base.Item>
								</base.Form>
							</base.Form>
							
							<base.Form style={{flex: 1, padding: 20,}}>
								<base.Button block onPress={this.executeLogin} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#006eee', elevation: 6,
									height: SIZE_TITLE + 10}}>
									<base.Text style={{color: 'white',}}>로그인</base.Text>
								</base.Button>
							</base.Form>
						</base.Form>
	
						<base.Form style={{flex: 1, flexDirection: 'column', width: '100%',}}>
							<base.Form style={{flexDirection: 'row'}}>
								<base.Button transparent style={{flex: 1, justifyContent: 'center', alignItems: 'center', width:'100%', marginTop: 10}} onPress={()=>this.props.navigation.navigate('Signup')}>
										<base.Text style={{fontSize: SIZE_FONT, color: 'black'}}>회원가입</base.Text>
								</base.Button>
								<base.Button transparent style={{flex: 1, justifyContent: 'center', alignItems: 'center', width:'100%', marginTop: 10}} onPress={()=>
												Alert.alert(
													'선박확인체계 알림',
													'개발 중인 기능입니다',
												)	
											}>
									<base.Text style={{fontSize: SIZE_FONT, color: 'black'}}>비밀번호 초기화</base.Text>
								</base.Button>
							</base.Form>
						</base.Form>
						<base.Form style={{height: 50}}>
							<base.Text style={{color: 'grey', fontSize: SIZE_FOOTER}}>Copyright ⓒ 2021. 32DIVISION. All rights reserved.</base.Text>
						</base.Form>
					</base.Content>
				<StatusBar hidden/>
				</base.Container>
			);
		}
	}
}