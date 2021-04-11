import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { FlatList, TouchableHighlight, Dimensions } from 'react-native';
import * as base from 'native-base';
import { getToken } from '../../utils/getToken';
import { requestNoticeList } from '../../utils/additionalInfoRequest';

import Loading from '../../utils/loading';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02

const SIZE_NOTICETITLE = Dimensions.get('screen').height * 0.02
const SIZE_NOTICESUBTITLE = Dimensions.get('screen').height * 0.015

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
					<base.Form style={{padding: 10,}}>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>공지사항</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey',}}>신규 및 업데이트 소식을 알려드립니다!</base.Text>
					</base.Form>
                    <FlatList
						style={{padding: 10,}}
                        data={this.state.data}
                        renderItem={({item, index}) =>
                            <TouchableHighlight onPress={()=>this.props.navigation.navigate('Notice',{
                                    id: item.id,
                                })}>
                                <base.Card style={{ flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                                    <base.Button style={{backgroundColor: 'white', marginRight: 10, height: '100%'}}>
                                        <base.Text style={{fontSize : SIZE_NOTICESUBTITLE, color: 'black'}}>{index + 1}</base.Text>
                                    </base.Button>
                                    <base.Form>
                                        <base.Text style={{color: '#006eee', fontSize: SIZE_NOTICETITLE}}>{item.title}</base.Text>
                                        <base.Text style={{color: 'grey', fontSize: SIZE_NOTICESUBTITLE}}>{item.date}</base.Text>
                                    </base.Form>
                                </base.Card>
                            </TouchableHighlight>
                        }
                        ListEmptyComponent={
                            <base.Form style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10,}}>
								<base.Text style={{fontSize: SIZE_SUBTITLE}}>금일 공지사항이 없습니다</base.Text>
							</base.Form>
                        }
                    />
            </base.Content>
            <StatusBar hidden/>
            </base.Container>
		);
	}
}