import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { getToken } from '../../utils/getToken';
import { requestCommonShipLocation, requestCommonShipLocationDetail } from '../../utils/shipInfoRequest';
import { AntDesign } from '@expo/vector-icons';
import Loading from '../../utils/loading';
export default class MapCommonShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			latitude: '',
			longitude: '',
			
            searchAll: false,
			data: [],
            dataAll: [],

			loadingVisible_data: false,
			loadingVisible_dataAll: false,
		};
		this.requestLocation = this.requestLocation(this);
        this.requestLocationDetail = this.requestLocationDetail(this);
		this.moveCurrentLocation = this.moveCurrentLocation.bind(this);
	}
    async componentDidMount(){
        await Location.requestPermissionsAsync()
		await Location.getCurrentPositionAsync().then((location)=>{
            this.setState({latitude: location.coords['latitude'], longitude: location.coords['longitude']})
        })
    }
	requestLocation(){
        this.setState({loadingVisible_dataAll: true})
		getToken().then((token) => {
			requestCommonShipLocation(token).then((response) => {
                this.setState({
                    dataAll: response.data.data,
                    loadingVisible_data: false,
                })
			})
        })
	}
	requestLocationDetail(){
        this.setState({loadingVisible_data: true})
		getToken().then((token) => {
            Location.getCurrentPositionAsync().then((location)=>{
                requestCommonShipLocationDetail(token, 
                    parseFloat(location.coords['latitude']), parseFloat(location.coords['longitude'])).then((response) => {
                    this.setState({
                        data: response.data.data,
                        loadingVisible_dataAll: false,
                    })
                })
            })
        })
	}
	moveCurrentLocation = async () => {
		const location = await Location.getCurrentPositionAsync();
		this.setState({latitude: location.coords['latitude'], longitude: location.coords['longitude']})
		let loc = {
			latitude: this.state.latitude,
			longitude: this.state.longitude,
			latitudeDelta: 0.05,
			longitudeDelta: 0.05,
		};
		this.mapView.animateToRegion(loc, 0);
	}
	render(){
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
		return(
			<base.Container>
				<base.Header style={{backgroundColor: 'white'}}>
				<base.Left style={{flex: 1,}}>
						<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
							<base.Icon name='arrow-back' style={{color: 'black'}}/>
						</base.Button>
						</base.Left>
                        <base.Right>
                        </base.Right>
				</base.Header>
				<base.Content contentContainerStyle={{ flex: 1 }}>
					<Loading visible={this.state.loadingVisible_data || this.state.loadingVisible_dataAll}/>
                    <base.Form style={{width: '100%', flexDirection: 'row', borderBottomWidth: 1, borderColor: 'grey'}}>
						<base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
						onPress={this.moveCurrentLocation}>
							<AntDesign name="enviromento" size={25} color="black"/>
                            <base.Text>내 위치</base.Text>
						</base.Button>
						<base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                            onPress={()=>{
                                this.state.searchAll ? this.requestLocationDetail : null,
                                this.setState({searchAll: !this.state.searchAll})
                            }}>
							<AntDesign name="retweet" size={25} color="black"/>
                            <base.Text>{this.state.searchAll ? '주변 탐색' : '전체 탐색'}</base.Text>
						</base.Button>
					</base.Form>
                        <base.Form style={{flex: 1,}}>
                            <MapView
                                ref = {(ref) => this.mapView=ref}
                                provider={PROVIDER_GOOGLE}
                                style={{flex: 1}}
                                initialRegion={{
                                    latitude: parseFloat(this.state.latitude),
                                    longitude: parseFloat(this.state.longitude),
                                    latitudeDelta: 0.05,
                                    longitudeDelta: 0.05,
                                }}
                                showsUserLocation={true}
                                >
                                { requestMarker(this.state.searchAll ? this.state.dataAll : this.state.data) }
                            </MapView>
                        </base.Form>
				</base.Content>
			</base.Container>
		);
	}
}