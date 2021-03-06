import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { FlatList, TouchableHighlight, Dimensions } from 'react-native';
import * as base from 'native-base';
import { connect } from 'react-redux'
import { requestNoticeList } from '../../utils/additionalInfoRequest';

import Loading from '../../utils/loading';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_NOTICETITLE = Dimensions.get('screen').height * 0.02
const SIZE_NOTICESUBTITLE = Dimensions.get('screen').height * 0.015

const NoticeList = (props) => {
    const [data, setData] = useState([])
    const [loadingVisible, setLoadingVisible] = useState(true)

    const getNoticeList = () => {
        requestNoticeList(props.token).then((response) =>{
            if(response.status == 200){
                setData(response.data.data)
                setLoadingVisible(false)
            }
            else{
                console.log('Notice Data Failed')
            }
        })
	}

    useEffect(() => {
        getNoticeList()
    }, [])

    return (
        <base.Container>
            <StatusBar hidden/>

            <base.Header style={{backgroundColor: 'white'}}>
                <base.Left>
                    <base.Button transparent onPress={()=>props.navigation.goBack()}>
                        <base.Icon name='arrow-back' style={{color: 'black'}}/>
                    </base.Button>
                </base.Left>
                <base.Right>
                </base.Right>
            </base.Header>

            <base.Content>
                <Loading visible={loadingVisible} initialRoute={false} onPress={()=>props.navigation.goBack()}/>
                <base.Form style={{padding: '3%', marginBottom: '-3%'}}>
                    <base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>공지사항</base.Text>
                    <base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey',}}>새로운 소식 및 업데이트 정보를 알려드립니다.</base.Text>
                </base.Form>
                <FlatList
                    keyExtractor = {(item, index) => index.toString()}
                    style={{padding: '2%',}}
                    data={data}
                    renderItem={({item, index}) =>
                        <TouchableHighlight onPress={()=>props.navigation.navigate('Notice', {id: item.id})}>
                            <base.Card style={{ flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                                <base.Button style={{backgroundColor: 'white', marginRight: 10}}>
                                    <base.Text style={{fontSize : SIZE_NOTICESUBTITLE, color: 'black'}}>{data.length - index}</base.Text>
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
        </base.Container>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.userInfo.token
    }
}

export default connect(mapStateToProps)(NoticeList)