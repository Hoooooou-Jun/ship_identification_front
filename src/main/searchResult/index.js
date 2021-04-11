import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base';
import { FlatList, Dimensions } from 'react-native';
import { getToken } from '../../utils/getToken';
import { searchCommonShip, searchWastedShip } from '../../utils/shipInfoRequest';
import ShowShip from './showShip';
import AntDesign from '@expo/vector-icons/AntDesign';
import Loading from '../../utils/loading';
const SIZE_ICON = Dimensions.get('screen').height * 0.02
export default class SearchResult extends Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			index: 1,
			cnt: 0,

			id: '',
			flag: '',

			types: '', region: '',
			name: '', code: '',  tons: '', size: '', 
			is_ais: false, is_vpass: false, is_vhf: false, is_ff: false,

			latitude: '0', longitude: '0', info: '',
			loadingVisible: true,
		};
		this.showResult = this.showResult(this);
		this.getDetail = this.getDetail.bind(this);

		this.previousPage = this.previousPage.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.firstPage = this.firstPage.bind(this);
		this.lastPage = this.lastPage.bind(this);

		this.updateSearchCommonShip = this.updateSearchCommonShip.bind(this);
		this.updateSearchWastedShip = this.updateSearchWastedShip.bind(this);
	}
	componentDidMount(){
		this.setState({
			flag: this.props.navigation.getParam('flag'),

			name: this.props.navigation.getParam('name'),
			code: this.props.navigation.getParam('code'),
			tons: this.props.navigation.getParam('tons'),
			size: this.props.navigation.getParam('size'),
			is_ais: this.props.navigation.getParam('is_ais'),
			is_vpass: this.props.navigation.getParam('is_vpass'),
			is_vhf: this.props.navigation.getParam('is_vhf'),
			is_ff: this.props.navigation.getParam('is_ff'),
			region: this.props.navigation.getParam('region'),
	
			id: this.props.navigation.getParam('id'),
			region: this.props.navigation.getParam('region'),

			types: this.props.navigation.getParam('types'),
			info: this.props.navigation.getParam('info'),
		})
	}
	firstPage(){
		if(this.state.index == 1){
			Alert.alert(
				'선박확인체계 알림',
				'첫번째 페이지입니다',
			)
		}
		else {
			if(this.state.flag == 'Normal'){this.updateSearchCommonShip(1);}
			else{this.updateSearchWastedShip(1);}
		}
	}
	lastPage(){
		if(this.state.index == this.state.cnt){
			Alert.alert(
				'선박확인체계 알림',
				'마지막 페이지입니다',
			)
		}
		else {
			if(this.state.flag == 'Normal'){this.updateSearchCommonShip(this.state.cnt);}
			else{this.updateSearchWastedShip(this.state.cnt);}
		}
	}
	previousPage(){
		if(this.state.index == 1){
			Alert.alert(
				'선박확인체계 알림',
				'첫번째 페이지입니다',
			)
		}
		else {
			if(this.state.flag == 'Normal'){this.updateSearchCommonShip(this.state.index - 1);}
			else{this.updateSearchWastedShip(this.state.index - 1);}
		}
	}
	nextPage(){
		if(this.state.index == this.state.pages){
			Alert.alert(
				'선박확인체계 알림',
				'마지막 페이지입니다',
			)
		}
		else {
			if(this.state.flag == 'Normal'){this.updateSearchCommonShip(this.state.index + 1);}
			else{this.updateSearchWastedShip(this.state.index + 1);}
		}
	}
	showResult(){
		getToken().then((token) => {
			if(this.state.flag == 'Normal'){
				searchCommonShip(token, 1, this.state.name, this.state.types, this.state.code, this.state.tons,
					 this.state.size, this.state.is_ais, this.state.is_vpass, this.state.is_vhf, this.state.is_ff, this.state.region).then((response) => {
				if(response.status == 200){
					this.setState({
						cnt: response.data.data.count,
						len: response.data.data.data.length,
						data: this.state.data.concat(response.data.data.data),
						loadingVisible: false,
					})
				}
				else{ console.log('fail') }
				})
			}
			else{ // flag == 'Wasted'
				searchWastedShip(token, 1, this.state.id, this.state.region, this.state.types, this.state.info).then((response) => {
				if(response.status == 200){
					this.setState({
						cnt: response.data.data.count,
						len: response.data.data.data.length,
						data: this.state.data.concat(response.data.data.data),
						loadingVisible: false,
					})
				}
				else{ console.log('fail') }
				})
			}
        })
	}
	updateSearchCommonShip(idx){
		this.setState({loadingVisible: true,})
		getToken().then((token) => {
			searchCommonShip(token, idx, this.state.name, this.state.types, this.state.code, this.state.tons,
				this.state.size, this.state.is_ais, this.state.is_vpass, this.state.is_vhf, this.state.is_ff, this.state.region).then((response) => {
			if(response.status == 200){
				this.setState({
					index: idx,
					data: response.data.data.data,
					loadingVisible: false,
				})
			}
			else{
				console.log('fail')
			}
			})
        })
		this.flatList.scrollToOffset({x: 0, y: 0, animated: true})
	}
	updateSearchWastedShip(idx){
		this.setState({loadingVisible: true,})
		getToken().then((token) => {
			searchWastedShip(token, idx, this.state.id, this.state.region, this.state.types, this.state.info).then((response) => {
			if(response.status == 200){
				this.setState({
					index: idx,
					data: response.data.data.data,
					loadingVisible: false,
				})
			}
			else{
				console.log('fail')
			}
			})
        })
		this.flatList.scrollToIndex({index: 0, animated: true})
	}
	getDetail(id){
		if(this.state.flag == 'Normal'){
			this.props.navigation.navigate('DetailCommonShip',{id: id})}
		else{ // flag == 'Wasted'
			this.props.navigation.navigate('DetailWastedShip',{id: id})}
	}
	
	render(){
		return(
			
			<base.Root>
				<base.Container>
					<base.Header style={{backgroundColor: 'white'}}>
						<base.Left>
							<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
								<base.Icon name='arrow-back' style={{color: 'black', fontSize: 25}}/>
							</base.Button>
						</base.Left>
						<base.Right>
						</base.Right>
					</base.Header>
					<base.Content>
						<Loading visible={this.state.loadingVisible}/>
						<FlatList
							sytle={{flex:1}}
							ref = {(ref) => this.flatList=ref}
							data={this.state.data}
							renderItem={({item}) => <ShowShip ship={item} flag={this.state.flag} onPress={()=>this.getDetail(item.id)}/>}
							ListHeaderComponent={
								<base.Form style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', height: SIZE_ICON + 20, marginVertical: 10}}>
									<base.Button style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
									elevation: 6, borderRadius: 10, height: SIZE_ICON + 10, marginHorizontal: 10,}} onPress={()=>this.firstPage()}>
										<AntDesign name="banckward" size={SIZE_ICON} color="#292929"/>
									</base.Button>
									<base.Button style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
									elevation: 6, borderRadius: 10, height: SIZE_ICON + 10, marginHorizontal: 10,}} onPress={()=>this.previousPage()}>
										<AntDesign name="caretleft" size={SIZE_ICON} color="#292929"/>
									</base.Button>
									<base.Form style={{flex: 1, height: SIZE_ICON + 10, justifyContent: 'center', alignItems: 'center',}}>
										<base.Text style={{fontSize: SIZE_ICON - 5}}>{this.state.index} / {this.state.cnt}</base.Text>
									</base.Form>
									<base.Button style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
									elevation: 6, borderRadius: 10, height: SIZE_ICON + 10, marginHorizontal: 10,}} onPress={()=>this.nextPage()}>
										<AntDesign name="caretright" size={SIZE_ICON} color="#292929"/>
									</base.Button>
									<base.Button style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
									elevation: 6, borderRadius: 10, height: SIZE_ICON + 10, marginHorizontal: 10, }} onPress={()=>this.lastPage()}>
										<AntDesign name="forward" size={SIZE_ICON} color="#292929"/>
									</base.Button>
								</base.Form>
							}
							ListFooterComponent={
								<base.Form style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', height: SIZE_ICON + 20, marginVertical: 10}}>
									<base.Button style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
									elevation: 6, borderRadius: 10, height: SIZE_ICON + 10, marginHorizontal: 10,}} onPress={()=>this.firstPage()}>
										<AntDesign name="banckward" size={SIZE_ICON} color="#292929"/>
									</base.Button>
									<base.Button style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
									elevation: 6, borderRadius: 10, height: SIZE_ICON + 10, marginHorizontal: 10,}} onPress={()=>this.previousPage()}>
										<AntDesign name="caretleft" size={SIZE_ICON} color="#292929"/>
									</base.Button>
									<base.Form style={{flex: 1, height: SIZE_ICON + 10, justifyContent: 'center', alignItems: 'center',}}>
										<base.Text style={{fontSize: SIZE_ICON - 5}}>{this.state.index} / {this.state.cnt}</base.Text>
									</base.Form>
									<base.Button style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
									elevation: 6, borderRadius: 10, height: SIZE_ICON + 10, marginHorizontal: 10,}} onPress={()=>this.nextPage()}>
										<AntDesign name="caretright" size={SIZE_ICON} color="#292929"/>
									</base.Button>
									<base.Button style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
									elevation: 6, borderRadius: 10, height: SIZE_ICON + 10, marginHorizontal: 10, }} onPress={()=>this.lastPage()}>
										<AntDesign name="forward" size={SIZE_ICON} color="#292929"/>
									</base.Button>
								</base.Form>
							}
						/>
					</base.Content>
				</base.Container>
			</base.Root>
		);
	}
}