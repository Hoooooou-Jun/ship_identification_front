import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, Alert, Dimensions } from 'react-native';
import * as base from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { getToken } from '../../utils/getToken';
import { requestCommonShipLocation, requestWastedShipLocation } from '../../utils/shipInfoRequest';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_IMG_HEIGHT = Dimensions.get('screen').height * 0.35
const SIZE_FONT = Dimensions.get('screen').height * 0.02
const SIZE_SUBFONT = Dimensions.get('screen').height * 0.015

import Loading from '../../utils/loading';
export default class SearchMap extends Component{
	constructor(props) {
		super(props);
		this.state = {
			flag: 'Normal',
			latitude: '',
			longitude: '',
			
			commonShipData: [],
			wastedShipData: [],

			loadingVisible_location: true,
			loadingVisible_c_data: true,
			loadingVisible_w_data: true,
		};
		this.requestLocation = this.requestLocation(this);
		this.getLocation = this.getLocation(this);
		this.moveCurrentLocation = this.moveCurrentLocation.bind(this);
		this.moveLocation = this.moveLocation.bind(this);
	}
	
	requestLocation(){
		getToken().then((token) => {
			requestCommonShipLocation(token).then((response) => {
				if(response.status == 200){
					this.setState({
						commonShipData: response.data.data,
						loadingVisible_c_data: false,
					})
				}
				else{
                	console.log('fail')
            	}
			})
			requestWastedShipLocation(token).then((response) => {
				if(response.status == 200){
					this.setState({
						wastedShipData: response.data.data,
						loadingVisible_w_data: false,
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
		let mapDetail
		if(this.state.flag == 'Normal'){
			let requestMarker = (data) => {
				return data.map((ship) => {
						return (
							<Marker
							pinColor='green'
							coordinate={{
								latitude: parseFloat(ship.lat),
								longitude: parseFloat(ship.lon),
							}}>
								<Callout onPress={() => this.props.navigation.navigate('DetailCommonShip', {id: ship.id})}>
									<base.Form style={{width: 300}}>
										<base.Text style={{fontFamily:'Nanum',}}>선박명 : {ship.name}</base.Text>
										<base.Text style={{fontFamily:'Nanum',}}>등록일자 : {ship.regit_date}</base.Text>
										<base.Text style={{fontFamily:'Nanum',}}>위도 : {ship.lat}</base.Text>
										<base.Text style={{fontFamily:'Nanum',}}>경도 : {ship.lon}</base.Text>
									</base.Form>
								</Callout>
							</Marker>
						)
				})
			}
			mapDetail =
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
						showsUserLocation={true}
						>
						{ requestMarker(this.state.commonShipData) }
					</MapView>
				</base.Form>
		}
		else{
			let requestMarker = (data) => {
				return data.map((ship) => {
						return (
							<Marker
							pinColor='red'
							coordinate={{
								latitude: parseFloat(ship.lat),
								longitude: parseFloat(ship.lon),
							}}>
								<Callout onPress={() => this.props.navigation.navigate('DetailWastedShip', {id: ship.id})}>
									<base.Form style={{width: 300}}>
										<base.Text style={{fontFamily:'Nanum',}}>등록일자 : {ship.regit_date}</base.Text>
										<base.Text style={{fontFamily:'Nanum',}}>관리번호 : {ship.id}</base.Text>
										<base.Text style={{fontFamily:'Nanum',}}>위도 : {ship.lat}</base.Text>
										<base.Text style={{fontFamily:'Nanum',}}>경도 : {ship.lon}</base.Text>
										<base.Text style={{fontFamily:'Nanum',}}>세부사항 : {ship.info}</base.Text>
									</base.Form>
								</Callout>
							</Marker>
						)
				})
			}
			mapDetail =
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
						showsUserLocation={true}
						>
						{ requestMarker(this.state.wastedShipData) }
					</MapView>
				</base.Form>
		}
		return(
			<base.Container>
				<base.Header style={{backgroundColor: 'white'}}>
				<base.Left style={{flex: 1,}}>
							<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
								<base.Icon name='arrow-back' style={{color: 'black'}}/>
							</base.Button>
						</base.Left>
						<base.Form style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center',}}>
							<base.Segment style={{backgroundColor: '#006eee', borderRadius: 10, width: '100%'}}>
								<base.Button first active={this.state.flag == 'Normal'} onPress={() => this.setState({flag: 'Normal'})}>
									<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}>일반선박</base.Text>
								</base.Button>
								<base.Button last active={this.state.flag == 'Wasted'} onPress={() => this.setState({flag: 'Wasted'})}>
									<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}>유기선박</base.Text>
								</base.Button>
							</base.Segment>
						</base.Form>
				</base.Header>
				<base.Content contentContainerStyle={{ flex: 1 }}>
					<Loading visible={this.state.loadingVisible_c_data || this.state.loadingVisible_w_data || this.state.loadingVisible_location}/>
					{mapDetail}
					<base.Button rounded
						style={{
							position: 'absolute',
							top: '5%', left: '5%',
							backgroundColor: 'white',
							height: 55, width: 55,
								alignItems:'center', justifyContent:'center'}}
						onPress={this.moveCurrentLocation}>
						<base.Icon name='ios-locate' style={{color: 'black'}}/>
					</base.Button>
				</base.Content>
			</base.Container>
		);
	}
}