import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Linking, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getToken } from '../../utils/getToken';
import { requestLicense } from '../../utils/userInfoRequest';
import Loading from '../../utils/loading'

const SIZE_ICON = Dimensions.get('screen').height * 0.1
const SIZE_TITLE = Dimensions.get('screen').width * 0.11
const SIZE_SUBTITLE = Dimensions.get('screen').width * 0.035
const SIZE_BASE = Dimensions.get('screen').width * 0.06
const SIZE_MARGIN = Dimensions.get('screen').width * 0.03
const SIZE_ITEM = Dimensions.get('screen').width * 0.05

// 임시 데이터 지정. 백엔드에서 프론트엔드, 백엔드 라이브러리 리스트 뽑아줄 예정.
const data = [
  {
    id: 1,
    name: 'expo',
    url: 'https://www.npmjs.com/package/native-base',
    license: 'MIT'
  },
  {
    id: 2,
    name: 'expo-hello',
    url: 'https://www.npmjs.com/package/native-base',
    license: 'MIT'
  },
  {
    id: 3,
    name: 'expo-hi',
    url: 'https://www.npmjs.com/package/native-base',
    license: 'Apache 2.0'
  },
  {
    id: 4,
    name: 'expo-123',
    url: 'https://www.npmjs.com/package/native-base',
    license: 'MIT'
  }
]

class License extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: '',
            loadingVisible: true,
        }
    }
    
    componentDidMount() {
        getToken().then((token) => {
            requestLicense(token).then((response) => {
                if (response.status == 200) {
                    this.setState({
                        test: "hello",
                        loadingVisible: false,
                    })
                }
                else {
                    this.setState({
                        test: "bad"
                    })
                }
            })
        })
    }

  render() {
    return (
      <ScrollView style={{backgroundColor: 'white', flex: 1}}>
        <View style={styles.container}>
        <Loading visible={this.state.loadingVisible} initialRoute={false} onPress={()=>this.props.navigation.goBack()}/>
          <View style={styles.logo}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="sail-boat" size={SIZE_ICON} color={'white'} />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.logoMain}>{this.state.test}</Text>
              <Text style={styles.logoSub}>Ship_Identification Beta TEST v1.0.5</Text>
            </View>
          </View>
          <View style={styles.listMain}>
            <Text style={{fontSize: 35, color: "#2c2c2c", fontWeight: 'bold'}}>📱 Front-End</Text>
            <View style={styles.listSub}>
            {Object.values(data).map(item => 
                  (
                    <View style={styles.item} key={Math.random()}>
                      <Text style={styles.itemName} key={Math.random()}>{item.name}</Text>
                      <Text style={styles.itemUrl} onPress={() => Linking.openURL(`${item.url}`)} key={Math.random()}>https://www.npmjs.com/package/{item.name}</Text>
                      <Text style={styles.itemLicense} key={Math.random()}>{item.license}</Text>
                    </View>
                  ))}
            </View>
           </View>
          <View style={styles.listMain}>
            <Text style={{fontSize: 35, color: "#2c2c2c", fontWeight: 'bold'}}>📡 Back-End</Text>
              <View style={styles.listSub}>
              {Object.values(data).map(item => 
                  (
                    <View style={styles.item} key={Math.random()}>
                      <Text style={styles.itemName} key={Math.random()}>{item.name}</Text>
                      <Text style={styles.itemUrl} onPress={() => Linking.openURL(`${item.url}`)} key={Math.random()}>https://www.npmjs.com/package/{item.name}</Text>
                      <Text style={styles.itemLicense} key={Math.random()}>{item.license}</Text>
                    </View>
                  ))}
              </View>
          </View>    
        </View>
      </ScrollView>
    );
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      margin: SIZE_BASE,
    },
    logo: {
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: '#fff',
      marginBottom: SIZE_MARGIN
    },
    logoMain: {
        fontSize: SIZE_TITLE,
        fontFamily:'Nanum'
    },
    logoSub: {
      fontSize: SIZE_SUBTITLE,
      color: 'grey',
      
    },
    titleContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      borderRadius: 20,
      backgroundColor: "#006eee",
      width: SIZE_ICON,
      height: SIZE_ICON
    },
    listMain: {
      margin: SIZE_MARGIN
    },
    listSub: {
      margin: SIZE_MARGIN,
    },
    item: {
      marginBottom: SIZE_ITEM
    },
    itemUrl: {
      fontSize: 15,
      color: 'skyblue',
      textDecorationLine: 'underline',
      fontFamily:'Nanum'
    },
    itemName: {
        fontSize: 25,
        color: '#3f3f3f',
        fontFamily:'Nanum'
    },
    itemLicense: {
        color: '#3f3f3f',
        fontFamily:'Nanum'
    }
  });
  
export default License;