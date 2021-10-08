import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, Dimensions, Alert} from 'react-native';
import * as base from 'native-base';
import ShowPlusDetail from './showPlusDetail';
import Loading from '../../utils/loading';

import { connect } from 'react-redux';
import { updateWastedShipMainImage } from '../../redux/detailWastedShip/action'

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02

const UpdateWastedShipMImage = (props) => {
	const [id, set_id] = useState(props.navigation.getParam('id'))
	const [main_img_id, set_main_img_id] = useState(props.navigation.getParam('main_img_id'))
	const [data, set_data] = useState(props.galleryWastedShip.gallery)

	const updateMImage = (img_id, index) => {
		Alert.alert(
			'선박확인체계 알림',
			index + '번째 사진으로 대표사진을 수정하시겠습니까?',
			[{
				text: "네",
				onPress: () => {
					if(img_id != main_img_id) {
						props.updateWastedShipMainImage(props.token, img_id, id)
						Alert.alert(
							'선박확인체계 알림',
							index + '번째 사진으로 대표사진이 수정되었습니다',
						)
						props.navigation.navigate('DetailWastedShip',{id: id})
					}
					else {
						Alert.alert(
							'선박확인체계 알림',
							'기존 대표사진과 동일한 사진입니다',
						)
					}
				}
				},{
				text: "아니오",
				onPress: () => console.log("Cancel Pressed"),
			}]
		);
	}

	return (
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
				<base.Form style={{padding: 10,}}>
					<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>대표사진 설정</base.Text>
					<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey',}}>대표사진으로 설정할 사진을 선택하세요</base.Text>
				</base.Form>			
				<base.Form>
					<FlatList
						style={{flex:1, height: '100%', width: '100%'}}
						data={data}
						numColumns={3}
						renderItem={({item, index}) => <ShowPlusDetail ship={item} idx={index + 1} main_img_id={main_img_id}
						onPress={() => updateMImage(item.id, index + 1)}/>}
					/>
				</base.Form>
			</base.Content>				
		</base.Container>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.userInfo.token,
		galleryWastedShip: state.galleryWastedShip,
	}
}

const mapDispatchToProps = {
	updateWastedShipMainImage: (token, img_id, id) => updateWastedShipMainImage(token, img_id, id)
}


export default connect(mapStateToProps, mapDispatchToProps)(UpdateWastedShipMImage)