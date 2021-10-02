import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as base from 'native-base';
import { Dimensions } from 'react-native';
const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_ICON = Dimensions.get('screen').height * 0.07
const SIZE_FONT = Dimensions.get('screen').height * 0.03
import { Feather } from '@expo/vector-icons';

const MapSelcetion = (props) => {
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
            <base.Content contentContainerStyle={{flex: 1,}}>
                <base.Form style={{padding: 20,}}>
                    <base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>지도검색</base.Text>
                    <base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey',}}>위성지도 좌표로 검색할 선박종류를 선택하세요</base.Text>
                </base.Form>
                <base.Form style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <base.Form style={{flex: 1, justifyContent: 'center', alignSelf: 'center', width: '100%'}}>
                        <base.Button block style={{width: '80%', height: '60%', alignSelf: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, elevation: 6}}
                            onPress={() => props.navigation.navigate('MapCommonShip')}>
                            <Feather name="map" size={SIZE_ICON} color="#006eee"/>
                            <base.Form style={{margin: 20}}>
                                <base.Text style={{color: 'black', fontSize: SIZE_FONT}}>일반선박</base.Text>
                                <base.Text style={{color: 'black', fontSize: SIZE_FONT}}>지도검색</base.Text>
                            </base.Form>
                        </base.Button>
                    </base.Form>
                    <base.Form style={{flex: 1, justifyContent: 'center', alignSelf: 'center', width: '100%'}}>
                        <base.Button block style={{width: '80%', height: '60%', alignSelf: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, elevation: 6}}
                            onPress={() => props.navigation.navigate('MapWastedShip')}>
                            <Feather name="map" size={SIZE_ICON} color="#006eee"/>
                            <base.Form style={{margin: 20}}>
                                <base.Text style={{color: 'black', fontSize: SIZE_FONT}}>유기선박</base.Text>
                                <base.Text style={{color: 'black', fontSize: SIZE_FONT}}>지도검색</base.Text>
                            </base.Form>
                        </base.Button>
                    </base.Form>
                </base.Form>
            </base.Content>
        </base.Container>
    )
}

export default MapSelcetion