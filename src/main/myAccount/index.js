import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import * as base from 'native-base';
import { getToken } from '../../utils/getToken';
import { requestUserData } from '../../utils/userInfoRequest';
import styles from './styles';

const SIZE_LOGO = Dimensions.get('screen').height * 0.3
const SIZE_FONT = Dimensions.get('screen').height * 0.015

import Loading from '../../utils/loading';

export default class MyAccount extends Component{
	constructor(props) {
		super(props);
		this.state = {
			srvno: '',
			password: '',
            name : '',
			rank : '',
			position : '',
			unit : '',
			phone : '',
			device_id : '',

			loadingVisible: true,
		}
		this.getUserData = this.getUserData(this);
	}
	getUserData(){
		getToken().then((token) => {
			requestUserData(token).then((response) => {
            if(response.status == 200){
				this.setState({
					srvno: response.data.data.srvno,
					name: response.data.data.name,
					rank : response.data.data.rank,
					position : response.data.data.position,
					unit : response.data.data.unit,
					phone : response.data.data.phone,
					device_id : response.data.data.device_id,

					loadingVisible: false,
				})
            }
            else{
                console.log('fail')
            }
		})
        })
	}
	render(){
		return(
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
					<Loading visible={this.state.loadingVisible}/>
					<base.Form style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', margin: 10}}>
						<base.Form style={{backgroundColor:'white', borderRadius: SIZE_LOGO / 2, justifyContent: 'center', alignItems: 'center', width: SIZE_LOGO, height: SIZE_LOGO, elevation: 6}}>
							<Image source={require('../../../assets/img/logo_Army.jpg')} style={{width: SIZE_LOGO / 3 * 2, height: SIZE_LOGO / 3 * 2}}/>
						</base.Form>
					</base.Form>
					<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
						<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>이름</base.Text>
						<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{this.state.name}</base.Text>
					</base.Form>
					<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
						<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>ID</base.Text>
						<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{this.state.srvno}</base.Text>
					</base.Form>
					<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
						<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>직급</base.Text>
						<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{this.state.rank}</base.Text>
					</base.Form>
					<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
						<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>소속</base.Text>
						<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>제32보병사단 {this.state.unit}</base.Text>
					</base.Form>
					<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
						<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>직책</base.Text>
						<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{this.state.position}</base.Text>
					</base.Form>
					<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
						<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>연락처</base.Text>
						<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{this.state.phone}</base.Text>
					</base.Form>
					<base.Form style={{ width:'100%', flexDirection: 'row', alignItems: 'flex-start',}}>
						<base.Text style={{flex: 1, color: 'black', margin: 10, fontSize: SIZE_FONT}}>기기정보</base.Text>
						<base.Text style={{flex: 3, fontFamily:'Nanum', margin: 10, fontSize: SIZE_FONT}}>{this.state.device_id}</base.Text>
					</base.Form>		
				</base.Content>
			</base.Container>
		);
	}
}