import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { Alert, Dimensions } from 'react-native';
import * as base from 'native-base';
import { Picker } from 'native-base';
import { KindsOfShip } from '../../kindsOfData/kindsOfShip';
import { KindsOfRegion } from '../../kindsOfData/kindsOfRegion';
import Loading from '../../utils/loading';

import { connect } from 'react-redux'
import { loadDetailWastedShip, updateDetailWastedShip, resetDetailWastedShip } from '../../redux/detailWastedShip/action';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_FONT = Dimensions.get('screen').height * 0.02


const UpdateWastedShip = (props) => {
	const [id, set_id] = useState(props.navigation.getParam('id'))
	const [info, set_info] = useState(props.detailWastedShip.info)
	const [latitude, set_latitude] = useState(props.detailWastedShip.latitude)
	const [longitude, set_longitude] = useState(props.detailWastedShip.longitude)
	const [types, set_types] = useState(props.detailWastedShip.types)
	const [region, set_region] = useState(props.detailWastedShip.region)
	const [tmp_info, set_tmp_info] = useState('')

	const updateDetail = () => {
		Alert.alert(
			"선박확인체계 알림",
			"수정된 정보를 저장하시겠습니까?",
			[
				{
					text: "예",
					onPress: () =>
					{
						let newInfo = (tmp_info == '' ? info : tmp_info)
						props.updateDetailWastedShip(props.token, id, newInfo, latitude, longitude, types, region)
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
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>선박정보수정</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey',}}>아래의 선박정보를 수정해주세요</base.Text>
					</base.Form>
					<base.Form>
						<base.Form style={{marginVertical: 15}}>
							<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
								<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박종류</base.Text>
								<Picker
									selectedValue={types}
									style={{height: 50, width: '100%'}}
									onValueChange={(itemValue) => set_types(itemValue)}>
									{ KindsOfShip.map((data)=>{ return <Picker.Item key={data.value.toString()} label={data.value} value={data.value} /> }) }
								</Picker>							
							</base.Item>							
						</base.Form>

						<base.Form style={{marginVertical: 15, paddingHorizontal: 10}}>
								<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>세부정보 및 특이사항</base.Text>
								<base.Textarea rowSpan={5} bordered
									onChangeText={set_info} value={info}
									style={{fontFamily: 'Nanum', marginTop:10, marginBottom: 10, borderRadius: 10, padding: 10, fontSize: SIZE_FONT}}/>
						</base.Form>

						<base.Form>
							<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
								<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>위치지역</base.Text>
								<Picker
									selectedValue={region}
									style={{height: 50, width: '100%'}}
									onValueChange={(itemValue) => set_region(itemValue)}>
									{ KindsOfRegion.map((data)=>{ return <Picker.Item key={data.value.toString()} label={data.value} value={data.value} /> }) }
								</Picker>							
							</base.Item>							
						</base.Form>
						<base.Button block onPress={updateDetail} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6, marginVertical: 20,}}>
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
		detailWastedShip: state.detailWastedShip
	}
}

const mapDispatchToProps = {
	loadDetailWastedShip: (token, id) => loadDetailWastedShip(token, id),
	updateDetailWastedShip: (token, id, info, latitude, longitude, types, region) => updateDetailWastedShip(token, id, info, latitude, longitude, types, region),
	resetDetailWastedShip: () => resetDetailWastedShip(),

}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateWastedShip)