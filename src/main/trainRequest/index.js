import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, Dimensions,  Alert} from 'react-native';
import * as base from 'native-base';
import ShipImage from './shipImage';
import { requestTrainImage } from '../../utils/shipInfoRequest';
import Loading from '../../utils/loading';

import { connect } from 'react-redux';

const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_FONT = Dimensions.get('screen').height * 0.017
const SIZE_BUTTON = Dimensions.get('screen').height * 0.013
const SIZE_BUTTONWIDTH = Dimensions.get('screen').height * 0.06
const SIZE_BUTTONHEIGHT = Dimensions.get('screen').height * 0.026

const TrainCommonShipGallery = (props) => {
	const [id, set_id] = useState(props.detailCommonShip.id)
	const [data, set_data] = useState(props.galleryCommonShip.gallery)
	const [trainRequest, set_trainRequest] = useState([])
	const [trainImageLen, set_trainImageLen] = useState(0)
	const [loadingVisible, set_loadingVisible] = useState(false)

	useEffect(() => {
		Alert.alert(
			'AI학습요청 시 주의사항',
			'1. 다각도로 촬영된 선박 사진을 요청해주시기 바랍니다.\n2. 최소 30장 이상의 선박 사진을 요청해주시기 바랍니다.\n3. 사진에 선박이 있는지 확인해주시기 바랍니다.\n4. 학습 요청 시 이전에 요청한 선박 사진도 재요청이 가능합니다.'
		)
	}, [])

    const checkTrainImage = (data) => {
        const idx = trainRequest.indexOf(data);
        if(idx === -1) {
			const copy_list = trainRequest.concat(data)
			set_trainRequest(copy_list)
			set_trainImageLen(copy_list.length)
        } else {
            const copy_list = trainRequest;
            copy_list.splice(idx, 1);
			set_trainRequest(copy_list)
			set_trainImageLen(copy_list.length)
        }
    }

    const requestTrain = () => {
		if(trainImageLen < 30) {
			Alert.alert(
				'선박확인체계 알림',
				'30장 이상의 사진을 선택해주시기 바랍니다.'
			)
		} else {
			set_loadingVisible(true)
			requestTrainImage(props.token, id, trainRequest).then((response) => {
				if(response.status == 200) {
					set_loadingVisible(false)
					props.navigation.navigate("DetailCommonShip", {id: id});
					Alert.alert(
						'선박확인체계 알림',
						'AI학습요청이 완료되었습니다.'
					);
				}
				else {
					console.log('error')
				}
			})
		}
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
					<base.Button transparent onPress={requestTrain}>
						<base.Form>
							<base.Text style={{color: 'skyblue', fontSize: SIZE_FONT}}>요청하기</base.Text>
						</base.Form>			
					</base.Button>
				</base.Right>
			</base.Header>
			<base.Header style={{ width: '100%', height: 30, backgroundColor: 'white', borderRadius: 30}}>
						<base.Title style={{ color: 'black', marginLeft: 4 }}>
							선택된 사진 개수 : {trainImageLen}장
						</base.Title>
					<base.Right>
					</base.Right>
			</base.Header>
			<base.Content>
				<Loading visible={loadingVisible} initialRoute={false} onPress={() => props.navigation.goBack()}/>
				<base.Form style={{width: '100%', justifyContent: 'center'}}>
					<FlatList
						style={{ height: '100%', width: '100%' }}
						data={data}
						numColumns={3}
						renderItem={({item, index}) => <ShipImage ship={item} idx={index + 1} onPress={() => checkTrainImage(item.id)}/>}
						ListEmptyComponent={
							<base.Form style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10,}}>
								<base.Text style={{fontSize: SIZE_SUBTITLE}}>추가사진이 없습니다</base.Text>
							</base.Form>
						}
					/>
				</base.Form>
			</base.Content>				
		</base.Container>
	)
}

const mapStateToProps = (state) => {
	return {
        token: state.userInfo.token,
		detailCommonShip: state.detailCommonShip,
		galleryCommonShip: state.galleryCommonShip,
	}
}

export default connect(mapStateToProps)(TrainCommonShipGallery)