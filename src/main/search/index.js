import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import * as base from 'native-base';
import { Picker } from '@react-native-picker/picker';
import { KindsOfPort } from '../../kindsOfData/kindsOfPort';
import { KindsOfShip } from '../../kindsOfData/kindsOfShip';
import { KindsOfRegion } from '../../kindsOfData/kindsOfRegion';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_FONT = Dimensions.get('screen').height * 0.02
const SIZE_SUBFONT = Dimensions.get('screen').height * 0.015
export default class Search extends Component{
	constructor(props) {
		super(props);
		this.state = {	
			flag: 'Normal',
			id: '',
			types: '', region: '',
			name: '', code: '',  tons: '', size: '', 
			is_ais: false, is_vpass: false, is_vhf: false, is_ff: false,

			latitude: '0', longitude: '0', info: '',
		};
		this.normalInput = this.normalInput.bind(this);
		this.wastedInput = this.wastedInput.bind(this);
		
		this.searchShip = this.searchShip.bind(this);

		this.checkAIS = this.checkAIS.bind(this);
		this.checkVPASS = this.checkVPASS.bind(this);
		this.checkVHF = this.checkVHF.bind(this);
		this.checkFF = this.checkFF.bind(this);
	}
	checkAIS(){ (this.state.is_ais == true) ? this.setState({is_ais: false}) : this.setState({is_ais: true}) }
	checkVPASS(){ (this.state.is_vpass == true) ? this.setState({is_vpass: false}) : this.setState({is_vpass: true}) }
	checkVHF(){ (this.state.is_vhf == true) ? this.setState({is_vhf: false}) : this.setState({is_vhf: true}) }
	checkFF(){ (this.state.is_ff == true) ? this.setState({is_ff: false}) : this.setState({is_ff: true}) }
	normalInput = () => {
		return(
			<base.Form>
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박명</base.Text>
						<base.Input
							placeholder="선박명을 입력하세요"
							onChangeText={(name) => this.setState({name})}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum'}}
							/>
					</base.Item>
				</base.Form>

				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>등록번호</base.Text>
						<base.Input
							placeholder="등록번호 14자리를 입력하세요"
							onChangeText={(code) => this.setState({code})}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum'}}
							keyboardType="number-pad"/>
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
								<base.Body><base.Text style={{fontSize: SIZE_SUBFONT}}>AIS</base.Text></base.Body>
								<base.CheckBox checked={this.state.is_vpass} color="#006eee" onPress={() => this.checkVPASS()}/>
								<base.Body><base.Text style={{fontSize: SIZE_SUBFONT}}>V-Pass</base.Text></base.Body>
						</base.ListItem>
						<base.ListItem style={{width: '100%'}}>
								<base.CheckBox checked={this.state.is_vhf} color="#006eee" onPress={() => this.checkVHF()}/>
								<base.Body><base.Text style={{fontSize: SIZE_SUBFONT}}>VHF-DSC</base.Text></base.Body>
								<base.CheckBox checked={this.state.is_ff} color="#006eee" onPress={() => this.checkFF()}/>
								<base.Body><base.Text style={{fontSize: SIZE_SUBFONT}}>FF-GPS</base.Text></base.Body>
						</base.ListItem>
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
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>정착항구</base.Text>
						<Picker
							selectedValue={this.state.region}
							style={{height: 50, width: '100%'}}
							onValueChange={(itemValue) => this.setState({region: itemValue})}>
							{ KindsOfPort.map((data)=>{ return <Picker.Item label={data.value} value={data.value} /> }) }
						</Picker>							
					</base.Item>							
				</base.Form>
				<base.Button block onPress={this.searchShip} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
					<base.Text style={{color: 'black'}}>검색하기</base.Text>
				</base.Button>
			</base.Form>
		)
	}
	wastedInput = () => {
		return(
			<base.Form>
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>관리번호</base.Text>
						<base.Input
							placeholder="관리번호를 입력하세요"
							onChangeText={(id) => this.setState({id})}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum'}}
							keyboardType="number-pad"/>
					</base.Item>
				</base.Form>
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>세부사항 키워드</base.Text>
						<base.Input
							placeholder="세부사항의 키워드를 입력하세요"
							onChangeText={(info) => this.setState({info})}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum'}}
							/>
					</base.Item>
				</base.Form>				
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박종류</base.Text>
						<Picker
							selectedValue={this.state.types}
							style={{height: 50, width: '100%'}}
							onValueChange={(itemValue) => this.setState({types: itemValue}) }>
							{ KindsOfShip.map((data)=>{ return <Picker.Item label={data.value} value={data.value} /> }) }
						</Picker>							
					</base.Item>							
				</base.Form>
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>위치지역</base.Text>
						<Picker
							selectedValue={this.state.region}
							style={{height: 50, width: '100%'}}
							onValueChange={(itemValue) => this.setState({region: itemValue}) }>
							{ KindsOfRegion.map((data)=>{ return <Picker.Item label={data.value} value={data.value} /> }) }
						</Picker>							
					</base.Item>							
				</base.Form>
				<base.Button block onPress={this.searchShip} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
					<base.Text style={{color: 'black'}}>검색하기</base.Text>
				</base.Button>
			</base.Form>
		)
	}
	searchShip(){
		if(this.state.flag == 'Normal') {
			this.props.navigation.navigate('SearchResult', {				
				flag: this.state.flag,
				name: this.state.name,
				types: this.state.types,
				code: this.state.code,
				tons: this.state.tons,
				size: this.state.size,
				is_ais: this.state.is_ais,
				is_vpass: this.state.is_vpass,
				is_vhf: this.state.is_vhf,
				is_ff: this.state.is_ff,
				region: this.state.region,
				port: this.state.region,
			})
		}
		else{ // flag == 'Wasted'{
			this.props.navigation.navigate('SearchResult', {
				flag: this.state.flag,
				id: this.state.id,
				region: this.state.region,
				types: this.state.types,
				info: this.state.info,
			})
		}
	}
	render(){
		let detailInput
		if(this.state.flag == 'Normal') {
			detailInput = this.normalInput()
		}
		else if(this.state.flag == 'Wasted') {
			detailInput = this.wastedInput()
		}
		return(
			<base.Container>
				<base.Header style={{backgroundColor: 'white'}}>
					<base.Left style={{flex: 1,}}>
						<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
							<base.Icon name='arrow-back' style={{color: 'black'}}/>
						</base.Button>
					</base.Left>
					<base.Form style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center',}}>
						<base.Segment style={{backgroundColor: '#006eee', borderRadius: 10, width: '100%'}}>
							<base.Button first active={this.state.flag == 'Normal'} onPress={() => this.setState({flag: 'Normal'})}>
								<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}>일반선박</base.Text>
							</base.Button>
							<base.Button last active={this.state.flag == 'Wasted'} onPress={() => this.setState({flag: 'Wasted'})}>
								<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}>유기선박</base.Text>
							</base.Button>
						</base.Segment>
					</base.Form>
				</base.Header>
				<base.Content>
					<base.Form style={{padding: 10,}}>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>선박검색</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey',}}>검색할 선박의 정보를 입력하세요</base.Text>
					</base.Form>
					{detailInput}
				</base.Content>
			</base.Container>
		);
	}
}