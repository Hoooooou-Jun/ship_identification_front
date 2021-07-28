import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { FlatList, Dimensions,  Alert} from 'react-native';
import * as base from 'native-base';
import { getToken } from '../../utils/getToken';
import { requestCommonShipGallery, requestTrainImage } from '../../utils/shipInfoRequest';
import ShipImage from './shipImage';
import { requestDomain } from '../../utils/domain';
import Loading from '../../utils/loading';

const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_FONT = Dimensions.get('screen').height * 0.017
const SIZE_BUTTON = Dimensions.get('screen').height * 0.013
const SIZE_BUTTONWIDTH = Dimensions.get('screen').height * 0.06
const SIZE_BUTTONHEIGHT = Dimensions.get('screen').height * 0.026
export default class TrainCommonShipGallery extends Component{
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			data: [],
			loadingVisible: true,
            trainRequest: [],
			trainImageLen: 0,
		};
		this.showCommonShipGallery = this.showCommonShipGallery(this);
	}
	
	componentDidMount = () => {
		Alert.alert(
			'AI학습요청 시 주의사항',
			'1. 다각도로 촬영된 선박 사진을 요청해주시기 바랍니다.\n2. 최소 30장 이상의 선박 사진을 요청해주시기 바랍니다.\n3. 사진에 선박이 있는지 확인해주시기 바랍니다.\n4. 학습 요청 시 이전에 요청한 선박 사진도 재요청이 가능합니다.'
			
		)
	}

    showCommonShipGallery() {
		getToken().then((token) => {
			this.setState({
				id: this.props.navigation.getParam('id'),
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
    
    checkTrainImage = (data) => {
        const idx = this.state.trainRequest.indexOf(data);
        if(idx === -1) {
			const copy_list = this.state.trainRequest.concat(data)
            this.setState({trainRequest: copy_list, trainImageLen: copy_list.length});
        } else {
            let copy_list = this.state.trainRequest;
            copy_list.splice(idx, 1);
            this.setState({trainRequest: copy_list, trainImageLen: copy_list.length});
        }
    }

	/* checkTrainImageAll = () => {
		const idx = Object.values(this.state.data).map(item => item.id)
		this.setState({trainRequest: idx, trainImageLen: idx.length})
		for( let i = 0; i < idx.length; i++ )
		{
			this.checkTrainImage(idx[i])
		}
	} */

    requestTrainImage = () => {
		if(this.state.trainRequest.length < 30) {
			Alert.alert(
				'선박확인체계 알림',
				'30장 이상의 사진을 선택해주시기 바랍니다.'
			)
		} else{
			getToken().then((token) => {
				requestTrainImage(token, this.state.id, this.state.trainRequest).then((res) => {
					if(res.status == 200) {
						this.props.navigation.popToTop();
						this.props.navigation.navigate("DetailCommonShip", {id: this.state.id});
						Alert.alert(
							'선박확인체계 알림',
							'AI학습요청이 완료되었습니다.'
						);
					}
				})
			});
		}
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
                        <base.Button transparent onPress={this.requestTrainImage}>
							<base.Form style={{}}>
								<base.Text style={{color: 'skyblue', fontSize: SIZE_FONT}}>요청하기</base.Text>
							</base.Form>			
						</base.Button>
					</base.Right>
				</base.Header>
				<base.Header style={{ width: '100%', height: 30, backgroundColor: 'white', borderRadius: 30}}>
							<base.Title style={{ color: 'black', marginLeft: 4 }}>
                            	선택된 사진 개수 : {this.state.trainImageLen}장
                        	</base.Title>
						<base.Right>
							{/*<base.Form style={{ backgroundColor: 'grey', borderRadius: 10, height: SIZE_BUTTONHEIGHT, width: SIZE_BUTTONWIDTH, justifyContent: 'center', alignItems: 'center' }}>
								<base.Text onPress={ this.checkTrainImageAll } style={{color: 'white', fontSize: SIZE_BUTTON}}>전체 선택</base.Text>
							</base.Form>*/}
						</base.Right>
				</base.Header>
				<base.Content>
					<Loading visible={this.state.loadingVisible} initialRoute={false} onPress={()=>this.props.navigation.goBack()}/>
					<base.Form style={{width: '100%', justifyContent: 'center'}}>
						<FlatList
							style={{ height: '100%', width: '100%' }}
							data={this.state.data}
							numColumns={3}
							renderItem={({item, index}) => <ShipImage ship={item} idx={index + 1} onPress={()=>this.checkTrainImage(item.id)}/>}
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
