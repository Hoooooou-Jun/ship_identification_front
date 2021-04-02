import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { FlatList, TouchableHighlight, Dimensions } from 'react-native';
import * as base from 'native-base';
import { getToken } from '../../utils/getToken';
import { requestNoticeList } from '../../utils/additionalInfoRequest';

import Loading from '../../utils/loading';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_FONT = Dimensions.get('screen').height * 0.02

export default class NoticeList extends Component{
	constructor(props) {
		super(props);
		this.state = {
            data: [],
            loadingVisible: true,
        };
		this.getNoticeList = this.getNoticeList(this);
	}
	getNoticeList(){
		getToken().then((token) => {
			requestNoticeList(token).then((response) =>{
				if(response.status == 200){
					this.setState({
						data: this.state.data.concat(response.data.data),
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
                <base.Content>
				    <Loading visible={this.state.loadingVisible}/>
					<base.Form style={{padding: 20,}}>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>공지사항</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE,}}>신규 및 업데이트 소식을 알려드립니다!</base.Text>
					</base.Form>
                    <FlatList
                        style={{paddingHorizontal: 10}}
                        data={this.state.data}
                        renderItem={({item, index}) =>
                            <TouchableHighlight onPress={()=>this.props.navigation.navigate('Notice',{
                                    id: item.id,
                                })}>
                                <base.Card style={{ flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start', height: 60}}>
                                    <base.Button style={{backgroundColor: 'white', marginRight: 10, height: 60}}>
                                        <base.Text style={{fontSize : 15, color: 'black'}}>{index + 1}</base.Text>
                                    </base.Button>
                                    <base.Form>
                                        <base.Text style={{color: '#006eee', fontSize: 20}}>{item.title}</base.Text>
                                        <base.Text style={{color: 'grey', fontSize: 15}}>{item.date}</base.Text>
                                    </base.Form>
                                </base.Card>
                            </TouchableHighlight>
                        }
                        ListEmptyComponent={
                            <base.Card style={{alignItems: 'center', justifyContent: 'center', height: 60}}>
								<base.Text>금일 공지사항이 없습니다</base.Text>
							</base.Card>
                        }
                    />
            </base.Content>
            <StatusBar hidden/>
            </base.Container>
		);
	}
}