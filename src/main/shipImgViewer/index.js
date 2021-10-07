import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import * as base from 'native-base';
import { Modal, Alert } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { getToken } from '../../utils/getToken';
import { deleteCommonShipImage, deleteWastedShipImage, updateCommonShipMImage, updateWastedShipMImage } from '../../utils/shipInfoRequest';
import { requestPermission } from '../../utils/userInfoRequest';

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';

const ShipImgViewer = (props) => {
    const [address, set_address] = useState(props.navigation.getParam('address'))
    const [id, set_id] = useState(props.navigation.getParam('id'))
    const [main_img_id, set_main_img_id] = useState(props.navigation.getParam('main_img_id'))
    const [img_id, set_img_id] = useState(props.navigation.getParam('img_id'))
    const [flag, set_flag] = useState(props.navigation.getParam('flag'))
    const [index , set_index] = useState(props.navigation.getParam('index'))


    const deleteShipImage = () =>{ 
		Alert.alert(
			'선박확인체계 알림',
			index + '번째 추가이미지를 삭제하시겠습니까?',
			[{
				text: "네",
				onPress: () => {
                    if(props.userInfo.level > 1){
                        if(flag == 'Normal'){
                            deleteCommonShipImage(props.userInfo.token, img_id).then((response)=>{
                                console.log('일반선박 이미지 삭제 완료')
                                Alert.alert(
                                    '선박확인체계 알림',
                                    index + '번째 추가이미지가 삭제되었습니다',
                                )
                                props.navigation.pop();
                            })
                        }
                        else{
                            deleteWastedShipImage(props.userInfo.token, img_id).then((response)=>{
                                console.log('유기선박 이미지 삭제 완료')
                                Alert.alert(
                                    '선박확인체계 알림',
                                    index + '번째 추가이미지가 삭제되었습니다',
                                )
                                props.navigation.pop();
                            })
                        }
                    }
                    else{
                        Alert.alert(
                            '선박확인체계 알림',
                            '선박 추가이미지 삭제 권한이 없습니다',
                        )
                    }
                }
				},{
				text: "아니오",
				onPress: () => console.log("Cancel Pressed"),
			}]
		);
    }
    const updateShipMImage = () => {
		Alert.alert(
			'선박확인체계 알림',
			index + '번째 사진으로 대표사진을 수정하시겠습니까?',
			[{
				text: "네",
				onPress: () => {
                    if(props.userInfo.level > 1){
                        if(flag == 'Normal'){
                            if(img_id != main_img_id){
                                updateCommonShipMImage(props.userInfo.token, img_id).then((response) => {
                                    Alert.alert(
                                        '선박확인체계 알림',
                                        index + '번째 사진으로 대표사진이 수정되었습니다',
                                    )
                                    props.navigation.popToTop();
                                    props.navigation.navigate('DetailCommonShip',{id: id})
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
                            if(img_id != main_img_id){
                                updateWastedShipMImage(props.userInfo.token, img_id).then((response) => {
                                    Alert.alert(
                                        '선박확인체계 알림',
                                        index + '번째 사진으로 대표사진이 수정되었습니다',
                                    )
                                    props.navigation.popToTop();
                                    props.navigation.navigate('DetailWastedShip',{id: id})
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
                }
				},{
				text: "아니오",
				onPress: () => console.log("Cancel Pressed"),
			}]
		);

    }
   const downloadImage  = async () => {
        // const fileUri: string = `${FileSystem.documentDirectory}${filename}`;
        const downloadedFile: FileSystem.FileSystemDownloadResult = await FileSystem.downloadAsync(address, FileSystem.documentDirectory + 'ship_img.jpg');
    
        if (downloadedFile.status != 200) {
          console.log('downloadedFile.status != 200')
        }
        const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (perm.status != 'granted') {
            return;
        }

        try {
            const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
            const album = await MediaLibrary.getAlbumAsync('Download');
        if (album == null) {
            await MediaLibrary.createAlbumAsync('Download', asset, false);
        } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
        } catch (e) {
            console.log(e);
        }

        Alert.alert(
            '선박확인체계 알림',
            '저장이 완료되었습니다.',
        )
    }

    return (
        <base.Container>
            <base.Content padder>
                <Modal visible={true} transparent={true} onRequestClose={() => props.navigation.goBack()}>
                    <base.Form style={{flexDirection: 'row', height: 50}}>         
                        <base.Button style={{flex: 1, width: '100%', justifyContent: 'center', backgroundColor: 'white', height: 50, elevation: 6,}}
                            onPress={updateShipMImage}>
                            <base.Text style={{color: 'black'}}>대표사진 설정하기</base.Text>
                        </base.Button>                 
                        <base.Button style={{flex: 1, width: '100%', justifyContent: 'center', backgroundColor: 'white', height: 50,}}
                            onPress={deleteShipImage}>
                            <base.Text style={{color: 'black'}}>삭제하기</base.Text>
                        </base.Button>
                    </base.Form>
                    <base.Form style={{flexDirection: 'row', height: 50}}>
                        <base.Button style={{flex: 1, width: '100%', justifyContent: 'center', backgroundColor: 'white', height: 50,}}
                            onPress={downloadImage}>
                            <base.Text style={{color: 'black'}}>저장하기</base.Text>
                        </base.Button>
                    </base.Form>
                    <ImageViewer imageUrls={[{
                        url: address,
                        props: { }
                    }]}
                />
                </Modal>
            </base.Content>
        <StatusBar hidden/>
        </base.Container>
    )
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.userInfo
	}

}

export default connect(mapStateToProps)(ShipImgViewer)
// export default class ShipImgViewer extends Component{
// 	constructor(props) {
// 		super(props);
// 		this.state = {
//             address: '',
//             id: '',
//             main_img_id: '',
//             img_id: '',
//             flag: '',
//             index: '',
// 		};
//         this.deleteShipImage = this.deleteShipImage.bind(this);
//         this.updateShipMImage = this.updateShipMImage.bind(this);

//         this.downloadImage = this.downloadImage.bind(this);
// 	}
//     componentDidMount(){
//         this.setState({
//             id: this.props.navigation.getParam('id'),
//             img_id: this.props.navigation.getParam('img_id'),
//             index: this.props.navigation.getParam('index'),
//             flag: this.props.navigation.getParam('flag'),
//             main_img_id: this.props.navigation.getParam('main_img_id'),
//             address: this.props.navigation.getParam('address'),
//         })
//     }
//     deleteShipImage(){ 
// 		Alert.alert(
// 			'선박확인체계 알림',
// 			this.state.index + '번째 추가이미지를 삭제하시겠습니까?',
// 			[{
// 				text: "네",
// 				onPress: () => getToken().then((token) => {
//                     requestPermission(token).then((response) => {
//                         if(response.data.data.user_level > 1){
//                             if(this.state.flag == 'Normal'){
//                                 deleteCommonShipImage(token, this.state.img_id).then((response)=>{
//                                     console.log('일반선박 이미지 삭제 완료')
//                                     Alert.alert(
//                                         '선박확인체계 알림',
//                                         this.state.index + '번째 추가이미지가 삭제되었습니다',
//                                     )
//                                     this.props.navigation.pop();
//                                 })
//                             }
//                             else{
//                                 deleteWastedShipImage(token, this.state.img_id).then((response)=>{
//                                     console.log('유기선박 이미지 삭제 완료')
//                                     Alert.alert(
//                                         '선박확인체계 알림',
//                                         this.state.index + '번째 추가이미지가 삭제되었습니다',
//                                     )
//                                     this.props.navigation.pop();
//                                 })
//                             }
//                         }
//                         else{
//                             Alert.alert(
//                                 '선박확인체계 알림',
//                                 '선박 추가이미지 삭제 권한이 없습니다',
//                             )
//                         }
//                     })
//                 })
// 				},{
// 				text: "아니오",
// 				onPress: () => console.log("Cancel Pressed"),
// 			}]
// 		);
//     }
//     updateShipMImage(){
// 		Alert.alert(
// 			'선박확인체계 알림',
// 			this.state.index + '번째 사진으로 대표사진을 수정하시겠습니까?',
// 			[{
// 				text: "네",
// 				onPress: () => getToken().then((token) => {
//                     requestPermission(token).then((response) => {
//                         if(response.data.data.user_level > 1){
//                             if(this.state.flag == 'Normal'){
//                                 if(this.state.img_id != this.state.main_img_id){
//                                     updateCommonShipMImage(token, this.state.img_id).then((response) => {
//                                         Alert.alert(
//                                             '선박확인체계 알림',
//                                             this.state.index + '번째 사진으로 대표사진이 수정되었습니다',
//                                         )
//                                         this.props.navigation.popToTop();
//                                         this.props.navigation.navigate('DetailCommonShip',{id: this.state.id})
//                                     })
//                                 }
//                                 else{
//                                     Alert.alert(
//                                         '선박확인체계 알림',
//                                         '기존 대표사진과 동일한 사진입니다',
//                                     )
//                                 }
//                             }
//                             else{
//                                 if(this.state.img_id != this.state.main_img_id){
//                                     updateWastedShipMImage(token, this.state.img_id).then((response) => {
//                                         Alert.alert(
//                                             '선박확인체계 알림',
//                                             this.state.index + '번째 사진으로 대표사진이 수정되었습니다',
//                                         )
//                                         this.props.navigation.popToTop();
//                                         this.props.navigation.navigate('DetailWastedShip',{id: this.state.id})
//                                     })
//                                 }
//                                 else{
//                                     Alert.alert(
//                                         '선박확인체계 알림',
//                                         '기존 대표사진과 동일한 사진입니다',
//                                     )
//                                 }
//                             }
//                         }
//                         else{
// 							Alert.alert(
// 								'선박확인체계 알림',
// 								'대표사진 수정 권한이 없습니다',
// 							)
//                         }
//                     })
//                 })
// 				},{
// 				text: "아니오",
// 				onPress: () => console.log("Cancel Pressed"),
// 			}]
// 		);

//     }
//     async downloadImage(){
//         // const fileUri: string = `${FileSystem.documentDirectory}${filename}`;
//         const downloadedFile: FileSystem.FileSystemDownloadResult = await FileSystem.downloadAsync(this.state.address, FileSystem.documentDirectory + 'ship_img.jpg');
        
//         if (downloadedFile.status != 200) {
//           handleError();
//         }
//         const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
//         if (perm.status != 'granted') {
//             return;
//         }

//         try {
//             const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
//             const album = await MediaLibrary.getAlbumAsync('Download');
//         if (album == null) {
//             await MediaLibrary.createAlbumAsync('Download', asset, false);
//         } else {
//             await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
//         }
//         } catch (e) {
//             handleError(e);
//         }
//     }
// 	render(){
// 		return(
//             <base.Container>
//                 <base.Content padder>
//                     <Modal visible={true} transparent={true} onRequestClose={()=>this.props.navigation.goBack()}>
//                         <base.Form style={{flexDirection: 'row', height: 50}}>         
//                             <base.Button style={{flex: 1, width: '100%', justifyContent: 'center', backgroundColor: 'white', height: 50, elevation: 6,}}
//                                 onPress={this.updateShipMImage}>
//                                 <base.Text style={{color: 'black'}}>대표사진 설정하기</base.Text>
//                             </base.Button>                 
//                             <base.Button style={{flex: 1, width: '100%', justifyContent: 'center', backgroundColor: 'white', height: 50,}}
//                                 onPress={()=>this.deleteShipImage()}>
//                                 <base.Text style={{color: 'black'}}>삭제하기</base.Text>
//                             </base.Button>
//                         </base.Form>
//                         <base.Form style={{flexDirection: 'row', height: 50}}>
//                             <base.Button style={{flex: 1, width: '100%', justifyContent: 'center', backgroundColor: 'white', height: 50,}}
//                                 onPress={()=>this.downloadImage()}>
//                                 <base.Text style={{color: 'black'}}>저장하기</base.Text>
//                             </base.Button>
//                         </base.Form>
//                         <ImageViewer imageUrls={[{
//                             url: this.state.address,
//                             props: { }
//                         }]}
//                     />
//                     </Modal>
//                 </base.Content>
//             <StatusBar hidden/>
//             </base.Container>
// 		);
// 	}
// }