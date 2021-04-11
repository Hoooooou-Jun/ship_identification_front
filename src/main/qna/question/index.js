import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Image, Alert, Dimensions} from 'react-native';
import * as base from 'native-base';
import { getToken } from '../../../utils/getToken';
import { registerQuestion } from '../../../utils/additionalInfoRequest';
import Loading from '../../../utils/loading';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_FONT = Dimensions.get('screen').height * 0.015
export default class Question extends Component{
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			content: '',
			loadingVisible: false,
		};
		this.executeRegister = this.executeRegister.bind(this);
	}
	executeRegister(){
		this.setState({loadingVisible: true})
		getToken().then((token) => {
			registerQuestion(token, this.state.title, this.state.content).then((response) =>{
				if(response.status == 200){
					this.setState({loadingVisible: false})
					console.log('Question Register Success')
					Alert.alert(
						'선박확인체계 알림',
						'입력하신 문의사항이 전송되었습니다',
					)
					this.props.navigation.popToTop();
				}
				else{
					console.log('Question Register Fail')
				}
			})
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
					<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>문의하기</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey'}}>궁금하신 점이 있다면 문의해주세요!</base.Text>
				</base.Form>
				<base.Form style={{paddingHorizontal: 10, marginVertical: 5}}>
					<base.Item regular style={{ width:'100%', borderRadius: 10}}>
						<base.Input placeholder={'문의 제목'} value={this.state.title} onChangeText={(title) => this.setState({title})} style={{fontFamily:'Nanum', fontSize: SIZE_FONT}}
						placeholderStyle={{fontFamily:'Nanum'}}/>
					</base.Item>
				</base.Form>
				<base.Form style={{paddingHorizontal: 10, marginVertical: 5}}>
					<base.Textarea rowSpan={5} bordered
						onChangeText={(content) => this.setState({content})} placeholder="문의 내용"
						style={{fontFamily: 'Nanum', borderRadius: 10, padding: 10, fontSize: SIZE_FONT}}/>
				</base.Form>
				<base.Button block onPress={this.executeRegister} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
					<base.Text style={{color: 'black'}}>문의하기</base.Text>
				</base.Button>
                </base.Content>
            <StatusBar hidden/>
            </base.Container>
		);
	}
}