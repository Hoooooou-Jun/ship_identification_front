import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Dimensions, FlatList, Alert } from 'react-native';
import * as base from 'native-base';
import { getToken } from '../../utils/getToken';
import { requestCommonShipList } from '../../utils/shipInfoRequest';
import ShowShip from '../listCommonShip/showShip';
import { AntDesign, Feather } from '@expo/vector-icons'; 
import Loading from '../../utils/loading';

const SIZE_ICON = Dimensions.get('screen').height * 0.02
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02

var BUTTONS = [
	{ text: "선박명 순", icon: "logo-angular", iconColor: "grey" },
	{ text: "최근 등록 순", icon: "time", iconColor: "grey" },
	{ text: "등록사진 수 순", icon: "image", iconColor: "grey" },
	{ text: "학습 여부 순", icon: "book", iconColor: "grey" },
	{ text: "취소", icon: "close", iconColor: "grey" }
];
var DESTRUCTIVE_INDEX = 4;
var CANCEL_INDEX = 4;

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

export default class ListCommonShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			index: 1,
			cnt: 0,
			loadingVisible: true,

			unit: 'all',
			sort: '',
			clicked: null,
			clicked_unit: null,

			test: false,
		};
		this.showCommonShipList = this.showCommonShipList(this);

		this.updateCommonShipList = this.updateCommonShipList.bind(this);
		this.previousPage = this.previousPage.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.firstPage = this.firstPage.bind(this);
		this.lastPage = this.lastPage.bind(this);
	}
	firstPage(){
		if(this.state.index == 1){
			Alert.alert(
				'선박확인체계 알림',
				'첫번째 페이지입니다',
			)
		}
		else {
			this.updateCommonShipList(1);
		}
	}
	lastPage(){
		if(this.state.index == this.state.cnt){
			Alert.alert(
				'선박확인체계 알림',
				'마지막 페이지입니다',
			)
		}
		else {
			this.updateCommonShipList(this.state.cnt);
		}
	}
	previousPage(){
		if(this.state.index == 1){
			Alert.alert(
				'선박확인체계 알림',
				'첫번째 페이지입니다',
			)
		}
		else {
			this.updateCommonShipList(this.state.index - 1);
		}
	}
	nextPage(){
		if(this.state.index == this.state.cnt){
			Alert.alert(
				'선박확인체계 알림',
				'마지막 페이지입니다',
			)
		}
		else {
			this.updateCommonShipList(this.state.index + 1);
		}
	}
	showCommonShipList(){
		getToken().then((token) => {
			requestCommonShipList(token, 1, this.state.sort, this.state.unit).then((response) => {
				this.setState({
					cnt: response.data.data.count,
					data: this.state.data.concat(response.data.data.data),
					loadingVisible: false,
				})
			})
        })
	}
	updateCommonShipList(idx){
		this.setState({loadingVisible: true})
		getToken().then((token) => {
			requestCommonShipList(token, idx, this.state.sort, this.state.unit).then((response) => {
				this.setState({
					index: idx,
					cnt: response.data.data.count,
					data: response.data.data.data,
					loadingVisible: false,
				})
			})
        })
		this.flatList.scrollToOffset({x: 0, y: 0, animated: true})
	}
	render(){
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
				this.updateCommonShipList(1)
			}
		}
		if(this.state.clicked != null){
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
				this.updateCommonShipList(1)
			}
		}
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
		return(
			<base.Root>
			<base.Container>
				<base.Header style={{backgroundColor: 'white'}}>
					<base.Left>
						<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
							<base.Icon name='arrow-back' size={25} style={{color: 'black'}}/>
						</base.Button>
					</base.Left>
					<base.Right>
						<base.Button transparent onPress={()=>this.props.navigation.navigate('Search')}>
							<AntDesign name="search1" size={25} color="black" />
						</base.Button>
						<base.Button transparent onPress={()=>this.props.navigation.navigate('MapCommonShip')}>
							<Feather name="map" size={25} color="black"/>
						</base.Button>
						<base.Button transparent onPress={() =>
									base.ActionSheet.show({
										options: BUTTONS,
										cancelButtonIndex: CANCEL_INDEX,
										destructiveButtonIndex: DESTRUCTIVE_INDEX,
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
						renderItem={({item}) => <ShowShip ship={item} onPress={()=>this.props.navigation.navigate('DetailCommonShip',{id: item.id})}/>}
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
		);
	}
}