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
import MapView, {Marker} from 'react-native-maps';
import Config from "react-native-config";

import { useEffect } from 'react';

type markerProps = {
  geometry: any,
  name: string,
  vicinity: any,
}

////// COMPONENT FUNCTION BEGINNING //////
const Map = ({route}):JSX.Element=>{
const {userGeoData, arrayOPlaces} = route.params;

const [currentLocation,setCurrentLocation] = useState(userGeoData)



useEffect(()=>{
  
 
  
},[])
console.log('map')

    return(
        <View style={{flex:1}}>
            <MapView
            style={{width:"100%",height:"100%"}}
            initialRegion={{
                latitude: userGeoData.latitude,
                longitude: userGeoData.longitude,
                latitudeDelta: 0.0222,
                longitudeDelta: 0.0121,
              }}
            >
              {arrayOPlaces.map((place:markerProps, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: place.geometry.location.lat,
                    longitude: place.geometry.location.lng,
                  }}
                  title={place.name}
                  description={place.vicinity}
                />
              ))}
            </MapView >
        </View>
    )
}

export default Map