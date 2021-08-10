import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './styles';
import * as base from 'native-base';
import { Linking, Alert, Dimensions, FlatList, TouchableHighlight } from 'react-native';

import { requestLogout } from '../../utils/userInfoRequest';
import { requestNoticeList } from '../../utils/additionalInfoRequest';

import { connect } from 'react-redux';

import Loading from '../../utils/loading';

import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const SIZE_LOGO = Dimensions.get('screen').height * 0.08
const SIZE_TITLE = Dimensions.get('screen').height * 0.0225
const SIZE_FONT = Dimensions.get('screen').width * 0.035
const SIZE_FOOTER = Dimensions.get('screen').height * 0.0175
const SIZE_SUBFOOTER = Dimensions.get('screen').height * 0.0150
const SIZE_ICON = Dimensions.get('screen').height * 0.035
const SIZE_SUBICON = Dimensions.get('screen').height * 0.045

const Home = (props) => {

	const [data, setData] = useState()
	const [dataMount, setDataMount] = useState(false)
	const [flatlistSize, setFlatlistSize] = useState(0)
	const [flatlistIndex, setFlatlistIndex] = useState(0)

	
	useLayoutEffect(() => {
		function getNoticeList() {
		    requestNoticeList(props.userInfo.token).then((response) => {
				try {
					setData(response.data.data)
					setFlatlistSize(response.data.data.length)
				}
				catch(err) {
					console.log(err)
				}
			})
			setDataMount(true)
		}
		getNoticeList()
	}, [])

	if(dataMount) {
		return(
			<base.Container>
				<base.Content contentContainerStyle={{alignItems: 'center', justifyContent:'center', flex: 1,}}>

					<base.Form style={{flex: 6, width: '100%', flexDirection: 'column', marginBottom: 10}}>
						<base.Form style={{flex: 1, backgroundColor: '#EDF5FE', borderRadius: 20, elevation: 6}}>

							<base.Form style={{flex: 1, alignItems: 'center', flexDirection: 'row', backgroundColor: '#EDF5FE', elevation: 6, width: '100%',
								borderRadius: 20}}>
								<base.Form style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
									<base.Form style={{backgroundColor: '#006eee', borderRadius: 20, margin: 5}}>
										<MaterialCommunityIcons name="sail-boat" size={SIZE_LOGO} color="white" />
									</base.Form>
								</base.Form>
								<base.Form style={{flex: 3}}>
									<base.Form style={{alignItems: 'flex-end', justifyContent: 'center', padding: 10, width: '100%'}}>
										<base.Form style={{flexDirection: 'row', alignItems: 'flex-end'}}>
											<base.Text style={{color: 'grey', fontSize: SIZE_TITLE}}>{props.userInfo.rank} </base.Text>
											<base.Text style={{color: '#006eee', fontSize: SIZE_TITLE + 10}}>{props.userInfo.name}</base.Text>
										</base.Form>
										<base.Text style={{color: 'grey', fontSize: SIZE_TITLE - 5}}>제32보병사단 {props.userInfo.unit} {props.userInfo.position}</base.Text>
									</base.Form>
								</base.Form>
							</base.Form>	

							<base.Form style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
								<base.CardItem button style={styles.cardButton}
									onPress={()=>props.navigation.navigate('MyAccount')}>
									<AntDesign name="idcard" size={SIZE_ICON} color="#006eee" style={{alignItems: 'center'}}/>
									<base.Text style={styles.cardText}>내정보</base.Text>
								</base.CardItem>
								<base.CardItem button style={styles.cardButton}
									onPress={()=>props.navigation.navigate('NoticeList')}>
									<AntDesign name="notification" size={SIZE_ICON} color="#006eee" style={{alignItems: 'center'}}/>
									<base.Text style={styles.cardText}>공지사항</base.Text>
								</base.CardItem>
								<base.CardItem button style={styles.cardButton}
									onPress={()=>props.navigation.navigate('QNAList')}>
									<AntDesign name="message1" size={SIZE_ICON} color="#006eee" style={{alignItems: 'center'}}/>
									<base.Text style={styles.cardText}>질의응답</base.Text>
								</base.CardItem>
								<base.CardItem button style={styles.cardButton} >
									<AntDesign name="poweroff" size={SIZE_ICON} color="#006eee" style={{alignItems: 'center'}}/>
									<base.Text style={styles.cardText}>로그아웃</base.Text>
								</base.CardItem>
							</base.Form>

						</base.Form>
					</base.Form>

					<base.Form style={{flex: 2, margin: 10, elevation: 6, backgroundColor: 'white', borderRadius: 20}}>
					 	{/* <FlatList
							keyExtractor = { (item, index) => index.toString() }
							data={data}
							horizontal={true}
							renderItem={({item}) =>
								<TouchableHighlight onPress={()=>props.navigation.navigate('Notice',{id: item.id,})}>
									<base.Form style={{width: Dimensions.get('screen').width - 20, flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start',
										borderRadius: 10, backgroundColor:'white', height: '100%',}}>
										<base.Form style={{padding: 10, width: '100%'}}>
											<base.Text style={{color: '#006eee', fontSize: SIZE_TITLE, marginBottom: 5}}>{item.title}</base.Text>
											<base.Text style={{color: 'grey', fontSize: SIZE_FONT}}>{item.date}</base.Text>
										</base.Form>
									</base.Form>
								</TouchableHighlight>
							}
							ListEmptyComponent={
								<base.Form style={{width: Dimensions.get('screen').width - 40, flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start',
										borderRadius: 10, backgroundColor:'white'}}>
									<base.Form style={{padding: 10,}}>
										<base.Text style={{color: '#006eee', fontSize: SIZE_TITLE, marginBottom: 5}}>금일 공지사항이 없습니다</base.Text>
										<base.Text style={{color: 'grey', fontSize: SIZE_FONT}}>선박확인체계 관리자</base.Text>
									</base.Form>
								</base.Form>
							}
						/> */}
					</base.Form>

					<base.Form style={{flex: 15, width: '100%'}}>

						<base.Form style={{flex: 1, width: '100%', padding: 5}}>
							<base.Form style={{
									flex: 1, width: '100%', padding: 10,
									flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
								}}>
								<base.CardItem button style={styles.baseDirection} onPress={()=>props.navigation.navigate('Search')}>
									<base.Form style={styles.baseIcon}>
										<AntDesign name="search1" size={SIZE_SUBICON} color="#006eee"/>
									</base.Form>
									<base.Text style={styles.baseItemText}>통합검색</base.Text>
								</base.CardItem>
								<base.CardItem button style={styles.baseDirection} onPress={()=>props.navigation.navigate('SearchAI')}>
									<base.Form style={styles.baseIcon}>
									<AntDesign name="barschart" size={SIZE_SUBICON} color="#006eee"/>
									</base.Form>
									<base.Text style={styles.baseItemText}>AI 검색
									</base.Text>
								</base.CardItem>
								<base.CardItem button style={styles.baseDirection} onPress={()=>props.navigation.navigate('MapSelection')}>
									<base.Form style={styles.baseIcon}>
										<Feather name="map" size={SIZE_SUBICON} color="#006eee"/>
									</base.Form>
									<base.Text style={styles.baseItemText}>지도검색</base.Text>
								</base.CardItem>
							</base.Form>
						</base.Form>

						<base.Form style={{flex: 1, width: '100%', padding: 5}}>
							<base.Form style={{
									flex: 1, width: '100%', padding: 10,
									flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
								}}>
								<base.CardItem button style={styles.baseDirection} onPress={()=>props.navigation.navigate('ListCommonShip')}>
									<base.Form style={styles.baseIcon}>
										<AntDesign name="copy1" size={SIZE_SUBICON} color="#006eee"/>
									</base.Form>
									<base.Text style={styles.baseItemText}>일반선박 목록</base.Text>
								</base.CardItem>
								<base.CardItem button style={styles.baseDirection} onPress={()=>props.navigation.navigate('ListWastedShip')}>
									<base.Form style={styles.baseIcon}>
										<AntDesign name="copy1" size={SIZE_SUBICON} color="#006eee"/>
									</base.Form>
									<base.Text style={styles.baseItemText}>유기선박 목록</base.Text>
								</base.CardItem>
								<base.CardItem button style={styles.baseDirection} onPress={()=>props.navigation.navigate('Register')}>
									<base.Form style={styles.baseIcon}>
										<AntDesign name="addfile" size={SIZE_SUBICON} color="#006eee"/>
									</base.Form>
									<base.Text style={styles.baseItemText}>선박등록</base.Text>
								</base.CardItem>
							</base.Form>
						</base.Form>

						<base.Form style={{flex: 1, width: '100%', padding: 5}}>
							<base.Form style={{
									flex: 1, width: '100%', padding: 10,
									flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
								}}>
								<base.CardItem button style={styles.baseDirection} onPress={()=>Linking.openURL('http://m.kma.go.kr')}>
								<base.Form style={styles.baseIcon}>
										<base.Icon name='partly-sunny-outline' style={{fontSize: SIZE_SUBICON, color: '#006eee'}}/>
									</base.Form>
									<base.Text style={styles.baseItemText}>기상정보</base.Text>
								</base.CardItem>
								<base.CardItem button style={styles.baseDirection} onPress={()=>Linking.openURL('http://m.khoa.go.kr/')}>
									<base.Form style={styles.baseIcon}>
										<MaterialCommunityIcons name="waves" size={SIZE_SUBICON} color="#006eee"/>
									</base.Form>
									<base.Text style={styles.baseItemText}>수치조류도</base.Text>
								</base.CardItem>
								<base.CardItem button style={styles.baseDirection} onPress={()=>Linking.openURL('https://www.marinetraffic.com/en/ais/home/centerx:126.1/centery:36.5/zoom:8')}>
									<base.Form style={styles.baseIcon}>
										<base.Icon name='ios-boat-outline' style={{fontSize: SIZE_SUBICON, color: '#006eee'}}/>
									</base.Form>
									<base.Text style={styles.baseItemText}>선박위치정보</base.Text>
								</base.CardItem>
							</base.Form>
						</base.Form>

					</base.Form>

					<base.Text style={{flex: 1, color: 'grey', fontSize: SIZE_FOOTER, marginBottom: -10}}>선박확인체계 {props.userInfo.version}</base.Text>
					<base.Text onPress={()=>props.navigation.navigate('License')} style={{flex: 1, color: 'grey', fontSize: SIZE_SUBFOOTER, color: 'skyblue', textDecorationLine: 'underline'}}>License</base.Text>
				</base.Content>
			<StatusBar hidden/>
			</base.Container>
		)
	}
	else {
		return (
			<Loading />
		)
	}
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.userInfo
	}

}

export default connect(mapStateToProps)(Home);
// export default class Home extends Component{
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			name: '',
// 			password: '',
//             name : '',
// 			rank : '',
// 			position : '',
// 			unit : '',
// 			phone : '',
// 			device_id : '',

// 			data: [],

// 			flatlistIndex: 0,
// 			flatlistSize: 0,

// 			loadingVisible_userData: false,
// 			loadingVisible_noticeData: false,
// 		}
// 		this.getUserData = this.getUserData(this);
// 		this.executeLogout = this.executeLogout.bind(this);
// 		this.getNoticeList = this.getNoticeList(this);

// 		this.movenotice = this.movenotice.bind(this);
// 	}
// 	componentDidMount() {
// 		this.timer = setInterval(() => {
// 			this.movenotice();
// 		}, 3000);
// 	}
// 	getUserData(){
// 		this.setState({loadingVisible_userData: true})
// 		getToken().then((token) => {
// 			requestUserData(token).then((response) => {
// 				if(response.status == 200){
// 					this.setState({
// 						name : response.data.data.name,
// 						rank : response.data.data.rank,
// 						position : response.data.data.position,
// 						unit : response.data.data.unit,
// 						phone : response.data.data.phone,
// 						device_id : response.data.data.device_id,

// 						loadingVisible_userData: false,
// 					})
// 				}
// 				else{
// 					console.log('fail')
// 				}
// 			})
//         })
// 	}
// 	getNoticeList(){
// 		this.setState({loadingVisible_noticeData: true})
// 		getToken().then((token) => {
// 			requestNoticeList(token).then((response) =>{
// 				if(response.status == 200){
// 					this.setState({
// 						data: this.state.data.concat(response.data.data),
// 						flatlistSize: response.data.data.length,
// 						loadingVisible_noticeData: false,
// 					})
// 				}
// 				else{
// 					console.log('Notice Data Failed')
// 				}
// 			})
// 		})
// 	}
// 	executeLogout() {
// 		this.setState({loadingVisible: true})
//         getToken().then((token)=>{
//             requestLogout(token).then((response) => {
// 				this.setState({loadingVisible: false})
// 					AsyncStorage.removeItem('token')
// 				Alert.alert(
// 					'선박확인체계 알림',
// 					'정상적으로 로그아웃 되었습니다',
// 				)
// 				this.props.navigation.navigate('Login')
//             })
//         })
//     }
// 	movenotice(){
// 		if(this.state.data.length != 0){
// 			if(this.state.flatlistSize - 1 == this.state.flatlistIndex) {
// 				this.state.flatlistIndex = 0
// 				this.flatList.scrollToIndex({index: 0, animated: true})
// 			}
// 			else{
// 				this.flatList.scrollToIndex({index: ++this.state.flatlistIndex, animated: true})
// 			}
// 		}
// 	}
// 	render(){
// 		return(
//             <base.Container>
//                 <base.Content contentContainerStyle={{alignItems: 'center', justifyContent:'center', flex: 1,}}>
// 					<Loading visible={this.state.loadingVisible_userData || this.state.loadingVisible_noticeData} initialRoute={false}/>

// 					<base.Form style={{flex: 6, width: '100%', flexDirection: 'column', marginBottom: 10}}>
// 						<base.Form style={{flex: 1, backgroundColor: '#EDF5FE', borderRadius: 20, elevation: 6}}>

// 							<base.Form style={{flex: 1, alignItems: 'center', flexDirection: 'row', backgroundColor: '#EDF5FE', elevation: 6, width: '100%',
// 								borderRadius: 20}}>
// 								<base.Form style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
// 									<base.Form style={{backgroundColor: '#006eee', borderRadius: 20, margin: 5}}>
// 										<MaterialCommunityIcons name="sail-boat" size={SIZE_LOGO} color="white" />
// 									</base.Form>
// 								</base.Form>
// 								<base.Form style={{flex: 3}}>
// 									<base.Form style={{alignItems: 'flex-end', justifyContent: 'center', padding: 10, width: '100%'}}>
// 										<base.Form style={{flexDirection: 'row', alignItems: 'flex-end'}}>
// 											<base.Text style={{color: 'grey', fontSize: SIZE_TITLE}}>{this.state.rank} </base.Text>
// 											<base.Text style={{color: '#006eee', fontSize: SIZE_TITLE + 10}}>{this.state.name}</base.Text>
// 										</base.Form>
// 										<base.Text style={{color: 'grey', fontSize: SIZE_TITLE - 5}}>제32보병사단 {this.state.unit} {this.state.position}</base.Text>
// 									</base.Form>
// 								</base.Form>
// 							</base.Form>	

// 							<base.Form style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
// 								<base.CardItem button style={styles.cardButton}
// 									onPress={()=>this.props.navigation.navigate('MyAccount')}>
// 									<AntDesign name="idcard" size={SIZE_ICON} color="#006eee" style={{alignItems: 'center'}}/>
// 									<base.Text style={styles.cardText}>내정보</base.Text>
// 								</base.CardItem>
// 								<base.CardItem button style={styles.cardButton}
// 									onPress={()=>this.props.navigation.navigate('NoticeList')}>
// 									<AntDesign name="notification" size={SIZE_ICON} color="#006eee" style={{alignItems: 'center'}}/>
// 									<base.Text style={styles.cardText}>공지사항</base.Text>
// 								</base.CardItem>
// 								<base.CardItem button style={styles.cardButton}
// 									onPress={()=>this.props.navigation.navigate('QNAList')}>
// 									<AntDesign name="message1" size={SIZE_ICON} color="#006eee" style={{alignItems: 'center'}}/>
// 									<base.Text style={styles.cardText}>질의응답</base.Text>
// 								</base.CardItem>
// 								<base.CardItem button style={styles.cardButton} onPress={this.executeLogout}>
// 									<AntDesign name="poweroff" size={SIZE_ICON} color="#006eee" style={{alignItems: 'center'}}/>
// 									<base.Text style={styles.cardText}>로그아웃</base.Text>
// 								</base.CardItem>
// 							</base.Form>

// 						</base.Form>
// 					</base.Form>

// 					<base.Form style={{flex: 2, margin: 10, elevation: 6, backgroundColor: 'white', borderRadius: 20}}>
// 						<FlatList
// 							ref = {(ref) => this.flatList=ref}
// 							data={this.state.data}
// 							horizontal={true}
// 							renderItem={({item}) =>
// 								<TouchableHighlight onPress={()=>this.props.navigation.navigate('Notice',{id: item.id,})}>
// 									<base.Form style={{width: Dimensions.get('screen').width - 20, flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start',
// 										borderRadius: 10, backgroundColor:'white', height: '100%',}}>
// 										<base.Form style={{padding: 10, width: '100%'}}>
// 											<base.Text style={{color: '#006eee', fontSize: SIZE_TITLE, marginBottom: 5}}>{item.title}</base.Text>
// 											<base.Text style={{color: 'grey', fontSize: SIZE_FONT}}>{item.date}</base.Text>
// 										</base.Form>
// 									</base.Form>
// 								</TouchableHighlight>
// 							}
// 							ListEmptyComponent={
// 								<base.Form style={{width: Dimensions.get('screen').width - 40, flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start',
// 										borderRadius: 10, backgroundColor:'white'}}>
// 									<base.Form style={{padding: 10,}}>
// 										<base.Text style={{color: '#006eee', fontSize: SIZE_TITLE, marginBottom: 5}}>금일 공지사항이 없습니다</base.Text>
// 										<base.Text style={{color: 'grey', fontSize: SIZE_FONT}}>선박확인체계 관리자</base.Text>
// 									</base.Form>
// 								</base.Form>
// 							}
// 						/>
// 					</base.Form>

// 					<base.Form style={{flex: 15, width: '100%'}}>

// 						<base.Form style={{flex: 1, width: '100%', padding: 5}}>
// 							<base.Form style={{
// 									flex: 1, width: '100%', padding: 10,
// 									flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
// 								}}>
// 								<base.CardItem button style={styles.baseDirection} onPress={()=>this.props.navigation.navigate('Search')}>
// 									<base.Form style={styles.baseIcon}>
// 										<AntDesign name="search1" size={SIZE_SUBICON} color="#006eee"/>
// 									</base.Form>
// 									<base.Text style={styles.baseItemText}>통합검색</base.Text>
// 								</base.CardItem>
// 								<base.CardItem button style={styles.baseDirection} onPress={()=>this.props.navigation.navigate('SearchAI')}>
// 									<base.Form style={styles.baseIcon}>
// 									<AntDesign name="barschart" size={SIZE_SUBICON} color="#006eee"/>
// 									</base.Form>
// 									<base.Text style={styles.baseItemText}>AI 검색
// 									</base.Text>
// 								</base.CardItem>
// 								<base.CardItem button style={styles.baseDirection} onPress={()=>this.props.navigation.navigate('MapSelection')}>
// 									<base.Form style={styles.baseIcon}>
// 										<Feather name="map" size={SIZE_SUBICON} color="#006eee"/>
// 									</base.Form>
// 									<base.Text style={styles.baseItemText}>지도검색</base.Text>
// 								</base.CardItem>
// 							</base.Form>
// 						</base.Form>

// 						<base.Form style={{flex: 1, width: '100%', padding: 5}}>
// 							<base.Form style={{
// 									flex: 1, width: '100%', padding: 10,
// 									flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
// 								}}>
// 								<base.CardItem button style={styles.baseDirection} onPress={()=>this.props.navigation.navigate('ListCommonShip')}>
// 									<base.Form style={styles.baseIcon}>
// 										<AntDesign name="copy1" size={SIZE_SUBICON} color="#006eee"/>
// 									</base.Form>
// 									<base.Text style={styles.baseItemText}>일반선박 목록</base.Text>
// 								</base.CardItem>
// 								<base.CardItem button style={styles.baseDirection} onPress={()=>this.props.navigation.navigate('ListWastedShip')}>
// 									<base.Form style={styles.baseIcon}>
// 										<AntDesign name="copy1" size={SIZE_SUBICON} color="#006eee"/>
// 									</base.Form>
// 									<base.Text style={styles.baseItemText}>유기선박 목록</base.Text>
// 								</base.CardItem>
// 								<base.CardItem button style={styles.baseDirection} onPress={()=>this.props.navigation.navigate('Register')}>
// 									<base.Form style={styles.baseIcon}>
// 										<AntDesign name="addfile" size={SIZE_SUBICON} color="#006eee"/>
// 									</base.Form>
// 									<base.Text style={styles.baseItemText}>선박등록</base.Text>
// 								</base.CardItem>
// 							</base.Form>
// 						</base.Form>

// 						<base.Form style={{flex: 1, width: '100%', padding: 5}}>
// 							<base.Form style={{
// 									flex: 1, width: '100%', padding: 10,
// 									flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
// 								}}>
// 								<base.CardItem button style={styles.baseDirection} onPress={()=>Linking.openURL('http://m.kma.go.kr')}>
// 								<base.Form style={styles.baseIcon}>
// 										<base.Icon name='partly-sunny-outline' style={{fontSize: SIZE_SUBICON, color: '#006eee'}}/>
// 									</base.Form>
// 									<base.Text style={styles.baseItemText}>기상정보</base.Text>
// 								</base.CardItem>
// 								<base.CardItem button style={styles.baseDirection} onPress={()=>Linking.openURL('http://m.khoa.go.kr/')}>
// 									<base.Form style={styles.baseIcon}>
// 										<MaterialCommunityIcons name="waves" size={SIZE_SUBICON} color="#006eee"/>
// 									</base.Form>
// 									<base.Text style={styles.baseItemText}>수치조류도</base.Text>
// 								</base.CardItem>
// 								<base.CardItem button style={styles.baseDirection} onPress={()=>Linking.openURL('https://www.marinetraffic.com/en/ais/home/centerx:126.1/centery:36.5/zoom:8')}>
// 									<base.Form style={styles.baseIcon}>
// 										<base.Icon name='ios-boat-outline' style={{fontSize: SIZE_SUBICON, color: '#006eee'}}/>
// 									</base.Form>
// 									<base.Text style={styles.baseItemText}>선박위치정보</base.Text>
// 								</base.CardItem>
// 							</base.Form>
// 						</base.Form>

// 					</base.Form>

// 					<base.Text style={{flex: 1, color: 'grey', fontSize: SIZE_FOOTER, marginBottom: -10}}>선박확인체계 {AppVersion}</base.Text>
// 					<base.Text onPress={()=>this.props.navigation.navigate('License')} style={{flex: 1, color: 'grey', fontSize: SIZE_SUBFOOTER, color: 'skyblue', textDecorationLine: 'underline'}}>License</base.Text>
//                 </base.Content>
// 			<StatusBar hidden/>
//             </base.Container>
// 		);
// 	}
// }