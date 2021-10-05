import React, { useEffect, useState, useRef } from 'react';
import * as base from 'native-base';
import { Dimensions } from 'react-native';
import Loading from '../../utils/loading';
import styles from './styles';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { requestDBStatistics, requestAIStatistics } from '../../utils/additionalInfoRequest'
import { connect } from 'react-redux';

import { VictoryPie, VictoryTheme } from "victory-native";

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_ICON = Dimensions.get('screen').height * 0.03
const SIZE_FONT = Dimensions.get('screen').height * 0.018
const SIZE_DOT = Dimensions.get('screen').height * 0.018



// let AIDATA = [
//     { x: "97-1", y: modelAI.['97-1'].Entire },
//     { x: "97-2", y: modelAI.['97-2'].Entire },
//     { x: "98-1", y: modelAI.['98-1'].Entire },
//     { x: "98-2", y: modelAI.['98-2'].Entire },
//     { x: "98-3", y: modelAI.['98-3'].Entire },
//     { x: "98-4", y: modelAI.['98-4'].Entire },
//     { x: "사령부", y: modelAI.['사령부'].Entire },
//     { x: "직할대", y: modelAI.['직할대'].Entire },
// ]

const LeaningStatus = (props) => {
    const [loadingVisible, set_loadingVisible] = useState(true)
    const [date, set_date] = useState(new Date())
    const [modelAI, set_modelAI] = useState([])
    const [shipDB, set_shipDB] = useState([])
    const [dayDB, set_dayDB] = useState([])

    let AIDATA = [
        { x: "97-1", y: modelAI.['97-1'] },
        { x: "97-2", y: modelAI.['97-2'] },
        { x: "98-1", y: modelAI.['98-1'] },
        { x: "98-2", y: modelAI.['98-2'] },
        { x: "98-3", y: modelAI.['98-3'] },
    ]

    useEffect(() => {
        getStatistics()
    }, [])
    
    const getStatistics = () => {
        requestDBStatistics(props.token).then((response) => {
            set_shipDB(response.data.data)
        })
        requestAIStatistics(props.token).then((response) => {
            set_modelAI(response.data.data)
            set_loadingVisible(false)
        })
    }

    const _onDateChange = (e, newDate) => {
        set_date(newDate);
      };

    return (
        <base.Container>
            <Loading visible={loadingVisible} initialRoute={false} onPress={() => props.navigation.goBack()}/>
            <base.Header style={{backgroundColor: 'white'}}>
            <base.Left style={{flex: 1,}}>
                    <base.Button transparent onPress={() => props.navigation.goBack()}>
                        <base.Icon name='arrow-back' style={{color: 'black'}}/>
                    </base.Button>
                    </base.Left>
                    <base.Right>
                        
                    </base.Right>
            </base.Header>
            <base.Content contentContainerStyle={{flex: 1}}>
                <base.Form style={{padding: 10,}}>
                    <base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>DB 차트</base.Text>
                    <base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey',}}>AI 학습모델 및 선박 DB를 도식화하여 보여줍니다.</base.Text>
                </base.Form>
                <base.Form style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
				<base.Tabs tabBarPosition='bottom' >

					<base.Tab heading={
						<base.TabHeading style={{backgroundColor: 'white'}}>
                            <MaterialCommunityIcons name="head-sync-outline" size={SIZE_ICON} color='black'/>
							<base.Text style={{color: 'black'}}>AI 학습모델</base.Text>
						</base.TabHeading>}>
                        <base.Card>
                            <base.CardItem>
                                <base.Text>부대별 AI 학습모델 탑재 현황</base.Text>
                            </base.CardItem>
                            <VictoryPie
                                height={300}
                                colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
                                data={AIDATA}
                            />
                        </base.Card>
                        <base.Card style={{flexDirection: 'column'}}>
                            <base.List>
                                <base.CardItem>
                                    <base.Form style={{backgroundColor: 'tomato', width: SIZE_DOT, height: SIZE_DOT, borderRadius: 100}} />
                                    <base.Text> 제97보병여단 1대대</base.Text>
                                </base.CardItem>
                                <base.CardItem>
                                    <base.Form style={{backgroundColor: 'orange', width: SIZE_DOT, height: SIZE_DOT, borderRadius: 100}} />
                                    <base.Text> 제97보병여단 2대대</base.Text>
                                </base.CardItem>
                                <base.CardItem>
                                    <base.Form style={{backgroundColor: 'gold', width: SIZE_DOT, height: SIZE_DOT, borderRadius: 100}} />
                                    <base.Text> 제98보병여단 1대대</base.Text>
                                </base.CardItem>
                                <base.CardItem>
                                    <base.Form style={{backgroundColor: 'cyan', width: SIZE_DOT, height: SIZE_DOT, borderRadius: 100}} />
                                    <base.Text> 제98보병여단 2대대</base.Text>
                                </base.CardItem>
                                <base.CardItem>
                                    <base.Form style={{backgroundColor: 'navy', width: SIZE_DOT, height: SIZE_DOT, borderRadius: 100}} />
                                    <base.Text> 제98보병여단 3대대</base.Text>
                                </base.CardItem>
                            </base.List>
                        </base.Card>
					</base.Tab>
					<base.Tab heading={
						<base.TabHeading style={{backgroundColor: 'white'}}>
							<AntDesign name="copy1" size={SIZE_ICON} color="black"/>
							<base.Text style={{color: 'black'}}>선박 DB</base.Text>
						</base.TabHeading>}>
                        <base.Card>
                            <base.Text>본 수치는 실제 운용중인 서버의 수치를 실시간으로 반영한 것입니다.</base.Text>
                            <VictoryPie
                                height={400}
                                colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                                data={[
                                    { x: "asdfasdf", y: 20 },
                                    { x: "Dogs", y: 40 },
                                    { x: "Birds", y: 55 }
                                ]}
                            />
                        </base.Card>
					</base.Tab>

                    <base.Tab heading={
						<base.TabHeading style={{backgroundColor: 'white'}}>
							<AntDesign name="calendar" size={SIZE_ICON} color="black"/>
							<base.Text style={{color: 'black'}}>기간별 DB</base.Text>
						</base.TabHeading>}>
                        <base.DatePicker
                            defaultDate={new Date(2018, 4, 4)}
                            minimumDate={new Date(2021, 1, 1)}
                            maximumDate={new Date(2021, 12, 31)}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"slide"}
                            androidMode={"default"}
                            placeHolderText="날짜를 선택해주세요."
                            textStyle={{ color: "green" }}
                            placeHolderTextStyle={{ color: "#d3d3d3" }}
                            onChange={_onDateChange}
                            value={date}
                            disabled={false}
                        />
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