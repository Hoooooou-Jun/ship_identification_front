import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Modal, Dimensions } from 'react-native';
import * as base from 'native-base';

const SIZE_LOAD_TITLE = Dimensions.get('screen').width * 0.07
const SIZE_LOAD_SUBTITLE = Dimensions.get('screen').width * 0.04
const SIZE_LOAD_SUBSUBTITLE = Dimensions.get('screen').width * 0.035
const SIZE_LOAD_LOGO = Dimensions.get('screen').width * 0.175
const SIZE_WIDTH = Dimensions.get('screen').width * 0.8
const SIZE_HEIGHT = Dimensions.get('screen').width * 0.68

export default class Loading extends Component{
	constructor(props) {
		super(props);
		this.state = {
            sec: 0,
            load: 0,
            sum: 100,

            needLoadingPercent: false,
		}
	}
	componentDidMount() {
        this.timer = setInterval(() => {
            if(this.props.visible){ this.setState({ sec: this.state.sec + 1,}) }
		}, 1000);
	}
	render() {
        let backButton
        let loadingPercent
        if(this.props.needLoadingPercent){ loadingPercent = 
            <base.Text style={{color: 'white', fontSize: SIZE_LOAD_SUBTITLE, margin: 10}}>{Math.floor(this.props.load/this.props.sum*100)}%</base.Text>
        }
        if(!this.props.initialRoute && this.state.sec > 10){ backButton =
            <base.Button block style={{width: '30%', height: '10%', justifyContent: 'center', alignSelf: 'center', borderRadius: 5, backgroundColor: 'white'}} onPress={this.props.onPress}>
                <base.Text style={{color: 'black', fontSize: SIZE_LOAD_SUBTITLE, margin: 10}}>뒤로가기</base.Text>
            </base.Button>
        }
		return(
			<Modal transparent={true} visible={this.props.visible}>
                <base.Form style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                    <base.Form style={{width: SIZE_WIDTH, height: SIZE_HEIGHT, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20,
                        justifyContent: 'center', alignItems: 'center'}}>
                            <base.Text style={{color: 'white', fontSize: SIZE_LOAD_TITLE, margin: 5}}>선박확인체계 알림</base.Text>
                            <base.Text style={{color: 'white', fontSize: SIZE_LOAD_SUBTITLE, margin: 5}}>데이터를 불러오고 있습니다</base.Text>
                            <base.Spinner color='white' size={SIZE_LOAD_LOGO} style={{margin: 10}}/>
                            {loadingPercent}
                            <base.Text style={{color: 'white', fontSize: SIZE_LOAD_SUBSUBTITLE, margin: 10}}>대기시간 : {this.state.sec}초</base.Text>
                            {backButton}
                    </base.Form>
                </base.Form>
                <StatusBar hidden/>
            </Modal>
		)
	}
}