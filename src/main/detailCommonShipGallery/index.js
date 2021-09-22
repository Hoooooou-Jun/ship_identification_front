import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, Dimensions} from 'react-native';
import * as base from 'native-base';
import ShowPlusDetail from './showPlusDetail';
import { requestDomain } from '../../utils/domain';
import Loading from '../../utils/loading';

import { connect } from 'react-redux';

const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02

const DetailCommonShipGallery = (props) => {
	const [id, set_id] = useState(props.detailCommonShip.id)
	const [main_img_id, set_main_img_id] = useState(props.detailCommonShip.main_img_id)
	const [name, set_name] = useState(props.detailCommonShip.name)
	const [data, set_data] = useState(props.galleryCommonShip.gallery)
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
				{/* <Loading visible={this.state.loadingVisible} initialRoute={false} onPress={()=>this.props.navigation.goBack()}/> */}
				<base.Form style={{width: '100%', justifyContent: 'center'}}>
					<base.Button block onPress={() => props.navigation.navigate('RegisterCommonShipImages',{id: id, name: name})} 
					style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
						<base.Text style={{color: 'black'}}>사진 추가등록하기</base.Text>
					</base.Button>
					<FlatList
						sytle={{flex:1, height: 250, justifyContent: 'center', width: '100%'}}
						data={data}
						numColumns={3}
						renderItem={({item, index}) => <ShowPlusDetail ship={item} idx={index + 1}
							onPress={() => props.navigation.navigate('ShipImgViewer',
							{address: requestDomain + item.img, flag: 'Normal', id: id, img_id: item.id, index: index + 1, main_img_id: main_img_id})}/>}
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
		detailCommonShip: state.detailCommonShip,
		galleryCommonShip: state.galleryCommonShip,
	}
}

export default connect(mapStateToProps)(DetailCommonShipGallery)