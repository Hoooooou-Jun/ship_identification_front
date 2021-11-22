import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import * as base from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { requestCommonShipLocationUnit } from '../../utils/shipInfoRequest'; 
import AntDesign from '@expo/vector-icons/AntDesign'
import styles from './styles'
import { connect } from 'react-redux';

const SearchUnitCommonShip = (props) => {
	const [latitude, set_latitude] = useState('');
	const [longitude, set_longitude] = useState('');
	const [unit, set_unit] = useState(props.userInfo.unit);
	const [click, set_click] = useState(1);
	const [data, set_data] = useState([]);
	const [load, set_load] = useState(false);
	
	const mapView = useRef();

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

	// const _handleCheck = () => {

	// 	if(click == 8) {
	// 	}
	// 	else {
	// 		switch(click) {
	// 			case 0: {
	// 				set_unit('all')
	// 				break;
	// 			}
	// 			case 1: {
	// 				set_unit('97-1')
	// 				break;
	// 			}
	// 			case 2: {
	// 				set_unit('97-2')
	// 				break;
	// 			}
	// 			case 3: {
	// 				set_unit('97-3')
	// 				break;
	// 			}
	// 			case 4: {
	// 				set_unit('98-1')
	// 				break;
	// 			}
	// 			case 5: {
	// 				set_unit('98-2')
	// 				break;
	// 			}
	// 			case 6: {
	// 				set_unit('98-3')
	// 				break;
	// 			}
	// 			case 7: {
	// 				set_unit('98-4')
	// 				break;
	// 			}
	// 	}
	// }

	useEffect(() => {
		_getLocation()
	}, [])

	useEffect(() => {
		_getData()
	}, [unit])

	const _getLocation = async () => {
		await Location.requestPermissionsAsync()
		Location.getCurrentPositionAsync().then((response) => {
			set_latitude(response.coords.latitude);
			set_longitude(response.coords.longitude);
		}).catch((error) => {
			console.log(error)
		})
	}

	const _getData = () => {
		requestCommonShipLocationUnit(props.userInfo.token, unit).then((response) => {
			set_data(response.data.data)
			set_load(true)
		}).catch((error) => {
			console.log(error)
		})
	}

	let _Marker = (data) => {
		return data.map((ship) => {
			return (
				<Marker
					key={ship.id}
					pinColor='red'
					coordinate={{
						latitude: parseFloat(ship.lat),
						longitude: parseFloat(ship.lon)
					}}
				>
	        		<Callout onPress={() => props.navigation.navigate('DetailWastedShip', {id: ship.id})}>
                        <base.Form style={{width: 250}}>
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

	return (
		<base.Root>
			<base.Container>
				<StatusBar hidden/>
				<base.Header style={{backgroundColor: 'white'}}>
					<base.Left>
						<base.Button transparent onPress={() => props.navigation.goBack()}>
							<base.Icon name='arrow-back' style={{color: 'black'}}/>
						</base.Button>
					</base.Left>
					<base.Right>
						<base.Button transparent onPress={() =>
									base.ActionSheet.show({
										options: UNIT_BUTTONS,
										cancelButtonIndex: UNIT_CANCEL_INDEX,
										destructiveButtonIndex: UNIT_DESTRUCTIVE_INDEX,
										title: "관리 부대"
									},
									buttonIndex => {console.log(buttonIndex)}
							)}>
							<AntDesign name="filter" size={25} color="black" />
						</base.Button>
					</base.Right>
				</base.Header>
				<base.Content contentContainerStyle={styles.contentContainer}>
					<base.Form style={{flex: 1, width: '100%', height: 400}}>
						<MapView
							ref={mapView}
							provider={PROVIDER_GOOGLE}
							style={{flex: 1}}
							showsUserLocation={true}
						>
							{ load ? _Marker(data) : null }
						</MapView>
					</base.Form>
					<base.Form style={{flex: 1, backgroundColor: 'skyblue', width: 100, height: 100}}>
					</base.Form>
				</base.Content>
			</base.Container>
		</base.Root>
	)
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.userInfo,
	}
}

export default connect(mapStateToProps)(SearchUnitCommonShip);
