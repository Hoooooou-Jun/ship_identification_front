import React, { useEffect, useState, useRef } from 'react';
import { Text, View } from 'react-native'
import * as base from 'native-base';
import { Dimensions } from 'react-native';
import Loading from '../../utils/loading';
import styles from './styles';
import { PieChart } from 'react-native-chart-kit'
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { requestStatistics } from '../../utils/additionalInfoRequest'
import { connect } from 'react-redux';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_ICON = Dimensions.get('screen').height * 0.03
const SIZE_FONT = Dimensions.get('screen').height * 0.018

const LeaningStatus = (props) => {

    const [todayDB, set_todayDB] = useState([])
    const [today32, set_today32] = useState(0)
    const [today971, set_today971] = useState(0)
    const [today972, set_today972] = useState(0)
    const [today981, set_today981] = useState(0)
    const [today982, set_today982] = useState(0)
    const [today983, set_today983] = useState(0)
    const [today984, set_today984] = useState(0)


    useEffect(() => {
        getStatistics()
    }, [])

    
    const getStatistics = () => {
        requestStatistics(props.token).then((response) => {
            set_todayDB(response.data.data)
            set_today32(response.data.data.['직할대'].Entire)
            set_today971(response.data.data.['97-1'].Entire)
            set_today972(response.data.data.['97-2'].Entire)
            set_today981(response.data.data.['98-1'].Entire)
            set_today982(response.data.data.['98-2'].Entire)
            set_today983(response.data.data.['98-3'].Entire)
            set_today984(response.data.data.['98-4'].Entire)
        })
    }

    const data = [
        {
          name: "제32보병사단 직할대",
          ship: 10,
          ship: today32,
          color: "#a9d6e5",
          legendFontColor: "#7F7F7F",
          legendFontSize: SIZE_FONT
        },
        {
          name: "제97보병여단 1대대",
          ship: 10,
          ship: today971,
          color: "#61a5c2",
          legendFontColor: "#7F7F7F",
          legendFontSize: SIZE_FONT
        },
        {
          name: "제97보병여단 2대대",
          ship: 10,
          ship: today972,
          color: "#468faf",
          legendFontColor: "#7F7F7F",
          legendFontSize: SIZE_FONT
        },
        {
          name: "제98보병여단 1대대",
          ship: 10,
          ship: today981,
          color: "#2c7da0",
          legendFontColor: "#7F7F7F",
          legendFontSize: SIZE_FONT
        },
        {
            name: "제98보병여단 2대대",
            ship: 10,
            ship: today982,
            color: "#2a6f97",
            legendFontColor: "#7F7F7F",
            legendFontSize: SIZE_FONT
          },
          {
            name: "제98보병여단 3대대",
            ship: 10,
            ship: today983,
            color: "#014f86",
            legendFontColor: "#7F7F7F",
            legendFontSize: SIZE_FONT
          },
          {
            name: "제98보병여단 4대대",
            ship: 10,
            ship: today984,
            color: "#01497c",
            legendFontColor: "#7F7F7F",
            legendFontSize: SIZE_FONT
          },
      ];

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
                        <base.Card>
                            <PieChart
                                data={data}
                                width={Dimensions.get('window').width * 1}
                                height={Dimensions.get('window').width * 0.5}
                                chartConfig={{
                                    backgroundColor: '#1cc910',
                                    backgroundGradientFrom: '#eff3ff',
                                    backgroundGradientTo: '#efefef',
                                    decimalPlaces: 2,
                                    color: (opacity = 0.4) => `rgba(255, 0, 0, ${opacity})`,
                                    style: {
                                    borderRadius: 16,
                                    },
                                }}
                                accessor={"ship"}
                                backgroundColor={"transparent"}
                                center={[0, 0]}
                                paddingLeft
                                style={{
                                    margin: 10
                                }}
                                absolute={false}
                            />
                        </base.Card>
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