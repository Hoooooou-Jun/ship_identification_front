import React, { Component } from 'react';
import { Text, View, Dimensions, ScrollView, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getToken } from '../../utils/getToken';
import { requestLicense, requestVersion } from '../../utils/additionalInfoRequest';
import Loading from '../../utils/loading';
import styles from './styles';

const SIZE_ICON = Dimensions.get('screen').height * 0.1

class License extends Component {
    constructor(props) {
        super(props);
        this.state = {
          version: '',
          frontLicense: {},
          backLicense: {},
          loadingVisible: true,
        }
    }
    
    componentDidMount() {
        getToken().then((token) => {
            requestLicense(token).then((response) => {
                if (response.status == 200) {
                    this.setState({
                        loadingVisible: false,
                        frontLicense: response.data.data.front,
                        backLicense: response.data.data.back
                    })
                }
                else {
                  console.log("error");
                }
            })
        })
        requestVersion().then((response) => {
          if(response.status == 200) {
            this.setState({version: response.data.data.version})
          }
          else {
            console.log("error");      
          }
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
              <Text style={styles.logoMain}>선박확인체계</Text>
              <Text style={styles.logoSub}>Ship_Identification {this.state.version}</Text>
            </View>
          </View>
          <View style={styles.listMain}>
            <Text style={styles.itmeTitle}>📱 Front-End</Text>
            <View style={styles.listSub}>
            {Object.values(this.state.frontLicense).map(item => 
                  (
                    <View style={styles.item} key={Math.random()}>
                      <Text style={styles.itemName} key={Math.random()}>{item.library}</Text>
                      <Text style={styles.itemUrl} onPress={() => Linking.openURL(`${item.giturl}`)} key={Math.random()}>{item.giturl}</Text>
                      <Text style={styles.itemLicense} key={Math.random()}>{item.license}</Text>
                    </View>
                  ))}
            </View>
           </View>
          <View style={styles.listMain}>
            <Text style={styles.itmeTitle}>📡 Back-End</Text>
              <View style={styles.listSub}>
              {Object.values(this.state.backLicense).map(item => 
                  (
                    <View style={styles.item} key={Math.random()}>
                      <Text style={styles.itemName} key={Math.random()}>{item.library}</Text>
                      <Text style={styles.itemUrl} onPress={() => Linking.openURL(`${item.giturl}`)} key={Math.random()}>{item.giturl}</Text>
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

export default License;