import React, { Component } from 'react';
import { TouchableHighlight, Dimensions } from 'react-native';
import * as base from 'native-base';

const SIZE_QNATITLE = Dimensions.get('screen').height * 0.02
const SIZE_QNASUBTITLE = Dimensions.get('screen').height * 0.015

export default class ShowQuestion extends Component{
	constructor(props) {
		super(props);
	}
	render() {
        let Answer
        if(this.props.data.status){ Answer =
            <base.Button style={{backgroundColor: 'green', marginRight: 10, height: '100%'}}>
                <base.Text style={{fontSize : SIZE_QNATITLE}}>답변완료</base.Text>
            </base.Button>
        }
        else{ Answer =
            <base.Button style={{backgroundColor: 'red', marginRight: 10, height: '100%'}}>
                <base.Text style={{fontSize : SIZE_QNATITLE}}>답변대기</base.Text>
            </base.Button>
        }
		return(
			<TouchableHighlight onPress={this.props.onPress}>
            <base.Card style={{ flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                {Answer}
                <base.Form>
                    <base.Text style={{color: '#006eee', fontSize: SIZE_QNATITLE}}>{this.props.data.title}</base.Text>
                    <base.Text style={{color: 'grey', fontSize: SIZE_QNASUBTITLE}}>{this.props.data.date}</base.Text>
                </base.Form>
            </base.Card>
        </TouchableHighlight>
		)
	}
}
