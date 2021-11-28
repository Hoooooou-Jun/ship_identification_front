import React from 'react'
import { View, Text, Image } from 'react-native'
import * as base from 'native-base';
import styles from './styles';
import { requestDomain } from  '../../utils/domain';

const ShipCard = (props) => {
	return (
		<base.View style={styles.shipCardView}>
			<Image resizeMode='cover' source={{uri: requestDomain + props.shipMainImg}} style={styles.shipImage}/>
			<base.Text>{props.shipName}</base.Text>
			<base.Text>{props.shipRegitDate}</base.Text>
			<base.Form style={{margin: 10}}>
				<base.Button full style={{backgroundColor: "#006eee", width: 90, height: 25}} >
					<base.Text>상세보기</base.Text>
				</base.Button>
			</base.Form>
		</base.View>
	)
}

export default ShipCard;
