import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Dimensions, Alert } from 'react-native';
import * as base from 'native-base'
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
import { requestSignup } from '../../utils/userInfoRequest/'

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_FONT = Dimensions.get('screen').height * 0.02

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
		}
		this.executeSignup = this.executeSignup.bind(this);
	}
	componentDidMount(){ this.setState({device_id: Constants.deviceId}) }
	executeSignup(){
		requestSignup(this.state.srvno, this.state.password, this.state.name, this.state.rank, this.state.position, this.state.unit, this.state.phone, this.state.device_id)
		.then((response) => {
			if(response.status == 200){
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
					<base.Form style={{padding: 20,}}>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>회원가입</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10}}>아래의 정보를 입력해주세요</base.Text>
					</base.Form>

					<base.Form style={{padding: 10, marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
							<base.Text style={{fontSize: 20, alignSelf:'flex-start'}}>아이디(군번)</base.Text>
							<base.Input
								placeholder="'-'를 포함한 아이디(군번)을 입력하세요"
								onChangeText={(srvno) => this.setState({srvno})}
								style={{fontFamily:'Nanum',}}
								placeholderStyle={{fontFamily:'Nanum'}}
								keyboardType="number-pad"/>
						</base.Item>
					</base.Form>

					<base.Form style={{padding: 10, marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
							<base.Text style={{fontSize: 20, alignSelf:'flex-start'}}>비밀번호</base.Text>
							<base.Input
								placeholder='영문, 숫자, 특수문자를 포함한 비밀번호를 입력하세요'
								onChangeText={(password) => this.setState({password})}
								style={{fontFamily:'Nanum'}}
								placeholderStyle={{fontFamily:'Nanum'}}
								secureTextEntry={ true }
								/>
						</base.Item>
					</base.Form>

					<base.Form style={{padding: 10, marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
							<base.Text style={{fontSize: 20, alignSelf:'flex-start'}}>비밀번호 확인</base.Text>
							<base.Input
								placeholder='비밀번호 확인'
								onChangeText={(passwordCheck) => this.setState({passwordCheck})}
								style={{fontFamily:'Nanum'}}
								placeholderStyle={{fontFamily:'Nanum'}}
								secureTextEntry={ true }
								/>
						</base.Item>
					</base.Form>

					<base.Form style={{padding: 10, marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
							<base.Text style={{fontSize: 20, alignSelf:'flex-start'}}>이름</base.Text>
							<base.Input
								placeholder='실명을 입력하세요'
								onChangeText={(name) => this.setState({name})}
								style={{fontFamily:'Nanum'}}
								placeholderStyle={{fontFamily:'Nanum'}}
								/>
						</base.Item>
					</base.Form>

					<base.Form style={{padding: 10, marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
							<base.Text style={{fontSize: 20, alignSelf:'flex-start'}}>연락처(휴대폰 번호)</base.Text>
							<base.Input
								placeholder="'-'를 제외한 11자리를 입력하세요"
								onChangeText={(phone) => this.setState({phone})}
								style={{fontFamily:'Nanum'}}
								placeholderStyle={{fontFamily:'Nanum'}}
								keyboardType="number-pad"
								/>
						</base.Item>
					</base.Form>

					<base.Form style={{padding: 10, marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: 20, alignSelf:'flex-start'}}>계급</base.Text>
						<Picker
							selectedValue={this.state.rank}
							style={{height: 40, width: '100%'}}
							onValueChange={(itemValue) => this.setState({rank: itemValue}) }>
							<Picker.Item label="이병" value="이병" />
							<Picker.Item label="일병" value="일병" />
							<Picker.Item label="상병" value="상병" />
							<Picker.Item label="병장" value="병장" />
							<Picker.Item label="하사" value="하사" />
							<Picker.Item label="중사" value="중사" />
							<Picker.Item label="상사" value="상사" />
							<Picker.Item label="원사" value="원사" />
							<Picker.Item label="준위" value="준위" />
							<Picker.Item label="소위" value="소위" />
							<Picker.Item label="중위" value="중위" />
							<Picker.Item label="대위" value="대위" />
							<Picker.Item label="소령" value="소령" />
							<Picker.Item label="중령" value="중령" />
							<Picker.Item label="대령" value="대령" />
							<Picker.Item label="준장" value="준장" />
							<Picker.Item label="소장" value="소장" />
							<Picker.Item label="중장" value="중장" />
							<Picker.Item label="대장" value="대장" />
						</Picker>
						</base.Item>							
					</base.Form>


					<base.Form style={{padding: 10, marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: 20, alignSelf:'flex-start'}}>소속부대(제32보병사단)</base.Text>
						<Picker
							selectedValue={this.state.unit}
							style={{height: 50, width: '100%'}}
							onValueChange={(itemValue) => this.setState({unit: itemValue}) }>
							<Picker.Item label="사령부" value="사령부" />
							<Picker.Item label="직할대" value="직할대" />
							<Picker.Item label="97여단 1대대" value="97-1" />
							<Picker.Item label="97여단 2대대" value="97-2" />
							<Picker.Item label="97여단 3대대" value="97-3" />
							<Picker.Item label="98여단 1대대" value="98-1" />
							<Picker.Item label="98여단 2대대" value="98-2" />
							<Picker.Item label="98여단 3대대" value="98-3" />
							<Picker.Item label="98여단 4대대" value="98-4" />
						</Picker>							
						</base.Item>							
					</base.Form>
					
					<base.Form style={{padding: 10, marginVertical: 15}}>
						<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
							<base.Text style={{fontSize: 20, alignSelf:'flex-start'}}>직책</base.Text>
							<base.Input
								placeholder="직책을 입력해주세요"
								onChangeText={(position) => this.setState({position})}
								style={{fontFamily:'Nanum'}}
								placeholderStyle={{fontFamily:'Nanum'}}
								/>
						</base.Item>
					</base.Form>
					<base.Button rounded onPress={this.executeSignup} style={{flex: 1, backgroundColor: '#006eee', width: '80%',
						justifyContent: 'center', alignSelf: 'center', height: 60, elevation: 6, marginHorizontal: 10, marginBottom: 20}} >
						<base.Text style={{fontSize: 15}}>회원가입</base.Text>
					</base.Button>
				</base.Content>
			<StatusBar hidden/>
			</base.Container>
		);
	}
}
