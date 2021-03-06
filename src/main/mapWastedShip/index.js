import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import * as base from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { requestWastedShipLocation, requestWastedShipLocationDetail } from '../../utils/shipInfoRequest';
import { AntDesign } from '@expo/vector-icons';
import Loading from '../../utils/loading';
import { connect } from 'react-redux';

const MapWastedShip = (props) => {
    const [latitude, set_latitude] = useState('')
    const [longitude, set_longitude] = useState('')
    const [searchAll, set_searchAll] = useState(false)
    const [data, set_data] = useState([])
    const [dataAll, set_dataAll] = useState([])
    const [loadingVisible_data, set_loadingVisible_data] = useState(false)
    const [loadingVisible_dataAll, set_loadingVisible_dataAll] = useState(false)

    const mapView = useRef()

    useEffect(() => {
        loadLocation()
        requestLocation()
        requestLocationDetail()
    }, [])

    const loadLocation = async () => {
        await Location.requestPermissionsAsync()
		await Location.getCurrentPositionAsync().then((location) => {
            set_latitude(location.coords['latitude'])
            set_longitude(location.coords['longitude'])
        })
    }

	const requestLocation = () => {
        set_loadingVisible_dataAll(true)
        requestWastedShipLocation(props.token)
        .then((response) => {
            set_dataAll(response.data.data)
            set_loadingVisible_dataAll(false)
        })
	}
	const requestLocationDetail = () => {
        set_loadingVisible_data(true)
        Location.getCurrentPositionAsync().then((location) => {
            requestWastedShipLocationDetail(props.token, parseFloat(location.coords['latitude']), parseFloat(location.coords['longitude']))
            .then((response) => {
                console.log(response.data.data)
                set_data(response.data.data)
                set_loadingVisible_data(false)
            })
        })
	}
	const moveCurrentLocation = async () => {
		const location = await Location.getCurrentPositionAsync();
        set_latitude(location.coords['latitude'])
        set_longitude(location.coords['longitude'])
		let loc = {
			latitude: latitude,
			longitude: longitude,
			latitudeDelta: 0.05,
			longitudeDelta: 0.05,
		};
		mapView.current.animateToRegion(loc, 0);
	}

    let requestMarker = (data) => {
        return data.map((ship) => {
            return (
                <Marker
                key = {ship.id}
                pinColor='red'
                coordinate={{
                    latitude: parseFloat(ship.lat),
                    longitude: parseFloat(ship.lon),
                }}>
                    <Callout onPress={() => props.navigation.navigate('DetailWastedShip', {id: ship.id})}>
                        <base.Form style={{width: 300}}>
                            <base.Text style={{fontFamily:'Nanum',}}>???????????? : {ship.regit_date}</base.Text>
                            <base.Text style={{fontFamily:'Nanum',}}>???????????? : {ship.id}</base.Text>
                            <base.Text style={{fontFamily:'Nanum',}}>?????? : {ship.lat}</base.Text>
                            <base.Text style={{fontFamily:'Nanum',}}>?????? : {ship.lon}</base.Text>
                            <base.Text style={{fontFamily:'Nanum',}}>???????????? : {ship.info}</base.Text>
                        </base.Form>
                    </Callout>
                </Marker>
            )
        })
    }

    return (
        <base.Container>
            <base.Header style={{backgroundColor: 'white'}}>
            <base.Left style={{flex: 1,}}>
                    <base.Button transparent onPress={() => props.navigation.goBack()}>
                        <base.Icon name='arrow-back' style={{color: 'black'}}/>
                    </base.Button>
                    </base.Left>
                    <base.Right>
                    </base.Right>
            </base.Header>
            <base.Content contentContainerStyle={{ flex: 1 }}>
                <Loading visible={loadingVisible_data || loadingVisible_dataAll} initialRoute={false} onPress={() => props.navigation.goBack()}/>
                <base.Form style={{width: '100%', flexDirection: 'row', borderBottomWidth: 1, borderColor: 'grey'}}>
                    <base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                    onPress={moveCurrentLocation}>
                        <AntDesign name="enviromento" size={25} color="black"/>
                        <base.Text>??? ??????</base.Text>
                    </base.Button>
                    <base.Button transparent style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                        onPress={()=>{
                            searchAll ? requestLocationDetail : null,
                            set_searchAll(!searchAll)
                        }}>
                        <AntDesign name="retweet" size={25} color="black"/>
                        <base.Text>{searchAll ? '?????? ??????' : '?????? ??????'}</base.Text>
                    </base.Button>
                </base.Form>
                <base.Form style={{flex: 4}}>
                    <MapView
                        ref = {mapView}
                        provider={PROVIDER_GOOGLE}
                        style={{flex: 1}}
                        initialRegion={{
                            latitude: parseFloat(latitude),
                            longitude: parseFloat(longitude),
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                        showsUserLocation={true}
                        >
                        { requestMarker(searchAll ? dataAll : data) }
                    </MapView>
                </base.Form>
                <base.Form style={{flex: 1}}>
                    <base.Text>asdfasd</base.Text>
                </base.Form>
            </base.Content>
        </base.Container>
    )
}

const mapStateToProps = (state) => {
	return {
		token: state.userInfo.token,
	}
}

export default connect(mapStateToProps)(MapWastedShip)