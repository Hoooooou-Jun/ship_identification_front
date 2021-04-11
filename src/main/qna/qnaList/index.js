import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Image, Alert, FlatList, TouchableHighlight, Dimensions } from 'react-native';
import * as base from 'native-base';
import { getToken } from '../../../utils/getToken';
import { requestQuestionList } from '../../../utils/additionalInfoRequest';
import ShowQuestion from './showQuestion';

import Loading from '../../../utils/loading';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02

const SIZE_QNATITLE = Dimensions.get('screen').height * 0.02
const SIZE_QNASUBTITLE = Dimensions.get('screen').height * 0.015

export default class QNAList extends Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loadingVisible: true,
        };
		this.getQuestionList = this.getQuestionList(this);
	}
	getQuestionList(){
		getToken().then((token) => {
			requestQuestionList(token).then((response) =>{
				if(response.status == 200){
					this.setState({
						data: this.state.data.concat(response.data.data),
						loadingVisible: false,
					})
				}
				else{
					console.log('Question Data Failed')
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
                <base.Content>
					<Loading visible={this.state.loadingVisible}/>
					<base.Form style={{padding: 10,}}>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>질의응답</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey'}}>궁금하신 점이 있다면 문의해주세요!</base.Text>
					</base.Form>
					<base.Button block onPress={()=>this.props.navigation.navigate('Question')} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
						<base.Text style={{color: 'black'}}>문의하기</base.Text>
					</base.Button>
					<FlatList
						style={{padding: 10,}}
						data={this.state.data}
						renderItem={({item}) =>	<ShowQuestion data={item} onPress={()=>this.props.navigation.navigate('Answer',{
							id: item.id,
						})} />}
                        ListEmptyComponent={
                            <base.Form style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10,}}>
								<base.Text style={{fontSize: SIZE_SUBTITLE}}>문의사항이 없습니다</base.Text>
							</base.Form>
                        }
					/>
                </base.Content>
            <StatusBar hidden/>
            </base.Container>
		);
	}
}