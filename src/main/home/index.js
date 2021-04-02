import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as base from 'native-base';
import { Linking, Image, Alert, Dimensions, FlatList, TouchableHighlight } from 'react-native';
import * as Font from 'expo-font';

import { getToken } from '../../utils/getToken';
import { requestUserData } from '../../utils/userInfoRequest';
import { requestLogout } from '../../utils/userInfoRequest';
import { requestNoticeList } from '../../utils/additionalInfoRequest';

import Loading from '../../utils/loading';

const SIZE_TITLE = Dimensions.get('screen').height * 0.0225
const SIZE_FONT = Dimensions.get('screen').height * 0.015
const SIZE_FOOTER = Dimensions.get('screen').height * 0.015
const SIZE_ICON = Dimensions.get('screen').height * 0.0375
const SIZE_LOGO = Dimensions.get('screen').height * 0.1
const SIZE_LAYOUT = Dimensions.get('screen').width * 0.2

export default class Home extends Component{
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			password: '',
            name : '',
			rank : '',
			position : '',
			unit : '',
			phone : '',
			device_id : '',

			data: [],

			flatlistIndex: 0,
			flatlistSize: 0,

			loadingVisible_userData: false,
			loadingVisible_noticeData: false,
		}
		this.daysArray = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
		this.getUserData = this.getUserData(this);
		this.executeLogout = this.executeLogout.bind(this);
		this.getNoticeList = this.getNoticeList(this);

		this.movenotice = this.movenotice.bind(this);
	}
	componentWillMount() {
		this.getCurrentTime();
	}
	componentDidMount() {
		this.timer = setInterval(() => {
			this.getCurrentTime();
		}, 1000);
		this.timer = setInterval(() => {
			this.movenotice();
		}, 3000);
	}
	componentWillUnmount() {
		clearInterval(this.timer);
	}
	getCurrentTime = () => {
		let x = new Date();
		let str = x.toLocaleString()
		let year = str.substr(20, 4);
		let month = str.substr(4, 3)
		let day = str.substr(8, 2)
		let hour = str.substr(11, 2)
		let minutes = str.substr(14, 2)
		let seconds = str.substr(17, 2)
		switch (month) {
			case 'Jan': {
				month = '01';
				break;
			}
			case 'Feb': {
				month = '02';
				break;
			}
			case 'Mar': {
				month = '03';
				break;
			}
			case 'Apr': {
				month = '04';
				break;
			}
			case 'May': {
				month = '05';
				break;
			}
			case 'Jun': {
				month = '06';
				break;
			}
			case 'Jul': {
				month = '07';
				break;
			}
			case 'Aug': {
				month = '08';
				break;
			}
			case 'Sep': {
				month = '09';
				break;
			}
			case 'Oct': {
				month = '10';
				break;
			}
			case 'Nov': {
				month = '11';
				break;
			}
			case 'Dec': {
				month = '12';
				break;
			}

		}
	
		this.setState({
			currentTime: hour + ' : ' + minutes + ' : ' + seconds,
			currentDays: year + '년 ' + month + '월 ' + day + '일'
		});
			this.daysArray.map((item, key) => {
				if (key == new Date().getDay()) {
					this.setState({ currentDay: item.toUpperCase() });
				}
		})
	}
	getUserData(){
		this.setState({loadingVisible_userData: true})
		getToken().then((token) => {
			requestUserData(token).then((response) => {
				if(response.status == 200){
					this.setState({
						name : response.data.data.name,
						rank : response.data.data.rank,
						position : response.data.data.position,
						unit : response.data.data.unit,
						phone : response.data.data.phone,
						device_id : response.data.data.device_id,

						loadingVisible_userData: false,
					})
				}
				else{
					console.log('fail')
				}
			})
        })
	}
	getNoticeList(){
		this.setState({loadingVisible_noticeData: true})
		getToken().then((token) => {
			requestNoticeList(token).then((response) =>{
				if(response.status == 200){
					this.setState({
						data: this.state.data.concat(response.data.data),
						flatlistSize: response.data.data.length,
						loadingVisible_noticeData: false,
					})
					console.log(this.state.data.length)
				}
				else{
					console.log('Notice Data Failed')
				}
			})
		})
	}
	executeLogout() {
		this.setState({loadingVisible: true})
        getToken().then((token)=>{
            requestLogout(token).then( async (response) => {
                if(response.status == 200){
					this.setState({loadingVisible: false})
                    await AsyncStorage.removeItem('token')
					Alert.alert(
						'선박확인체계 알림',
						'정상적으로 로그아웃 되었습니다',
					)
                    this.props.navigation.navigate('Login')
                }
            })
        })
    }
	movenotice(){
		if(this.state.data.length != 0){
			if(this.state.flatlistSize - 1 == this.state.flatlistIndex) {
				this.state.flatlistIndex = 0
				this.refs.listRef.scrollToIndex({index: 0, animated: true})
			}
			else{
				this.refs.listRef.scrollToIndex({index: ++this.state.flatlistIndex, animated: true})
			}
		}
	}
	render(){
		return(
            <base.Container>
                <base.Content contentContainerStyle={{alignItems: 'center', justifyContent:'center', flex: 1,}}>
					<Loading visible={this.state.loadingVisible_userData || this.state.loadingVisible_noticeData}/>
					<base.Form style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
						<base.Form style={{alignItems: 'center', justifyContent: 'center'}}>
							<base.Text style={{color:'black', fontSize: 20}}>{this.state.currentDays} {this.state.currentDay} {this.state.currentTime} </base.Text>
						</base.Form>
					</base.Form>
					<base.Form style={{flex: 5, padding: 10, width: '100%', flexDirection: 'column'}}>
						<base.Form style={{flex: 1, backgroundColor: '#006eee', borderRadius: 20, padding: 10, elevation: 10}}>
							<base.Form style={{flex: 2,}}>
								<FlatList
									ref="listRef"
									data={this.state.data}
									horizontal={true}
									renderItem={({item}) =>
										<TouchableHighlight onPress={()=>this.props.navigation.navigate('Notice',{id: item.id,})}>
											<base.Form style={{width: Dimensions.get('screen').width - 40, flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start',
												borderRadius: 10, backgroundColor:'white', height: '100%'}}>
												<base.Form style={{padding: 5,}}>
													<base.Text style={{color: '#006eee', fontSize: SIZE_TITLE}}>{item.title}</base.Text>
													<base.Text style={{color: 'grey', fontSize: SIZE_FONT}}>{item.date}</base.Text>
												</base.Form>
											</base.Form>
										</TouchableHighlight>
									}
									ListEmptyComponent={
										<base.Form style={{width: Dimensions.get('screen').width - 40, flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start',
												borderRadius: 10, backgroundColor:'white'}}>
											<base.Form style={{padding: 5,}}>
												<base.Text style={{color: '#006eee', fontSize: SIZE_TITLE}}>금일 공지사항이 없습니다</base.Text>
												<base.Text style={{color: 'grey', fontSize: SIZE_FONT}}>선박확인체계 관리자</base.Text>
											</base.Form>
										</base.Form>
									}
								/>
							</base.Form>
							<base.Form style={{flex: 4, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginLeft: 20}}>
								<base.Form style={{backgroundColor:'white', borderRadius: SIZE_LOGO / 2, justifyContent: 'center', alignItems: 'center', width: SIZE_LOGO, height: SIZE_LOGO}}>
									<Image source={require('../../../assets/img/logo_Army.jpg')} style={{width: SIZE_LOGO / 3 * 2, height: SIZE_LOGO / 3 * 2}}/>
								</base.Form>
								<base.Form style={{alignItems: 'flex-start', justifyContent: 'center', padding: 10,}}>
									<base.Text style={{color: 'white', fontSize: SIZE_TITLE}}>제32보병사단 {this.state.unit}</base.Text>
									<base.Text style={{color: 'white', fontSize: SIZE_TITLE}}>{this.state.position} {this.state.rank} {this.state.name}</base.Text>
								</base.Form>
							</base.Form>						
							<base.Form style={{flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
								<base.CardItem button style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor:'rgba(0,0,0,0)'}}
									onPress={()=>this.props.navigation.navigate('MyAccount')}>
									<base.Form style={{ width: 65, height: 65, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
										<base.Icon name='ios-information-circle' style={{fontSize: 50, color: 'white'}}/>
									</base.Form>
									<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_FONT, color: 'white'}}>내정보</base.Text>
								</base.CardItem>
								<base.CardItem button style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor:'rgba(0,0,0,0)'}}
								onPress={()=>this.props.navigation.navigate('NoticeList')}>
								<base.Form style={{ width: 65, height: 65, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
										<base.Icon name='ios-send' style={{fontSize: 40, color: 'white'}}/>
									</base.Form>
									<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_FONT, color: 'white'}}>공지사항</base.Text>
								</base.CardItem>
								<base.CardItem button style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor:'rgba(0,0,0,0)'}}
								onPress={()=>this.props.navigation.navigate('QNAList')}>
								<base.Form style={{ width: 65, height: 65, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
										<base.Text style={{fontSize: 30, color: 'white'}}>QnA</base.Text>
									</base.Form>
									<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_FONT, color: 'white'}}>질의응답</base.Text>
								</base.CardItem>
								<base.CardItem button style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center',backgroundColor:'rgba(0,0,0,0)'}} onPress={this.executeLogout}>
									<base.Form style={{ width: 65, height: 65, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
										<base.Icon name='ios-power' style={{fontSize:40, color: 'white'}}/>
									</base.Form>
									<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_FONT, color: 'white'}}>로그아웃</base.Text>
								</base.CardItem>
							</base.Form>
						</base.Form>
					</base.Form>
					<base.Form style={{flex: 3, width: '100%', padding: 5}}>
						<base.Form style={{
								flex: 1, width: '100%', padding: 10,
								flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
							}}>
							<base.CardItem button style={{ flexDirection: 'column', flex: 1,}} onPress={()=>this.props.navigation.navigate('Search')}>
								<base.Form style={{ backgroundColor: '#EDF5FE', width: SIZE_LAYOUT, height: SIZE_LAYOUT, borderRadius: 20, alignItems: 'center', justifyContent: 'center', elevation: 6}}>
									<base.Icon name='ios-search' style={{fontSize: SIZE_ICON, color: '#006eee'}}/>
								</base.Form>
								<base.Text style={{fontFamily:'Nanum', marginTop: 10, fontSize:SIZE_FONT}}>통합검색</base.Text>
							</base.CardItem>
							<base.CardItem button style={{ flexDirection: 'column', flex: 1,}} onPress={()=>this.props.navigation.navigate('SearchAI')}>
								<base.Form style={{ backgroundColor: '#EDF5FE', width: SIZE_LAYOUT, height: SIZE_LAYOUT, borderRadius: 20, alignItems: 'center', justifyContent: 'center', elevation: 6}}>
									<base.Icon name='ios-pulse' style={{fontSize: SIZE_ICON, color: '#006eee',}}/>
								</base.Form>
								<base.Text style={{fontFamily:'Nanum', marginTop: 10, fontSize:SIZE_FONT}}>AI검색
								</base.Text>
							</base.CardItem>
							<base.CardItem button style={{ flexDirection: 'column', flex: 1,}} onPress={()=>this.props.navigation.navigate('SearchMap')}>
								<base.Form style={{ backgroundColor: '#EDF5FE', width: SIZE_LAYOUT, height: SIZE_LAYOUT, borderRadius: 20, alignItems: 'center', justifyContent: 'center', elevation: 6}}>
									<base.Icon name='ios-map' style={{fontSize: SIZE_ICON, color: '#006eee'}}/>
								</base.Form>
								<base.Text style={{fontFamily:'Nanum', marginTop: 10, fontSize:SIZE_FONT}}>지도검색</base.Text>
							</base.CardItem>
						</base.Form>
					</base.Form>
					<base.Form style={{flex: 3, width: '100%', padding: 5}}>
						<base.Form style={{
								flex: 1, width: '100%', padding: 10,
								flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
							}}>
							<base.CardItem button style={{ flexDirection: 'column', flex: 1}} onPress={()=>this.props.navigation.navigate('ListCommonShip')}>
								<base.Form style={{ backgroundColor: '#EDF5FE', width: SIZE_LAYOUT, height: SIZE_LAYOUT, borderRadius: 20, alignItems: 'center', justifyContent: 'center', elevation: 6}}>
									<base.Icon name='logo-buffer' style={{fontSize: SIZE_ICON, color: '#006eee'}}/>
								</base.Form>
								<base.Text style={{fontFamily:'Nanum', marginTop: 10, fontSize:SIZE_FONT}}>일반선박 목록</base.Text>
							</base.CardItem>
							<base.CardItem button style={{ flexDirection: 'column', flex: 1,}} onPress={()=>this.props.navigation.navigate('ListWastedShip')}>
								<base.Form style={{ backgroundColor: '#EDF5FE', width: SIZE_LAYOUT, height: SIZE_LAYOUT, borderRadius: 20, alignItems: 'center', justifyContent: 'center', elevation: 6}}>
									<base.Icon name='logo-buffer' style={{fontSize: SIZE_ICON, color: '#006eee',}}/>
								</base.Form>
								<base.Text style={{fontFamily:'Nanum', marginTop: 10, fontSize:SIZE_FONT}}>유기선박 목록</base.Text>
							</base.CardItem>
							<base.CardItem button style={{ flexDirection: 'column', flex: 1,}} onPress={()=>this.props.navigation.navigate('Register')}>
								<base.Form style={{ backgroundColor: '#EDF5FE', width: SIZE_LAYOUT, height: SIZE_LAYOUT, borderRadius: 20, alignItems: 'center', justifyContent: 'center', elevation: 6}}>
									<base.Icon name='ios-add-circle' style={{fontSize: SIZE_ICON, color: '#006eee'}}/>
								</base.Form>
								<base.Text style={{fontFamily:'Nanum', marginTop: 10, fontSize:SIZE_FONT}}>선박등록</base.Text>
							</base.CardItem>
						</base.Form>
					</base.Form>
					<base.Form style={{flex: 3, width: '100%', padding: 5}}>
						<base.Form style={{
								flex: 1, width: '100%', padding: 10,
								flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
							}}>
							<base.CardItem button style={{ flexDirection: 'column', flex: 1,}} onPress={()=>Linking.openURL('http://m.kma.go.kr')}>
							<base.Form style={{ backgroundColor: '#EDF5FE', width: SIZE_LAYOUT, height: SIZE_LAYOUT, borderRadius: 20, alignItems: 'center', justifyContent: 'center', elevation: 6}}>
									<base.Icon name='ios-sunny' style={{fontSize: SIZE_ICON, color: '#006eee'}}/>
								</base.Form>
								<base.Text style={{fontFamily:'Nanum', marginTop: 10, fontSize:SIZE_FONT}}>기상정보</base.Text>
							</base.CardItem>
							<base.CardItem button style={{ flexDirection: 'column', flex: 1,}} onPress={()=>Linking.openURL('http://m.khoa.go.kr/')}>
							<base.Form style={{ backgroundColor: '#EDF5FE', width: SIZE_LAYOUT, height: SIZE_LAYOUT, borderRadius: 20, alignItems: 'center', justifyContent: 'center', elevation: 6}}>
									<base.Icon name='ios-podium' style={{fontSize:SIZE_ICON, color: '#006eee'}}/>
								</base.Form>
								<base.Text style={{fontFamily:'Nanum', marginTop: 10, fontSize:SIZE_FONT}}>수치조류도</base.Text>
							</base.CardItem>
							<base.CardItem button style={{ flexDirection: 'column', flex: 1,}} onPress={()=>
									Alert.alert(
										'선박확인체계 알림',
										'개발 중인 기능입니다',
									)	
								}>
								<base.Form style={{ backgroundColor: '#EDF5FE', width: SIZE_LAYOUT, height: SIZE_LAYOUT, borderRadius: 20, alignItems: 'center', justifyContent: 'center', elevation: 6}}>
									<base.Icon name='ios-boat' style={{fontSize: SIZE_ICON, color: '#006eee',}}/>
								</base.Form>
								<base.Text style={{fontFamily:'Nanum', marginTop: 10, fontSize:SIZE_FONT}}>조업알리미</base.Text>
							</base.CardItem>
						</base.Form>
					</base.Form>
					<base.Text style={{flex: 1, color: 'grey', fontSize: SIZE_FOOTER}}>선박확인체계 Beta TEST ver1.0.0</base.Text>
                </base.Content>
			<StatusBar hidden/>
            </base.Container>
		);
	}
}