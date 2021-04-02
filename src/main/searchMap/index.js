import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import * as base from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { getToken } from '../../utils/getToken';
import { requestShipLocation } from '../../utils/shipInfoRequest';

import Loading from '../../utils/loading';
export default class SearchMap extends Component{
	constructor(props) {
		super(props);
		this.state = {
			latitude: '',
			longitude: '',
			
			commonShipData: [],
			wastedShipData: [],

			loadingVisible_location: true,
			loadingVisible_data: true,
		};
		this.requestLocation = this.requestLocation(this);
		this.getLocation = this.getLocation(this);
		this.moveCurrentLocation = this.moveCurrentLocation.bind(this);
		this.moveLocation = this.moveLocation.bind(this);
	}
	
	requestLocation(){
		getToken().then((token) => {
			requestShipLocation(token).then((response) =>{
				if(response.status == 200){ // request success
					this.setState({
						commonShipData: response.data.data.normal,
						wastedShipData: response.data.data.waste,
						loadingVisible_data: false
					})
				}
				else{
                	console.log('fail')
            	}
			})
        })
	}

	moveLocation(){
		let loc = {
			latitude: this.state.latitude,
			longitude: this.state.longitude,
			latitudeDelta: 0.5,
			longitudeDelta: 0.5,
		};
		this.mapView.animateToRegion(loc, 0);
	}
	
	moveCurrentLocation = async () => {
		const location = await Location.getCurrentPositionAsync();
		this.setState({latitude: location.coords['latitude'], longitude: location.coords['longitude']})
		let loc = {
			latitude: this.state.latitude,
			longitude: this.state.longitude,
			latitudeDelta: 0.5,
			longitudeDelta: 0.5,
		};
		this.mapView.animateToRegion(loc, 0);
	}

	getLocation = async () => {
		try {
			await Location.requestPermissionsAsync();
			const location = await Location.getCurrentPositionAsync();
			console.log(location)
			this.setState({
				latitude: location.coords['latitude'],
				longitude: location.coords['longitude'],
				loadingVisible_location: false,
			})
		} catch (error) {
			console.log(error)
			Alert.alert("Can't find you.", "Please Try Again!")
			this.setState({loadingVisible_location: false})
		}
	}
	
	render(){
		const requestMarker = (data , flag) => {
			return data.map((ship) => {
				if(flag == 'Normal'){
					return (
						<Marker
						pinColor='blue'
						coordinate={{
							latitude: parseFloat(ship.lat),
							longitude: parseFloat(ship.lon),
						}}>
							<Callout
								onPress={() => this.props.navigation.navigate('DetailCommonShip', {id: ship.id})}>
								<base.Form>
									<base.Card>
										<Text style={{fontFamily:'Nanum',}}>선박명 : {ship.name}</Text>
										<Text style={{fontFamily:'Nanum',}}>등록일자 : {ship.regit_date}</Text>
										<Text style={{fontFamily:'Nanum',}}>위도 : {ship.lat}</Text>
										<Text style={{fontFamily:'Nanum',}}>경도 : {ship.lon}</Text>
									</base.Card>
								</base.Form>
							</Callout>
						</Marker>
					)
				}
				else {
					return (
						<Marker
						pinColor='red'
						coordinate={{
							latitude: parseFloat(ship.lat),
							longitude: parseFloat(ship.lon),
						}}>
							<Callout
								onPress={() => this.props.navigation.navigate('DetailWastedShip', {id: ship.id})}>
								<base.Form>
									<base.Card>
										<Text style={{fontFamily:'Nanum',}}>등록일자 : {ship.regit_date}</Text>
										<Text style={{fontFamily:'Nanum',}}>선박관리번호 : {ship.id}</Text>
										<Text style={{fontFamily:'Nanum',}}>위도 : {ship.lat}</Text>
										<Text style={{fontFamily:'Nanum',}}>경도 : {ship.lon}</Text>
										<Text style={{fontFamily:'Nanum',}}>세부사항 : {ship.info}</Text>
									</base.Card>
								</base.Form>
							</Callout>
						</Marker>
					)
				}
			})
		}
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
				<base.Content contentContainerStyle={{ flex: 1 }}>
					<Loading visible={this.state.loadingVisible_data || this.state.loadingVisible_location}/>
					<base.Form style={{flex: 1,}}>
						<MapView
							ref = {(ref) => this.mapView=ref}
							provider={PROVIDER_GOOGLE}
							style={{flex: 1}}
							initialRegion={{
								latitude: parseFloat(this.state.latitude),
								longitude: parseFloat(this.state.longitude),
								latitudeDelta: 0.5,
								longitudeDelta: 0.5,
							}}
							mapType={'satellite'}
							>
							{ requestMarker(this.state.commonShipData, 'Normal') }
							{ requestMarker(this.state.wastedShipData, 'Wasted') }
						</MapView>
					</base.Form>
					<base.Button rounded
						style={{
							position: 'absolute',
							top: '5%', left: '5%',
							backgroundColor: '#006eee',
							height: 55, width: 55,
								alignItems:'center', justifyContent:'center'}}
						onPress={this.moveCurrentLocation}>
						<base.Icon name='ios-locate'/>
					</base.Button>
				</base.Content>
			</base.Container>
		);
	}
}