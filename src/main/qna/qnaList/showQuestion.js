import React from 'react';
import { TouchableHighlight, Dimensions } from 'react-native';
import * as base from 'native-base';

const SIZE_QNATITLE = Dimensions.get('screen').height * 0.02
const SIZE_QNASUBTITLE = Dimensions.get('screen').height * 0.015

const ShowQuestion = (props) => {
    let Answer

    if(props.data.status){ Answer =
        <base.Button style={{backgroundColor: '#30A9DE', marginRight: 10, height: '100%'}}>
            <base.Text style={{fontSize : SIZE_QNATITLE}}>답변완료</base.Text>
        </base.Button>
    }

    else{ Answer =
        <base.Button style={{backgroundColor: '#E53A40', marginRight: 10, height: '100%'}}>
            <base.Text style={{fontSize : SIZE_QNATITLE}}>답변대기</base.Text>
        </base.Button>
    }

    return(
        <TouchableHighlight onPress={props.onPress}>
            <base.Card style={{ flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                {Answer}
                <base.Form style={{width: '70%'}}>
                    <base.Text style={{color: '#006eee', fontSize: SIZE_QNATITLE}} numberOfLines={1} ellipsizeMode="tail">{props.data.title}</base.Text>
                    <base.Text style={{color: 'grey', fontSize: SIZE_QNASUBTITLE}}>{props.data.date}</base.Text>
                </base.Form>
            </base.Card>
        </TouchableHighlight>
    )
}

export default ShowQuestion
