import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import * as base from 'native-base';
import { getToken } from '../../utils/getToken';
import { requestNotice } from '../../utils/additionalInfoRequest';

import Loading from '../../utils/loading';

const SIZE_NOTICETITLE = Dimensions.get('screen').height * 0.03
const SIZE_NOTICESUBTITLE = Dimensions.get('screen').height * 0.015

export default class Notice extends Component{
	constructor(props) {
		super(props);
		this.state = {
            content: '',
            date: '',
            title: '',
            types: false,

            loadingVisible: true,
        };
        this.getNotice = this.getNotice(this);
	}
	getNotice(){
        const id = this.props.navigation.getParam('id')
		getToken().then((token) => {
			requestNotice(token, id).then((response) =>{
				if(response.status == 200){
                    this.setState({
                        content: response.data.data.content,
                        date: response.data.data.date,
                        title: response.data.data.title,
                        types: response.data.data.types,
                        loadingVisible: false,
                    })
				}
				else{
					console.log('Notice Data Failed')
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
                <base.Content padder>
				    <Loading visible={this.state.loadingVisible} initialRoute={false} onPress={()=>this.props.navigation.goBack()}/>
                    <base.Form style={{flex: 1,}}>
                        <base.Card style={{height: '100%'}}>
                            <base.CardItem header bordered>
                                <base.Text style={{fontSize: SIZE_NOTICETITLE, color: '#006eee'}}>{this.state.title}</base.Text>
                            </base.CardItem>
                            <base.CardItem>
                                <base.Text style={{fontSize: SIZE_NOTICESUBTITLE}}>{this.state.content}</base.Text>
                            </base.CardItem>
                            <base.CardItem style={{ justifyContent: 'flex-end'}}>
                                <base.Text style={{color: 'grey', fontSize: SIZE_NOTICESUBTITLE,}}>{this.state.date}</base.Text>  
                            </base.CardItem>
                            <base.CardItem footer borderd style={{justifyContent: 'flex-end'}}>
                                <base.Text style={{fontSize: SIZE_NOTICESUBTITLE,}}>선박확인체계 관리자</base.Text>  
                            </base.CardItem>
                        </base.Card>
                    </base.Form>
                </base.Content>
            <StatusBar hidden/>
            </base.Container>
		);
	}
}