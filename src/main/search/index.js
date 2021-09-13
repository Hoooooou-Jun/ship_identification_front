import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import * as base from 'native-base';
import { Picker } from 'native-base';
import { KindsOfShip } from '../../kindsOfData/kindsOfShip';
import { KindsOfRegion } from '../../kindsOfData/kindsOfRegion';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_FONT = Dimensions.get('screen').height * 0.02
const SIZE_SUBFONT = Dimensions.get('screen').height * 0.015

const Search = (props) => {

	const [flag, set_flag] = useState('Normal')
	const [id, set_id] = useState('')
	const [types, set_types] = useState('')
	const [region, set_region] = useState('')
	const [name, set_name] = useState('Normal')
	const [code, set_code] = useState('Normal')
	const [tons, set_tons] = useState('') // 안쓰임
	const [size, set_size] = useState('') // 안쓰임
	const [port, set_port] = useState('')

	const [is_ais, set_is_ais] = useState(false)
	const [is_vpass, set_is_vpass] = useState(false)
	const [is_vhf, set_is_vhf] = useState(false)
	const [is_ff, set_is_ff] = useState(false)

	const [info, set_info] = useState('')

	const checkAIS = () => { (is_ais == true) ? set_is_ais(false) : set_is_ais(true) }
	const checkVPASS = () => { (is_vpass == true) ? set_is_vpass(false) : set_is_vpass(true) }
	const checkVHF = () => { (is_vhf == true) ? set_is_vhf(false) : set_is_vhf(true) }
	const checkFF = () => { (is_ff == true) ? set_is_ff(false) : set_is_ff(true) }

	useEffect(() => {
		set_id('')
		set_types('')
		set_region('')
		set_name('Normal')
		set_code('Normal')
		set_port('')
		set_is_ais(false)
		set_is_vpass(false)
		set_is_vhf(false)
		set_is_ff(false)
		set_info('')
	}, [flag])

	const searchShip = () => {
		if(flag == 'Normal') {
			props.navigation.navigate('SearchResult', {				
				flag: flag,
				name: name,
				types: types,
				code: code,
				tons: tons,
				size: size,
				is_ais: is_ais,
				is_vpass: is_vpass,
				is_vhf: is_vhf,
				is_ff: is_ff,
				region: region,
				port: port,
			})
		}
		else { // flag == 'Wasted'{
			props.navigation.navigate('SearchResult', {
				flag: flag,
				id: id,
				region: region,
				types: types,
				info: info,
			})
		}
	}

	const normalInput = () => {
		return( 
			<base.Form>
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박명</base.Text>
						<base.Input
							placeholder="선박명을 입력하세요"
							onChangeText={set_name}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum'}}
							/>
					</base.Item>
				</base.Form>

				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>등록번호</base.Text>
						<base.Input
							placeholder="등록번호 14자리를 입력하세요"
							onChangeText={set_code}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum'}}
							keyboardType="number-pad"/>
					</base.Item>
				</base.Form>

				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박종류</base.Text>
						<Picker
							selectedValue={types}
							style={{height: 50, width: '100%'}}
							onValueChange={(itemValue) => set_types(itemValue)}>
							{ KindsOfShip.map((data)=>{ return <Picker.Item label={data.value} value={data.value} key={Math.random()}/> }) }
						</Picker>							
					</base.Item>							
				</base.Form>
				
				<base.Form style={{marginHorizontal: 10,}}>
					<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start',}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start', padding: 10}}>식별장치</base.Text>
						<base.ListItem style={{width: '100%'}}>
								<base.CheckBox checked={is_ais} color="#006eee" onPress={() => checkAIS()}/>
								<base.Body><base.Text style={{fontSize: SIZE_SUBFONT}}>AIS</base.Text></base.Body>
								<base.CheckBox checked={is_vpass} color="#006eee" onPress={() => checkVPASS()}/>
								<base.Body><base.Text style={{fontSize: SIZE_SUBFONT}}>V-Pass</base.Text></base.Body>
						</base.ListItem>
						<base.ListItem style={{width: '100%'}}>
								<base.CheckBox checked={is_vhf} color="#006eee" onPress={() => checkVHF()}/>
								<base.Body><base.Text style={{fontSize: SIZE_SUBFONT}}>VHF-DSC</base.Text></base.Body>
								<base.CheckBox checked={is_ff} color="#006eee" onPress={() => checkFF()}/>
								<base.Body><base.Text style={{fontSize: SIZE_SUBFONT}}>FF-GPS</base.Text></base.Body>
						</base.ListItem>
					</base.Item>
				</base.Form>
				
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>위치지역</base.Text>
						<Picker
							selectedValue={region}
							style={{height: 50, width: '100%'}}
							onValueChange={(itemValue) => set_region(itemValue)}>
							{ KindsOfRegion.map((data)=>{ return <Picker.Item label={data.value} value={data.value} key={Math.random()}/> }) }
						</Picker>							
					</base.Item>							
				</base.Form>

				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>정박위치</base.Text>
						<base.Input
							placeholder="정박된 항구나 포구를 입력하세요"
							onChangeText={set_port}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum'}}
							/>
					</base.Item>
				</base.Form>

				<base.Button block onPress={() => searchShip()} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
					<base.Text style={{color: 'black'}}>검색하기</base.Text>
				</base.Button>
				<StatusBar hidden/>
			</base.Form>
		)
	}

	const wastedInput = () => {
		return(
			<base.Form>
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>관리번호</base.Text>
						<base.Input
							placeholder="관리번호를 입력하세요"
							onChangeText={set_id}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum'}}
							keyboardType="number-pad"/>
					</base.Item>
				</base.Form>
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>세부사항 키워드</base.Text>
						<base.Input
							placeholder="세부사항의 키워드를 입력하세요"
							onChangeText={set_info}
							style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}
							placeholderStyle={{fontFamily:'Nanum'}}
							/>
					</base.Item>
				</base.Form>				
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>선박종류</base.Text>
						<Picker
							selectedValue={types}
							style={{height: 50, width: '100%'}}
							onValueChange={(itemValue) => set_types(itemValue) }>
							{ KindsOfShip.map((data)=>{ return <Picker.Item label={data.value} value={data.value} key={Math.random()}/> }) }
						</Picker>							
					</base.Item>							
				</base.Form>
				<base.Form style={{marginVertical: 15}}>
					<base.Item stackedLabel style={{borderColor: '#006eee', height: 60, marginRight: 20,}}>
						<base.Text style={{fontSize: SIZE_FONT, alignSelf:'flex-start'}}>위치지역</base.Text>
						<Picker
							selectedValue={region}
							style={{height: 50, width: '100%'}}
							onValueChange={(itemValue) => set_region(itemValue) }>
							{ KindsOfRegion.map((data)=>{ return <Picker.Item label={data.value} value={data.value} key={Math.random()}/> }) }
						</Picker>							
					</base.Item>							
				</base.Form>
				<base.Button block onPress={() => searchShip()} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 6}}>
					<base.Text style={{color: 'black'}}>검색하기</base.Text>
				</base.Button>
			</base.Form>
		)
	}

	let detailInput
	if(flag == 'Normal') {
		detailInput = normalInput()
	}
	else if(flag == 'Wasted') {
		detailInput = wastedInput()
	}

	return (
		<base.Container>
			<base.Header style={{backgroundColor: 'white'}}>
				<base.Left style={{flex: 1,}}>
					<base.Button transparent onPress={() => props.navigation.goBack()}>
						<base.Icon name='arrow-back' style={{color: 'black'}}/>
					</base.Button>
				</base.Left>
				<base.Form style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center',}}>
					<base.Segment style={{backgroundColor: '#006eee', borderRadius: 10, width: '100%'}}>
						<base.Button first active={flag == 'Normal'} onPress={() => set_flag('Normal')}>
							<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}>일반선박</base.Text>
						</base.Button>
						<base.Button last active={flag == 'Wasted'} onPress={() => set_flag('Wasted')}>
							<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBFONT}}>유기선박</base.Text>
						</base.Button>
					</base.Segment>
				</base.Form>
			</base.Header>
			<base.Content>
				<base.Form style={{padding: 10,}}>
					<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee',}}>선박검색</base.Text>
					<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, marginTop: 10, color: 'grey',}}>검색할 선박의 정보를 입력해주시기 바랍니다.</base.Text>
				</base.Form>
				{detailInput}
			</base.Content>
		</base.Container>
	)
}

export default Search;