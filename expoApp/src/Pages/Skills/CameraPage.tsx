import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React,{useRef,useState} from 'react'
  import { Camera, CameraType } from 'expo-camera';
  import styles from '../../styles';
import { useEffect } from 'react';
const CameraPage = ({setCameraActiveBool,setCameraImageURL,setCameraImageState}:any):JSX.Element => {

    const [cameraType,setCameraType] = useState(CameraType.back)
    const [camPermissions,setCameraPermissions] = useState(Camera.useCameraPermissions())
    const cameraRef = useRef(null)
    
    
    useEffect(()=>{
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync(); //IGNORE ERRORS
        setCameraPermissions(status === 'granted'); //IT WORKS TOTALLY FINE ?
        //GPT PLS FIX OBNOXIOUS ERRORS
      })();
    },[])
    function toggleCameraType() {
        setCameraType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      }
    
    const takePicture = async()=>{
      if (cameraRef.current) {

        const options = {quality:0.5,base64:true};
        const data = await cameraRef.current.takePictureAsync(options);
        const dataURL = `data:image/jpeg;base64,${data.base64}`
        setCameraImageState(data.uri)
        setCameraImageURL(dataURL)
        setCameraActiveBool(false)
        console.log(data.uri)
      }
    }

return(
<View style={styles.cameraContainer}>
    {camPermissions && (
      <Camera ref={cameraRef} style={styles.cameraCamera} type={cameraType} onCameraReady={() => console.log('Camera is ready')}>
        <View style={styles.cameraButtonContainer}>
         <TouchableOpacity style={styles.cameraButton} onPress={()=>setCameraActiveBool(false)}>
            <Image style={styles.cameraIcon} source={require("../../IconBin/close.png")} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cameraButton, styles.cameraTakeButton]} onPress={takePicture}>
            <Image style={styles.cameraIcon} source={require("../../IconBin/camera.png")} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraType}>
            <Image style={styles.cameraIcon} source={require("../../IconBin/flip.png")} />
          </TouchableOpacity>
        </View>
      </Camera>      
    )}

    </View>)
}

export default CameraPage