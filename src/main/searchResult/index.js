import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import * as base from 'native-base';
import { FlatList, Dimensions, Alert, Modal, TextInput, Text, Pressable } from 'react-native';
import { searchCommonShip, searchWastedShip } from '../../utils/shipInfoRequest';
import ShowShip from './showShip';
import AntDesign from '@expo/vector-icons/AntDesign';
import Loading from '../../utils/loading';
import { connect } from 'react-redux'
import styles from './styles';

const SIZE_ICON = Dimensions.get('screen').height * 0.02
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02

let COMMON_BUTTONS = [
	{ text: "선박명 순", icon: "logo-angular", iconColor: "grey" },
	{ text: "최근 등록 순", icon: "time", iconColor: "grey" },
	{ text: "등록사진 수 순", icon: "image", iconColor: "grey" },
	{ text: "학습 여부 순", icon: "book", iconColor: "grey" },
	{ text: "취소", icon: "close", iconColor: "grey" }
];
let COMMON_CANCEL_INDEX = 4;
let COMMON_DESTRUCTIVE_INDEX = 4;
let WASTED_BUTTONS = [
	{ text: "관리번호 순", icon: "clipboard", iconColor: "grey",},
	{ text: "최근 등록 순", icon: "time", iconColor: "grey" },
	{ text: "등록사진 수 순", icon: "image", iconColor: "grey" },
	{ text: "취소", icon: "close", iconColor: "grey" }
];
let WASTED_DESTRUCTIVE_INDEX = 3;
let WASTED_CANCEL_INDEX = 3;

let UNIT_BUTTONS = [
	{ text: "전체", icon: "arrow-forward", iconColor: "grey",},
	{ text: "97여단 1대대", icon: "arrow-forward", iconColor: "grey",},
	{ text: "97여단 2대대", icon: "arrow-forward", iconColor: "grey" },
	{ text: "97여단 3대대", icon: "arrow-forward", iconColor: "grey" },
	{ text: "98여단 1대대", icon: "arrow-forward", iconColor: "grey",},
	{ text: "98여단 2대대", icon: "arrow-forward", iconColor: "grey" },
	{ text: "98여단 3대대", icon: "arrow-forward", iconColor: "grey" },
	{ text: "98여단 4대대", icon: "arrow-forward", iconColor: "grey" },
	{ text: "취소", icon: "close", iconColor: "grey" }
];
let UNIT_DESTRUCTIVE_INDEX = 8;
let UNIT_CANCEL_INDEX = 8;

const SearchResult = (props) => {
	const [data, set_data] = useState([])
	const [index, set_index] = useState(1)
	const [cnt, set_cnt] = useState(0)

	const [flag, set_flag] = useState('Normal')
	const [id, set_id] = useState('')
	const [types, set_types] = useState('')
	const [region, set_region] = useState('')
	const [name, set_name] = useState('Normal')
	const [code, set_code] = useState('Normal')
	const [tons, set_tons] = useState('') // 안쓰임
	const [size, set_size] = useState('') // 안쓰임
	const [port, set_port] = useState('')

	const [is_ais, set_is_ais] = useState(false)
	const [is_vpass, set_is_vpass] = useState(false)
	const [is_vhf, set_is_vhf] = useState(false)
	const [is_ff, set_is_ff] = useState(false)

	const [info, set_info] = useState('')

	const [loadingVisible, set_loadingVisible] = useState(true)
	const [unit, set_unit] = useState('all')
	const [sort, set_sort] = useState('')
	const [clicked, set_clicked] = useState(null)
	const [clicked_unit, set_clicked_unit] = useState(null)

	const [refreshing, set_refreshing] = useState(false)
	
	const [modalVisible, set_modalVisible] = useState(false)
	const [input, set_input] = useState()

	const flatListRef = useRef()

	useEffect(() => {
		async function fetchData() {
			await updateData()
			showResult()
		}
		fetchData();
	}, [])


	console.log('초기', flag, id, types, region, name, code, tons, size, port, is_ais, is_vpass, is_vhf, is_ff, info)

	const updateData = () => {
		console.log('updateDate')
		set_flag(props.navigation.getParam('flag'))
		set_name(props.navigation.getParam('name'))
		set_code(props.navigation.getParam('code'))
		set_tons(props.navigation.getParam('tons'))
		set_size(props.navigation.getParam('size'))
		set_is_ais(props.navigation.getParam('is_ais'))
		set_is_vpass(props.navigation.getParam('is_vpass'))
		set_is_vhf(props.navigation.getParam('is_vhf'))
		set_is_ff(props.navigation.getParam('is_ff'))
		set_region(props.navigation.getParam('region'))
		set_id(props.navigation.getParam('id'))
		set_types(props.navigation.getParam('types'))
		set_info(props.navigation.getParam('info'))
	}

	const firstPage = () => {
		if(index == 1){
			Alert.alert(
				'선박확인체계 알림',
				'첫번째 페이지입니다.',
			)
		}
		else {
			if(flag == 'Normal'){updateSearchCommonShip(1);}
			else{updateSearchWastedShip(1);}
		}
	}
	const lastPage = () => {
		if(index == cnt){
			Alert.alert(
				'선박확인체계 알림',
				'마지막 페이지입니다.',
			)
		}
		else {
			if(flag == 'Normal'){updateSearchCommonShip(cnt);}
			else{updateSearchWastedShip(cnt);}
		}
	}
	const previousPage = () => {
		if(index == 1){
			Alert.alert(
				'선박확인체계 알림',
				'첫번째 페이지입니다.',
			)
		}
		else {
			if(flag == 'Normal'){updateSearchCommonShip(index - 1);}
			else{updateSearchWastedShip(index - 1);}
		}
	}
	const nextPage = () => {
		if(index == pages){
			Alert.alert(
				'선박확인체계 알림',
				'마지막 페이지입니다.',
			)
		}
		else {
			if(flag == 'Normal'){updateSearchCommonShip(index + 1);}
			else{updateSearchWastedShip(index + 1);}
		}
	}

	const showResult = () => {
		if(flag == 'Normal') {
			console.log('showResult')
			// console.log('name: ', name)
			// console.log('types: ', types)
			// console.log('code: ', code)
			// console.log('tons: ', tons)
			// console.log('size: ', size)
			// console.log('is_ais: ', is_ais)
			// console.log('is_vpass: ', is_vpass)
			// console.log('is_vhf: ', is_vhf)
			// console.log('is_ff: ', is_ff)
			// console.log('region: ', region)
			// console.log('port: ', port)
			// console.log('sort: ', sort)
			// console.log('unit: ', name)
			searchCommonShip(props.token, 1, name, types, code, tons, size, is_ais, is_vpass, is_vhf, is_ff, region, port, sort, unit).then((response) => {
				if(response.status == 200) {
					console.log('변경됨', props.token, 1, name, types, code, tons, size, is_ais, is_vpass, is_vhf, is_ff, region, port, sort, unit)
					console.log(response.data)
					set_cnt(response.data.data.count)
					set_data(data.concat(response.data.data.data))
					set_loadingVisible(false)
				}
				else { 
					console.log('fail') 
				}
			})
		}
		else { // flag == 'Wasted'
			searchWastedShip(props.token, 1, id, region, types, info, sort, unit).then((response) => {
				if(response.status == 200){
					set_cnt(response.data.data.count)
					set_data(data.concat(response.data.data.data))
					set_loadingVisible(false)
				}
				else { 
					console.log('fail') 
				}
			})
		}
	}
	const updateSearchCommonShip = (idx) => {
		set_loadingVisible(true)
		searchCommonShip(props.token, idx, name, types, code, tons, size, is_ais, is_vpass, is_vhf, is_ff, region, port, sort, unit).then((response) => {
				if(response.status == 200) {
					set_index(idx)
					set_cnt(response.data.data.count)
					set_data(response.data.data.data)
					set_loadingVisible(false)
				}
				else { 
					console.log('fail') 
				}
			})
		this.flatList.scrollToOffset({x: 0, y: 0, animated: true})
	}
	const updateSearchWastedShip = (idx) => {
		set_loadingVisible(true)
		searchWastedShip(props.token, idx, id, region, types, info, sort, unit).then((response) => {
				if(response.status == 200) {
					set_index(idx)
					set_cnt(response.data.data.count)
					set_data(response.data.data.data)
					set_loadingVisible(false)
				}
				else {
					console.log('fail')
				}
			})
		this.flatList.scrollToOffset({x: 0, y: 0, animated: true})
	}
	const getDetail = (id) => {
		if(flag == 'Normal'){
			props.navigation.navigate('DetailCommonShip',{id: id})}
		else{ // flag == 'Wasted'
			props.navigation.navigate('DetailWastedShip',{id: id})}
	}

	// const handleRefresh = () => {
	// 	this.setState({refreshing: false}, () => {
	// 		if (flag == 'Normal') {
	// 			updateSearchCommonShip(index)
	// 		}
	// 		else {
	// 			updateSearchWastedShip(index) 
	// 		}	
	// 	})
	// }

	const searchPageList = (idx) => {
		if(flag == "Normal") {
			if(1 <= idx && cnt >= idx) {
				set_loadingVisible(true)
				searchCommonShip(props.token, idx, name, types, code, tons, size, is_ais, is_vpass, is_vhf, is_ff, region, port, sort, unit).then((response) => {
					if(response.status == 200) {
						set_index(idx)
						set_cnt(response.data.data.count)
						set_data(response.data.data.data)
						set_loadingVisible(false)
					}
					else {
						console.log('fail')
					}
				})
				this.flatList.scrollToOffset({x: 0, y: 0, animated: true})
			}
			else {
				Alert.alert(
					'선박확인체계 알림',
					'존재하지 않은 페이지입니다.'
				)
			}
		}
		else { // Waste ship
			if(1 <= idx && cnt >= idx) {
				set_loadingVisible(true)
				searchWastedShip(props.token, idx, id, region, types, info, sort, unit).then((response) => {
					if(response.status == 200) {
						set_index(idx)
						set_cnt(response.data.data.count)
						set_data(response.data.data.data)
						set_loadingVisible(false)
					}
					else {
						console.log('fail')
					}
				})
				this.flatList.scrollToOffset({x: 0, y: 0, animated: true})
			}
			else {
				Alert.alert(
					'선박확인체계 알림',
					'존재하지 않은 페이지입니다.'
					)
			}
		}
	}
	
	const setModalVisible = (visible) => {
		set_modalVisible(visible)
	}

	let pageBarFooter
		if(data.length != 0){ pageBarFooter =
			<base.Form style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', height: SIZE_ICON + 20, marginVertical: 10}}>
				<base.Button style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
				elevation: 6, borderRadius: 10, height: SIZE_ICON + 10, marginHorizontal: 10,}} onPress={()=>firstPage()}>
					<AntDesign name="banckward" size={SIZE_ICON} color="#292929"/>
				</base.Button>
				<base.Button style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
				elevation: 6, borderRadius: 10, height: SIZE_ICON + 10, marginHorizontal: 10,}} onPress={()=>previousPage()}>
					<AntDesign name="caretleft" size={SIZE_ICON} color="#292929"/>
				</base.Button>
				<base.Form style={{flex: 1, height: SIZE_ICON + 10, justifyContent: 'center', alignItems: 'center',}}>
					<base.Text style={{fontSize: SIZE_ICON - 5}}>{index} / {cnt}</base.Text>
					<base.Text 
					style={{fontSize: SIZE_ICON - 5,
						color: "skyblue", 
						fontWeight: 'bold', 
						textDecorationLine: 'underline'}}
					onPress={() => setModalVisible(true)}>페이지 검색</base.Text>
				</base.Form>
				<base.Button style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
				elevation: 6, borderRadius: 10, height: SIZE_ICON + 10, marginHorizontal: 10,}} onPress={()=>nextPage()}>
					<AntDesign name="caretright" size={SIZE_ICON} color="#292929"/>
				</base.Button>
				<base.Button style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
				elevation: 6, borderRadius: 10, height: SIZE_ICON + 10, marginHorizontal: 10, }} onPress={()=>lastPage()}>
					<AntDesign name="forward" size={SIZE_ICON} color="#292929"/>
				</base.Button>
			</base.Form>
		}
		
		if(clicked != null) {
			if(flag == 'Normal') {
				if(clicked == 4) {
					set_clicked(null)
				}
				else {
					switch(clicked) {
						case 0: {
							set_sort('name')
							break;
						}
						case 1: {
							set_sort('-regit_date')
							break;
						}
						case 2:{
							set_sort('-img_cnt')
							break;
						}
						case 3: {
							set_sort('-is_train')
							break;
						}
					}
					set_clicked(null)
					updateSearchCommonShip(1)
				}
			}
			else {
				if(clicked == 3) {
					set_clicked(null)
				}
				else {
					switch(clicked) {
						case 0: {
							set_sort('id')
							break;
						}
						case 1: {
							set_sort('-regit_date')
							break;
						}
						case 2: {
							set_sort('-img_cnt')
							break;
						}
					}
					set_clicked(null)
					updateSearchWastedShip(1)
				}
			}
		}
		if(clicked_unit != null) {
			if(clicked_unit == 8) {
				set_clicked_unit(null)
			}
			else {
				switch(clicked_unit) {
					case 0: {
						set_unit('all')
						break;
					}
					case 1: {
						set_unit('97-1')
						break;
					}
					case 2: {
						set_unit('97-2')
						break;
					}
					case 3: {
						set_unit('97-3')
						break;
					}
					case 4: {
						set_unit('98-1')
						break;
					}
					case 5: {
						set_unit('98-2')
						break;
					}
					case 6: {
						set_unit('98-3')
						break;
					}
					case 7: {
						set_unit('98-4')
						break;
					}
				}
				set_clicked_unit(null)
				if(flag == 'Normal'){ updateSearchCommonShip(1) }
				else{ updateSearchWastedShip(1) }
			}
		}

	return (
		<base.Root>
			<base.Container>
				<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {setModalVisible(!modalVisible);}}>
					<base.Form style={styles.centeredView}>
						<base.Form style={styles.modalView}>
							<Text style={styles.modalText}>검색할 페이지를 입력하세요.</Text>
							<TextInput 
								placeholder="페이지 입력" 
								keyboardType="number-pad" 
								onChangeText={number => set_input(Number(number))}
								style={{borderBottomWidth: 1, height: 30, width: 70, margin: 20}}
							/>
							<Pressable
								style={[styles.button, styles.buttonClose]}
								onPress={() => {
								setModalVisible(!modalVisible);
								searchPageList(input)}}>
								<Text style={styles.textStyle}>검색</Text>
							</Pressable>
						</base.Form>
					</base.Form>
				</Modal>
				<base.Header style={{backgroundColor: 'white'}}>
					<base.Left>
						<base.Button transparent onPress={() => props.navigation.goBack()}>
							<base.Icon name='arrow-back' size={25} style={{color: 'black'}}/>
						</base.Button>
					</base.Left>
					<base.Right>
						<base.Button transparent onPress={() =>
									base.ActionSheet.show({
										options: flag == 'Normal' ? COMMON_BUTTONS : WASTED_BUTTONS,
										cancelButtonIndex: flag == 'Normal' ? COMMON_CANCEL_INDEX : WASTED_CANCEL_INDEX,
										destructiveButtonIndex: flag == 'Normal' ? COMMON_DESTRUCTIVE_INDEX : WASTED_DESTRUCTIVE_INDEX,
										title: "목록 정렬"
									},
									buttonIndex => {set_clicked(buttonIndex)}
							)}>
							<AntDesign name="bars" size={25} color="black" />
						</base.Button>
						<base.Button transparent onPress={() =>
									base.ActionSheet.show({
										options: UNIT_BUTTONS,
										cancelButtonIndex: UNIT_CANCEL_INDEX,
										destructiveButtonIndex: UNIT_DESTRUCTIVE_INDEX,
										title: "관리 부대"
									},
									buttonIndex => {set_clicked_unit(buttonIndex)}
							)}>
							<AntDesign name="filter" size={25} color="black" />
						</base.Button>
					</base.Right>
				</base.Header>
				<base.Content contentContainerStyle={{ flex: 1 }}>
					<Loading visible={loadingVisible} initialRoute={false} onPress={()=>props.navigation.goBack()}/>
					<FlatList
						ref = {flatListRef}
						style={{flex:1}}
						data={data}
						renderItem={({item}) => <ShowShip ship={item} flag={flag} onPress={() => getDetail(item.id)}/>}
						ListEmptyComponent={
							<base.Form style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10,}}>
								<base.Text style={{fontSize: SIZE_SUBTITLE}}>해당 검색에 대한 검색결과가 없습니다</base.Text>
							</base.Form>
						}
						// refreshing={refreshing}
						// onRefresh={handleRefresh}
					/>
					{pageBarFooter}
				</base.Content>
			</base.Container>
		</base.Root>
	)
}

const mapStateToProps = (state) => {
    return {
        token: state.userInfo.token
    }
}

export default connect(mapStateToProps)(SearchResult);