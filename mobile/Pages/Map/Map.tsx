import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
import React from 'react'
import styles from '../../styles'
import MapView from 'react-native-maps';

////// COMPONENT FUNCTION BEGINNING //////
const Map = ():JSX.Element=>{
    return(
        <View style={{flex:1}}>
            <MapView
            style={{width:"100%",height:"100%"}}
            initialRegion={{
                latitude: 40.8259,
                longitude: -74.2090,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
        </View>
    )
}

export default Map