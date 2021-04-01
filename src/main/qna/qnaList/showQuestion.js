import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import * as base from 'native-base';

export default class ShowQuestion extends Component{
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
        console.log(this.props.data)
        let Answer
        if(this.props.data.status){ Answer =
            <base.Button style={{backgroundColor: 'green', marginRight: 10,}}>
                <base.Text style={{fontSize : 15}}>답변완료</base.Text>
            </base.Button>
        }
        else{ Answer =
            <base.Button style={{backgroundColor: 'red', marginRight: 10,}}>
                <base.Text style={{fontSize : 15}}>답변대기</base.Text>
            </base.Button>
        }
		return(
			<TouchableHighlight onPress={this.props.onPress}>
            <base.Card style={{ flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                {Answer}
                <base.Form>
                    <base.Text style={{color: '#006eee', fontSize: 20}}>{this.props.data.title}</base.Text>
                    <base.Text style={{color: 'grey', fontSize: 15}}>{this.props.data.date}</base.Text>
                </base.Form>
            </base.Card>
        </TouchableHighlight>
		)
	}
}
