import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Alert, Dimensions } from 'react-native';
import * as base from 'native-base';
import { Picker } from 'native-base';
import { getToken } from '../../utils/getToken';
import { requestWastedShipDetail } from '../../utils/shipInfoRequest';
import { updateWastedShipDetail, } from '../../utils/shipInfoRequest';
import { KindsOfShip } from '../../kindsOfData/kindsOfShip';
import { KindsOfRegion } from '../../kindsOfData/kindsOfRegion';
import Loading from '../../utils/loading';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_FONT = Dimensions.get('screen').height * 0.02

export default class UpdateWastedShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			info: '', latitude: '', longitude: '', types: '',
			region: '', port: '',

			tmp_info: '',
			loadingVisible: true,
		};
		this.showWastedShipDetail = this.showWastedShipDetail(this);
	
		this.updateDetail = this.updateDetail.bind(this);
	}
	showWastedShipDetail(){
		getToken().then((token) => {
			const id = this.props.navigation.getParam('id');
			requestWastedShipDetail(token, id).then((response) =>{
				if(response.status == 200){
					this.setState({
						id: id,
						info: response.data.data.info,
						latitude: response.data.data.lat,
						longitude: response.data.data.lon,
						types: response.data.data.types,
						region: response.data.data.region, 
						port: response.data.data.port,
						loadingVisible: false,
					})
				}
				else{
					console.log('fail')
				}
			})
        })
	}
	updateDetail(){
		this.setState({loadingVisible: true})
		getToken().then((token) => {
			const id = this.props.navigation.getParam('id');
			const info = (this.state.tmp_info == '' ? this.state.info : this.state.tmp_info)
			updateWastedShipDetail(token, this.state.id, info,
				this.state.latitude, this.state.longitude,
				this.state.types, this.state.region).then((response) =>{
				if(response.status == 200){
					this.setState({loadingVisible: false})
					Alert.alert(
						'선박확인체계 알림',
						'선박 정보가 수정되었습니다',
					)	
					this.props.navigation.popToTop()
				}
				else{
					console.log('fail')
				}
			})
        })
	}
	render(){
		return(
			<base.Root>
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
						<base.Form style={{padding: 10,}}>
							<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>선박정보수정</base.Text>
							<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey',}}>아래의 선박정보를 수정해주세요</base.Text>
						</base.Form>
						<base.Form>
							<base.Form style={{marginVertical: 15}}>
								<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
									<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박종류</base.Text>
									<Picker
										selectedValue={this.state.types}
										style={{height: 50, width: '100%'}}
										onValueChange={(itemValue) => this.setState({types: itemValue})}>
										{ KindsOfShip.map((data)=>{ return <Picker.Item label={data.value} value={data.value} /> }) }
									</Picker>							
								</base.Item>							
							</base.Form>

							<base.Form style={{marginVertical: 15, paddingHorizontal: 10}}>
									<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>세부정보 및 특이사항</base.Text>
									<base.Textarea rowSpan={5} bordered
										onChangeText={(info) => this.setState({info})} value={this.state.info}
										style={{fontFamily: 'Nanum', marginTop:10, marginBottom: 10, borderRadius: 10, padding: 10, fontSize: SIZE_FONT}}/>
							</base.Form>

							<base.Form>
								<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
									<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>위치지역</base.Text>
									<Picker
										selectedValue={this.state.region}
										style={{height: 50, width: '100%'}}
										onValueChange={(itemValue) => this.setState({region: itemValue})}>
										{ KindsOfRegion.map((data)=>{ return <Picker.Item label={data.value} value={data.value} /> }) }
									</Picker>							
								</base.Item>							
							</base.Form>
							<base.Button block onPress={this.updateDetail} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6,
								marginVertical: 20,}}>
								<base.Text style={{color: 'black'}}>수정하기</base.Text>
							</base.Button>
						</base.Form>
					</base.Content>
				<StatusBar hidden/>
				</base.Container>
			</base.Root>
		);
	}
}