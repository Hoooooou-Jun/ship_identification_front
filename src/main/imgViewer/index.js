import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
const renderFunction = ({cancel, saveToLocal}) => {
    console.log(cancel) 
  }
export default class ImgViewer extends Component{
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	render(){
		return(
            <base.Container>
                <base.Content padder>
                    <Modal visible={true} transparent={true} >
                        <ImageViewer imageUrls={[{
                            // Simplest usage.
                            url: this.props.navigation.getParam('address'),

                            // width: number
                            // height: number
                            // Optional, if you know the image size, you can set the optimization performance

                            // You can pass props to <Image />.
                            props: {
                                // headers: ...
                            }
                        }]}
                        menus={renderFunction}
                        />
                        <base.Button style={{width: '100%', justifyContent: 'center', backgroundColor: 'black',
                            }} onPress={()=>this.props.navigation.goBack()}>
                            <base.Text>뒤로가기</base.Text>
                        </base.Button>
                    </Modal>
                </base.Content>
            <StatusBar hidden/>
            </base.Container>
		);
	}
}