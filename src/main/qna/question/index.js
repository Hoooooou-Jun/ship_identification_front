import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Dimensions} from 'react-native';
import * as base from 'native-base';
import { registerQuestion } from '../../../utils/additionalInfoRequest';
import Loading from '../../../utils/loading';
import { connect } from 'react-redux'

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_FONT = Dimensions.get('screen').height * 0.015

const Question = (props) => {
	const [title, setTitle] = useState()
	const [content, setContent] = useState()
	const [loadingVisible , setLoadingVisible] = useState(false)
	
	const executeRegister = () => {
		setLoadingVisible(true)
		registerQuestion(props.token, title, content).then((response) =>{
			if(response.status == 200){
				setLoadingVisible(false)
				console.log('Question Register Success')
				Alert.alert(
					'선박확인체계 알림',
					'입력하신 문의가 전송되었습니다.',
				)
				props.navigation.popToTop();
				props.navigation.navigate('QNAList',)
			}
			else{
				console.log('Question Register Fail')
			}
		})
	}

	return (
		<base.Container>
			<StatusBar hidden/>
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
				<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>문의하기</base.Text>
					<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey'}}>질의사항을 문의해주시기 바랍니다.</base.Text>
			</base.Form>
			<base.Form style={{paddingHorizontal: 10, marginVertical: 5}}>
				<base.Item regular style={{ width:'100%', borderRadius: 10}}>
					<base.Input placeholder={'문의 제목'} value={title} onChangeText={setTitle} style={{fontFamily:'Nanum', fontSize: SIZE_FONT}}
					placeholderStyle={{fontFamily:'Nanum'}}/>
				</base.Item>
			</base.Form>
			<base.Form style={{paddingHorizontal: 10, marginVertical: 5}}>
				<base.Textarea rowSpan={5} bordered
					onChangeText={setContent} placeholder="문의 내용"
					style={{fontFamily: 'Nanum', borderRadius: 10, padding: 10, fontSize: SIZE_FONT}}/>
			</base.Form>
			<base.Button block onPress={executeRegister} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
				<base.Text style={{color: 'black'}}>문의하기</base.Text>
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

export default connect(mapStateToProps)(Question)