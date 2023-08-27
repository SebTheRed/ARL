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
const Map = ({route}:any):JSX.Element=>{
const {uid, userGeoData, arrayOPlaces} = route.params;

const [currentLocation,setCurrentLocation] = useState(userGeoData)



useEffect(()=>{
  
 
  
},[])
console.log('map')

    return(
        <View style={{flex:1}}>
            <MapView
            // showsPointsOfInterest={false}
            style={{width:"100%",height:"100%"}}
            initialRegion={{
                latitude: userGeoData.latitude,
                longitude: userGeoData.longitude,
                latitudeDelta: 0.0222,
                longitudeDelta: 0.0121,
              }}
              showsUserLocation={true}  // This will show the blue dot
              followsUserLocation={true}
            >
              {/* {arrayOPlaces.parks.map((place:markerProps, index) => (
                <Marker
                  pinColor={"green"}
                  key={index}
                  coordinate={{
                    latitude: place.geometry.location.lat,
                    longitude: place.geometry.location.lng,
                  }}
                  title={place.name}
                  description={place.vicinity}
                />
              ))}
              {arrayOPlaces.gyms.map((place:markerProps, index) => (
                <Marker
                  pinColor={"gold"}
                  key={index}
                  coordinate={{
                    latitude: place.geometry.location.lat,
                    longitude: place.geometry.location.lng,
                  }}
                  title={place.name}
                  description={place.vicinity}
                />
              ))}
              {arrayOPlaces.restaurants.map((place:markerProps, index) => (
                <Marker
                  pinColor={"red"}
                  key={index}
                  coordinate={{
                    latitude: place.geometry.location.lat,
                    longitude: place.geometry.location.lng,
                  }}
                  title={place.name}
                  description={place.vicinity}
                />
              ))}
              {arrayOPlaces.coffee.map((place:markerProps, index) => (
                <Marker
                  pinColor={"beige"}
                  key={index}
                  coordinate={{
                    latitude: place.geometry.location.lat,
                    longitude: place.geometry.location.lng,
                  }}
                  title={place.name}
                  description={place.vicinity}
                />
              ))} */}
            </MapView >
        </View>
    )
}

export default Map