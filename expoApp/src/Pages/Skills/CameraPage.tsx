import {
    View,
    TouchableOpacity,
} from 'react-native';
import React,{useRef,useState} from 'react'
import { Camera, CameraType } from 'expo-camera';
import styles from '../../styles';
import { useEffect } from 'react';
import { scaleFont } from '../../Utilities/fontSizing';
import CloseSVG from '../../IconBin/svg/close.svg'
import FlipSVG from '../../IconBin/svg/flip.svg'
import CameraSVG from '../../IconBin/svg/camera.svg'
import * as ImageManipulator from 'expo-image-manipulator';

const CameraPage = ({setCameraActiveBool,setCameraImageURL,setCameraImageState}:any):JSX.Element => {

    const [cameraType,setCameraType] = useState(CameraType.back)
    const [camPermissions,setCameraPermissions] = useState(Camera.useCameraPermissions())
    const cameraRef = useRef(null)
    
    
    useEffect(()=>{
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync(); //IGNORE ERRORS
        setCameraPermissions(status === 'granted');
      })();
    },[])
    function toggleCameraType() {
        setCameraType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      }
    
    const takePicture = async()=>{
      if (cameraRef.current) {

        const options = {quality:1,base64:true};
        const data = await cameraRef.current.takePictureAsync(options);

        const resizedImage = await ImageManipulator.manipulateAsync(
          data.uri,
          [{resize:{height:1000}}],
          {compress: 0.5}
        )


        const dataURL = `data:image/jpeg;base64,${resizedImage.base64}`
        setCameraImageState(resizedImage.uri)
        setCameraImageURL(dataURL)
        setCameraActiveBool(false)
        // console.log(resizedImage.uri)
      }
    }

return(
<View style={styles.cameraContainer}>
    {camPermissions && (
      <Camera ref={cameraRef} style={styles.cameraCamera} type={cameraType} onCameraReady={() => console.log('Camera is ready')}>
        <View style={styles.cameraButtonContainer}>
         <TouchableOpacity style={styles.cameraButton} onPress={()=>setCameraActiveBool(false)}>
            <CloseSVG width={scaleFont(45)} height={scaleFont(45)} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cameraButton, styles.cameraTakeButton]} onPress={takePicture}>
            <CameraSVG width={scaleFont(50)} height={scaleFont(50)} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraType}>
            <FlipSVG width={scaleFont(45)} height={scaleFont(45)}  />
          </TouchableOpacity>
        </View>
      </Camera>      
    )}

    </View>)
}

export default CameraPage