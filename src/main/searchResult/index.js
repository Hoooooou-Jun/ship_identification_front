import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base';
import { FlatList, Dimensions, Alert, Modal, TextInput, Text, Pressable } from 'react-native';
import { getToken } from '../../utils/getToken';
import { searchCommonShip, searchWastedShip } from '../../utils/shipInfoRequest';
import ShowShip from './showShip';
import AntDesign from '@expo/vector-icons/AntDesign';
import Loading from '../../utils/loading';
import styles from './styles';

var COMMON_BUTTONS = [
	{ text: "선박명 순", icon: "logo-angular", iconColor: "grey" },
	{ text: "최근 등록 순", icon: "time", iconColor: "grey" },
	{ text: "등록사진 수 순", icon: "image", iconColor: "grey" },
	{ text: "학습 여부 순", icon: "book", iconColor: "grey" },
	{ text: "취소", icon: "close", iconColor: "grey" }
];
var COMMON_DESTRUCTIVE_INDEX = 4;
var COMMON_CANCEL_INDEX = 4;
var WASTED_BUTTONS = [
	{ text: "관리번호 순", icon: "clipboard", iconColor: "grey",},
	{ text: "최근 등록 순", icon: "time", iconColor: "grey" },
	{ text: "등록사진 수 순", icon: "image", iconColor: "grey" },
	{ text: "취소", icon: "close", iconColor: "grey" }
];
var WASTED_DESTRUCTIVE_INDEX = 3;
var WASTED_CANCEL_INDEX = 3;

var UNIT_BUTTONS = [
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
var UNIT_DESTRUCTIVE_INDEX = 8;
var UNIT_CANCEL_INDEX = 8;

const SIZE_ICON = Dimensions.get('screen').height * 0.02
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02

export default class SearchResult extends Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			index: 1,
			cnt: 0,

			id: '',
			flag: '',

			types: '', region: '', port: '',
			name: '', code: '',  tons: '', size: '', 
			is_ais: false, is_vpass: false, is_vhf: false, is_ff: false,

			latitude: '0', longitude: '0', info: '',
			loadingVisible: true,

			unit: 'all',
			sort: '',
			clicked: null,
			clicked_unit: null,

			refreshing: false,

			modalVisible: false
		};
		this.showResult = this.showResult(this);
		this.getDetail = this.getDetail.bind(this);

		this.previousPage = this.previousPage.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.firstPage = this.firstPage.bind(this);
		this.lastPage = this.lastPage.bind(this);

		this.updateSearchCommonShip = this.updateSearchCommonShip.bind(this);
		this.updateSearchWastedShip = this.updateSearchWastedShip.bind(this);

		this.setState({ refreshing: false });
	}
	componentDidMount(){
		this.updateData();
	}
	updateData() {
		this.setState({
			flag: this.props.navigation.getParam('flag'),

			name: this.props.navigation.getParam('name'),
			code: this.props.navigation.getParam('code'),
			tons: this.props.navigation.getParam('tons'),
			size: this.props.navigation.getParam('size'),
			is_ais: this.props.navigation.getParam('is_ais'),
			is_vpass: this.props.navigation.getParam('is_vpass'),
			is_vhf: this.props.navigation.getParam('is_vhf'),
			is_ff: this.props.navigation.getParam('is_ff'),
			region: this.props.navigation.getParam('region'),
	
			id: this.props.navigation.getParam('id'),
			region: this.props.navigation.getParam('region'),

			types: this.props.navigation.getParam('types'),
			info: this.props.navigation.getParam('info'),
		})
	}
	firstPage(){
		if(this.state.index == 1){
			Alert.alert(
				'선박확인체계 알림',
				'첫번째 페이지입니다.',
			)
		}
		else {
			if(this.state.flag == 'Normal'){this.updateSearchCommonShip(1);}
			else{this.updateSearchWastedShip(1);}
		}
	}
	lastPage(){
		if(this.state.index == this.state.cnt){
			Alert.alert(
				'선박확인체계 알림',
				'마지막 페이지입니다.',
			)
		}
		else {
			if(this.state.flag == 'Normal'){this.updateSearchCommonShip(this.state.cnt);}
			else{this.updateSearchWastedShip(this.state.cnt);}
		}
	}
	previousPage(){
		if(this.state.index == 1){
			Alert.alert(
				'선박확인체계 알림',
				'첫번째 페이지입니다.',
			)
		}
		else {
			if(this.state.flag == 'Normal'){this.updateSearchCommonShip(this.state.index - 1);}
			else{this.updateSearchWastedShip(this.state.index - 1);}
		}
	}
	nextPage(){
		if(this.state.index == this.state.pages){
			Alert.alert(
				'선박확인체계 알림',
				'마지막 페이지입니다.',
			)
		}
		else {
			if(this.state.flag == 'Normal'){this.updateSearchCommonShip(this.state.index + 1);}
			else{this.updateSearchWastedShip(this.state.index + 1);}
		}
	}
	
	showResult(){
		getToken().then((token) => {
			if(this.state.flag == 'Normal'){
				searchCommonShip(token, 1, this.state.name, this.state.types, this.state.code, this.state.tons,
					 this.state.size, this.state.is_ais, this.state.is_vpass, this.state.is_vhf, this.state.is_ff,
					 this.state.region, this.state.port, this.state.sort, this.state.unit).then((response) => {
				if(response.status == 200){
					this.setState({
						cnt: response.data.data.count,
						data: this.state.data.concat(response.data.data.data),
						loadingVisible: false,
					})
				}
				else{ console.log('fail') }
				})
			}
			else{ // flag == 'Wasted'
				searchWastedShip(token, 1, this.state.id, this.state.region, this.state.types, this.state.info, this.state.sort, this.state.unit).then((response) => {
				if(response.status == 200){
					this.setState({
						cnt: response.data.data.count,
						data: this.state.data.concat(response.data.data.data),
						loadingVisible: false,
					})
				}
				else{ console.log('fail') }
				})
			}
        })
	}
	updateSearchCommonShip(idx){
		this.setState({loadingVisible: true,})
		getToken().then((token) => {
			searchCommonShip(token, idx, this.state.name, this.state.types, this.state.code, this.state.tons,
				this.state.size, this.state.is_ais, this.state.is_vpass, this.state.is_vhf, this.state.is_ff, 
				this.state.region, this.state.port, this.state.sort, this.state.unit).then((response) => {
			if(response.status == 200){
				this.setState({
					index: idx,
					cnt: response.data.data.count,
					data: response.data.data.data,
					loadingVisible: false,
				})
			}
			else{
				console.log('fail')
			}
			})
        })
		this.flatList.scrollToOffset({x: 0, y: 0, animated: true})
	}
	updateSearchWastedShip(idx){
		this.setState({loadingVisible: true,})
		getToken().then((token) => {
			searchWastedShip(token, idx, this.state.id, this.state.region, this.state.types, this.state.info, this.state.sort, this.state.unit).then((response) => {
			if(response.status == 200){
				this.setState({
					index: idx,
					cnt: response.data.data.count,
					data: response.data.data.data,
					loadingVisible: false,
				})
			}
			else{
				console.log('fail')
			}
			})
        })
		this.flatList.scrollToOffset({x: 0, y: 0, animated: true})
	}
	getDetail(id){
		if(this.state.flag == 'Normal'){
			this.props.navigation.navigate('DetailCommonShip',{id: id})}
		else{ // flag == 'Wasted'
			this.props.navigation.navigate('DetailWastedShip',{id: id})}
	}

	handleRefresh = () => {
		this.setState({refreshing: false}, () => {
			if (this.state.flag == 'Normal') {
				this.updateSearchCommonShip(this.state.index)
			}
			else {
				this.updateSearchWastedShip(this.state.index) 
			}	
		})
	}

	searchPageList(idx) {
		if(this.state.flag == "Normal") {
			if(1 <= idx && this.state.cnt >= idx) {
				this.setState({ loadingVisible: true })
				getToken().then((token) => {
					searchCommonShip(token, idx, this.state.name, this.state.types, this.state.code, this.state.tons,
						this.state.size, this.state.is_ais, this.state.is_vpass, this.state.is_vhf, this.state.is_ff, 
						this.state.region, this.state.port, this.state.sort, this.state.unit).then((response) => {
					if(response.status == 200){
						this.setState({
							index: idx,
							cnt: response.data.data.count,
							data: response.data.data.data,
							loadingVisible: false,
						})
					}
					else{
						console.log('fail')
					}
					})
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
			if(1 <= idx && this.state.cnt >= idx) {
				this.setState({ loadingVisible: true })
				getToken().then((token) => {
					searchWastedShip(token, idx, this.state.id, this.state.region, this.state.types, this.state.info, this.state.sort, this.state.unit).then((response) => {
					if(response.status == 200){
						this.setState({
							index: idx,
							cnt: response.data.data.count,
							data: response.data.data.data,
							loadingVisible: false,
						})
					}
					else{
						console.log('fail')
					}
					})
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
	
	setModalVisible = (visible) => {
		this.setState({ modalVisible: visible });
	}

	render(){
		let pageBarFooter
		if(this.state.data.length != 0){ pageBarFooter =
			<base.Form style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', height: SIZE_ICON + 20, marginVertical: 10}}>
				<base.Button style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
				elevation: 6, borderRadius: 10, height: SIZE_ICON + 10, marginHorizontal: 10,}} onPress={()=>this.firstPage()}>
					<AntDesign name="banckward" size={SIZE_ICON} color="#292929"/>
				</base.Button>
				<base.Button style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
				elevation: 6, borderRadius: 10, height: SIZE_ICON + 10, marginHorizontal: 10,}} onPress={()=>this.previousPage()}>
					<AntDesign name="caretleft" size={SIZE_ICON} color="#292929"/>
				</base.Button>
				<base.Form style={{flex: 1, height: SIZE_ICON + 10, justifyContent: 'center', alignItems: 'center',}}>
					<base.Text style={{fontSize: SIZE_ICON - 5}}>{this.state.index} / {this.state.cnt}</base.Text>
					<base.Text 
					style={{fontSize: SIZE_ICON - 5,
						color: "skyblue", 
						fontWeight: 'bold', 
						textDecorationLine: 'underline'}}
					onPress={() => this.setModalVisible(true)}>페이지 검색</base.Text>
				</base.Form>
				<base.Button style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
				elevation: 6, borderRadius: 10, height: SIZE_ICON + 10, marginHorizontal: 10,}} onPress={()=>this.nextPage()}>
					<AntDesign name="caretright" size={SIZE_ICON} color="#292929"/>
				</base.Button>
				<base.Button style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
				elevation: 6, borderRadius: 10, height: SIZE_ICON + 10, marginHorizontal: 10, }} onPress={()=>this.lastPage()}>
					<AntDesign name="forward" size={SIZE_ICON} color="#292929"/>
				</base.Button>
			</base.Form>
		}
		
		if(this.state.clicked != null){
			if(this.state.flag == 'Normal'){
				if(this.state.clicked == 4){
					this.setState({clicked: null})
				}
				else{
					switch(this.state.clicked){
						case 0:{
							this.setState({sort: 'name'})
							break;
						}
						case 1:{
							this.setState({sort: '-regit_date'})
							break;
						}
						case 2:{
							this.setState({sort: '-img_cnt'})
							break;
						}
						case 3:{
							this.setState({sort: '-is_train'})
							break;
						}
					}
					this.setState({ clicked: null})
					this.updateSearchCommonShip(1)
				}
			}
			else{
				if(this.state.clicked == 3){
					this.setState({clicked: null})
				}
				else{
					switch(this.state.clicked){
						case 0:{
							this.setState({sort: 'id'})
							break;
						}
						case 1:{
							this.setState({sort: '-regit_date'})
							break;
						}
						case 2:{
							this.setState({sort: '-img_cnt'})
							break;
						}
					}
					this.setState({ clicked: null})
					this.updateSearchWastedShip(1)
				}
			}
		}
		if(this.state.clicked_unit != null){
			if(this.state.clicked_unit == 8){
				this.setState({clicked_unit: null})
			}
			else{
				switch(this.state.clicked_unit){
					case 0:{
						this.setState({unit: 'all'})
						break;
					}
					case 1:{
						this.setState({unit: '97-1'})
						break;
					}
					case 2:{
						this.setState({unit: '97-2'})
						break;
					}
					case 3:{
						this.setState({unit: '97-3'})
						break;
					}
					case 4:{
						this.setState({unit: '98-1'})
						break;
					}
					case 5:{
						this.setState({unit: '98-2'})
						break;
					}
					case 6:{
						this.setState({unit: '98-3'})
						break;
					}
					case 7:{
						this.setState({unit: '98-4'})
						break;
					}
				}
				this.setState({ clicked_unit: null})
				if(this.state.flag == 'Normal'){ this.updateSearchCommonShip(1)}
				else{ this.updateSearchWastedShip(1) }
			}
		}
		const { modalVisible } = this.state;
		return(
			<base.Root>
				<base.Container>
				<Modal
          		animationType="fade"
          		transparent={true}
          		visible={modalVisible}
          		onRequestClose={() => {this.setModalVisible(!modalVisible);}}>
				<base.Form style={styles.centeredView}>
            		<base.Form style={styles.modalView}>
              			<Text style={styles.modalText}>검색할 페이지를 입력하세요.</Text>
						<TextInput 
							placeholder="페이지 입력" 
							keyboardType="number-pad" 
							onChangeText={number => this.setState({input: number})}
							style={{borderBottomWidth: 1, height: 30, width: 70, margin: 20}}
						/>
              			<Pressable
                			style={[styles.button, styles.buttonClose]}
                			onPress={() => {
							this.setModalVisible(!modalVisible);
							this.searchPageList(this.state.input)}}>
							<Text style={styles.textStyle}>검색</Text>
						</Pressable>
            		</base.Form>
				</base.Form>
			</Modal>
					<base.Header style={{backgroundColor: 'white'}}>
						<base.Left>
							<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
								<base.Icon name='arrow-back' size={25} style={{color: 'black'}}/>
							</base.Button>
						</base.Left>
						<base.Right>
							<base.Button transparent onPress={() =>
										base.ActionSheet.show({
											options: this.state.flag == 'Normal' ? COMMON_BUTTONS : WASTED_BUTTONS,
											cancelButtonIndex: this.state.flag == 'Normal' ? COMMON_CANCEL_INDEX : WASTED_CANCEL_INDEX,
											destructiveButtonIndex: this.state.flag == 'Normal' ? COMMON_DESTRUCTIVE_INDEX : WASTED_DESTRUCTIVE_INDEX,
											title: "목록 정렬"
										},
										buttonIndex => {this.setState({ clicked: buttonIndex });}
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
										buttonIndex => {this.setState({ clicked_unit: buttonIndex });}
								)}>
								<AntDesign name="filter" size={25} color="black" />
							</base.Button>
						</base.Right>
					</base.Header>
					<base.Content contentContainerStyle={{ flex: 1 }}>
						<Loading visible={this.state.loadingVisible} initialRoute={false} onPress={()=>this.props.navigation.goBack()}/>
						<FlatList
							ref = {(ref) => this.flatList=ref}
							sytle={{flex:1}}
							data={this.state.data}
							renderItem={({item}) => <ShowShip ship={item} flag={this.state.flag} onPress={()=>this.getDetail(item.id)}/>}
							ListEmptyComponent={
								<base.Form style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10,}}>
									<base.Text style={{fontSize: SIZE_SUBTITLE}}>해당 검색에 대한 검색결과가 없습니다</base.Text>
								</base.Form>
							}
							refreshing={this.state.refreshing}
							onRefresh={this.handleRefresh}
						/>
						{pageBarFooter}
					</base.Content>
				</base.Container>
			</base.Root>
		);
	}
}