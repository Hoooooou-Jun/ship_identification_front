import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base';
import { Modal, Alert } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { getToken } from '../../utils/getToken';
import { deleteCommonShipImage, deleteWastedShipImage, updateCommonShipMImage, updateWastedShipMImage } from '../../utils/shipInfoRequest';
import { requestPermission } from '../../utils/userInfoRequest';
const renderFunction = ({cancel, saveToLocal}) => {
    console.log(cancel) 
}
export default class ShipImgViewer extends Component{
	constructor(props) {
		super(props);
		this.state = {
            id: '',
            main_img_id: '',
            img_id: '',
            flag: '',
            index: '',
		};
        this.deleteShipImage = this.deleteShipImage.bind(this);
        this.updateShipMImage = this.updateShipMImage.bind(this);
	}
    componentDidMount(){
        this.setState({
            id: this.props.navigation.getParam('id'),
            img_id: this.props.navigation.getParam('img_id'),
            index: this.props.navigation.getParam('index'),
            flag: this.props.navigation.getParam('flag'),
            main_img_id: this.props.navigation.getParam('main_img_id'),
        })
    }
    deleteShipImage(){ 
		Alert.alert(
			'선박확인체계 알림',
			this.state.index + '번째 추가이미지를 삭제하시겠습니까?',
			[{
				text: "네",
				onPress: () => getToken().then((token) => {
                    requestPermission(token).then((response) => {
                        if(response.data.data.user_level > 1){
                            if(this.state.flag == 'Normal'){
                                deleteCommonShipImage(token, this.state.img_id).then((response)=>{
                                    console.log('일반선박 이미지 삭제 완료')
                                    Alert.alert(
                                        '선박확인체계 알림',
                                        this.state.index + '번째 추가이미지가 삭제되었습니다',
                                    )
                                    this.props.navigation.popToTop();
                                    this.props.navigation.navigate('DetailCommonShip',{id: this.state.id})
                                })
                            }
                            else{
                                deleteWastedShipImage(token, this.state.img_id).then((response)=>{
                                    console.log('유기선박 이미지 삭제 완료')
                                    Alert.alert(
                                        '선박확인체계 알림',
                                        this.state.index + '번째 추가이미지가 삭제되었습니다',
                                    )
                                    this.props.navigation.popToTop();
                                    this.props.navigation.navigate('DetailWastedShip',{id: this.state.id})
                                })
                            }
                        }
                        else{
                            Alert.alert(
                                '선박확인체계 알림',
                                '선박 추가이미지 삭제 권한이 없습니다',
                            )
                        }
                    })
                })
				},{
				text: "아니오",
				onPress: () => console.log("Cancel Pressed"),
			}]
		);
    }
    updateShipMImage(){
		Alert.alert(
			'선박확인체계 알림',
			this.state.index + '번째 사진으로 대표사진을 수정하시겠습니까?',
			[{
				text: "네",
				onPress: () => getToken().then((token) => {
                    requestPermission(token).then((response) => {
                        if(response.data.data.user_level > 1){
                            if(this.state.flag == 'Normal'){
                                if(this.state.img_id != this.state.main_img_id){
                                    updateCommonShipMImage(token, this.state.img_id).then((response) => {
                                        Alert.alert(
                                            '선박확인체계 알림',
                                            this.state.index + '번째 사진으로 대표사진이 수정되었습니다',
                                        )
                                        this.props.navigation.popToTop();
                                        this.props.navigation.navigate('DetailCommonShip',{id: this.state.id})
                                    })
                                }
                                else{
                                    Alert.alert(
                                        '선박확인체계 알림',
                                        '기존 대표사진과 동일한 사진입니다',
                                    )
                                }
                            }
                            else{
                                if(this.state.img_id != this.state.main_img_id){
                                    updateWastedShipMImage(token, this.state.img_id).then((response) => {
                                        Alert.alert(
                                            '선박확인체계 알림',
                                            this.state.index + '번째 사진으로 대표사진이 수정되었습니다',
                                        )
                                        this.props.navigation.popToTop();
                                        this.props.navigation.navigate('DetailWastedShip',{id: this.state.id})
                                    })
                                }
                                else{
                                    Alert.alert(
                                        '선박확인체계 알림',
                                        '기존 대표사진과 동일한 사진입니다',
                                    )
                                }
                            }
                        }
                        else{
							Alert.alert(
								'선박확인체계 알림',
								'대표사진 수정 권한이 없습니다',
							)
                        }
                    })
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
                <base.Content padder>
                    <Modal visible={true} transparent={true} >
                    <base.Form style={{flexDirection: 'column', height: 100}}> 
                            <base.Button style={{flex: 1, width: '100%', justifyContent: 'center', backgroundColor: 'white', height: 50, elevation: 6,}}
                                onPress={this.updateShipMImage}>
                                <base.Text style={{color: 'black'}}>대표사진 설정하기</base.Text>
                            </base.Button>
                            <base.Form style={{flexDirection: 'row'}}>                            
                                <base.Button style={{flex: 1, width: '100%', justifyContent: 'center', backgroundColor: 'white', height: 50,}}
                                    onPress={()=>this.deleteShipImage()}>
                                    <base.Text style={{color: 'black'}}>삭제하기</base.Text>
                                </base.Button>
                                <base.Button style={{flex: 1, width: '100%', justifyContent: 'center', backgroundColor: 'white', height: 50,}}
                                    onPress={()=>this.props.navigation.goBack()}>
                                    <base.Text style={{color: 'black'}}>뒤로가기</base.Text>
                                </base.Button>
                            </base.Form>
                        </base.Form>
                        <ImageViewer imageUrls={[{
                            url: this.props.navigation.getParam('address'),
                            props: { }
                        }]}
                        saveToLocalByLongPress={true}
                        menus={renderFunction}
                        />
                    </Modal>
                </base.Content>
            <StatusBar hidden/>
            </base.Container>
		);
	}
}