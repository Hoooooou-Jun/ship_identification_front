import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Dimensions, Alert, Modal } from 'react-native';
import * as base from 'native-base'
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
import { requestSignup } from '../../utils/userInfoRequest/';
import { KindsOfUnit } from '../../kindsOfData/kindsOfUnit';
import { KindsOfRank } from '../../kindsOfData/kindsOfRank';
import Loading from '../../utils/loading';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_IMG_HEIGHT = Dimensions.get('screen').height * 0.35
const SIZE_FONT = Dimensions.get('screen').height * 0.02
const SIZE_SUBFONT = Dimensions.get('screen').height * 0.015

const alertMessage =
	  ' 1. 숫자, 문자, 특수문자를 혼합하여 9자리 이상으로 조합\n' +
	  ' 2. 사용자 아이디와 미일치\n' +
	  ' 3. 개인신상 및 부서명칭 등과 관련 내용 미기입\n' +
	  ' 4. 일반 사전에 등록된 단어 미기입\n' +
	  ' 5. 동일문자 3회 이상 반복 미사용\n' +
	  ' 6. 연속적인 오름차순, 내림차순 미사용'

export default class Signup extends Component{
	constructor(props){
		super(props)
		this.state={
            srvno : '', password : '', passwordCheck: '',
            name : '', rank : '', position : '',
			unit : '사령부', phone : '',
			
			year: '', month: '',day: '',
			
			device_id : '',
			
			birthday: '',

			loadingVisible: false,
		}
		this.executeSignup = this.executeSignup.bind(this);
	}
	componentDidMount(){
		this.setState({loadingVisible: true})
		this.setState({device_id: Constants.deviceId})
		this.setState({loadingVisible: false})
	}
	executeSignup(){
		this.setState({loadingVisible: true})
		requestSignup(this.state.srvno, this.state.password, this.state.name, this.state.rank, this.state.position, this.state.unit, this.state.phone, this.state.device_id)
		.then((response) => {
			if(response.status == 200){
				this.setState({loadingVisible: false})
				Alert.alert(
					'선박확인체계 알림',
					this.state.name + '님 환영합니다',
				)
				this.props.navigation.popToTop();
			}
			else{
				console.log('fail')
			}
		}).catch((error) =>{
			this.setState({loadingVisible: false})
			const msg = error.response.data.message
			console.log(msg)
			if(msg == 'Already exist serviceNum'){
				Alert.alert(
					'선박확인체계 알림',
					'이미 존재하는 계정입니다',
				)
			}
			else if(msg == 'Already regist device'){
				Alert.alert(
					'선박확인체계 알림',
					'이미 등록된 단말기입니다',
				)
			}
			else if(msg == 'Not special character in password'){
				Alert.alert(
					'선박확인체계 알림',
					'비밀번호에 특수문자를 포함시키세요',
				)
			}
			else if(msg == 'Password with sequence'){
				Alert.alert(
					'선박확인체계 알림',
					'연속적인 오름차순이나 내림차순인 비밀번호는 사용할 수 없습니다',
				)
			}
			else if(msg == 'Repeat the same character 3 times'){
				Alert.alert(
					'선박확인체계 알림',
					'3번 이상 연속으로 중복된 문자가 들어가 비밀번호는 사용할 수 없습니다',
				)
			}
		})
	}
	render(){
		return(
			<base.Container>
				<base.Header style={{backgroundColor: 'white'}}>
					<base.Left>
						<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
							<base.Icon name='arrow-back' style={{color: 'black'}}/>
						</base.Button>
					</base.Left>
					<base.Right>
					</base.Right>
				</base.Header>
				<base.Content>
					<Loading visible={this.state.loadingVisible}/>
					<base.Form style={{padding: 10,}}>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>회원가입</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey',}}>아래의 정보를 입력해주세요</base.Text>
					</base.Form>
					<base.Form style={{marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
							<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>아이디</base.Text>
							<base.Input
								placeholder="'-'를 포함한 아이디를 입력하세요"
								onChangeText={(srvno) => this.setState({srvno})}
								style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
								placeholderStyle={{fontFamily:'Nanum'}}
								keyboardType="number-pad"/>
						</base.Item>
					</base.Form>

					<base.Form style={{marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
							<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>비밀번호</base.Text>
							<base.Input
								placeholder='영문, 숫자, 특수문자를 포함시키세요'
								onChangeText={(password) => this.setState({password})}
								style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
								placeholderStyle={{fontFamily:'Nanum'}}
								secureTextEntry={ true }
								/>
						</base.Item>
					</base.Form>

					<base.Form style={{marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
							<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>비밀번호 확인</base.Text>
							<base.Input
								placeholder='비밀번호 확인'
								onChangeText={(passwordCheck) => this.setState({passwordCheck})}
								style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
								placeholderStyle={{fontFamily:'Nanum'}}
								secureTextEntry={ true }
								/>
						</base.Item>
					</base.Form>

					<base.Form style={{marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
							<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>이름</base.Text>
							<base.Input
								placeholder='실명을 입력하세요'
								onChangeText={(name) => this.setState({name})}
								style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
								placeholderStyle={{fontFamily:'Nanum'}}
								/>
						</base.Item>
					</base.Form>

					<base.Form style={{marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
							<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>연락처 (휴대폰 번호)</base.Text>
							<base.Input
								placeholder="'-'를 제외한 11자리를 입력하세요"
								onChangeText={(phone) => this.setState({phone})}
								style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
								placeholderStyle={{fontFamily:'Nanum'}}
								keyboardType="number-pad"
								/>
						</base.Item>
					</base.Form>

					<base.Form style={{marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>계급</base.Text>
						<Picker
							selectedValue={this.state.rank}
							style={{height: 40, width: '100%'}}
							onValueChange={(itemValue) => this.setState({rank: itemValue}) }>
							{ KindsOfRank.map((data)=>{ return <Picker.Item label={data.value} value={data.value} /> }) }
						</Picker>
						</base.Item>							
					</base.Form>


					<base.Form style={{marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>소속부대 (제32보병사단)</base.Text>
						<Picker
							selectedValue={this.state.unit}
							style={{height: 50, width: '100%'}}
							onValueChange={(itemValue) => this.setState({unit: itemValue}) }>
							{ KindsOfUnit.map((data)=>{ return <Picker.Item label={data.label} value={data.value} /> }) }
						</Picker>				
						</base.Item>							
					</base.Form>	
					
					<base.Form style={{marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
							<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>직책</base.Text>
							<base.Input
								placeholder="직책을 입력해주세요"
								onChangeText={(position) => this.setState({position})}
								style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
								placeholderStyle={{fontFamily:'Nanum'}}
								/>
						</base.Item>
					</base.Form>
					<base.Button block onPress={this.executeSignup} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
						<base.Text style={{color: 'black'}}>회원가입</base.Text>
					</base.Button>
				</base.Content>
			<StatusBar hidden/>
			</base.Container>
		);
	}
}
