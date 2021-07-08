import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base';
import { Modal, Alert } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
export default class ImgViewer extends Component{
	render(){
		return(
            <base.Container>
                <base.Content padder>
                    <Modal visible={true} transparent={true} onRequestClose={()=>this.props.navigation.goBack()}>
                        <ImageViewer imageUrls={[{
                            url: this.props.navigation.getParam('address'),
                            props: {
                            }
                        }]}
                        />
                    <base.Form style={{flexDirection: 'column', height: 50}}> 
                        <base.Button style={{flex: 1, width: '100%', justifyContent: 'center', backgroundColor: '#006eee', height: 50,}}
                            onPress={()=>this.props.navigation.goBack()}>
                            <base.Text>뒤로가기</base.Text>
                        </base.Button>
                    </base.Form>
                    </Modal>
                </base.Content>
            <StatusBar hidden/>
            </base.Container>
		);
	}
}