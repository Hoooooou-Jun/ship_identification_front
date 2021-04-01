import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Alert, Dimensions, TouchableHighlight, Linking, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import * as base from 'native-base';
import Constants from 'expo-constants';
import { Font } from 'expo-font';

import { requestLogin } from '../../utils/userInfoRequest/';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { requestDomain } from '../../utils/domain';
import { requestVersion } from '../../utils/additionalInfoRequest';

const SIZE_ICON = Dimensions.get('screen').height * 0.2
const SIZE_TITLE = Dimensions.get('screen').width * 0.1
const SIZE_SUBTITLE = Dimensions.get('screen').width * 0.035

const SIZE_LOAD_TITLE = Dimensions.get('screen').width * 0.06
const SIZE_LOAD_SUBTITLE = Dimensions.get('screen').width * 0.03
const SIZE_LOAD_LOGO = Dimensions.get('screen').width * 0.2

export default class Login extends Component{
	constructor(props){
		super(props)
		this.state={
			srvno: '',
			password: '',
			device_id: '',
			version: 'v1.0.0',
			is_version_right : true,

			loadingVisible: false,
		}
		this.executeLogin = this.executeLogin.bind(this);
		this.loadFont = this.loadFont(this);
	}
	componentDidMount(){
		requestVersion().then((response) =>{
			if(response.data.data.version == this.state.version){
				this.setState({is_version_right: true})
			}
			else{
				this.setState({is_version_right: false})
			}
		})
		this.setState({device_id: Constants.deviceId})
		
	}
	async loadFont(){
		await Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			'Roboto_medium': require("native-base/Fonts/Roboto_medium.ttf"),
			'Nanum': require('../../../assets/fonts/Nanum.ttf'),
			'Nanum_Title': require('../../../assets/fonts/Nanum_Title.ttf'),
		});
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
			this.setState({loadingVisible: true})
			await requestLogin(this.state.srvno, this.state.password, this.state.device_id).then((response) => {
				if(response.status == 200){
					this.setState({loadingVisible: false})
					AsyncStorage.setItem('token', response.data['data']['token'])
					Alert.alert(
						'선박확인체계 알림',
						this.state.srvno + '님 반갑습니다',
					)
					this.props.navigation.navigate('Home')
				}
				else{
					console.log('failed')
				}
			}).catch((error) =>{
				this.setState({loadingVisible: false})
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
						'등록되지 않은 단말기입니다',
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
		if(!this.state.is_version_right){
            return(
                <base.Form style={{alignItems:'center', justifyContent: 'center', flex: 1}}>
					<base.Form style={{flex: 1, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', flexDirection: 'row', }}>
						<base.Form style={{paddingTop: 200}}>
							<base.Form style={{backgroundColor: '#006eee', borderRadius: 20, margin: 5}}>
								<MaterialCommunityIcons name="sail-boat" size={100} color="white" />
							</base.Form>
						</base.Form>
						<base.Form style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 200, margin: 5}}>
							<base.Text style={{fontSize: 50, color: 'black'}}>선박확인체계</base.Text>
						</base.Form>
					</base.Form>
					<base.Form style={{flex: 1,}}>
						<base.Text style ={{fontSize: 30}}>최신 업데이트가 필요합니다</base.Text>
						<base.Button rounded style={{flex: 1, backgroundColor: '#006eee', width: 300, justifyContent: 'center', alignSelf: 'center', height: 60, elevation: 6, margin: 10}}
							onPress={()=>Linking.openURL('http://211.236.124.151:2162/Ships/download/')}>
							<base.Text style={{fontSize: 20}}>업데이트 페이지로 이동</base.Text>
						</base.Button>
					</base.Form>
				</base.Form>
            )
        }
		return(
			<base.Container>
				<base.Content contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Modal transparent={true} visible={this.state.loadingVisible}>
					<base.Form style={{alignItems: 'center', justifyContent: 'center', flex: 1,}}>
						<base.Form style={{width: 300, height: 300, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20,
							justifyContent: 'center', alignItems: 'center'}}>
								<base.Text style={{color: 'white', fontSize: SIZE_LOAD_TITLE, margin: 10}}>선박확인체계 알림</base.Text>
								<base.Text style={{color: 'white', fontSize: SIZE_LOAD_SUBTITLE, margin: 10}}>데이터를 불러오고 있습니다</base.Text>
								<base.Spinner color='white' size={SIZE_LOAD_LOGO} style={{margin: 10}}/>
						</base.Form>
					</base.Form>
				</Modal>
				<base.Form style={{flex: 3, width: '100%', borderRadius: 20, backgroundColor: 'white', elevation: 6}}>

					<base.Form style={{flex: 2, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', flexDirection: 'row', }}>
						<base.Form style={{paddingTop: 200}}>
							<base.Form style={{backgroundColor: '#006eee', borderRadius: 20, margin: 5}}>
								<MaterialCommunityIcons name="sail-boat" size={100} color="white" />
							</base.Form>
						</base.Form>
						<base.Form style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 200, margin: 5}}>
							<base.Text style={{fontSize: 50, color: 'black'}}>선박확인체계</base.Text>
							<base.Text style={{color: 'grey', fontSize: 15}}>Ship_Identification Beta TEST {this.state.version}</base.Text>
						</base.Form>
					</base.Form>

					<base.Form style={{flex: 2, padding: 20,}}>
						<base.Form style={{flex: 2,justifyContent: 'center', alignItems: 'center', }}>
							<base.Item floatingLabel style={{ marginRight: 10, height: 60,}}>
							<base.Label>아이디</base.Label>
								<base.Input keyboardType="number-pad" onChangeText={(srvno) => this.setState({srvno})}></base.Input>
							</base.Item>
							<base.Item floatingLabel style={{ marginRight: 10, height: 60,}}>
								<base.Label>비밀번호</base.Label>
								<base.Input secureTextEntry={ true } onChangeText={(password) => this.setState({password})}></base.Input>
							</base.Item>
						</base.Form>
						<base.Button rounded style={{flex: 1, backgroundColor: '#006eee', width: 300, justifyContent: 'center', alignSelf: 'center', height: 60, elevation: 6, margin: 10}}
							onPress={this.executeLogin}>
							<base.Text style={{fontSize: 20}}>로그인</base.Text>
						</base.Button>
					</base.Form>
				</base.Form>
				<base.Form style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start',}}>
					<TouchableHighlight style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30, width:'100%'}} onPress={()=>this.props.navigation.navigate('Signup')}>
							<base.Text>회원가입</base.Text>
					</TouchableHighlight>
					<TouchableHighlight style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30, width:'100%'}} onPress={()=>
									Alert.alert(
										'선박확인체계 알림',
										'개발 중인 기능입니다',
									)	
								}>
						<base.Text>비밀번호 초기화</base.Text>
					</TouchableHighlight>
				</base.Form>
				<base.Form style={{height: 50}}>
					<base.Text style={{color: 'grey'}}>Copyright ⓒ 2021. 32DIVISION. All rights reserved.</base.Text>
				</base.Form>
				</base.Content>
			<StatusBar hidden/>
			</base.Container>
		);
	}
}