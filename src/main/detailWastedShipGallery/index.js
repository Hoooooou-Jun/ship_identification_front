import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import * as base from 'native-base';
import * as Location from 'expo-location';
import { Svg, Image } from 'react-native-svg';
import { getToken } from '../../utils/getToken';
import { requestWastedShipGallery } from '../../utils/shipInfoRequest';
import ShowPlusDetail from './showPlusDetail';
import { requestDomain } from '../../utils/domain';
import Loading from '../../utils/loading';
export default class DetailWastedShipGallery extends Component{
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			data: [],
			loadingVisible: true,
		};
		this.showWastedShipGallery = this.showWastedShipGallery(this);
	}
	showWastedShipGallery(){
		getToken().then((token) => {
			this.setState({
				id: this.props.navigation.getParam('id'),
				name: this.props.navigation.getParam('name')
			})
			requestWastedShipGallery(token, this.state.id).then((response) => {
				if(response.status == 200){
					this.setState({
						data: this.state.data.concat(response.data.data),
						loadingVisible: false,
					})
				}
			})
        })
	}
	render(){
		return(
			<base.Container>
				<base.Header style={{backgroundColor: 'white'}}>
					<base.Left>
						<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
							<base.Icon name='arrow-back' style={{color: 'black'}}/>
						</base.Button>
					</base.Left>
					<base.Right>
					</base.Right>
				</base.Header>
				<base.Content>
					<Loading visible={this.state.loadingVisible}/>
					<base.Form style={{width: '100%', justifyContent: 'center'}}>
						<base.Button block onPress={()=>this.props.navigation.navigate('RegisterWastedShipImages',{id: this.state.id, name: this.state.name})} style={{backgroundColor: '#006eee', margin: 10,}}>
							<base.Text style={{fontFamily: 'Nanum'}}>선박사진 추가등록하기</base.Text>
						</base.Button>
						<FlatList
							sytle={{flex:1, height: 250, justifyContent: 'center', width: '100%'}}
							data={this.state.data}
							numColumns={3}
							renderItem={({item, index}) => <ShowPlusDetail ship={item} idx={index} onPress={()=>this.props.navigation.navigate('ImgViewer',{address: requestDomain + item.img})}/>}
						/>
				</base.Form>
				</base.Content>				
			</base.Container>
		);
	}
}
