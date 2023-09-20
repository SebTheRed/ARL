import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
  } from 'react-native';
import React,{useMemo,useState} from 'react'
import styles from '../../styles'
import MapView, {Marker} from 'react-native-maps';
import Config from "react-native-config";
import { Camera, CameraType } from 'expo-camera';
import { useEffect } from 'react';

type markerProps = {
  geometry: any,
  name: string,
  vicinity: any,
}

////// COMPONENT FUNCTION BEGINNING //////
const Map = ():JSX.Element=>{
const [cameraType,setCameraType] = useState(CameraType.back)
const [camPermissions,setCameraPermissions] = useState(Camera.useCameraPermissions())

useEffect(()=>{

})

function toggleCameraType() {
  setCameraType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
}


const ApiAction = ():JSX.Element => {
  return(
  <View style={styles.cameraContainer}>
      <Camera style={styles.cameraCamera} type={cameraType} onCameraReady={() => console.log('Camera is ready')}>
        <View style={styles.cameraButtonContainer}>
          <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraType}>
            <Text style={styles.cameraText}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>)
}

useEffect(()=>{
  
 
  
},[])
console.log('map')

    return(
        <ApiAction />
    )
}

export default Map