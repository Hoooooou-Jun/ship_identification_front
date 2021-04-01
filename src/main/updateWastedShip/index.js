import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import * as base from 'native-base';
import { ValueInput } from './valueInput';
import { Picker } from '@react-native-picker/picker';
import { getToken } from '../../utils/getToken';
import { requestWastedShipDetail } from '../../utils/shipInfoRequest';
import { updateWastedShipDetail, } from '../../utils/shipInfoRequest';

export default class UpdateWastedShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			info: '', latitude: '', longitude: '', types: '',
			region: '', port: '',

			tmp_info: '',
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
					})
				}
				else{
					console.log('fail')
				}
			})
        })
	}
	updateDetail(){
		getToken().then((token) => {
			const id = this.props.navigation.getParam('id');
			const info = (this.state.tmp_info == '' ? this.state.info : this.state.tmp_info)
			updateWastedShipDetail(token, this.state.id, info,
				this.state.latitude, this.state.longitude,
				this.state.types, this.state.region).then((response) =>{
				if(response.status == 200){
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
					<base.Content padder>
						<base.Text style={{fontFamily:'Nanum', fontSize: 40, color: '#006eee', padding: 10}}>선박정보수정</base.Text>
						<base.Form>
						
							<base.Form style={{marginVertical: 15}}>
								<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
									<base.Text style={{fontSize: 20, alignSelf:'flex-start'}}>선박종류</base.Text>
									<Picker
										selectedValue={this.state.types}
										style={{height: 50, width: '100%'}}
										onValueChange={(itemValue) => this.setState({types: itemValue})}>
										<Picker.Item label="정보없음" value="정보없음"/>
										<Picker.Item label="어선" value="어선"/>
										<Picker.Item label="목선" value="목선"/>
										<Picker.Item label="유선" value="유선"/>
										<Picker.Item label="어장관리선" value="어선관리선"/>
										<Picker.Item label="고무보트" value="고무보트"/>
										<Picker.Item label="모터보트(레저용)" value="모터보트(레저용)"/>
										<Picker.Item label="모터보트(선내기)" value="모터보트(선내기)"/>
										<Picker.Item label="모터보트(선외기)" value="모터보트(선외기)"/>
										<Picker.Item label="수상오토바이" value="수상오토바이"/>
										<Picker.Item label="세일링 보트" value="세일링 보트"/>
									</Picker>							
								</base.Item>							
							</base.Form>

							<base.Form style={{marginVertical: 15, paddingHorizontal: 10}}>
									<base.Text style={{fontSize: 20, alignSelf:'flex-start'}}>세부정보 및 특이사항</base.Text>
									<base.Textarea rowSpan={5} bordered
										onChangeText={(info) => this.setState({info})} value={this.state.info}
										style={{fontFamily: 'Nanum', marginTop:10, marginBottom: 10, borderRadius: 10, padding: 10,}}/>
							</base.Form>

							<base.Form >
								<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
									<base.Text style={{fontSize: 20, alignSelf:'flex-start'}}>위치지역</base.Text>
									<Picker
										selectedValue={this.state.region}
										style={{height: 50, width: '100%'}}
										onValueChange={(itemValue) => this.setState({region: itemValue})}>
										<Picker.Item label="정보없음" value="정보없음"/>
										<Picker.Item label="당진" value="당진"/>
										<Picker.Item label="서산" value="서산"/>
										<Picker.Item label="태안" value="태안"/>
										<Picker.Item label="홍성" value="홍성"/>
										<Picker.Item label="보령" value="보령"/>
										<Picker.Item label="서천" value="서천"/>
									</Picker>							
								</base.Item>							
							</base.Form>
							<base.Button rounded onPress={this.updateDetail} style={{flex: 1,backgroundColor: '#006eee', marginVertical: 20, height: 50}}>
								<base.Text style={{fontFamily: 'Nanum'}}>선박정보 수정하기</base.Text>
							</base.Button>
						</base.Form>
					</base.Content>
				<StatusBar hidden/>
				</base.Container>
			</base.Root>
		);
	}
}