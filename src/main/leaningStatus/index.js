import React, { useEffect, useState, useRef } from 'react';
import * as base from 'native-base';
import { Dimensions } from 'react-native';
import Loading from '../../utils/loading';
import styles from './styles';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { requestDBStatistics, requestAIStatistics, requestDateDBStatistics } from '../../utils/additionalInfoRequest'
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { VictoryPie, VictoryChart, VictoryBar, VictoryTheme } from "victory-native";

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_ICON = Dimensions.get('screen').height * 0.03
const SIZE_PIECHART = Dimensions.get('screen').height * 0.37
const SIZE_DOTMARGIN = Dimensions.get('screen').height * 0.016
const SIZE_DOT = Dimensions.get('screen').height * 0.018

const LeaningStatus = (props) => {
    const [loadingVisible, set_loadingVisible] = useState(true)
    // const [onPicker, set_onPicker] = useState(false)
    // const [date, set_date] = useState(new Date())
    const [modelAI, set_modelAI] = useState()
    const [shipDB, set_shipDB] = useState()
    const [dateDB, set_dateDB] = useState()
    // const [year, set_year] = useState(2021)
    // const [month, set_month] = useState(6)
    // const [day, set_day] = useState(23)

    useEffect(() => {
        getStatistics()
    }, [])

    const getStatistics = () => {
        requestAIStatistics(props.token).then((response) => {
            set_modelAI(response.data.data)
            set_loadingVisible(false)
        })
        requestDBStatistics(props.token).then((response) => {
            set_shipDB(response.data.data)
        })
        // requestDateDBStatistics(props.token, year, month, day).then((response) => {
        //     set_dateDB(response.data.data)
        //     console.log(response.data.data)
        // })
    }

    // const _onDateChange = (e, newDate) => {
    //     if(newDate == undefined) {
    //         set_date(new Date())
    //         // set_year(newDate.substring(0, 3))
    //         // set_month(newDate.substring(5, 6))
    //         // set_day(newDate.substring(8, 9))
    //         set_onPicker(false)
    //     } 
    //     else {
    //         set_date(newDate)
    //         set_onPicker(false)
    //     }
    //   };
    
    // console.log(date)
    // console.log(year,)

    // const _onPicker = () => {
    //     set_onPicker(true)
    // }

    const nowDate = new Date();
    
    let AIDATA = [
        { x: "97-1", y: modelAI && modelAI['97-1'] },
        { x: "97-2", y: modelAI && modelAI['97-2'] },
        { x: "98-1", y: modelAI && modelAI['98-1'] },
        { x: "98-2", y: modelAI && modelAI['98-2'] },
        { x: "98-3", y: modelAI && modelAI['98-3'] },
    ]
    
    let SHIPDATA = [
        { x: "97-1", y: shipDB && shipDB['97-1']['Entire'] },
        { x: "97-2", y: shipDB && shipDB['97-2']['Entire'] },
        { x: "98-1", y: shipDB && shipDB['98-1']['Entire'] },
        { x: "98-2", y: shipDB && shipDB['98-2']['Entire'] },
        { x: "98-3", y: shipDB && shipDB['98-3']['Entire'] },
        { x: "98-4", y: shipDB && shipDB['98-4']['Entire'] },
        { x: "직할대", y: shipDB && shipDB['직할대']['Entire'] },
    ]
    
    // let WEEKDATA = [
    //     { x: '97-1', y: dateDB && dateDB['97-1']['Weeks'] },
    //     { x: '97-2', y: dateDB && dateDB['97-2']['Weeks'] },
    //     { x: '98-1', y: dateDB && dateDB['98-1']['Weeks'] },
    //     { x: '98-2', y: dateDB && dateDB['98-2']['Weeks'] },
    //     { x: '98-3', y: dateDB && dateDB['98-3']['Weeks'] },
    //     { x: '98-4', y: dateDB && dateDB['98-4']['Weeks'] },
    //     { x: '직할대', y: dateDB && dateDB['직할대']['Weeks'] },
    // ]

    // let MONTHDATA = [
    //     { x: '97-1', y: dateDB && dateDB['97-1']['Month'] },
    //     { x: '97-2', y: dateDB && dateDB['97-2']['Month'] },
    //     { x: '98-1', y: dateDB && dateDB['98-1']['Month'] },
    //     { x: '98-2', y: dateDB && dateDB['98-2']['Month'] },
    //     { x: '98-3', y: dateDB && dateDB['98-3']['Month'] },
    //     { x: '98-4', y: dateDB && dateDB['98-4']['Month'] },
    //     { x: '직할대', y: dateDB && dateDB['직할대']['Month'] },
    // ]

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
                    <base.Tabs tabBarPosition='bottom'>
                        <base.Tab heading={
                            <base.TabHeading style={{backgroundColor: 'white'}}>
                                <MaterialCommunityIcons name="head-sync-outline" size={SIZE_ICON} color='black'/>
                                <base.Text style={{color: 'black'}}>AI 학습모델</base.Text>
                            </base.TabHeading>}>
                            <base.Content>
                                <base.Card>
                                    <VictoryPie
                                        height={SIZE_PIECHART}
                                        colorScale={["tomato", "orange", "gold", "cyan", "#3a86ff", "#2dc653", "#b5179e"]}
                                        data={AIDATA}
                                        labels={({ datum }) => modelAI && `${(datum.y / (modelAI['97-1'] + modelAI['97-2'] + modelAI['98-1'] + modelAI['98-2'] + modelAI['98-3'])).toFixed(2) * 100}%`}
                                    />
                                    <base.Form style={{alignItems: 'center', marginBottom: SIZE_DOTMARGIN}}>
                                        <base.Text style={{fontWeight: 'bold'}}>AI 학습모델 탑재 현황</base.Text>
                                        <base.Text style={{color: 'grey'}}>{nowDate.getFullYear()}년 {nowDate.getMonth() + 1}월 {nowDate.getDate()}일 기준</base.Text>
                                    </base.Form>
                                </base.Card>
                                <base.Card style={{flexDirection: 'column'}}>
                                <base.CardItem>
                                        <base.Form style={{backgroundColor: 'tomato', marginRight: SIZE_DOTMARGIN, width: SIZE_DOT, height: SIZE_DOT, borderRadius: 100}} />
                                        <base.Text>제97보병여단 1대대 : {modelAI && modelAI['97-1']}척</base.Text>
                                    </base.CardItem>
                                    <base.CardItem>
                                        <base.Form style={{backgroundColor: 'orange', marginRight: SIZE_DOTMARGIN, width: SIZE_DOT, height: SIZE_DOT, borderRadius: 100}} />
                                        <base.Text>제97보병여단 2대대 : {modelAI && modelAI['97-2']}척</base.Text>
                                    </base.CardItem>
                                    <base.CardItem>
                                        <base.Form style={{backgroundColor: 'gold', marginRight: SIZE_DOTMARGIN, width: SIZE_DOT, height: SIZE_DOT, borderRadius: 100}} />
                                        <base.Text>제98보병여단 1대대 : {modelAI && modelAI['98-1']}척</base.Text>
                                    </base.CardItem>
                                    <base.CardItem>
                                        <base.Form style={{backgroundColor: 'cyan', marginRight: SIZE_DOTMARGIN, width: SIZE_DOT, height: SIZE_DOT, borderRadius: 100}} />
                                        <base.Text>제98보병여단 2대대 : {modelAI && modelAI['98-2']}척</base.Text>
                                    </base.CardItem>
                                    <base.CardItem>
                                        <base.Form style={{backgroundColor: '#3a86ff', marginRight: SIZE_DOTMARGIN, width: SIZE_DOT, height: SIZE_DOT, borderRadius: 100}} />
                                        <base.Text>제98보병여단 3대대 : {modelAI && modelAI['98-3']}척</base.Text>
                                    </base.CardItem>
                                    <base.CardItem>
                                        <base.Text style={{color: 'grey'}}>본 수치는 실제 서버에 탑재된 AI 학습모델을 실시간으로 반영한 것입니다.</base.Text>
                                    </base.CardItem>
                                </base.Card>
                            </base.Content>
                        </base.Tab>
                        <base.Tab heading={
                            <base.TabHeading style={{backgroundColor: 'white'}}>
                                <AntDesign name="copy1" size={SIZE_ICON} color="black"/>
                                <base.Text style={{color: 'black'}}>선박 DB</base.Text>
                            </base.TabHeading>}>
                            <base.Content>
                                <base.Card>
                                    <VictoryPie
                                        height={SIZE_PIECHART}
                                        colorScale={["tomato", "orange", "gold", "cyan", "#3a86ff", "#2dc653", "#b5179e"]}
                                        data={SHIPDATA}
                                        labels={({ datum }) => shipDB && `${(datum.y / (shipDB['97-1']['Entire'] + shipDB['97-2']['Entire'] + shipDB['98-1']['Entire'] + shipDB['98-2']['Entire'] + shipDB['98-3']['Entire'] + shipDB['98-4']['Entire'] + shipDB['직할대']['Entire'])).toFixed(2) * 100}%`}
                                    />
                                    <base.Form style={{alignItems: 'center', marginBottom: SIZE_DOTMARGIN}}>
                                        <base.Text style={{fontWeight: 'bold'}}>선박 DB 탑재 현황</base.Text>
                                        <base.Text style={{color: 'grey'}}>{nowDate.getFullYear()}년 {nowDate.getMonth() + 1}월 {nowDate.getDate()}일 기준</base.Text>
                                    </base.Form>
                                </base.Card>
                                <base.Card style={{flexDirection: 'column'}}>
                                    <base.CardItem>
                                        <base.Form style={{backgroundColor: 'tomato', marginRight: SIZE_DOTMARGIN, width: SIZE_DOT, height: SIZE_DOT, borderRadius: 100}} />
                                        <base.Text>제97보병여단 1대대 : {shipDB && shipDB['97-1']['Entire']}척</base.Text>
                                    </base.CardItem>
                                    <base.CardItem>
                                        <base.Form style={{backgroundColor: 'orange', marginRight: SIZE_DOTMARGIN, width: SIZE_DOT, height: SIZE_DOT, borderRadius: 100}} />
                                        <base.Text>제97보병여단 2대대 : {shipDB && shipDB['97-2']['Entire']}척</base.Text>
                                    </base.CardItem>
                                    <base.CardItem>
                                        <base.Form style={{backgroundColor: 'gold', marginRight: SIZE_DOTMARGIN, width: SIZE_DOT, height: SIZE_DOT, borderRadius: 100}} />
                                        <base.Text>제98보병여단 1대대 : {shipDB && shipDB['98-1']['Entire']}척</base.Text>
                                    </base.CardItem>
                                    <base.CardItem>
                                        <base.Form style={{backgroundColor: 'cyan', marginRight: SIZE_DOTMARGIN, width: SIZE_DOT, height: SIZE_DOT, borderRadius: 100}} />
                                        <base.Text>제98보병여단 2대대 : {shipDB && shipDB['98-2']['Entire']}척</base.Text>
                                    </base.CardItem>
                                    <base.CardItem>
                                        <base.Form style={{backgroundColor: '#3a86ff', marginRight: SIZE_DOTMARGIN, width: SIZE_DOT, height: SIZE_DOT, borderRadius: 100}} />
                                        <base.Text>제98보병여단 3대대 : {shipDB && shipDB['98-3']['Entire']}척</base.Text>
                                    </base.CardItem>
                                    <base.CardItem>
                                        <base.Form style={{backgroundColor: '#2dc653', marginRight: SIZE_DOTMARGIN, width: SIZE_DOT, height: SIZE_DOT, borderRadius: 100}} />
                                        <base.Text>제98보병여단 4대대 : {shipDB && shipDB['98-4']['Entire']}척</base.Text>
                                    </base.CardItem>
                                    <base.CardItem>
                                        <base.Form style={{backgroundColor: '#b5179e', marginRight: SIZE_DOTMARGIN, width: SIZE_DOT, height: SIZE_DOT, borderRadius: 100}} />
                                        <base.Text>제32보병사단 직할대 : {shipDB && shipDB['직할대']['Entire']}척</base.Text>
                                    </base.CardItem>
                                    <base.CardItem>
                                        <base.Text style={{color: 'grey'}}>본 수치는 실제 서버의 선박 수를 실시간으로 반영한 것입니다.</base.Text>
                                    </base.CardItem>
                                </base.Card>
                            </base.Content>
                        </base.Tab>

                        {/* <base.Tab heading={
                            <base.TabHeading style={{backgroundColor: 'white'}}>
                                <AntDesign name="calendar" size={SIZE_ICON} color="black"/>
                                <base.Text style={{color: 'black'}}>기간별 DB</base.Text>
                            </base.TabHeading>}>

                            <base.Content>
                                {onPicker && (
                                    <DateTimePicker
                                        maximumDate={new Date()}
                                        minimumDate={new Date(2021, 1, 1)}
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={'date'}
                                        is24Hour={true}
                                        display="default"
                                        onChange={(e, date) => set_date(date)}
                                    />
                                )}
                            
                                <base.Button transparent light onPress={_onPicker} >
                                    <base.Text>날짜 선택</base.Text>
                                </base.Button>
                                <base.Card>
                                    <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
                                        <VictoryBar
                                            style={{ data: { fill: "#c43a31" } }}
                                            data={WEEKDATA}
                                            alignment="middle"
                                            animate={{
                                                duration: 2500,
                                                onLoad: { duration: 1500 }
                                            }}
                                        />
                                    </VictoryChart>
                                    <base.Form style={{alignItems: 'center', marginBottom: SIZE_DOTMARGIN}}>
                                        <base.Text style={{fontWeight: 'bold'}}>선박 DB 탑재 현황</base.Text>
                                        <base.Text style={{color: 'grey'}}>{nowDate.getFullYear()}년 {nowDate.getMonth() + 1}월 {nowDate.getDate()}일 기준</base.Text>
                                    </base.Form>
                                </base.Card>
                                <base.Card style={{flexDirection: 'column'}}>

                                    <base.CardItem>
                                        <base.Text style={{color: 'grey'}}>본 수치는 해당 날짜의 월별, 주차별 선박 업로드 수를 반영한 것입니다.</base.Text>
                                    </base.CardItem>
                                </base.Card>
                            </base.Content>

                        </base.Tab> */}

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