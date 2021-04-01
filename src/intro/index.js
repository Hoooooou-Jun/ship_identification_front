import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions } from 'react-native';
import * as base from 'native-base';
import * as Font from 'expo-font';
import { Ionicons, Entypo } from '@expo/vector-icons';
import styles from './styles';

const SIZE_TITLE = Dimensions.get('screen').height * 0.05
const SIZE_FONT = Dimensions.get('screen').width * 0.04
const SIZE_WARNING = Dimensions.get('screen').height * 0.0175
const SIZE_ICON = Dimensions.get('screen').width * 0.6
const SIZE_MARGIN = Dimensions.get('screen').height * 0.025

export default class Intro extends Component{
	constructor(props){
		super(props)
		this.state={
			isReady: false,
		}
	}
	async componentDidMount(){
		await Font.loadAsync({
			Nanum: require('../../assets/fonts/Nanum.ttf'),
			Nanum_Title: require('../../assets/fonts/Nanum_Title.ttf'),
			'Roboto': require('../../node_modules/native-base/Fonts/Roboto.ttf'),
			'Roboto_medium': require('../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
			...Ionicons.font,
		})
		this.setState({isReady: true})
	}
	render(){
		if(!this.state.isReady){
			return(
				<View style={{alignItems:'center', justifyContent: 'center', flex: 1}}>
					<Text style ={{fontSize: 30}}>데이터 가져오는 중</Text>
					<base.Spinner color='blue' />
				</View>
			)
		}
		return(
			<base.Container>			
				<base.Content contentContainerStyle={styles.contentContainer}>
					<base.Form style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', padding: 10, height: '100%'}}>
						<base.Text style={{fontFamily: 'Nanum_Title', fontSize: SIZE_TITLE, color: 'white',}}>앱 접근 제한 경고</base.Text>
						<base.Icon name='ios-warning' style={{color: 'red', fontSize: SIZE_ICON,}}/>
						<base.Form>
							<base.Text style={{fontFamily:'Nanum', color: 'white', marginTop: SIZE_MARGIN, fontSize: SIZE_FONT,}} >
								앱 선박확인체계는 허가받은 사용자만 사용할 수 있습니다. 부당한 방법으로 해당 앱에 접근하거나 앱 내의 정보를
								삭제, 변경, 유출하는 사용자는 관련법령에 따라 처벌받게 됩니다. 모든 접속 시도는 로그서버에 기록되며 불법적인 접근 시도는 법적 제재를 받을 수 있습니다.
							</base.Text>
							<base.Text style={{fontFamily:'Nanum', color: 'white', marginTop: SIZE_MARGIN, fontSize: SIZE_FONT}}>
								저작권 법 제 25조 제 2항에 의해 특수 목적으로 사용되는 저작물이 포함되어 있습니다. 앱 내 자료를 외부에 공개 또는 게시하는 것을 금지하며 이를
								위반할 경우 법적 제재를 받을 수 있습니다.
							</base.Text>
							<base.Text style={{fontFamily:'Nanum', color: 'white', marginTop: SIZE_MARGIN, fontSize: SIZE_FONT}}>
								선박확인체계에서 제공하는 모든 자료는 저작권법에 의하여 보호받으며 그 저작권은 선박확인체계에 있습니다.
								따라서 홈페이지에서 제공하는 자료에 대해 무단복제 및 배포를 원칙적으로 금합니다.
							</base.Text>
						</base.Form>
						<base.Form style={{alignItems: 'center', justifyContent: 'center'}}>
							<base.Text style={{fontFamily:'Nanum_Title', color: 'white', marginTop: SIZE_MARGIN, fontSize: SIZE_WARNING, color: 'red'}}>
								허가받지 않은 사용자는 즉시 이 앱을 종료 및 삭제하십시오
							</base.Text>
						</base.Form>
						<base.Button block onPress={()=>this.props.navigation.navigate('Login')}
							style={{marginTop: 30, borderColor: 'white', backgroundColor: 'transparent', borderWidth: 1,}}>
							<base.Text style={{fontFamily: 'Nanum', color: 'white'}}>위 내용을 인지하였고 허가받은 사용자입니다</base.Text>
						</base.Button>
					</base.Form>
				</base.Content>
			<StatusBar hidden/>
			</base.Container>
		);
	}
}