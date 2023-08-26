import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
import React,{useMemo,useState} from 'react'
import styles from '../../styles'
import MapView from 'react-native-maps';
import Config from "react-native-config";
import Geolocation from '@react-native-community/geolocation';


////// COMPONENT FUNCTION BEGINNING //////
const Map = ():JSX.Element=>{
// Use Config.GOOGLE_MAPS_API_KEY
const apiKey = Config.GOOGLE_MAPS_API_KEY;
const [userGeoData,setUserGeoData] = useState({
  latitude:40.8259,longitude:-74.2090,
})
useMemo(()=>{
  Geolocation.getCurrentPosition(info => {
    console.log(info.coords.latitude, info.coords.longitude);
    setUserGeoData({latitude:info.coords.latitude, longitude:info.coords.longitude})
  });
},[])


    return(
        <View style={{flex:1}}>
            <MapView
            style={{width:"100%",height:"100%"}}
            initialRegion={{
                latitude: userGeoData.latitude,
                longitude: userGeoData.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
        </View>
    )
}

export default Map