import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { FlatList, Dimensions, Alert } from 'react-native';
import * as base from 'native-base';
import { getToken } from '../../utils/getToken';
import { requestWastedShipList } from '../../utils/shipInfoRequest';
import ShowShip from './showShip';

import { AntDesign, Feather } from '@expo/vector-icons';
import Loading from '../../utils/loading';
const SIZE_ICON = Dimensions.get('screen').height * 0.02
export default class ListWastedShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			index: 1,
			cnt: 0,
			loadingVisible: true,
		};
		this.showWastedShipList = this.showWastedShipList(this);

		this.updateCommonShipList = this.updateWastedShipList.bind(this);
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
			this.updateWastedShipList(this.state.cnt);
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
			this.updateWastedShipList(this.state.index - 1);
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
			this.updateWastedShipList(this.state.index + 1);
		}
	}
	showWastedShipList(){
		getToken().then((token) => {
			requestWastedShipList(token, this.state.index).then((response) => {
			if(response.status == 200){
				this.setState({
					cnt: response.data.data.count,
					data: this.state.data.concat(response.data.data.data),
					loadingVisible: false,
				})
			}
			else{
				console.log('fail')
			}
			})
        })
		
	}
	updateWastedShipList(idx){
		this.setState({loadingVisible: true})
		getToken().then((token) => {
			requestWastedShipList(token, idx).then((response) => {
			if(response.status == 200){
				this.setState({
					index: idx,
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
	render(){
		return(
			<base.Container>
				<base.Header style={{backgroundColor: 'white'}}>
					<base.Left>
						<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
							<base.Icon name='arrow-back' size={25} style={{color: 'black'}}/>
						</base.Button>
					</base.Left>
					<base.Right>
						<base.Button transparent onPress={()=>this.props.navigation.navigate('Search')}>
							<AntDesign name="search1" size={24} color="black" />
						</base.Button>
					</base.Right>
				</base.Header>
				<base.Content contentContainerStyle={{ flex: 1 }}>
					<Loading visible={this.state.loadingVisible}/>
					<FlatList
						ref = {(ref) => this.flatList=ref}
						sytle={{flex:1}}
						data={this.state.data}
						renderItem={({item}) => <ShowShip ship={item} onPress={()=>this.props.navigation.navigate('DetailWastedShip',{id: item.id})}/>}
						ListHeaderComponent={
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
						ListFooterComponent={
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
					/>
				</base.Content>				
			</base.Container>
		);
	}
}