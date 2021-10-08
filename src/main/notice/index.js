import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import * as base from 'native-base';
import { connect } from 'react-redux'
import { requestNotice } from '../../utils/additionalInfoRequest';

import Loading from '../../utils/loading';

const SIZE_NOTICETITLE = Dimensions.get('screen').height * 0.03
const SIZE_NOTICESUBTITLE = Dimensions.get('screen').height * 0.015

const Notice = (props) => {
    const [content, setContent] = useState('')
    const [date, setDate] = useState('')
    const [title, setTitle] = useState('')
    const [loadingVisible, setLoadingVisible] = useState(true)

    const getNotice = () => {
        const id = props.navigation.getParam('id')
        const token = props.token
        requestNotice(token, id).then((response) =>{
            if(response.status == 200){
                    setContent(response.data.data.content)
                    setDate(response.data.data.date)
                    setTitle(response.data.data.title)
                    setLoadingVisible(false)
            }
            else{
                console.log('Notice Data Failed')
            }
        })
    }

    useEffect(() => {
        getNotice()
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
                <base.Content padder>
				    <Loading visible={loadingVisible} initialRoute={false} onPress={() => props.navigation.goBack()}/>
                    <base.Form style={{flex: 1,}}>
                        <base.Card style={{height: '100%'}}>
                            <base.CardItem header bordered>
                                <base.Text style={{fontSize: SIZE_NOTICETITLE, color: '#006eee'}}>{title}</base.Text>
                            </base.CardItem>
                            <base.CardItem>
                                <base.Text style={{fontSize: SIZE_NOTICESUBTITLE}}>{content}</base.Text>
                            </base.CardItem>
                            <base.CardItem style={{ justifyContent: 'flex-end'}}>
                                <base.Text style={{color: 'grey', fontSize: SIZE_NOTICESUBTITLE,}}>{date}</base.Text>  
                            </base.CardItem>
                            <base.CardItem footer borderd style={{justifyContent: 'flex-end'}}>
                                <base.Text style={{fontSize: SIZE_NOTICESUBTITLE,}}>선박확인체계 관리자</base.Text>  
                            </base.CardItem>
                        </base.Card>
                    </base.Form>
                </base.Content>
            </base.Container>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.userInfo.token
    }
}

export default connect(mapStateToProps)(Notice)