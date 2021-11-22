import React, { Component } from 'react';
import { LogBox } from "react-native";
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './src/accounts/login';
import Lost from './src/accounts/lost';
import Signup from './src/accounts/signup';

import Home from './src/main/home';
import Register from './src/main/register';
import RegisterShipOwner from './src/main/registerShipOwner';
import CheckShipOwnerConsent from './src/main/checkShipOwnerConsent';
import Search from './src/main/search';
import SearchResult from './src/main/searchResult';
import SearchAI from './src/main/searchAI';
import ListCommonShip from './src/main/listCommonShip';
import ListWastedShip from './src/main/listWastedShip';
import DetailCommonShip from './src/main/detailCommonShip';
import DetailWastedShip from './src/main/detailWastedShip';
import UpdateCommonShip from './src/main/updateCommonShip';
import UpdateWastedShip from './src/main/updateWastedShip';
import UpdateCommonShipMImage from './src/main/updateCommonShipMImage';
import UpdateWastedShipMImage from './src/main/updateWastedShipMImage';
import DetailCommonShipGallery from './src/main/detailCommonShipGallery';
import DetailWastedShipGallery from './src/main/detailWastedShipGallery';
import RegisterCommonShipImages from './src/main/registerCommonShipImages';
import RegisterWastedShipImages from './src/main/registerWastedShipImages';
import TrainCommonShipGallery from './src/main/trainRequest';
import License from './src/main/license';
import LeaningStatus from './src/main/leaningStatus';

import MapSelection from './src/main/mapSelection';
import MapCommonShip from './src/main/mapCommonShip';
import MapWastedShip from './src/main/mapWastedShip';
import SearchUnitCommonShip from './src/main/searchUnitCommonShip';

import Notice from './src/main/notice';
import NoticeList from './src/main/noticeList';
import QNAList from './src/main/qna/qnaList';
import Question from './src/main/qna/question';
import Answer from './src/main/qna/answer';

import ImgViewer from './src/main/imgViewer';
import ShipImgViewer from './src/main/shipImgViewer';

import MyAccount from './src/main/myAccount';

import store from './src/redux/store';
import { Provider } from 'react-redux';

LogBox.ignoreLogs([
	"VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.",
	"Warning: Failed prop type: Invalid prop `tabStyle` of type `array` supplied to `DefaultTabBar`, expected `object`."
  ]);

const homeStackNav = createStackNavigator(
	{
    Home: {screen: Home, navigationOptions: {headerShown: false}},
    Search: {screen: Search, navigationOptions: {headerShown: false}},
	SearchResult: {screen: SearchResult, navigationOptions: {headerShown: false}},
    SearchAI: {screen: SearchAI, navigationOptions: { headerShown: false }},
    Register: {screen: Register, navigationOptions: { headerShown: false }},
    ListCommonShip: {screen: ListCommonShip, navigationOptions: { headerShown: false }},
    ListWastedShip: {screen: ListWastedShip, navigationOptions: { headerShown: false }},
	DetailCommonShip: {screen: DetailCommonShip, navigationOptions: { headerShown: false }},
	DetailWastedShip: {screen: DetailWastedShip, navigationOptions: { headerShown: false }},
	UpdateCommonShip: {screen: UpdateCommonShip, navigationOptions: { headerShown: false }},
	UpdateWastedShip: {screen: UpdateWastedShip, navigationOptions: { headerShown: false }},
	UpdateCommonShipMImage: {screen: UpdateCommonShipMImage, navigationOptions: { headerShown: false }},
	UpdateWastedShipMImage: {screen: UpdateWastedShipMImage, navigationOptions: { headerShown: false }},
	DetailCommonShipGallery: {screen: DetailCommonShipGallery, navigationOptions: { headerShown: false }},
	DetailWastedShipGallery: {screen: DetailWastedShipGallery, navigationOptions: { headerShown: false }},
	RegisterCommonShipImages: {screen: RegisterCommonShipImages, navigationOptions: { headerShown: false }},
	RegisterWastedShipImages: {screen: RegisterWastedShipImages, navigationOptions: { headerShown: false }},
	TrainGallery: {screen: TrainCommonShipGallery, navigationOptions: { headerShown: false}},
	License: {screen: License, navigationOptions: { headerShown: false }},
	LeaningStatus: {screen: LeaningStatus, navigationOptions: { headerShown: false }},

	MapSelection: {screen: MapSelection, navigationOptions: { headerShown: false }},
	MapCommonShip: {screen: MapCommonShip, navigationOptions: { headerShown: false }},
	MapWastedShip: {screen: MapWastedShip, navigationOptions: { headerShown: false }},
	SearchUnitCommonShip: {screen: SearchUnitCommonShip, navigationOptions: {headerShown: false}},
	
	RegisterShipOwner: {screen: RegisterShipOwner, navigationOptions: { headerShown: false }},
	CheckShipOwnerConsent: {screen: CheckShipOwnerConsent, navigationOptions: { headerShown: false }},
	
	Notice: {screen: Notice, navigationOptions: { headerShown: false }},
	NoticeList: {screen: NoticeList, navigationOptions: { headerShown: false }},
	
	QNAList: {screen: QNAList, navigationOptions: { headerShown: false }},
	Question: {screen: Question, navigationOptions: { headerShown: false }},
	Answer: {screen: Answer, navigationOptions: { headerShown: false }},

	ImgViewer: {screen: ImgViewer, navigationOptions: { headerShown: false }},
	ShipImgViewer: {screen: ShipImgViewer, navigationOptions: { headerShown: false }},
	
	MyAccount: {screen: MyAccount, navigationOptions: { headerShown: false }},
  },{
    initialRouteName: 'Home'
  }
);

const loginStackNav = createStackNavigator(
	{
		Login: {screen: Login, navigationOptions: { headerShown: false }},
		Lost: {screen: Lost, navigationOptions: { headerShown: false }},
		Signup: {screen: Signup, navigationOptions: { headerShown: false }},
	},{
		initialRouteName: 'Login'
	}
);

const Root = createSwitchNavigator(
	{
    	loginStackNav,
		homeStackNav,
	}
);
const AppContainer = createAppContainer(Root);

export default class App extends Component {
	render(){
		return <Provider store={store}><AppContainer></AppContainer></Provider>;
	}
}
