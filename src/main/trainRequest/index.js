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
			'선박확인체계 알림',
			'※주의 사항※\n1. 다양한 측면을 찍어주세요.\n2. 사진은 최소 30장 이상 요청해주세요.\n3. 사진에 선박이 있는지 확인해주세요.\n4. 학습 요청 시 예전에 요청해주셨던 사진을 다시 보내주셔도 됩니다.'
			
		)
	}

    showCommonShipGallery(){
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

    requestTrainImage = () => {
		if(this.state.trainRequest.length < 30) {
			Alert.alert(
				'선박확인체계 알림',
				'사진은 최소 30장 이상 선택해주세요.'
			)
		} else{
			getToken().then((token) => {
				requestTrainImage(token, this.state.id, this.state.trainRequest).then((res) => {
					if(res.status == 200) {
						this.props.navigation.popToTop();
						this.props.navigation.navigate("DetailCommonShip", {id: this.state.id});
						Alert.alert(
							'선박확인체계 알림',
							'학습 요청이 완료되었습니다.\n학습 완료 시점은 금일부터 최소 일주일입니다.\n선박 사진 확인 후 학습이 불가능할 수 있습니다.'
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
                        <base.Button onPress={this.requestTrainImage}>
                            <base.Text>
                                요청
                            </base.Text>
                        </base.Button>
					</base.Right>
				</base.Header>
				<base.Content>
					<Loading visible={this.state.loadingVisible} initialRoute={false} onPress={()=>this.props.navigation.goBack()}/>
					<base.Form style={{width: '100%', justifyContent: 'center'}}>
                        <base.Header>
                        <base.Body>
                            <base.Title>
							다양한 측면, 30장 이상, 선박 유무 확인
                            </base.Title>
							<base.Title>
                            	선택된 이미지 수: {this.state.trainImageLen}
                        	</base.Title>
                        </base.Body>
                        </base.Header>
						<FlatList
							sytle={{flex:1, height: 250, justifyContent: 'center', width: '100%'}}
							data={this.state.data}
							numColumns={3}
							renderItem={({item, index}) => <ShipImage ship={item} idx={index + 1}
								onPress={()=>this.checkTrainImage(item.id)}/>}
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
