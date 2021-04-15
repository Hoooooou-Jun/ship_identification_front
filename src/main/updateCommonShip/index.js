import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Alert, Dimensions } from 'react-native';
import * as base from 'native-base';
import { updateCommonShipDetail, } from '../../utils/shipInfoRequest';
import { Picker } from 'native-base';
import { getToken } from '../../utils/getToken';
import { requestCommonShipDetail } from '../../utils/shipInfoRequest';
import { KindsOfShip } from '../../kindsOfData/kindsOfShip';
import { KindsOfRegion } from '../../kindsOfData/kindsOfRegion';
import Loading from '../../utils/loading';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_FONT = Dimensions.get('screen').height * 0.02

export default class UpdateCommonShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			name: '', types: '',
			code: '',  tons: '', size: '', region: '',
			is_ais: false, is_vpass: false, is_vhf: false, is_ff: false,

			tmp_name: '', tmp_code: '', tmp_tons: '', tmp_size: '', tmp_region: '',
			loadingVisible: true,
		};
		this.showCommonShipDetail = this.showCommonShipDetail(this);
	
		this.checkAIS = this.checkAIS.bind(this);
		this.checkVPASS = this.checkVPASS.bind(this);
		this.checkVHF = this.checkVHF.bind(this);
		this.checkFF = this.checkFF.bind(this);

		this.updateDetail = this.updateDetail.bind(this);
	}
	checkAIS(){ (this.state.is_ais == true) ? this.setState({is_ais: false}) : this.setState({is_ais: true}) }
	checkVPASS(){ (this.state.is_vpass == true) ? this.setState({is_vpass: false}) : this.setState({is_vpass: true}) }
	checkVHF(){ (this.state.is_vhf == true) ? this.setState({is_vhf: false}) : this.setState({is_vhf: true}) }
	checkFF(){ (this.state.is_ff == true) ? this.setState({is_ff: false}) : this.setState({is_ff: true}) }
	showCommonShipDetail(){
		getToken().then((token) => {
			const id = this.props.navigation.getParam('id');
			requestCommonShipDetail(token, id).then((response) =>{
				if(response.status == 200){
					this.setState({
						id: id,
						name: response.data.data.name,
						code: response.data.data.code,
						types: response.data.data.types,
						is_ais: response.data.data.is_ais,
						is_vpass: response.data.data.is_vpass,
						is_vhf: response.data.data.is_vhf,
						is_ff: response.data.data.is_ff,
						region: response.data.data.region, 
						port: response.data.data.port,
						tons: response.data.data.tons,
						size: response.data.data.size,
						regit_date: response.data.data.regit_date,
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
			updateCommonShipDetail(token, this.state.id, this.state.name, this.state.types, this.state.code,
				this.state.tons, this.state.size, this.state.is_ais, this.state.is_vhf, this.state.is_vpass,
				this.state.is_ff, this.state.region, '정보없음').then((response) =>{
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
									<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박명</base.Text>
									<base.Input
										value={this.state.name}
										onChangeText={(name) => this.setState({name})}
										style={{fontFamily:'Nanum', fontSize: SIZE_FONT}}
										placeholderStyle={{fontFamily:'Nanum'}}
										/>
								</base.Item>
							</base.Form>
							<base.Form style={{marginVertical: 15}}>
								<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
									<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>등록번호</base.Text>
									<base.Input
										value={this.state.code}
										onChangeText={(code) => this.setState({code})}
										style={{fontFamily:'Nanum', fontSize: SIZE_FONT}}
										placeholderStyle={{fontFamily:'Nanum'}}
										keyboardType="number-pad"
										/>
								</base.Item>
							</base.Form>
						
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
				
							<base.Form style={{marginHorizontal: 10,}}>
								<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start',}}>
									<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start', padding: 10}}>식별장치</base.Text>
									<base.ListItem style={{width: '100%'}}>
										<base.CheckBox checked={this.state.is_ais} color="#006eee" onPress={() => this.checkAIS()}/>
										<base.Body><base.Text style={{fontSize: SIZE_FONT}}>AIS</base.Text></base.Body>
										<base.CheckBox checked={this.state.is_vpass} color="#006eee" onPress={() => this.checkVPASS()}/>
										<base.Body><base.Text style={{fontSize: SIZE_FONT}}>V-Pass</base.Text></base.Body>
									</base.ListItem>
									<base.ListItem style={{width: '100%'}}>
										<base.CheckBox checked={this.state.is_vhf} color="#006eee" onPress={() => this.checkVHF()}/>
										<base.Body><base.Text style={{fontSize: SIZE_FONT}}>VHF-DSC</base.Text></base.Body>
										<base.CheckBox checked={this.state.is_ff} color="#006eee" onPress={() => this.checkFF()}/>
										<base.Body><base.Text style={{fontSize: SIZE_FONT}}>FF-GPS</base.Text></base.Body>
									</base.ListItem>
								</base.Item>
							</base.Form>
							
							<base.Form style={{marginVertical: 15}}>
								<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
									<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박길이</base.Text>
									<base.Input
										value={this.state.size}
										onChangeText={(size) => this.setState({size})}
										style={{fontFamily:'Nanum', fontSize: SIZE_FONT}}
										placeholderStyle={{fontFamily:'Nanum'}}
										keyboardType="number-pad"
										/>
								</base.Item>
							</base.Form>
							<base.Form style={{marginVertical: 15}}>
								<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
									<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박무게</base.Text>
									<base.Input
										value={this.state.tons}
										onChangeText={(tons) => this.setState({tons})}
										style={{fontFamily:'Nanum', fontSize: SIZE_FONT}}
										placeholderStyle={{fontFamily:'Nanum'}}
										keyboardType="number-pad"
										/>
								</base.Item>
							</base.Form>
							<base.Form style={{marginVertical: 15}}>
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
							<base.Form style={{marginVertical: 15}}>
								<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
									<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>정박위치</base.Text>
									<base.Input
										placeholder="정박된 항구나 포구를 입력하세요"
										onChangeText={(port) => this.setState({port})}
										style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
										placeholderStyle={{fontFamily:'Nanum'}}
										/>
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