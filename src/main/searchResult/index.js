import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import * as base from 'native-base';
import { FlatList, Dimensions, Alert, Modal, TextInput, Text, Pressable, RefreshControl } from 'react-native';
import ShowShip from './showShip';
import AntDesign from '@expo/vector-icons/AntDesign';
import Loading from '../../utils/loading';
import { connect } from 'react-redux'
import { resetSearch, searchShip } from '../../redux/searchShip/action.js';
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
	const [data, set_data] = useState(props.shipResult.data)
	const [cnt, set_cnt] = useState(props.shipResult.cnt)
	const [index, set_index] = useState(1)

	const [unit, set_unit] = useState('all')
	const [sort, set_sort] = useState('')
	const [clicked, set_clicked] = useState(null)
	const [clicked_unit, set_clicked_unit] = useState(null)
	
	const [modalVisible, set_modalVisible] = useState(false)
	const [input, set_input] = useState()

	const [loadingVisible, set_loadingVisible] = useState(true)
	const [refreshing, set_refreshing] = useState(false)

	const flatListRef = useRef()

	useEffect(() => {
		return () => {
			props.resetSearch()
		}
	}, [])

	useEffect(() => {
		set_data(props.shipResult.data)
		set_cnt(props.shipResult.cnt)
		set_loadingVisible(false)
	}, [props.shipResult])

	useEffect(() => {
		updateSearchCommonShip(1)
	}, [sort, unit])

	const firstPage = () => {
		if(index == 1){
			Alert.alert(
				'선박확인체계 알림',
				'첫번째 페이지입니다.',
			)
		}
		else {
			if(props.shipResult.flag == 'Normal') {
				set_index(1)
				updateSearchCommonShip(1);
			}
			else {
				set_index(1)
				updateSearchWastedShip(1);
			}
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
			if(props.shipResult.flag == 'Normal') {
				set_index(cnt)
				updateSearchCommonShip(cnt);
			}
			else {
				set_index(cnt)
				updateSearchWastedShip(cnt);
			}
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
			if(props.shipResult.flag == 'Normal') {
				set_index(index - 1)
				updateSearchCommonShip(index - 1);
			}
			else {
				set_index(index - 1)
				updateSearchWastedShip(index - 1);
			}
		}
	}
	const nextPage = () => {
		if(index == cnt){
			Alert.alert(
				'선박확인체계 알림',
				'마지막 페이지입니다.',
			)
		}
		else {
			if(props.shipResult.flag == 'Normal') {
				set_index(index + 1)
				updateSearchCommonShip(index + 1);
			}
			else {
				set_index(index + 1)
				updateSearchWastedShip(index + 1);
			}
		}
	}

	const updateSearchCommonShip = (idx) => {
		set_loadingVisible(true)
		props.searchShip(
			idx,
			props.token,
			props.shipResult.flag,
			props.shipResult.name,
			props.shipResult.types,
			props.shipResult.code,
			props.shipResult.tons,
			props.shipResult.size,
			props.shipResult.is_ais,
			props.shipResult.is_vpass,
			props.shipResult.is_vhf,
			props.shipResult.is_ff,
			props.shipResult.region,
			props.shipResult.port,
			props.shipResult.id,
			props.shipResult.info,
			sort,
			unit,)
		flatListRef.current.scrollToOffset({x: 0, y: 0, animated: true})
	}
	const updateSearchWastedShip = (idx) => {
		set_loadingVisible(true)
		props.searchShip(
			idx, 
			props.token, 
			props.shipResult.flag,
			props.shipResult.name, 
			props.shipResult.types, 
			props.shipResult.code, 
			props.shipResult.tons, 
			props.shipResult.size, 
			props.shipResult.is_ais, 
			props.shipResult.is_vpass, 
			props.shipResult.is_vhf, 
			props.shipResult.is_ff, 
			props.shipResult.region, 
			props.shipResult.port, 
			props.shipResult.id, 
			props.shipResult.info, 
			sort, 
			unit,)
		flatListRef.current.scrollToOffset({x: 0, y: 0, animated: true})
	}
	const searchPageList = (idx) => {
		if(props.shipResult.flag == "Normal") {
			if(1 <= idx && cnt >= idx) {
				set_loadingVisible(true)
				props.searchShip(
					idx, 
					props.token, 
					props.shipResult.flag,
					props.shipResult.name, 
					props.shipResult.types, 
					props.shipResult.code, 
					props.shipResult.tons, 
					props.shipResult.size, 
					props.shipResult.is_ais, 
					props.shipResult.is_vpass, 
					props.shipResult.is_vhf, 
					props.shipResult.is_ff, 
					props.shipResult.region, 
					props.shipResult.port, 
					props.shipResult.id, 
					props.shipResult.info, 
					sort, 
					unit)
				flatListRef.current.scrollToOffset({x: 0, y: 0, animated: true})
				set_index(idx)
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
				props.searchShip(
					idx, 
					props.token, 
					props.shipResult.flag,
					props.shipResult.name, 
					props.shipResult.types, 
					props.shipResult.code, 
					props.shipResult.tons, 
					props.shipResult.size, 
					props.shipResult.is_ais, 
					props.shipResult.is_vpass, 
					props.shipResult.is_vhf, 
					props.shipResult.is_ff, 
					props.shipResult.region, 
					props.shipResult.port, 
					props.shipResult.id, 
					props.shipResult.info, 
					sort, 
					unit)
				flatListRef.current.scrollToOffset({x: 0, y: 0, animated: true})
				set_index(idx)
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
	
	const getDetail = (id) => {
		if(props.shipResult.flag == 'Normal') {
			props.navigation.navigate('DetailCommonShip',{id: id})}
		else { // flag == 'Wasted'
			props.navigation.navigate('DetailWastedShip',{id: id})}
	}

	const onRefresh = () => {
		set_refreshing(false)
	}

	let pageBarFooter
	if(data.length != 0){ pageBarFooter =
		<base.Form style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', height: SIZE_ICON + 20, marginVertical: 10}}>
			<base.Button style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
			elevation: 6, borderRadius: 10, height: SIZE_ICON + 10, marginHorizontal: 10,}} onPress={() => firstPage()}>
				<AntDesign name="banckward" size={SIZE_ICON} color="#292929"/>
			</base.Button>
			<base.Button style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
			elevation: 6, borderRadius: 10, height: SIZE_ICON + 10, marginHorizontal: 10,}} onPress={() => previousPage()}>
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
			elevation: 6, borderRadius: 10, height: SIZE_ICON + 10, marginHorizontal: 10,}} onPress={() => nextPage()}>
				<AntDesign name="caretright" size={SIZE_ICON} color="#292929"/>
			</base.Button>
			<base.Button style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
			elevation: 6, borderRadius: 10, height: SIZE_ICON + 10, marginHorizontal: 10, }} onPress={() => lastPage()}>
				<AntDesign name="forward" size={SIZE_ICON} color="#292929"/>
			</base.Button>
		</base.Form>
	}
		
	if(clicked != null) {
		if(props.shipResult.flag == 'Normal') {
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
				set_index(1)
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
				set_index(1)
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
			if(props.shipResult.flag == 'Normal') { 
				set_index(1)
			}
			else {
				set_index(1)
			}
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
										options: props.shipResult.flag == 'Normal' ? COMMON_BUTTONS : WASTED_BUTTONS,
										cancelButtonIndex: props.shipResult.flag == 'Normal' ? COMMON_CANCEL_INDEX : WASTED_CANCEL_INDEX,
										destructiveButtonIndex: props.shipResult.flag == 'Normal' ? COMMON_DESTRUCTIVE_INDEX : WASTED_DESTRUCTIVE_INDEX,
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
					<Loading visible={loadingVisible} initialRoute={false} onPress={() => props.navigation.goBack()}/>
					<FlatList
						refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
						keyExtractor={(item)=> item.id.toString()}
						ref={flatListRef}
						style={{flex:1}}
						data={data}
						renderItem={({item}) => <ShowShip ship={item} flag={props.shipResult.flag} onPress={() => getDetail(item.id)}/>}
						ListEmptyComponent={
							<base.Form style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10,}}>
								<base.Text style={{fontSize: SIZE_SUBTITLE}}>해당 검색에 대한 검색결과가 없습니다</base.Text>
							</base.Form>
						}
					/>
					{pageBarFooter}
				</base.Content>
				<StatusBar hidden/>
			</base.Container>
		</base.Root>
	)
}

const mapStateToProps = (state) => {
	return {
		shipResult: state.searchShip,
        token: state.userInfo.token
    }
}

const mapDispatchToProps = {
	searchShip: (idx, token, flag, name, types, code, tons, size, is_ais, is_vpass, is_vhf, is_ff, region, port, id, info, sort, unit) => searchShip(idx, token, flag, name, types, code, tons, size, is_ais, is_vpass, is_vhf, is_ff, region, port, id, info, sort, unit),
	resetSearch: () => resetSearch()
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);