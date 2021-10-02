import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, Dimensions } from 'react-native';
import * as base from 'native-base';
import { requestQuestionList } from '../../../utils/additionalInfoRequest';
import ShowQuestion from './showQuestion';
import { connect } from 'react-redux'

import Loading from '../../../utils/loading';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02

const QNAList = (props) => {
	const [data, setData] = useState([])
	const [loadingVisible, setLoadingVisible] = useState(true)

	const getQuestionList = () => {
		requestQuestionList(props.token).then((response) =>{
			if(response.status == 200){
				setData(response.data.data)
				setLoadingVisible(false)
			}
			else{
				console.log('Question Data Failed')
			}
		})
	}

	useEffect(() => {
		getQuestionList()
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
				<base.Form style={{padding: 10,}}>
					<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>질의응답</base.Text>
					<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey'}}>체계 사용 간 질의사항을 문의해주시기 바랍니다.</base.Text>
				</base.Form>
				<base.Button block onPress={()=>props.navigation.navigate('Question')} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
					<base.Text style={{color: 'black'}}>문의하기</base.Text>
				</base.Button>
				<FlatList
					keyExtractor = { (item, index) => index.toString() }
					style={{padding: 10,}}
					data={data}
					renderItem={({item}) =>	<ShowQuestion data={item} onPress={() => props.navigation.navigate('Answer',{id: item.id})} />}
					ListEmptyComponent={
						<base.Form style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10,}}>
							<base.Text style={{fontSize: SIZE_SUBTITLE}}>문의사항이 없습니다</base.Text>
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

export default connect(mapStateToProps)(QNAList)