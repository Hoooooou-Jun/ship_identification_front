import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { FlatList, Dimensions, Alert} from 'react-native';
import * as base from 'native-base';
import { getToken } from '../../utils/getToken';
import { requestCommonShipGallery, updateCommonShipMImage } from '../../utils/shipInfoRequest';
import ShowPlusDetail from './showPlusDetail';
import Loading from '../../utils/loading';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02

export default class UpdateCommonShipMImage extends Component{
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			main_img_id: '',
			data: [],
			loadingVisible: true,
		};
		this.showCommonShipGallery = this.showCommonShipGallery(this);
		this.updateMImage = this.updateMImage.bind(this);
	}
	showCommonShipGallery(){
		getToken().then((token) => {
			this.setState({
				id: this.props.navigation.getParam('id'),
				main_img_id: this.props.navigation.getParam('main_img_id'),
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
	updateMImage(img_id, index){
		Alert.alert(
			'선박확인체계 알림',
			index + '번째 사진으로 대표사진을 수정하시겠습니까?',
			[{
				text: "네",
				onPress: () => getToken().then((token) => {
					this.setState({loadingVisible: true})
					if(img_id != this.state.main_img_id){
						updateCommonShipMImage(token, img_id).then((response) => {
							this.setState({loadingVisible: false})
							Alert.alert(
								'선박확인체계 알림',
								index + '번째 사진으로 대표사진이 수정되었습니다',
							)
							this.props.navigation.popToTop();
							this.props.navigation.navigate('DetailCommonShip',{id: this.state.id})
						})
					}
					else{
						this.setState({loadingVisible: false})
						Alert.alert(
							'선박확인체계 알림',
							'기존 대표사진과 동일한 사진입니다',
						)
					}
				})
				},{
				text: "아니오",
				onPress: () => console.log("Cancel Pressed"),
			}]
		);
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
					<base.Form style={{padding: 10,}}>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>대표사진 설정</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey',}}>대표사진으로 설정할 사진을 선택하세요</base.Text>
					</base.Form>
					<base.Form style={{width: '100%', justifyContent: 'center'}}>
						<FlatList
							sytle={{flex:1, height: 250, justifyContent: 'center', width: '100%'}}
							data={this.state.data}
							numColumns={3}
							renderItem={({item, index}) => <ShowPlusDetail ship={item} idx={index + 1} main_img_id={this.state.main_img_id}
								onPress={()=>this.updateMImage(item.id, index + 1)}/>}
						/>
				</base.Form>
				</base.Content>				
			</base.Container>
		);
	}
}
