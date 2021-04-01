import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import * as base from 'native-base';
import { Svg, Image } from 'react-native-svg';
import { getToken } from '../../utils/getToken';
import { requestWastedShipList } from '../../utils/shipInfoRequest';
import ShowShip from './showShip';
import AntDesign from '@expo/vector-icons/AntDesign'

import Dots from 'react-native-dots-pagination';

export default class ListWastedShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			index: 1,
			cnt: 0,
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
			console.log('이미 첫 번째 페이지입니다.')
		}
		else {
			this.updateCommonShipList(1);
		}
	}
	lastPage(){
		if(this.state.index == this.state.cnt){
			console.log('이미 마지막 페이지입니다.')
		}
		else {
			this.updateWastedShipList(this.state.cnt);
		}
	}
	previousPage(){
		if(this.state.index == 1){
			console.log('첫 번째 페이지입니다.')
		}
		else {
			this.updateWastedShipList(this.state.index - 1);
		}
	}
	nextPage(){
		if(this.state.index == this.state.cnt){
			console.log('마지막 페이지입니다.')
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
				})
			}
			else{
				console.log('fail')
			}
			})
        })
		
	}
	updateWastedShipList(idx){
		getToken().then((token) => {
			requestWastedShipList(token, idx).then((response) => {
			if(response.status == 200){
				this.setState({
					index: idx,
					data: response.data.data.data,
				})
			}
			else{
				console.log('fail')
			}
			})
        })
		this.refs.listRef.scrollToOffset({x: 0, y: 0, animated: true})
	}
	render(){
		if(this.state.data == []){
            return(
                <base.Form style={{alignItems:'center', justifyContent: 'center', flex: 1}}>
					<base.Text style ={{fontSize: 30}}>데이터 가져오는 중</base.Text>
					<base.Spinner color='blue' />
				</base.Form>
            )
        }
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
					<FlatList
						ref="listRef"
						sytle={{flex:1}}
						data={this.state.data}
						renderItem={({item}) => <ShowShip ship={item} onPress={()=>this.props.navigation.navigate('DetailWastedShip',{id: item.id})}/>}
						ListFooterComponent={
							<base.Form style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50, marginTop: 10}}>
								<base.Button style={{flex: 1, backgroundColor: 'white', width: 60, justifyContent: 'center'}} onPress={()=>this.firstPage()}>
									<AntDesign name="banckward" size={20} color="#292929"/>
								</base.Button>
								<base.Button style={{flex: 1, backgroundColor: 'white', marginLeft: 20, width: 60, justifyContent: 'center'}} onPress={()=>this.previousPage()}>
									<AntDesign name="caretleft" size={20} color="#292929"/>
								</base.Button>
								<base.Form style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}>
									<base.Text>{this.state.index} / {this.state.cnt}</base.Text>
								</base.Form>
								<base.Button style={{flex: 1, backgroundColor: 'white', marginRight: 20, width: 60, justifyContent: 'center'}} onPress={()=>this.nextPage()}>
									<AntDesign name="caretright" size={20} color="#292929"/>
								</base.Button>
								<base.Button style={{flex: 1, backgroundColor: 'white', width: 60, justifyContent: 'center'}} onPress={()=>this.lastPage()}>
									<AntDesign name="forward" size={20} color="#292929"/>
								</base.Button>
							</base.Form>
						}
					/>
				</base.Content>				
			</base.Container>
		);
	}
}