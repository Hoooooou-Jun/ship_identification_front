import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { FlatList, Dimensions} from 'react-native';
import * as base from 'native-base';
import { getToken } from '../../utils/getToken';
import { requestCommonShipGallery } from '../../utils/shipInfoRequest';
import ShowPlusDetail from './showPlusDetail';
import { requestDomain } from '../../utils/domain';
import Loading from '../../utils/loading';

const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02

export default class DetailCommonShipGallery extends Component{
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			main_img_id: '',
			name: '',
			data: [],
			loadingVisible: true,
		};
		this.showCommonShipGallery = this.showCommonShipGallery(this);
	}
	showCommonShipGallery(){
		getToken().then((token) => {
			this.setState({
				id: this.props.navigation.getParam('id'),
				main_img_id: this.props.navigation.getParam('main_img_id'),
				name: this.props.navigation.getParam('name')
			})
			requestCommonShipGallery(token, this.state.id).then((response) => {
				if(response.status == 200){
					this.setState({
						data: this.state.data.concat(response.data.data),
						loadingVisible: false,
					})
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
				<base.Content>
					<Loading visible={this.state.loadingVisible}/>
					<base.Form style={{width: '100%', justifyContent: 'center'}}>
						<base.Button block onPress={()=>this.props.navigation.navigate('RegisterCommonShipImages',{id: this.state.id, name: this.state.name})} 
						style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
							<base.Text style={{color: 'black'}}>사진 추가등록하기</base.Text>
						</base.Button>
						<FlatList
							sytle={{flex:1, height: 250, justifyContent: 'center', width: '100%'}}
							data={this.state.data}
							numColumns={3}
							renderItem={({item, index}) => <ShowPlusDetail ship={item} idx={index + 1}
								onPress={()=>this.props.navigation.navigate('ImgViewer',
								{address: requestDomain + item.img, flag: 'Normal', id: item.id, index: index + 1, main_img_id: this.state.main_img_id})}/>}
							ListEmptyComponent={
								<base.Form style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10,}}>
									<base.Text style={{fontSize: SIZE_SUBTITLE}}>추가사진이 없습니다</base.Text>
								</base.Form>
							}
						/>
				</base.Form>
				</base.Content>				
			</base.Container>
		);
	}
}
