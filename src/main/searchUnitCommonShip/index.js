import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import * as base from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { requestCommonShipLocationUnit } from '../../utils/shipInfoRequest'; 
import AntDesign from '@expo/vector-icons/AntDesign'
import styles from './styles'
import { connect } from 'react-redux';
import Loading from '../../utils/loading';
import Animated from 'react-native-reanimated';
import ShipCard from './shipCard';

const CARDSPACE = Dimensions.get('screen').width * 0.2
const CARDWIDTH = Dimensions.get('window').width * 0.561

const SearchUnitCommonShip = (props) => {
	const [latitude, set_latitude] = useState('');
	const [longitude, set_longitude] = useState('');
	const [unit, set_unit] = useState(props.userInfo.unit);
	const [click, set_click] = useState(1);
	const [data, set_data] = useState([]);
	const [load, set_load] = useState(false);
	const [loadingVisible, set_loadingVisible] = useState(true);
	
	const mapView = useRef();
	const scrollView = useRef();

	let UNIT_BUTTONS = [
		{ text: "직할대", icon: "arrow-forward", iconColor: "grey",},
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

	let mapIndex = 0;
	let mapAnimation = new Animated.Value(0)

	useEffect(() => {
		mapAnimation.addListener(({ value }) => {
			let index = Math.floor(value / CARDWIDTH + 0.3);
			if (index >= data.length) { 
				index = data.length - 1;
			}
			if (index <= 0) {
				index = 0;
			}
			clearTimeout(regionTimeout)
			const regionTimeout = setTimeout(() => {
				if( mapIndex ===! index) {
					mapIndex = index;
					const { coordinate } = data[index];
					mapView.current.AnimatedToRegion(
						{
							...coordinate,
							latitudeDelta: 0.05,
							longitudeDelta: 0.05
						},
						350
					)
				}
			}, 10)
		})
	})

	useEffect(() => {
		_getLocation()
	}, [])
	
	useEffect(() => {
		_getData()
	}, [unit])

	const _handleUnit = (Index) => {
		set_loadingVisible(true)
		if(click == 8) {
			console.log('취소')
		}
		else {
			switch(Index) {
				case 0: {
					set_unit('직할대')
					break;
				}
				case 1: {
					set_unit('97-1')
					break;
				}
				case 2: {
					set_unit('97-2')
					break;
				}
				case 3: {
					set_unit('97-3')
					break;
				}
				case 4: {
					set_unit('98-1')
					break;
				}
				case 5: {
					set_unit('98-2')
					break;
				}
				case 6: {
					set_unit('98-3')
					break;
				}
				case 7: {
					set_unit('98-4')
					break;
				}
			}
		}
	}

	const _getLocation = async () => {
		await Location.requestPermissionsAsync()
		Location.getCurrentPositionAsync().then((response) => {
			set_latitude(response.coords.latitude);
			set_longitude(response.coords.longitude);
			_getData();
		}).catch((error) => {
			console.log(error)
		})
	}

	const _getData = () => {
		console.log('_getData')
		requestCommonShipLocationUnit(props.userInfo.token, unit).then((response) => {
			set_data(response.data.data)
			set_load(true)
			set_loadingVisible(false)
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
	        		<Callout onPress={() => props.navigation.navigate('DetailCommonShip', {id: ship.id})}>
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
				<Loading visible={loadingVisible} initialRoute={false} onPress={() => props.navigation.goBack()}/>
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
									buttonIndex => {_handleUnit(buttonIndex)}
							)}>
							<AntDesign name="filter" size={25} color="black" />
						</base.Button>
					</base.Right>
				</base.Header>
				<base.Content contentContainerStyle={styles.contentContainer}>
					<base.View style={{width: '100%', height: '100%'}}>
						<MapView
							ref={mapView}
							provider={PROVIDER_GOOGLE}
							style={styles.map}
							showsUserLocation={true}
							initialRegion={{
                                latitude: parseFloat(latitude),
                                longitude: parseFloat(longitude),
                                latitudeDelta: 0.05,
                                longitudeDelta: 0.05,
                            }}
						>
							{ load ? _Marker(data) : null }
						</MapView>
						<base.Text style={{position: 'absolute'}}>선박 정보</base.Text>
						<Animated.ScrollView
							ref={scrollView}
							horizontal
							scrollEventThrottle={1}
							showsHorizontalScrollIndicator={false}
							style={{position: 'absolute', bottom: 40}}
							pagingEnabled
							snapToInterval={CARDWIDTH + 20}
							snapToAlignment="center"
							contentContainerStyle={{
								paddingHorizontal: CARDSPACE
							}}
							onScroll={Animated.event(
								[
									{
										nativeEvent: {
											contentOffset: {
												x: mapAnimation,
											}
										},
									},
								],
								{useNativeDriver: true}
							)}
						>
							{ data.map((ship) => {
								return (
									<ShipCard shipName={ship.name} key={ship.id} shipRegitDate={ship.regit_date} shipMainImg={ship.main_img} />
								)
							}) 
							}
						</Animated.ScrollView>
					</base.View>

					{/* <base.Form style={{flex: 1, backgroundColor: 'skyblue', width: 100, height: 100}}>
					</base.Form> */}
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
