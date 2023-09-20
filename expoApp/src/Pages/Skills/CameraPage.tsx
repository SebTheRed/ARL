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
  import { Camera, CameraType } from 'expo-camera';
  import styles from '../../styles';
import { useEffect } from 'react';
const CameraPage = ():JSX.Element => {

    const [cameraType,setCameraType] = useState(CameraType.back)
    const [camPermissions,setCameraPermissions] = useState(Camera.useCameraPermissions())
    
    
    useEffect(()=>{
      (async () => {
        const { status } = await Camera.requestPermissionsAsync(); //IGNORE ERRORS
        setCameraPermissions(status === 'granted'); //IT WORKS TOTALLY FINE ?
        //GPT PLS FIX OBNOXIOUS ERRORS
      })();
    },[])
    function toggleCameraType() {
        setCameraType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      }

return(
<View style={styles.cameraContainer}>
    {camPermissions && (
      <Camera style={styles.cameraCamera} type={cameraType} onCameraReady={() => console.log('Camera is ready')}>
        <View style={styles.cameraButtonContainer}>
          <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraType}>
            <Text style={styles.cameraText}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>      
    )}

    </View>)
}

export default CameraPage