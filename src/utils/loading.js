import React, { Component } from 'react';
import { Modal, Dimensions } from 'react-native';
import * as base from 'native-base';

const SIZE_LOAD_TITLE = Dimensions.get('screen').width * 0.06
const SIZE_LOAD_SUBTITLE = Dimensions.get('screen').width * 0.03
const SIZE_LOAD_LOGO = Dimensions.get('screen').width * 0.2

export default class Loading extends Component{
	render() {
		return(
			<Modal transparent={true} visible={this.props.visible}>
                <base.Form style={{alignItems: 'center', justifyContent: 'center', flex: 1,}}>
                    <base.Form style={{width: 300, height: 300, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20,
                        justifyContent: 'center', alignItems: 'center'}}>
                            <base.Text style={{color: 'white', fontSize: SIZE_LOAD_TITLE, margin: 10}}>선박확인체계 알림</base.Text>
                            <base.Text style={{color: 'white', fontSize: SIZE_LOAD_SUBTITLE, margin: 10}}>데이터를 불러오고 있습니다</base.Text>
                            <base.Spinner color='white' size={SIZE_LOAD_LOGO} style={{margin: 10}}/>
                    </base.Form>
                </base.Form>
            </Modal>
		)
	}
}
