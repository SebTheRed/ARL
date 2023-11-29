import React from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Text } from 'react-native';
import WarningSVG from '../IconBin/svg/warning.svg'
import { scaleFont } from '../Utilities/fontSizing';

const ConfirmModal = ({isVisible, text, opacity, setIsVisible, action }:any) => {


  const confirmButton = () => {
    setIsVisible(isVisible => !isVisible)
    action()
  }



  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={isVisible}
      onRequestClose={() => {}}
    >
      <View style={{...styles.modalBackground, backgroundColor: `rgba(0,0,0,${opacity})`}}>
        <View style={styles.activityIndicatorWrapper}>
          <WarningSVG width={100} height={100} />
          <View style={{height:20}} />
          <Text style={{color:"#fff", fontSize:scaleFont(24)}}>{text}</Text>
          <View style={{height:20}} />
          <TouchableOpacity onPress={confirmButton} style={{...styles.modalButton, backgroundColor:"#ffea00"}}>
            <Text style={{color:"#1c1c1c", fontSize:scaleFont(20)}}>Confirm</Text>
          </TouchableOpacity>
          <View style={{height:20}} />
          <TouchableOpacity onPress={()=>setIsVisible(isVis=>!isVis)} style={styles.modalButton}>
            <Text style={{color:"#fff", fontSize:scaleFont(20)}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalButton:{
    backgroundColor:"#1c1c1c",
    width:260,
    height:30,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10,
    borderWidth:2,
    borderColor:"#fff"
  },
  modalBackground: {
    zIndex:100,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#00000000', // Transparent background
    width: 300,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default ConfirmModal