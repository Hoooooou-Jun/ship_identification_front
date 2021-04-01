import React, { Component } from 'react';
import * as base from 'native-base'

export const ValueInput = ({ label, value, onChange, title }) => {
	return(
		<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start',}}>
			<base.Text style={{color: 'grey', margin: 10}}>{title}</base.Text>
			<base.Input placeholder={label} value={value} onChangeText={onChange} style={{ width:'100%',fontFamily:'Nanum'}} placeholderStyle={{fontFamily:'Nanum'}}/>
		</base.Item>
	)
}
