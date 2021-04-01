import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Image, Alert, FlatList, TouchableHighlight } from 'react-native';
import * as base from 'native-base';
import { getToken } from '../../utils/getToken';
import { requestNotice } from '../../utils/additionalInfoRequest';
export default class Notice extends Component{
	constructor(props) {
		super(props);
		this.state = {
            content: '',
            date: '',
            title: '',
            types: false,
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
                    <base.Form>
                        <base.Card>
                            <base.CardItem header bordered>
                                <base.Text style={{fontSize: 25, color: '#006eee'}}>{this.state.title}</base.Text>
                            </base.CardItem>
                            <base.CardItem>
                                <base.Text>{this.state.content}</base.Text>
                            </base.CardItem>
                            <base.CardItem style={{justifyContent: 'flex-end'}}>
                                <base.Text>{this.state.date}</base.Text>  
                            </base.CardItem>
                            <base.CardItem footer borderd style={{justifyContent: 'flex-end'}}>
                                <base.Text>선박확인체계 관리자</base.Text>  
                            </base.CardItem>
                        </base.Card>
                    </base.Form>
                </base.Content>
            <StatusBar hidden/>
            </base.Container>
		);
	}
}