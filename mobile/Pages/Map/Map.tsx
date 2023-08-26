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
import Geolocation from '@react-native-community/geolocation';
import { useEffect } from 'react';


////// COMPONENT FUNCTION BEGINNING //////
const Map = ():JSX.Element=>{
// Use Config.GOOGLE_MAPS_API_KEY

const [userGeoData,setUserGeoData] = useState({
  latitude:40.814250,longitude:-74.219460,
})
const [arrayOLocations,setArrayOLocations] = useState([])
useMemo(()=>{
  Geolocation.getCurrentPosition(info => {
    // console.log(info.coords.latitude, info.coords.longitude);
    // setUserGeoData({latitude:info.coords.latitude, longitude:info.coords.longitude})
  });
},[])


useEffect(()=>{
  const apiKey = 'AIzaSyARFSBf48RxnNhBWxtQZbCGEhlLm9yfvCk';
  const fetchPlaces = async (latitude, longitude) => {
    console.log(latitude,longitude)
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=gym&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    setArrayOLocations(data.results)
    // return data.results; // This will be an array of places
    
  };
  fetchPlaces(userGeoData.latitude, userGeoData.longitude)
},[])


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
              {arrayOLocations.map((place, index) => (
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