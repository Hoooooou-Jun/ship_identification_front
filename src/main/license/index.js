import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, ScrollView, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { requestLicense } from '../../utils/additionalInfoRequest';
import Loading from '../../utils/loading';
import styles from './styles';
import { connect } from 'react-redux';

const SIZE_ICON = Dimensions.get('screen').height * 0.1

const License = (props) => {
  const [frontLicense, set_frontLicense] = useState({})
  const [backLicense, set_backLicense] = useState({})
  const [loadingVisible, set_loadingVisible] = useState(true)
  const [version, set_version] = useState(props.userInfo.version)
  
  useEffect(() => {
    requestLicense(props.userInfo.token).then((response) => {
        if(response.status == 200) {
          set_loadingVisible(false)
          set_frontLicense(response.data.data.front)
          set_backLicense(response.data.data.back)
        }
        else {
          console.log("error");
        }
    })
  }, [])

  return (
      <ScrollView style={{backgroundColor: 'white', flex: 1}}>
        <View style={styles.container}>
        <Loading visible={loadingVisible} initialRoute={false} onPress={() => props.navigation.goBack()}/>
          <View style={styles.logo}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="sail-boat" size={SIZE_ICON} color={'white'} />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.logoMain}>선박확인체계</Text>
              <Text style={styles.logoSub}>Ship_Identification {version}</Text>
            </View>
          </View>
          <View style={styles.listMain}>
            <Text style={styles.itmeTitle}>📱Front-End</Text>
            <View style={styles.listSub}>
            {Object.values(frontLicense)
            .map(item => 
              (
                <View style={styles.item} key={Math.random()}>
                  <Text style={styles.itemName} key={Math.random()}>{item.library}</Text>
                  <Text style={styles.itemUrl} onPress={() => Linking.openURL(`${item.giturl}`)} key={Math.random()}>{item.giturl}</Text>
                  <Text style={styles.itemLicense} key={Math.random()}>{item.license}</Text>
                </View>
              ))
            }
            </View>
           </View>
          <View style={styles.listMain}>
            <Text style={styles.itmeTitle}>📡Back-End</Text>
              <View style={styles.listSub}>
              {Object.values(backLicense)
              .map(item => 
                (
                  <View style={styles.item} key={Math.random()}>
                    <Text style={styles.itemName} key={Math.random()}>{item.library}</Text>
                    <Text style={styles.itemUrl} onPress={() => Linking.openURL(`${item.giturl}`)} key={Math.random()}>{item.giturl}</Text>
                    <Text style={styles.itemLicense} key={Math.random()}>{item.license}</Text>
                  </View>
                ))
              }
              </View>
          </View>    
        </View>
      </ScrollView>
  )
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.userInfo,
	}
}

export default connect(mapStateToProps)(License)