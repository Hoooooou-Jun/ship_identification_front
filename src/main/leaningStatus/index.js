import React, { useEffect, useState, useRef } from 'react';
import { Text, View } from 'react-native'
import * as base from 'native-base';
import { Dimensions } from 'react-native';
import Loading from '../../utils/loading';
import styles from './styles';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { requestDBStatistics, requestAIStatistics } from '../../utils/additionalInfoRequest'
import { connect } from 'react-redux';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_ICON = Dimensions.get('screen').height * 0.03
const SIZE_FONT = Dimensions.get('screen').height * 0.018

const LeaningStatus = (props) => {
    const [todayDB, set_todayDB] = useState([])
    const [todayAI, set_todayAI] = useState([])

    useEffect(() => {
        getStatistics()
    }, [])

    
    const getStatistics = () => {
        requestDBStatistics(props.token).then((response) => {
            set_todayDB(response.data.data)
        })
        requestAIStatistics(props.token).then((response) => {
            set_todayAI(response.data.data)
        })
    }


    return (
        <base.Container>
            <base.Header style={{backgroundColor: 'white'}}>
            <base.Left style={{flex: 1,}}>
                    <base.Button transparent onPress={() => props.navigation.goBack()}>
                        <base.Icon name='arrow-back' style={{color: 'black'}}/>
                    </base.Button>
                    </base.Left>
                    <base.Right>

                    </base.Right>
            </base.Header>
            <base.Content contentContainerStyle={{flex: 1,}}>
                <base.Form style={{padding: 10,}}>
                    <base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>AI 학습현황</base.Text>
                    <base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey',}}>ㅁㄴㅇㄻㄴㅇㄻㅇ</base.Text>
                </base.Form>
                <base.Form style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
				<base.Tabs tabBarPosition='bottom' >
					<base.Tab heading={
						<base.TabHeading style={{backgroundColor: 'white'}}>
                            <MaterialCommunityIcons name="head-sync-outline" size={SIZE_ICON} color='black'/>
							<base.Text style={{color: 'black'}}>AI 학습선박 현황</base.Text>
						</base.TabHeading>}>
                        <base.Text>asdfasdfasdfasdf</base.Text>
					</base.Tab>
					<base.Tab heading={
						<base.TabHeading style={{backgroundColor: 'white'}}>
							<AntDesign name="copy1" size={SIZE_ICON} color="black"/>
							<base.Text style={{color: 'black'}}>DB 보유 현황</base.Text>
						</base.TabHeading>}>

					</base.Tab>
				</base.Tabs>
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

export default connect(mapStateToProps)(LeaningStatus)