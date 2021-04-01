import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Image, Alert, FlatList, TouchableHighlight } from 'react-native';
import * as base from 'native-base';
import { getToken } from '../../../utils/getToken';
import { requestQuestion } from '../../../utils/additionalInfoRequest';
import { requestAnswer } from '../../../utils/additionalInfoRequest';
export default class Answer extends Component{
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			date_q: '',
			content: '',

			answer: '',
			date_a: '',
		};
		this.getAnswer = this.getAnswer(this);
		this.getQuestion = this.getQuestion(this);
	}
	getQuestion(){
		getToken().then((token) => {
			const id = this.props.navigation.getParam('id')
			requestQuestion(token, id).then((response) =>{
				if(response.status == 200){
					this.setState({
						title: response.data.data.title,
						date_q: response.data.data.date,
						content: response.data.data.content,
					})
				}
				else{
					console.log('Question Data Failed')
				}
			})
		})
	}
	getAnswer(){
		getToken().then((token) => {
			const id = this.props.navigation.getParam('id')
			requestAnswer(token, id).then((response) =>{
				if(response.status == 200){
					this.setState({
						answer: response.data.data.answer,
						date_a: response.data.data.date,
					})
				}
				else{
					console.log('Question Data Failed')
				}
			})
		})
	}
	render(){
		let Answer
		if(this.state.answer.length){ Answer =
			<base.Card>
				<base.CardItem>
					<base.Text>{this.state.answer}</base.Text>
				</base.CardItem>
				<base.CardItem borderd style={{justifyContent: 'flex-end'}}>
					<base.Text>{this.state.date_a}</base.Text>  
				</base.CardItem>
				<base.CardItem footer borderd style={{justifyContent: 'flex-end'}}>
					<base.Text>선박확인체계 관리자</base.Text>  
				</base.CardItem>
			</base.Card>
		}
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
                            <base.CardItem footer borderd style={{justifyContent: 'flex-end'}}>
                                <base.Text>{this.state.date_q}</base.Text>  
                            </base.CardItem>
                        </base.Card>
						{Answer}
                    </base.Form>
                </base.Content>
            <StatusBar hidden/>
            </base.Container>
		);
	}
}