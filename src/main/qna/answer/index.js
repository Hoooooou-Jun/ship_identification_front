import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import * as base from 'native-base';
import { requestQuestion } from '../../../utils/additionalInfoRequest';
import { requestAnswer } from '../../../utils/additionalInfoRequest';
import Loading from '../../../utils/loading';
import { connect } from 'react-redux'

const Answer = (props) => {
	const [title, setTitle] = useState('')
	const [date_q, setDate_q] = useState('')
	const [content, setContent] = useState('')
	const [answer, setAnswer] = useState('')
	const [date_a, setDate_a] = useState('')
	const [loadingVisible, setLoadingVisible] = useState(true)

	const getQuestion = () => {
		const token = props.token
		const id = props.navigation.getParam('id')
		requestQuestion(token, id).then((response) =>{
			if(response.status == 200){
					setTitle(response.data.data.title)
					setDate_q(response.data.data.date)
					setContent(response.data.data.content)
					setLoadingVisible(false)
			}
			else{
				console.log('Question Data Failed')
			}
		})
	}
	const getAnswer = () => {
		const token = props.token
		const id = props.navigation.getParam('id')
		requestAnswer(token, id).then((response) =>{
			if(response.status == 200){
					setAnswer(response.data.data.answer)
					setDate_a(response.data.data.date)
			}
			else{
				console.log('Question Data Failed')
			}
		})
	}

	useEffect(() => {
		getQuestion()
		getAnswer()
	}, [])

	let Answer
	if(answer.length){ Answer =
		<base.Card>
			<base.CardItem>
				<base.Text>{answer}</base.Text>
			</base.CardItem>
			<base.CardItem borderd style={{justifyContent: 'flex-end'}}>
				<base.Text>{date_a}</base.Text>  
			</base.CardItem>
			<base.CardItem footer borderd style={{justifyContent: 'flex-end'}}>
				<base.Text>선박확인체계 관리자</base.Text>  
			</base.CardItem>
		</base.Card>
	}

	return (
		<base.Container>
			<base.Header style={{backgroundColor: 'white'}}>
				<base.Left>
					<base.Button transparent onPress={()=>props.navigation.goBack()}>
						<base.Icon name='arrow-back' style={{color: 'black'}}/>
					</base.Button>
				</base.Left>
				<base.Right>
				</base.Right>
			</base.Header>
			<base.Content padder>
				<Loading visible={loadingVisible} initialRoute={false} onPress={()=>rops.navigation.goBack()}/>
				<base.Form>
					<base.Card>
						<base.CardItem header bordered>
							<base.Text style={{fontSize: 25, color: '#006eee'}}>{title}</base.Text>
						</base.CardItem>
						<base.CardItem>
							<base.Text>{content}</base.Text>
						</base.CardItem>
						<base.CardItem footer borderd style={{justifyContent: 'flex-end'}}>
							<base.Text>{date_q}</base.Text>  
						</base.CardItem>
					</base.Card>
					{Answer}
				</base.Form>
			</base.Content>
		<StatusBar hidden/>
		</base.Container>
	)
}

const mapStateToProps = (state) => {
    return {
        token: state.userInfo.token
    }
}

export default connect(mapStateToProps)(Answer)