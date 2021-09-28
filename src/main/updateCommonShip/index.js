import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions } from 'react-native';
import * as base from 'native-base';
import { Picker } from 'native-base';
import { KindsOfShip } from '../../kindsOfData/kindsOfShip';
import { KindsOfRegion } from '../../kindsOfData/kindsOfRegion';
import Loading from '../../utils/loading';

import { connect } from 'react-redux'
import { loadDetailCommonShip, updateDetailCommonShip, resetDetailCommonShip } from '../../redux/detailCommonShip/action';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_FONT = Dimensions.get('screen').height * 0.02

const UpdateCommonShip = (props) => {
	const [name, set_name] = useState(props.detailCommonShip.name)
	const [code, set_code] = useState(props.detailCommonShip.code)
	const [types, set_types] = useState(props.detailCommonShip.types)
	const [region, set_region] = useState(props.detailCommonShip.region)
	const [port, set_port] = useState(props.detailCommonShip.port)
	const [tons, set_tons] = useState(props.detailCommonShip.tons)
	const [size, set_size] = useState(props.detailCommonShip.size)

	const [is_ais, set_is_ais] = useState(props.detailCommonShip.is_ais)
	const [is_vpass, set_is_vpass] = useState(props.detailCommonShip.is_vpass)
	const [is_vhf, set_is_vhf] = useState(props.detailCommonShip.is_vhf)
	const [is_ff, set_is_ff] = useState(props.detailCommonShip.is_ff)

	const checkAIS = () => { (is_ais == true) ? set_is_ais(false) : set_is_ais(true) }
	const checkVPASS = () => { (is_vpass == true) ? set_is_vpass(false) : set_is_vpass(true) }
	const checkVHF = () => { (is_vhf == true) ? set_is_vhf(false) : set_is_vhf(true) }
	const checkFF = () => { (is_ff == true) ? set_is_ff(false) : set_is_ff(true) }

	const updateDetail = () => {
		Alert.alert(
			"선박확인체계 알림",
			"수정된 정보를 저장하시겠습니까?",
			[
				{
					text: "예",
					onPress: () =>
					{
						props.updateDetailCommonShip(props.token, props.detailCommonShip.id, name, types, code, tons, size, is_ais, is_vhf, is_vpass, is_ff, region, port)
						props.navigation.pop()
						Alert.alert(
							'선박확인체계 알림',
							'수정이 완료되었습니다.',
						)
					},
				},
				{ 
					text: "아니오"
				}
			]
		)
	}
	return (
		<base.Root>
			<base.Container>
				<base.Header style={{backgroundColor: 'white'}}>
					<base.Left>
						<base.Button transparent onPress={() => props.navigation.goBack()}>
							<base.Icon name='arrow-back' style={{color: 'black'}}/>
						</base.Button>
					</base.Left>
					<base.Right>
					</base.Right>
				</base.Header>
				<base.Content>
					{/* <Loading visible={this.state.loadingVisible} initialRoute={false} onPress={()=>this.props.navigation.goBack()}/> */}
					<base.Form style={{padding: 10,}}>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>선박정보 수정</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey',}}>아래의 정보를 수정해주시기 바랍니다.</base.Text>
					</base.Form>
					<base.Form>
						<base.Form style={{marginVertical: 15}}>
							<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
								<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박명</base.Text>
								<base.Input
									value={name}
									onChangeText={set_name}
									style={{fontFamily:'Nanum', fontSize: SIZE_FONT}}
									placeholderStyle={{fontFamily:'Nanum'}}
									/>
							</base.Item>
						</base.Form>
						<base.Form style={{marginVertical: 15}}>
							<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
								<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>등록번호</base.Text>
								<base.Input
									value={code}
									onChangeText={set_code}
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
									key={Math.random()}
									selectedValue={types}
									style={{height: 50, width: '100%'}}
									onValueChange={set_types}>
									{ KindsOfShip.map((data)=>{ return <Picker.Item label={data.value} value={data.value} /> }) }
								</Picker>							
							</base.Item>							
						</base.Form>
			
						<base.Form style={{marginHorizontal: 10,}}>
							<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start',}}>
								<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start', padding: 10}}>식별장치</base.Text>
								<base.ListItem style={{width: '100%'}}>
									<base.CheckBox checked={is_ais} color="#006eee" onPress={() => checkAIS()}/>
									<base.Body><base.Text style={{fontSize: SIZE_FONT}}>AIS</base.Text></base.Body>
									<base.CheckBox checked={is_vpass} color="#006eee" onPress={() => checkVPASS()}/>
									<base.Body><base.Text style={{fontSize: SIZE_FONT}}>V-Pass</base.Text></base.Body>
								</base.ListItem>
								<base.ListItem style={{width: '100%'}}>
									<base.CheckBox checked={is_vhf} color="#006eee" onPress={() => checkVHF()}/>
									<base.Body><base.Text style={{fontSize: SIZE_FONT}}>VHF-DSC</base.Text></base.Body>
									<base.CheckBox checked={is_ff} color="#006eee" onPress={() => checkFF()}/>
									<base.Body><base.Text style={{fontSize: SIZE_FONT}}>FF-GPS</base.Text></base.Body>
								</base.ListItem>
							</base.Item>
						</base.Form>
						
						<base.Form style={{marginVertical: 15}}>
							<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
								<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박길이</base.Text>
								<base.Input
									value={size}
									onChangeText={set_size}
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
									value={tons}
									onChangeText={set_tons}
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
									key={Math.random()}
									selectedValue={region}
									style={{height: 50, width: '100%'}}
									onValueChange={set_region}>
									{ KindsOfRegion.map((data)=>{ return <Picker.Item label={data.value} value={data.value} /> }) }
								</Picker>							
							</base.Item>							
						</base.Form>
						<base.Form style={{marginVertical: 15}}>
							<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
								<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>정박위치</base.Text>
								<base.Input
									value={port}
									placeholder="정박된 항구나 포구를 입력하세요"
									onChangeText={set_port}
									style={{fontFamily:'Nanum', fontSize: SIZE_FONT}}
									placeholderStyle={{fontFamily:'Nanum'}}
									/>
							</base.Item>
						</base.Form>
						<base.Button block onPress={updateDetail} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6,
							marginVertical: 20,}}>
								<base.Text style={{color: 'black'}}>수정하기</base.Text>
						</base.Button>
					</base.Form>
				</base.Content>
			<StatusBar hidden/>
			</base.Container>
		</base.Root>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.userInfo.token,
		detailCommonShip: state.detailCommonShip
	}
}

const mapDispatchToProps = {
	loadDetailCommonShip: (token, id) => loadDetailCommonShip(token, id),
	updateDetailCommonShip: (token, id, name, types, code, tons, size, is_ais, is_vhf, is_vpass, is_ff, region, port) => updateDetailCommonShip(token, id, name, types, code, tons, size, is_ais, is_vhf, is_vpass, is_ff, region, port),
	resetDetailCommonShip: () => resetDetailCommonShip(),

}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCommonShip)