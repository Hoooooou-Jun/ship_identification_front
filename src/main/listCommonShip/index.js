import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, FlatList, Alert, Modal, TextInput, Text, Pressable } from 'react-native';
import * as base from 'native-base';
import { requestCommonShipList } from '../../utils/shipInfoRequest';
import ShowShip from '../listCommonShip/showShip';
import { AntDesign, Feather } from '@expo/vector-icons'; 
import Loading from '../../utils/loading';
import styles from './styles';
import { connect } from 'react-redux';

const SIZE_ICON = Dimensions.get('screen').height * 0.02
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02

let BUTTONS = [
	{ text: "선박명 순", icon: "logo-angular", iconColor: "grey" },
	{ text: "최근 등록 순", icon: "time", iconColor: "grey" },
	{ text: "등록사진 수 순", icon: "image", iconColor: "grey" },
	{ text: "학습 여부 순", icon: "book", iconColor: "grey" },
	{ text: "취소", icon: "close", iconColor: "grey" }
];
let DESTRUCTIVE_INDEX = 4;
let CANCEL_INDEX = 4;

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

const ListCommonShip = (props) => {
	const [data, set_data] = useState([])
	const [cnt, set_cnt] = useState(1)
	const [index, set_index] = useState(1)
	const [unit, set_unit] = useState('all')
	const [sort, set_sort] = useState('')
	const [clicked, set_clicked] = useState(null)
	const [clicked_unit, set_clicked_unit] = useState(null)
	const [modalVisible, set_modalVisible] = useState(false)
	const [input, set_input] = useState()
	const [loadingVisible, set_loadingVisible] = useState(true)

	const flatListRef = useRef()

	useEffect(() => {
		requestCommonShipList(props.token, 1, sort, unit).then((response) => {
			set_cnt(response.data.data.count)
			set_data(response.data.data.data)
			set_loadingVisible(false)
		})
	}, [])

	useEffect(() => {
		updateCommonShipList(1)
	}, [sort, unit])

	const firstPage = () => {
		if(index == 1){
			Alert.alert(
				'선박확인체계 알림',
				'첫번째 페이지입니다.',
			)
		}
		else {
			set_index(1)
			updateCommonShipList(1);
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
			set_index(cnt)
			updateCommonShipList(cnt);
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
			set_index(index - 1)
			updateCommonShipList(index - 1);
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
			set_index(index + 1)
			updateCommonShipList(index + 1);
		}
	}

	const updateCommonShipList = (idx) => {
		set_loadingVisible(true)
		requestCommonShipList(props.token, idx, sort, unit).then((response) => {
			set_cnt(response.data.data.count)
			set_data(response.data.data.data)
			set_index(idx)
			set_loadingVisible(false)
		})
		flatListRef.current.scrollToOffset({x: 0, y: 0, animated: true})
	}

	const searchPageList = (idx) => {
		if(1 <= idx && cnt >= idx) {
			set_loadingVisible(true)
			requestCommonShipList(props.token, idx, sort, unit).then((response) => {
				set_cnt(response.data.data.count)
				set_data(response.data.data.data)
				set_index(idx)
				set_loadingVisible(false)
			})
			flatListRef.current.scrollToOffset({x: 0, y: 0, animated: true})
		}
		else {
			Alert.alert(
				'선박확인체계 알림',
				'존재하지 않은 페이지입니다.',
			)
		}
	}

	const setModalVisible = (visible) => {
		set_modalVisible(visible);
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
		}
	}
	if(clicked != null) {
		if(clicked == 4) {
			set_clicked(null)
		}
		else{
			switch(clicked) {
				case 0: {
					set_sort('name')
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
				case 3: {
					set_sort('-is_train')
					break;
				}
			}
			set_clicked(null)
		}
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
				<base.Text style={{fontSize: SIZE_ICON - 4, color: 'skyblue', fontWeight: 'bold', textDecorationLine: 'underline' }} onPress={() => setModalVisible(true)}>페이지 검색</base.Text>
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
							searchPageList(input);}}>
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
						<base.Button transparent onPress={() => props.navigation.navigate('Search')}>
							<AntDesign name="search1" size={25} color="black" />
						</base.Button>
						<base.Button transparent onPress={() => props.navigation.navigate('MapCommonShip')}>
							<Feather name="map" size={25} color="black"/>
						</base.Button>
						<base.Button transparent onPress={() =>
									base.ActionSheet.show({
										options: BUTTONS,
										cancelButtonIndex: CANCEL_INDEX,
										destructiveButtonIndex: DESTRUCTIVE_INDEX,
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
						keyExtractor={(item)=> item.id.toString()}
						ref={flatListRef}
						style={{flex:1}}
						data={data}
						renderItem={({item}) => <ShowShip ship={item} onPress={() => props.navigation.navigate('DetailCommonShip',{id: item.id})}/>}
						ListEmptyComponent={
							<base.Form style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10,}}>
								<base.Text style={{fontSize: SIZE_SUBTITLE}}>해당 조건을 만족하는 일반선박이 없습니다</base.Text>
							</base.Form>
						}
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

export default connect(mapStateToProps)(ListCommonShip)